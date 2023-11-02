import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import {
  FindCollectionBookMarkDto,
  ICollectionBookmarkDto,
  createBookMarkDto,
  filterBookmarkDto,
} from "./bookmark.dto";

// Export all Types to Service
export * from "./bookmark.dto";

@Service({
  factory: (data: { id: string }) => {
    return new BookMarkModule(data.id);
  },
  transient: true,
})
export class BookMarkModule {
  private id: string;
  private connector: PaktConnector;
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  /**
   * findall. This method finds all logged User's Bookmark collections.
   * @param filter filterBookmarkDto
   */
  async getAll(authToken: string, filter?: filterBookmarkDto): Promise<ResponseDto<FindCollectionBookMarkDto>> {
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = parseUrlWithQuery(API_PATHS.BOOKMARK, filter);
      const response: ResponseDto<FindCollectionBookMarkDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  /**
   * findall. This method finds bookmarked collection by id.
   * @param filter Record<string, any> | ICollectionBookmarkDto
   */
  async getById(
    authToken: string,
    id: string,
    filter?: Record<string, any> | ICollectionBookmarkDto,
  ): Promise<ResponseDto<ICollectionBookmarkDto>> {
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = parseUrlWithQuery(API_PATHS.BOOKMARK + "/" + id, filter);
      const response: ResponseDto<ICollectionBookmarkDto> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  /**
   * create. This method creates a new collection bookmark.
   * @param payload createBookMarkDto
   */
  async create(authToken: string, payload: createBookMarkDto): Promise<ResponseDto<ICollectionBookmarkDto>> {
    return ErrorUtils.newTryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<ICollectionBookmarkDto> = await this.connector.post({
        path: API_PATHS.BOOKMARK,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  /**
   * delete. This method deleted a collection bookmark.
   * @param payload is, the bookmark id
   */
  async delete(authToken: string, id: string): Promise<ResponseDto<ICollectionBookmarkDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<ICollectionBookmarkDto> = await this.connector.delete({
        path: API_PATHS.BOOKMARK + "/" + id,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
