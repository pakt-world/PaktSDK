import { ResponseDto } from "src/utils/response";
import { IUser } from "../auth";
import { IUploadDto } from "../upload";

interface ICollectionTypeDto {
  _id: string;
  name: string;
  value: string;
  createdAt?: string;
  updateAt?: string;
}

interface IAttachmentDto {
  _id?: string;
  url?: string;
}
export interface ICollectionDto {
  _id?: string;
  creator: IUser;
  owner?: IUser;
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
  invite?: string; //TODO:: addd ICOllectionInviteDto
  invites?: string[]; //TODO:: addd ICOllectionInviteDto
  applications?: string[]; //TODO:: addd IApplicationDto
  wallet?: string; //TODO:: addd IWalletDto
  attachments?: IAttachmentDto[];
  attachmentData?: string[];
  status?: string;
  inviteAccepted?: boolean;
  isPrivate?: boolean;
  paymentAddress?: string;
  payoutResponse?: string;
  feePayoutResponse?: string;
  paymentWebHook?: string;
  webHookAmount?: string;
  emailToken?: string;
  deliveryDate?: string;
  completedDate?: string;
  rating?: string; //TODO:: addd IRatingDto
  recipientRating?: string; //TODO:: addd IRatingDto
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
}

export type CreateCollectionDto = {
  type: string;
  name: string;
  category?: string;
  description: string;
  isPrivate: boolean;
  paymentFee?: string;
  deliveryDate?: string;
  skills?: string[];
  attachments?: string[];
};

export type CreateManyCollectionDto = {
  type: string;
  parent: string;
  collections: {
    name: string;
    description: string;
    isPrivate: boolean;
    category?: string;
    paymentFee?: string;
    deliveryDate?: string;
    skills?: string[];
    attachments?: string[];
  }[];
};

export type assignCollectionDto = {
  jobId: string;
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

export type filterDto =
  | ({
      page?: string;
      limit?: string;
    } & ICollectionDto)
  | any;

export type cancelJobDto = {
  reason: string;
  paymentPercentage: number;
};

export interface CollectionModuleType {
  getAll(filter?: filterDto): Promise<ResponseDto<FindCollectionDto>>;
  getById(id: string): Promise<ResponseDto<ICollectionDto>>;
  getTypes(filter?: filterDto): Promise<ResponseDto<FindCollectionTypeDto>>;
  create(payload: CreateCollectionDto): Promise<ResponseDto<ICollectionDto>>;
  createMany(payload: CreateManyCollectionDto): Promise<ResponseDto<ICollectionDto[]>>;
}
