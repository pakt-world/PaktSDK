import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import {
  CollectionModuleType,
  CreateCollectionDto,
  CreateManyCollectionDto,
  FindCollectionDto,
  FindCollectionTypeDto,
  ICollectionDto,
  ICollectionTypeDto,
  UpdateCollectionDto,
  UpdateManyCollectionsDto,
  filterCollectionDto,
} from "./collection.dto";
import { BackoffOptions } from "../../utils/backOff/options";
import { PAKT_BACKOFF_OPTIONS } from "../../utils/token";

// Export all Types to Service
export * from "./collection.dto";

@Service({
  factory: (data: { id: string }) => {
    return new CollectionModule(data.id);
  },
  transient: true,
})
export class CollectionModule implements CollectionModuleType {
  private id: string;
  private connector: PaktConnector;
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  /**
   * findall. This method finds all logged User's Jobs both created and assigned.
   * @param filter filterDto
   */
  async getAll(props: {
    authToken: string;
    filter?: filterCollectionDto;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindCollectionDto>> {
    const { filter, authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = parseUrlWithQuery(`${API_PATHS.COLLECTION}`, filter);
      const response: ResponseDto<FindCollectionDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  /**
   * findall. This method finds all logged User's Jobs both created and assigned.
   * @param filter filterCollectionDto
   */
  async getById(props: {
    authToken: string;
    id: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<ICollectionDto>> {
    const { authToken, id, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = API_PATHS.COLLECTION + "/" + id;
      const response: ResponseDto<ICollectionDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options);
  }

  /**
   * getTypes. This method finds collection types accepted for creating collection
   * @param filter filterDto
   */
  async getTypes(props: {
    authToken: string;
    filter?: filterCollectionDto;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindCollectionTypeDto>> {
    const { authToken, filter, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = parseUrlWithQuery(API_PATHS.COLLECTION_TYPE, filter);
      const response: ResponseDto<FindCollectionTypeDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  /**
   * create. This method creates a new Job.
   * @param payload CreateCollectionDto
   */
  async create(props: {
    authToken: string;
    payload: CreateCollectionDto;
    options: BackoffOptions;
  }): Promise<ResponseDto<ICollectionDto>> {
    const { authToken, payload, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<ICollectionDto> = await this.connector.post({
        path: API_PATHS.COLLECTION,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  /**
   * createMany. This method creates multiple collections for a type
   * @param filter CreateManyCollectionDto
   */
  async createMany(props: {
    authToken: string;
    payload: CreateManyCollectionDto;
    options?: BackoffOptions;
  }): Promise<ResponseDto<ICollectionDto[]>> {
    const { authToken, payload, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<ICollectionDto[]> = await this.connector.post({
        path: API_PATHS.COLLECTION,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options);
  }

  updateCollection(props: {
    authToken: string;
    id: string;
    payload: UpdateCollectionDto;
    options?: BackoffOptions;
  }): Promise<ResponseDto<{}>> {
    const { id, payload, options, authToken } = props;
    return ErrorUtils.newTryFail(async () => {
      const query = `${API_PATHS.COLLECTION_UPDATE}/${id}`;
      const credentials = { ...payload };
      const response: ResponseDto<{}> = await this.connector.patch({
        path: query,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  getACollectionType(props: {
    authToken: string;
    typeId: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<ICollectionTypeDto>> {
    const { authToken, typeId, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = parseUrlWithQuery(`${API_PATHS.COLLECTION_TYPE}/${typeId}`, { id: typeId });
      const response: ResponseDto<ICollectionTypeDto> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  deleteACollection(props: {
    authToken: string;
    collectionId: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<{}>> {
    const { authToken, collectionId, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ICollectionTypeDto> = await this.connector.delete({
        path: `${API_PATHS.COLLECTION}/${collectionId}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  updateManyCollections(props: {
    authToken: string;
    collections: UpdateManyCollectionsDto;
    options?: BackoffOptions;
  }): Promise<ResponseDto<{}>> {
    const { authToken, collections, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ICollectionTypeDto> = await this.connector.patch({
        path: `${API_PATHS.COLLECTION}/many/update`,
        body: { collections },
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
}
