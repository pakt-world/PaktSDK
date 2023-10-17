import { ResponseDto } from "../../utils/response";
import { ICollectionDto } from "../collection/collection.dto";

export interface ICollectionBookmarkDto {
  _id?: string;
  owner: string; //TODO :: add IUserDto
  data: ICollectionDto | string;
  active: boolean;
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
  collection: string;
};

export type filterBookmarkDto =
  | {
      page?: string;
      limit?: string;
    }
  | ICollectionBookmarkDto;

export interface BookMarkModuleType {
  getAll(filter?: filterBookmarkDto): Promise<ResponseDto<FindCollectionBookMarkDto>>;
  getById(
    id: string,
    filter?: Record<string, any> | ICollectionBookmarkDto,
  ): Promise<ResponseDto<ICollectionBookmarkDto>>;
  create(payload: createBookMarkDto): Promise<ResponseDto<ICollectionBookmarkDto>>;
  delete(id: string): Promise<ResponseDto<any>>;
}
