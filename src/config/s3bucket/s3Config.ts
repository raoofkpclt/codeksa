import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,

  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

export const S3_BUCKET_NAME =
  import.meta.env.VITE_AWS_BUCKET_NAME;

export const AWS_REGION =
  import.meta.env.VITE_AWS_REGION;

export default s3Client;