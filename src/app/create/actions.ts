"use server";

import { auth } from "@/auth";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
    Key: "test-file",
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

  return { success: { url: signedUrl } };
}
