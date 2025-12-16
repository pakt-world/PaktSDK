import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import {
  CollectionStoreModuleType,
  CreateCollectionStoreDto,
  FindCollectionStoreDto,
  ICollectionStoreDto,
  UpdateCollectionStoreDto,
  filterCollectionStoreDto,
} from "./collectionStore.dto";

export * from "./collectionStore.dto";

@Service({
  factory: (data: { id: string }) => {
    return new CollectionStoreModule(data.id);
  },
  transient: true,
})
export class CollectionStoreModule implements CollectionStoreModuleType {
  private id: string;
  private connector: PaktConnector;
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  async getAll(
    props: {
      authToken: string,
      schemaReference: string,
      filter?: filterCollectionStoreDto,
    }): Promise<ResponseDto<FindCollectionStoreDto>> {
    const {authToken, schemaReference, filter } = props;
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = parseUrlWithQuery(`${API_PATHS.v2.COLLECTION_STORE}/${schemaReference}`, filter);
      const response: ResponseDto<FindCollectionStoreDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async getById(props: {authToken: string, schemaReference: string, id: string}): Promise<ResponseDto<ICollectionStoreDto>> {
    const {authToken, schemaReference, id } = props;
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = `${API_PATHS.v2.COLLECTION_STORE}/${schemaReference}/${id}`;
      const response: ResponseDto<ICollectionStoreDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async getCount(
    props: {
      authToken: string,
      schemaReference: string,
      filter?: filterCollectionStoreDto,
    }): Promise<ResponseDto<number>> {
    const {authToken, schemaReference, filter } = props;
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = parseUrlWithQuery(`${API_PATHS.v2.COLLECTION_STORE}/${schemaReference}/count`, filter);
      const response: ResponseDto<number> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async create(
    props: {
      authToken: string,
      schemaReference: string,
      payload: CreateCollectionStoreDto,
    }): Promise<ResponseDto<ICollectionStoreDto>> {
    const {authToken, schemaReference, payload } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ICollectionStoreDto> = await this.connector.post({
        path: `${API_PATHS.v2.COLLECTION_STORE}/${schemaReference}`,
        body: payload,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async update(
    props: {
      authToken: string,
      schemaReference: string,
      id: string,
      payload: UpdateCollectionStoreDto,
    }): Promise<ResponseDto<ICollectionStoreDto>> {
    const {authToken, id, schemaReference, payload } = props;
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = `${API_PATHS.v2.COLLECTION_STORE}/${schemaReference}/${id}`;
      const response: ResponseDto<ICollectionStoreDto> = await this.connector.patch({
        path: fetchUrl,
        body: payload,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  async delete(props: { authToken: string, schemaReference: string, id: string }): Promise<ResponseDto<{}>> {
    const { authToken, schemaReference, id } = props;
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = `${API_PATHS.v2.COLLECTION_STORE}/${schemaReference}/${id}`;
      const response: ResponseDto<{}> = await this.connector.delete({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
