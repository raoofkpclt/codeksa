import { Timestamp } from "firebase/firestore";


export type Client = {
  id?: string;

  uid: string;

  name: string;

  email: string;

  logo?: string;

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


export type WorkType = "poster" | "reel";

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
  id?: string;

  clientId: string;
  clientName: string;

  postType: WorkType;

  postName: string;
  description: string;

  postingDate: string;

  media: WorkMedia[];

  status: WorkStatus;

  active: boolean;
  editRequestNote?: string;

  createdAt?: any;
  updatedAt?: any;
}