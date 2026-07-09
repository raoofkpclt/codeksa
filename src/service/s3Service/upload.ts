import { PutObjectCommand } from "@aws-sdk/client-s3";

import s3Client, {
  S3_BUCKET_NAME,
  AWS_REGION,
} from "../../config/s3bucket/s3Config";

export interface UploadedFile {
  url: string;
  key: string;
  name: string;
  type: string;
  size: number;
}

const sanitizeFileName = (
  fileName: string
): string => {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "");
};

export const uploadFile = async (
  file: File,
  folder: string = "uploads"
): Promise<UploadedFile> => {
  try {
    if (!file) {
      throw new Error("File is required");
    }

    // Allow only images and videos
    const isImage =
      file.type.startsWith("image/");

    const isVideo =
      file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      throw new Error(
        "Only image and video files are allowed"
      );
    }

    if (!S3_BUCKET_NAME) {
      throw new Error(
        "S3 bucket name is missing"
      );
    }

    if (!AWS_REGION) {
      throw new Error(
        "AWS region is missing"
      );
    }

    const cleanFileName =
      sanitizeFileName(file.name);

    const uniqueFileName =
      `${Date.now()}-${crypto.randomUUID()}-${cleanFileName}`;

    const key =
      `${folder}/${uniqueFileName}`;

    // Important fix for browser/Vite
    const arrayBuffer =
      await file.arrayBuffer();

    const fileBody =
      new Uint8Array(arrayBuffer);

    const command =
      new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,

        // Do not use Body: file
        Body: fileBody,

        ContentType:
          file.type ||
          "application/octet-stream",

        ContentLength:
          file.size,
      });

    await s3Client.send(command);

    const encodedKey = key
      .split("/")
      .map((part) =>
        encodeURIComponent(part)
      )
      .join("/");

    const fileUrl =
      `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${encodedKey}`;

    return {
      url: fileUrl,
      key,
      name: file.name,
      type: file.type,
      size: file.size,
    };
  } catch (error) {
    console.error(
      "S3 Upload Error:",
      error
    );

    throw error;
  }
};