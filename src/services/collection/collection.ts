import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, parseUrlWithQuery } from "../../utils/response";
import {
  CreateCollectionDto,
  CreateManyCollectionDto,
  FindCollectionDto,
  FindCollectionTypeDto,
  ICollectionDto,
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
export class CollectionModule {
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
      const fetchUrl = parseUrlWithQuery(API_PATHS.COLLECTION, filter);
      const response: ResponseDto<FindCollectionDto> = await this.connector.get({ path: fetchUrl });
      return response.data;
    });
  }

  /**
   * findall. This method finds all logged User's Jobs both created and assigned.
   * @param filter filterCollectionDto
   */
  async getById(id: string, filter?: filterCollectionDto): Promise<ResponseDto<ICollectionDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = parseUrlWithQuery(API_PATHS.COLLECTION + "/" + id, filter);
      const response: ResponseDto<ICollectionDto> = await this.connector.get({ path: fetchUrl });
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
      return response.data;
    });
  }
}
