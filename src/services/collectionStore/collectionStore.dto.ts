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
    props: {
      authToken: string;
      schemaReference: string;
      filter?: filterCollectionStoreDto;
    },
  ): Promise<ResponseDto<FindCollectionStoreDto>>;
  getById(props: {
    authToken: string,
    schemaReference: string,
    id: string,
  }): Promise<ResponseDto<ICollectionStoreDto>>;
  getCount(props: {
    authToken: string,
    schemaReference: string,
    filter?: filterCollectionStoreDto,
  }): Promise<ResponseDto<number>>;
  create(
    props: {
      authToken: string,
      schemaReference: string,
      payload: CreateCollectionStoreDto,
    },
  ): Promise<ResponseDto<ICollectionStoreDto>>;
  update(props: {
    authToken: string,
    schemaReference: string,
    id: string,
    payload: UpdateCollectionStoreDto,
  }): Promise<ResponseDto<ICollectionStoreDto>>;
  delete(props: {
    authToken: string,
    schemaReference: string,
    id: string,
  }): Promise<ResponseDto<{}>>;
}
