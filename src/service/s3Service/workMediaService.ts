import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const AWS_REGION =
  import.meta.env.VITE_AWS_REGION;

const AWS_ACCESS_KEY_ID =
  import.meta.env.VITE_AWS_ACCESS_KEY_ID;

const AWS_SECRET_ACCESS_KEY =
  import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

const AWS_BUCKET_NAME =
  import.meta.env.VITE_AWS_BUCKET_NAME;

if (
  !AWS_REGION ||
  !AWS_ACCESS_KEY_ID ||
  !AWS_SECRET_ACCESS_KEY ||
  !AWS_BUCKET_NAME
) {
  console.warn(
    "AWS S3 environment variables are missing."
  );
}

const s3Client = new S3Client({
  region: AWS_REGION,

  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export type UploadedMedia = {
  key: string;
  url: string;
  fileName: string;
  fileType: string;
  size: number;
};

const sanitizeFileName = (
  fileName: string
) => {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.\-_]/g, "");
};

const createUniqueFileName = (
  file: File
) => {
  const timestamp = Date.now();

  const random =
    Math.random()
      .toString(36)
      .substring(2, 10);

  const cleanName =
    sanitizeFileName(file.name);

  return `${timestamp}-${random}-${cleanName}`;
};

const getPublicUrl = (
  key: string
) => {
  return `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
};

const WorkMediaService = {
  async uploadFile(
    file: File,
    clientId: string,
    postType: "poster" | "reel"
  ): Promise<UploadedMedia> {
    const uniqueFileName =
      createUniqueFileName(file);

    const folder =
      postType === "poster"
        ? "posters"
        : "reels";

    const key =
      `works/${clientId}/${folder}/${uniqueFileName}`;

    const arrayBuffer =
      await file.arrayBuffer();

    const command =
      new PutObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key,
        Body: new Uint8Array(arrayBuffer),
        ContentType: file.type,
      });

    await s3Client.send(command);

    return {
      key,
      url: getPublicUrl(key),
      fileName: file.name,
      fileType: file.type,
      size: file.size,
    };
  },

  async uploadMultipleFiles(
    files: File[],
    clientId: string,
    postType: "poster" | "reel",
    onProgress?: (
      completed: number,
      total: number
    ) => void
  ): Promise<UploadedMedia[]> {
    const uploaded: UploadedMedia[] = [];

    for (
      let index = 0;
      index < files.length;
      index++
    ) {
      const result =
        await this.uploadFile(
          files[index],
          clientId,
          postType
        );

      uploaded.push(result);

      onProgress?.(
        index + 1,
        files.length
      );
    }

    return uploaded;
  },

  async deleteFile(
    key: string
  ) {
    if (!key) return;

    const command =
      new DeleteObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key,
      });

    await s3Client.send(command);
  },

  async deleteMultipleFiles(
    keys: string[]
  ) {
    await Promise.all(
      keys.map((key) =>
        this.deleteFile(key)
      )
    );
  },
};

export default WorkMediaService;