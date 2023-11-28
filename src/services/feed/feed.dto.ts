import { ResponseDto } from "../../utils/response";
import { IUser } from "../auth";
import { ICollectionDto } from "../collection";

export interface IFeed {
  _id: string;
  creator?: string;
  owner?: string;
  owners?: IUser[] | string[];
  data?: ICollectionDto | string;
  description: string;
  title: string;
  type: string;
  isPublic?: boolean;
  closed?: boolean;
  createdAt?: string | Date;
  deletedAt?: string | Date;
  updatedAt?: string | Date;
}

export enum FEED_TYPES_ENUM {
  COLLECTION_INVITE = "collection_invite",
  COLLECTION_INVITE_REJECTED = "collection_invite_rejected",
  COLLECTION_INVITE_ACCEPTED = "collection_invite_accepted",
  COLLECTION_INVITE_CANCELLED = "collection_invite_cancelled",
  COLLECTION_CREATED = "collection_created",
  COLLECTION_UPDATE = "collection_update",
  COLLECTION_DELIVERED = "collection_delivered",
  COLLECTION_CANCELLED = "collection_cancelled",
  COLLECTION_COMPLETED = "collection_completed",
  COLLECTION_REVIEWED = "collection_reviewed",
  PAYMENT_RELEASED = "payment_released",
  REFERRAL_SIGNUP = "referral_signup",
  REFERRAL_COLLECTION_COMPLETION = "referral_job_completion",
}

export type FEED_TYPES =
  | "collection_invite"
  | "collection_invite_rejected"
  | "collection_invite_accepted"
  | "collection_invite_cancelled"
  | "collection_created"
  | "collection_update"
  | "collection_delivered"
  | "collection_cancelled"
  | "collection_completed"
  | "collection_reviewed"
  | "payment_released"
  | "referral_signup"
  | "referral_job_completion";

export interface CreateFeedDto {
  title: string;
  description: string;
  type: FEED_TYPES;
  data: string;
  isPublic: boolean;
  owners?: string[] | string;
}

export type FilterFeedDto = {
  page?: string;
  limit?: string;
  owner?: string;
  type?: FEED_TYPES;
  isOwner?: boolean;
  isPublic?: boolean;
};

export interface FindFeedDto {
  data: IFeed[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface FeedModuleType {
  create(authToken: string, payload: CreateFeedDto): Promise<ResponseDto<{}>>;
  getAll(authToken: string, filter?: FilterFeedDto): Promise<ResponseDto<FindFeedDto>>;
  getById(authToken: string, filterId: string): Promise<ResponseDto<IFeed>>;
  dismissAllFeeds(authToken: string): Promise<ResponseDto<{}>>;
  dismissAFeed(authToken: string, filterId: string): Promise<ResponseDto<{}>>;
}
