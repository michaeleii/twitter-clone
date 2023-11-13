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

export async function getSignedURL() {
  const session = await auth();
  if (!session) return { failure: "Not authenticated" };

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET!,
    Key: "test-file",
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedUrl } };
}
