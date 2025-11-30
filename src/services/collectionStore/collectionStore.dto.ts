import { ResponseDto } from "../../utils/response";

export interface ICollectionStoreDto {
  _id: string;
  [key: string]: any;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export type CreateCollectionStoreDto = {
  [key: string]: any;
};

export type UpdateCollectionStoreDto = {
  [key: string]: any;
};

export type FindCollectionStoreDto = {
  page: number;
  pages: number;
  total: number;
  limit: number;
  data: ICollectionStoreDto[];
};

export type filterCollectionStoreDto = {
  page?: string;
  limit?: string;
  [key: string]: any;
};

export interface CollectionStoreModuleType {
  getAll(
    authToken: string,
    schemaReference: string,
    filter?: filterCollectionStoreDto,
  ): Promise<ResponseDto<FindCollectionStoreDto>>;
  getById(authToken: string, schemaReference: string, id: string): Promise<ResponseDto<ICollectionStoreDto>>;
  getCount(authToken: string, schemaReference: string, filter?: filterCollectionStoreDto): Promise<ResponseDto<number>>;
  create(
    authToken: string,
    schemaReference: string,
    payload: CreateCollectionStoreDto,
  ): Promise<ResponseDto<ICollectionStoreDto>>;
  update(
    authToken: string,
    schemaReference: string,
    id: string,
    payload: UpdateCollectionStoreDto,
  ): Promise<ResponseDto<ICollectionStoreDto>>;
  delete(authToken: string, schemaReference: string, id: string): Promise<ResponseDto<{}>>;
}
