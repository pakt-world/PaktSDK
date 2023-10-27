import { ResponseDto } from "../../utils/response";
import { IUser } from "../auth";
import { ICollectionDto } from "../collection/collection.dto";
import { IFeed } from "../feed";
import { IInviteDto } from "../invite";

export interface ICollectionBookmarkDto {
  _id?: string;
  owner?: IUser | string;
  data?: ICollectionDto | string;
  feed?: IFeed;
  invite?: IInviteDto;
  user?: IUser;
  type?: BookmarkType;
  active?: boolean;
  isDeleted?: boolean;
  createdAt?: string | Date;
  deletedAt?: string | Date;
  updatedAt?: string | Date;
}
export type FindCollectionBookMarkDto = {
  page: number;
  pages: number;
  total: number;
  limit: number;
  data: ICollectionBookmarkDto[];
};

export type createBookMarkDto = {
  reference: string;
  type: BookmarkType;
};

export type filterBookmarkDto =
  | {
      page?: string;
      limit?: string;
    }
  | ICollectionBookmarkDto
  | Record<string, any>;

export enum BookmarkEnumType {
  FEED = "feed",
  COLLECTION = "collection",
  INVITE = "invite",
  USER = "user",
}

export type BookmarkType = "feed" | "collection" | "invite" | "user";

export interface BookMarkModuleType {
  getAll(filter?: filterBookmarkDto): Promise<ResponseDto<FindCollectionBookMarkDto>>;
  getById(
    id: string,
    filter?: Record<string, any> | ICollectionBookmarkDto,
  ): Promise<ResponseDto<ICollectionBookmarkDto>>;
  create(payload: createBookMarkDto): Promise<ResponseDto<ICollectionBookmarkDto>>;
  delete(id: string): Promise<ResponseDto<any>>;
}
