import { ResponseDto } from "src/utils/response";

interface JobUser {
  profile: {
    talent: {
      skills: string[];
      availability: string;
      skillIds: object[];
    };
  };
  _id: string;
  firstName: string;
  lastName: string;
  type: string;
  afroScore: number;
}
interface JobDeliverables {
  _id: string;
  job: string;
  content: string;
  completed: boolean;
  stage: number;
  progress: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
interface JobSkills {
  _id: string;
  name: string;
  color: string;
  categories: string[];
  isParent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IJobDto {
  _id: string;
  equity: string;
  status: string;
  payoutStatus: string;
  paymentStatus: string;
  feePayoutStatus: string;
  balanceStatus: string;
  afroScore: number;
  progress: number;
  isCard: boolean;
  deleted: boolean;
  name: string;
  build: string;
  deliveryDate: string;
  earlyBonus: string;
  paymentFee: string;
  description: string;
  latePenaltyFee: string;
  failureFee: string;
  createdAt: string;
  updatedAt: string;
  paymentCoin: string;
  creator: JobUser | string;
  owner: JobUser | string;
  invites: string[];
  applications: string[];
  deliverableIds: JobDeliverables[];
  deliverables: String[];
  category: string;
  skills: string[];
  skillIds: JobSkills[];
  inviteAccepted: boolean;
  isPrivate: boolean;
  recipientCompletedJob: boolean;
  slug: string;
  cancellationReason: string;
  expectedAmount: string;
}

export type CreateJobDto = {
  name: string;
  category: string;
  description: string;
  paymentFee: string;
  isPrivate: boolean;
  deliveryDate: string;
  skills: string[];
  deliverables: string[];
  invites: string[];
};

export type assignJobDto = {
  jobId: string;
  talentId: string;
};

export type FindJobDto = {
  page: number;
  pages: number;
  total: number;
  limit: number;
  jobs: IJobDto[];
};

export type filterDto =
  | ({
      page?: string;
      limit?: string;
    } & IJobDto)
  | any;

export type cancelJobDto = {
  reason: string;
  paymentPercentage: number;
};

export interface JobModuleType {
  create(payload: CreateJobDto): Promise<ResponseDto<IJobDto>>;
  getAll(filter?: filterDto): Promise<ResponseDto<FindJobDto>>;
  getById(id: string, filter?: object): Promise<ResponseDto<IJobDto>>;
  getSaved(filter?: filterDto): Promise<ResponseDto<FindJobDto>>;
  getSuggested(filter?: filterDto): Promise<ResponseDto<FindJobDto>>;
  getInvites(filter?: filterDto): Promise<ResponseDto<FindJobDto>>;
  getRelated(id?: string): Promise<ResponseDto<FindJobDto>>;
}
