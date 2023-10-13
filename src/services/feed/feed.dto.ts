import { ResponseDto } from "../../utils/response";
import { IUser } from "../auth";
import { ICollectionDto } from "../collection";

export interface IFeed {
  creator?: string;
  owner?: string;
  owners?: IUser[] | string[];
  data?: ICollectionDto | string;
  description: string;
  title: string;
  type: string;
  isPublic?: boolean;
  closed?: boolean;
}

export interface CreateFeedDto {
  title: string;
  description: string;
  type: string;
  data: string;
  isPublic: boolean;
  owners?: string[];
}

export type FilterFeedDto =
  | ({
      page?: string;
      limit?: string;
    } & IFeed)
  | any;

export interface FindFeedDto {
  data: IFeed[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface FeedModuleType {
  create(payload: CreateFeedDto): Promise<ResponseDto<{}>>;
  getAll(filter?: FilterFeedDto): Promise<ResponseDto<FindFeedDto>>;
  getById(filterId: string): Promise<ResponseDto<IFeed>>;
  dismissAllFeeds(): Promise<ResponseDto<{}>>;
  dismissAFeed(filterId: string): Promise<ResponseDto<{}>>;
}
