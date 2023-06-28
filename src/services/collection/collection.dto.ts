import { ResponseDto } from "src/utils/response";

interface ICollectionTypeDto {
  _id: string;
  name: string;
  value: string;
  createdAt?: string;
  updateAt?: string;
}

export interface ICollectionDto {
  _id?: string;
  creator: string;  //TODO:: addd IUserDto
  owner?: string;  //TODO:: addd IUserDto
  owners?: string[];  //TODO:: addd IUserDto
  name: string;
  description: string;
  type: string;
  build?: string;
  category?: string;
  equity?: string;
  parent?: ICollectionDto | string;
  collections?: ICollectionDto[] | string[];
  stage?: number;
  image?: string; //TODO:: addd IFileDto
  invite?: string;  //TODO:: addd ICOllectionInviteDto
  invites?: string[]; //TODO:: addd ICOllectionInviteDto
  applications?: string[]; //TODO:: addd IApplicationDto
  wallet?: string; //TODO:: addd IWalletDto
  isFreelance?: boolean;
  skillsData?: string[];
  skills?: string[]; //TODO:: addd ICategoryDto
  status?: string;
  inviteAccepted?: boolean;
  payoutStatus?: string;
  paymentStatus?: string;
  feePayoutStatus?: string;
  escrowPaid?: boolean;
  paymentFee?: number;
  earlyBonus?: string;
  latePenaltyFee?: string;
  failureFee?: string;
  encodeKey?: string;
  avaxPrivateKey?: string;
  avaxAddress?: string;
  paymentCoin?: string
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
  recipientCompletedJob?: boolean;
  score?: number;
  progress?: number;
  isDeleted?: boolean;
  charges?: string;
  expectedAmount?: string;
  usdExpectedAmount?: string;
  usdExpectedFee?: string;
  feePercentage?: string;
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
};

export type CreateManyCollectionDto = {
  type: string;
  parent: string
  collections: {
    name: string;
    description: string;
    isPrivate: boolean;
    category?: string;
    paymentFee?: string;
    deliveryDate?: string;
    skills?: string[];
  }[]
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
  getById(id: string, filter?: object): Promise<ResponseDto<ICollectionDto>>;
  getTypes(filter?: filterDto): Promise<ResponseDto<FindCollectionTypeDto>>;
  create(payload: CreateCollectionDto): Promise<ResponseDto<ICollectionDto>>;
  createMany(payload: CreateManyCollectionDto): Promise<ResponseDto<ICollectionDto[]>>;
}
