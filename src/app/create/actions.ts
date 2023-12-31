"use server";

import { auth } from "@/auth";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { db, eq, and } from "@/db";
import { media } from "@/db/schema/media";

import crypto from "crypto";

import { posts } from "@/db/schema/posts";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
];

const maxFileSize = 1024 * 1024 * 10; // 10MB

export async function getSignedURL(
  type: string,
  size: number,
  checksum: string
) {
  const session = await auth();
  if (!session) return { failure: "Not authenticated" };

  if (!acceptedTypes.includes(type)) {
    return { failure: "Invalid file type" };
  }

  if (size > maxFileSize) {
    return { failure: "File too large" };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: session.user.id,
    },
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  const mediaResult = await db
    .insert(media)
    .values({
      userId: session.user.id,
      type: type.startsWith("image") ? "image" : "video",
      url: signedUrl.split("?")[0],
    })
    .returning({ id: media.id })
    .then((res) => res[0]);

  return { success: { url: signedUrl, mediaId: mediaResult.id } };
}

type CreatePostArgs = {
  content: string;
  mediaId?: number;
};
export async function createPost({ content, mediaId }: CreatePostArgs) {
  const session = await auth();
  if (!session) return { failure: "Not authenticated" };

  if (mediaId) {
    const mediaItem = await db
      .select()
      .from(media)
      .where(and(eq(media.id, mediaId), eq(media.userId, session.user.id)))
      .then((res) => res[0]);
    if (!mediaItem) return { failure: "Media not found" };
  }
  const postItem = await db
    .insert(posts)
    .values({ userId: session.user.id, content })
    .returning()
    .then((res) => res[0]);

  if (mediaId) {
    await db
      .update(media)
      .set({ postId: postItem.id })
      .where(eq(media.id, mediaId));
  }
  revalidatePath("/");
  redirect("/");
}
