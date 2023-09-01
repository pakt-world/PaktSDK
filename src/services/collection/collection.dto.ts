import { ResponseDto } from "../../utils/response";
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
  invite?: string; //TODO:: addd ICollectionInviteDto
  invites?: string[]; //TODO:: addd ICollectionInviteDto
  applications?: string[]; //TODO:: addd IApplicationDto
  wallet?: string; //TODO:: addd IWalletDto
  attachments?: IAttachmentDto[];
  attachmentData?: string[];
  status?: string;
  inviteAccepted?: boolean;
  isPrivate?: boolean;
  emailToken?: string;
  rating?: string; //TODO:: add IRatingDto
  recipientRating?: string; //TODO:: add IRatingDto
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
  deliveryDate?: string;
  tags?: string[];
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
    deliveryDate?: string;
    tags?: string[];
    attachments?: string[];
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
    } & ICollectionDto)
  | any;

export type cancelCollectionDto = {
  reason: string;
  paymentPercentage: number;
};

export type UpdateCollectionDto = {
  type: string;
  name: string;
  description: string;
  isPrivate: boolean;
  category?: string | undefined;
  paymentFee?: number | undefined;
  deliveryDate?: string | undefined;
  tags?: string[] | undefined;
  deliverables?: string[] | undefined;
  invites?: string[] | undefined;
  parent?: string;
  image?: string;
};

export interface CollectionModuleType {
  getAll(filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionDto>>;
  getById(id: string): Promise<ResponseDto<ICollectionDto>>;
  getTypes(filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionTypeDto>>;
  create(payload: CreateCollectionDto): Promise<ResponseDto<ICollectionDto>>;
  createMany(payload: CreateManyCollectionDto): Promise<ResponseDto<ICollectionDto[]>>;
  updateCollection(id: string, payload: UpdateCollectionDto): Promise<ResponseDto<{}>>;
}
