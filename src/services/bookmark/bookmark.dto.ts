import { ResponseDto } from "src/utils/response";
import { ICollectionDto } from "../collection/collection.dto";

export interface ICollectionBookmarkDto {
  _id?: string;
  owner: string; //TODO :: add IUserDto
  data: ICollectionDto | string;
  active: boolean;
  isDeleted?: boolean;
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

export type filterDto =
  | ({
    page?: string;
    limit?: string;
  })
  | any;

export interface BookMarkModuleType {
  getAll(filter?: filterDto): Promise<ResponseDto<FindCollectionBookMarkDto>>;
  getById(id: string, filter?: object): Promise<ResponseDto<ICollectionBookmarkDto>>;
  create(payload: createBookMarkDto): Promise<ResponseDto<ICollectionBookmarkDto>>;
  delete(id: string): Promise<ResponseDto<any>>;
}
