import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import {
  CollectionSchemaModuleType,
  CreateCollectionSchemaDto,
  FindCollectionSchemaDto,
  ICollectionSchemaDto,
  UpdateCollectionSchemaDto,
  filterCollectionSchemaDto,
} from "./collectionSchema.dto";
import { encryptString } from "../../utils/config";

export * from "./collectionSchema.dto";

@Service({
  factory: (data: { id: string }) => {
    return new CollectionSchemaModule(data.id);
  },
  transient: true,
})
export class CollectionSchemaModule implements CollectionSchemaModuleType {
  private id: string;
  private connector: PaktConnector;
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  async getAll(authToken: string, filter?: filterCollectionSchemaDto): Promise<ResponseDto<FindCollectionSchemaDto>> {
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = parseUrlWithQuery(`${API_PATHS.v2.COLLECTION_SCHEMA.FETCH_MANY}`, filter);
      const response: ResponseDto<FindCollectionSchemaDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async getById(authToken: string, id: string): Promise<ResponseDto<ICollectionSchemaDto>> {
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = `${API_PATHS.v2.COLLECTION_SCHEMA.FETCH_ONE}/${id}`;
      const response: ResponseDto<ICollectionSchemaDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async create(payload: CreateCollectionSchemaDto): Promise<ResponseDto<ICollectionSchemaDto>> {
    const config = this.connector.fetchConfig();
    const encryptedHeader = encryptString(config?.accessToken || "");
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ICollectionSchemaDto> = await this.connector.post({
        path: API_PATHS.SYSTEM_V2.COLLECTION_SCHEMA.CREATE,
        body: payload,
        headers: encryptedHeader,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async update(id: string, payload: UpdateCollectionSchemaDto): Promise<ResponseDto<ICollectionSchemaDto>> {
    const config = this.connector.fetchConfig();
    const encryptedHeader = encryptString(config?.accessToken || "");
    return ErrorUtils.newTryFail(async () => {
      const updateUrl = `${API_PATHS.SYSTEM_V2.COLLECTION_SCHEMA.UPDATE}/${id}`;
      const response: ResponseDto<ICollectionSchemaDto> = await this.connector.patch({
        path: updateUrl,
        body: payload,
        headers: encryptedHeader,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async delete(id: string): Promise<ResponseDto<{}>> {
    const config = this.connector.fetchConfig();
    const encryptedHeader = encryptString(config?.accessToken || "");
    return ErrorUtils.newTryFail(async () => {
      const deleteUrl = `${API_PATHS.SYSTEM_V2.COLLECTION_SCHEMA.DELETE}/${id}`;
      const response: ResponseDto<{}> = await this.connector.delete({
        path: deleteUrl,
        headers: encryptedHeader,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
