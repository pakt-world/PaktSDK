import { ResponseDto } from "../../utils/response";
import { IUser } from "../auth";
import { IInviteDto } from "../invite";
import { IReviewDto } from "../review";
import { IUploadDto } from "../upload";
import { IWalletDto } from "../wallet";

export interface ICollectionTypeDto {
  _id: string;
  name: string;
  value: string;
  createdAt?: string | Date;
  deletedAt?: string | Date;
  updateAt?: string | Date;
}

export type ICollectionStatus = "ongoing" | "pending" | "deleted" | "waiting" | "cancelled" | "completed";

interface IAttachmentDto {
  _id?: string;
  url?: string;
}
export interface ICollectionDto {
  _id?: string;
  creator: IUser;
  owner?: IUser;
  receiver?: IUser;
  owners?: IUser[];
  name: string;
  description: string;
  type: string;
  build?: string;
  category?: string;
  parent?: ICollectionDto | string;
  collections?: ICollectionDto[] | string[];
  stage?: number;
  image?: IUploadDto;
  invite?: string | IInviteDto;
  invites?: string[] | IInviteDto[];
  applications?: string[]; //TODO:: addd IApplicationDto
  wallet?: string | IWalletDto;
  attachments?: IAttachmentDto[];
  attachmentData?: string[];
  status?: ICollectionStatus;
  inviteAccepted?: boolean;
  isPrivate?: boolean;
  rating?: string | IReviewDto;
  recipientRating?: string | IReviewDto;
  ratings?: string[] | IReviewDto[];
  score?: number;
  progress?: number;
  isDeleted?: boolean;
  charges?: string;
  expectedAmount?: string;
  usdExpectedAmount?: string;
  usdExpectedFee?: string;
  rate?: string;
  cancellationReason?: string;
  completed?: boolean;
  payoutTransactions?: string[];
  failedPayoutCount?: number;
  meta?: Record<string, any>;
  createdAt?: string | Date;
  deletedAt?: string | Date;
  updatedAt?: string | Date;
}

export type CreateCollectionDto = {
  type: string;
  name: string;
  category?: string;
  description: string;
  isPrivate: boolean;
  deliveryDate?: string;
  tags?: string[];
  attachments?: string[];
  meta?: Record<string, any>;
};

export type CreateManyCollectionDto = {
  type: string;
  parent: string;
  collections: {
    name: string;
    description: string;
    isPrivate: boolean;
    category?: string;
    deliveryDate?: string;
    tags?: string[];
    attachments?: string[];
    meta?: Record<string, any>;
  }[];
};

export type assignCollectionDto = {
  collectionId: string;
  talentId: string;
};

export type FindCollectionDto = {
  page: number;
  pages: number;
  total: number;
  limit: number;
  data: ICollectionDto[];
};

export type FindCollectionTypeDto = {
  page: number;
  pages: number;
  total: number;
  limit: number;
  data: ICollectionTypeDto[];
};

export type filterCollectionDto =
  | ({
      page?: string;
      limit?: string;
      receiver?: string;
    } & ICollectionDto)
  | any;

export type cancelCollectionDto = {
  reason: string;
  paymentPercentage: number;
};

//the name & description are required, to update the collection
export interface UpdateCollectionDto {
  type?: string;
  name: string;
  description: string;
  isPrivate?: boolean;
  category?: string | undefined;
  paymentFee?: number | undefined;
  deliveryDate?: string | undefined;
  tags?: string[] | undefined;
  parent?: string;
  image?: string;
  status?: ICollectionStatus;
  attachments?: string[];
  meta?: Record<string, any>;
}

export interface UpdateManyCollectionsDto {
  collections: {
    id: string;
    type?: string;
    name: string;
    description: string;
    isPrivate?: boolean;
    category?: string | undefined;
    paymentFee?: number | undefined;
    deliveryDate?: string | undefined;
    tags?: string[] | undefined;
    parent?: string;
    image?: string;
    status?: ICollectionStatus;
    attachments?: string[];
    meta?: Record<string, any>;
  }[];
}

export interface CollectionModuleType {
  getAll(authToken: string, filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionDto>>;
  getById(authToken: string, id: string): Promise<ResponseDto<ICollectionDto>>;
  getTypes(authToken: string, filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionTypeDto>>;
  getACollectionType(authToken: string, typeId: string): Promise<ResponseDto<ICollectionTypeDto>>;
  create(authToken: string, payload: CreateCollectionDto): Promise<ResponseDto<ICollectionDto>>;
  createMany(authToken: string, payload: CreateManyCollectionDto): Promise<ResponseDto<ICollectionDto[]>>;
  updateCollection(authToken: string, id: string, payload: UpdateCollectionDto): Promise<ResponseDto<{}>>;
  deleteACollection(authToken: string, id: string): Promise<ResponseDto<{}>>;
  updateManyCollections(authToken: string, collections: UpdateManyCollectionsDto): Promise<ResponseDto<{}>>;
}
