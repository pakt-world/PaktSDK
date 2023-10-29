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
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  /**
   * findall. This method finds all logged User's Jobs both created and assigned.
   * @param filter filterDto
   */
  async getAll(authToken: string, filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = parseUrlWithQuery(`${API_PATHS.COLLECTION}/`, filter);
      const response: ResponseDto<FindCollectionDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * findall. This method finds all logged User's Jobs both created and assigned.
   * @param filter filterCollectionDto
   */
  async getById(authToken: string, id: string): Promise<ResponseDto<ICollectionDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = API_PATHS.COLLECTION + "/" + id;
      const response: ResponseDto<ICollectionDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * getTypes. This method finds collection types accepted for creating collection
   * @param filter filterDto
   */
  async getTypes(authToken: string, filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionTypeDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = parseUrlWithQuery(API_PATHS.COLLECTION_TYPE, filter);
      const response: ResponseDto<FindCollectionTypeDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * create. This method creates a new Job.
   * @param payload CreateCollectionDto
   */
  async create(authToken: string, payload: CreateCollectionDto): Promise<ResponseDto<ICollectionDto>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<ICollectionDto> = await this.connector.post({
        path: API_PATHS.COLLECTION,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * createMany. This method creates multiple collections for a type
   * @param filter CreateManyCollectionDto
   */
  async createMany(authToken: string, payload: CreateManyCollectionDto): Promise<ResponseDto<ICollectionDto[]>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<ICollectionDto[]> = await this.connector.post({
        path: API_PATHS.COLLECTION,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  updateCollection(authToken: string, id: string, payload: UpdateCollectionDto): Promise<ResponseDto<{}>> {
    return ErrorUtils.tryFail(async () => {
      const query = `${API_PATHS.COLLECTION_UPDATE}/${id}`;
      const credentials = { ...payload };
      const response: ResponseDto<{}> = await this.connector.patch({
        path: query,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  getACollectionType(authToken: string, typeId: string): Promise<ResponseDto<ICollectionTypeDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = parseUrlWithQuery(`${API_PATHS.COLLECTION_TYPE}/${typeId}`, { id: typeId });
      const response: ResponseDto<ICollectionTypeDto> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  deleteACollection(authToken: string, collectionId: string): Promise<ResponseDto<{}>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<ICollectionTypeDto> = await this.connector.delete({
        path: `${API_PATHS.COLLECTION}/${collectionId}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  updateManyCollections(authToken: string, collections: UpdateManyCollectionsDto): Promise<ResponseDto<{}>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<ICollectionTypeDto> = await this.connector.patch({
        path: `${API_PATHS.COLLECTION}/many/update`,
        body: { collections },
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
}
