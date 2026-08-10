import { Timestamp } from "firebase/firestore";
import type { UploadedMedia } from "../service/s3Service/workMediaService";

export type Client = {
  id?: string;

  uid: string;

  name: string;

  email: string;
sector?: string;
  logo?: string;
  company:string;

  active: boolean;

  onboarding: boolean;

  role: "client";

  createdAt?: Timestamp;

  updatedAt?: Timestamp;
};

export type ClientRegister = {
  name: string;
  email: string;
  password: string;
};

export type ClientLogin = {
  email: string;
  password: string;
};


export type WorkType ="poster" | "reel";

export type WorkStatus =
  | "sent_to_client"
  | "requested_to_edit"
  | "approved"
  | "rejected";

export interface WorkMedia {
  key: string;
  url: string;
  fileName: string;
  fileType: string;
  size: number;
}

export interface Work {
  id: string;
  clientId: string;
  clientName: string;
  clientLogo?: string;

  postName: string;
  postType: "poster" | "reel" ;

  description: string;
  postingDate: string;

  media: WorkMedia[];

  active: boolean;
  isDisplay: boolean;
  editRequestNote?:string;

  status:
    | "sent_to_client"
    | "approved"
    | "rejected"
    | "requested_to_edit";

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface WorkData {
 
  clientId: string;
  clientName: string;
  clientLogo?: string;

  postName: string;
  postType: "poster" | "reel" | "video" | "link" | "pdf";

  description: string;
  postingDate: string;

  media: WorkMedia[];

  active: boolean;
  isDisplay: boolean;
  editRequestNote?:string;

  status:
    | "sent_to_client"
    | "approved"
    | "rejected"
    | "requested_to_edit";

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
 // adjust path to your S3 service file

export type UploadStatus =
  | "pending"
  | "review"
  | "approved"
  | "completed"
  | "rejected";

// export type ClientUpload = {
//   id?: string;
//   clientId: string;
//   postType: "poster" | "reel" | "pdf" | "link";
//   media?: UploadedMedia[];
//   status: UploadStatus;
//   link?:string;
//   note?: string;
//   caption?: string;
//   createdAt?: Timestamp;
//   updatedAt?: Timestamp;
// };

export type ClientUpload = {
  id?: string;
  clientId: string;

  title?: string;
    description?: string;

  postType: "poster" | "reel" | "pdf" | "link";

  media?: UploadedMedia[];

  status: UploadStatus;

  link?: string;

  note?: string;

  caption?: string;

  createdAt?: Timestamp;

  updatedAt?: Timestamp;
};