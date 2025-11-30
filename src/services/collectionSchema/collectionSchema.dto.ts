import { ResponseDto } from "../../utils/response";

export interface FieldDefinitionDto {
  name: string;
  type: string;
  required: boolean;
  unique: boolean;
  default: string;
}

export interface ICollectionSchemaDto {
  _id: string;
  name: string;
  reference: string;
  description: string;
  schema: FieldDefinitionDto[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export type CreateCollectionSchemaDto = {
  name: string;
  description: string;
  schema: FieldDefinitionDto[];
};

export type UpdateCollectionSchemaDto = {
  description?: string;
  schema?: FieldDefinitionDto[];
};

export type FindCollectionSchemaDto = {
  page: number;
  pages: number;
  total: number;
  limit: number;
  data: ICollectionSchemaDto[];
};

export type filterCollectionSchemaDto = {
  page?: string;
  limit?: string;
  name?: string;
};

export interface CollectionSchemaModuleType {
  getAll(authToken: string, filter?: filterCollectionSchemaDto): Promise<ResponseDto<FindCollectionSchemaDto>>;
  getById(authToken: string, id: string): Promise<ResponseDto<ICollectionSchemaDto>>;
  create(payload: CreateCollectionSchemaDto): Promise<ResponseDto<ICollectionSchemaDto>>;
  update(id: string, payload: UpdateCollectionSchemaDto): Promise<ResponseDto<ICollectionSchemaDto>>;
  delete(id: string): Promise<ResponseDto<{}>>;
}
