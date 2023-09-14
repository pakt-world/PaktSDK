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
  async getAll(filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionDto>> {
    return ErrorUtils.tryFail(async () => {
      const theFilter = filter ? filter : {};
      const fetchUrl = parseUrlWithQuery(API_PATHS.COLLECTION + "/", theFilter);
      const url = filter ? API_PATHS.COLLECTION : fetchUrl;
      const response: ResponseDto<FindCollectionDto> = await this.connector.get({ path: url });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * findall. This method finds all logged User's Jobs both created and assigned.
   * @param filter filterCollectionDto
   */
  async getById(id: string): Promise<ResponseDto<ICollectionDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = API_PATHS.COLLECTION + "/" + id;
      const response: ResponseDto<ICollectionDto> = await this.connector.get({ path: fetchUrl });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * getTypes. This method finds collection types accepted for creating collection
   * @param filter filterDto
   */
  async getTypes(filter?: filterCollectionDto): Promise<ResponseDto<FindCollectionTypeDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = parseUrlWithQuery(API_PATHS.COLLECTION_TYPE, filter);
      const response: ResponseDto<FindCollectionTypeDto> = await this.connector.get({ path: fetchUrl });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  /**
   * create. This method creates a new Job.
   * @param payload CreateCollectionDto
   */
  async create(payload: CreateCollectionDto): Promise<ResponseDto<ICollectionDto>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<ICollectionDto> = await this.connector.post({
        path: API_PATHS.COLLECTION,
        body: credentials,
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
  async createMany(payload: CreateManyCollectionDto): Promise<ResponseDto<ICollectionDto[]>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<ICollectionDto[]> = await this.connector.post({
        path: API_PATHS.COLLECTION,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  updateCollection(id: string, payload: UpdateCollectionDto): Promise<ResponseDto<{}>> {
    return ErrorUtils.tryFail(async () => {
      const query = parseUrlWithQuery(API_PATHS.COLLECTION_UPDATE, { id });
      const credentials = { ...payload };
      const response: ResponseDto<{}> = await this.connector.patch({
        path: query,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  getACollectionType(typeId: string): Promise<ResponseDto<ICollectionTypeDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<ICollectionTypeDto> = await this.connector.get({
        path: API_PATHS.COLLECTION_TYPE + `/${typeId}`,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
}
