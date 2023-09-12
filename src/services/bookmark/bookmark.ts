import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, parseUrlWithQuery } from "../../utils/response";
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
  async getAll(filter?: filterBookmarkDto): Promise<ResponseDto<FindCollectionBookMarkDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = parseUrlWithQuery(API_PATHS.BOOKMARK, filter);
      const response: ResponseDto<FindCollectionBookMarkDto> = await this.connector.get({ path: fetchUrl });
      return response.data;
    });
  }

  /**
   * findall. This method finds bookmarked collection by id.
   * @param filter Record<string, any> | ICollectionBookmarkDto
   */
  async getById(
    id: string,
    filter?: Record<string, any> | ICollectionBookmarkDto,
  ): Promise<ResponseDto<ICollectionBookmarkDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = parseUrlWithQuery(API_PATHS.BOOKMARK + "/" + id, filter);
      const response: ResponseDto<ICollectionBookmarkDto> = await this.connector.get({ path: fetchUrl });
      return response.data;
    });
  }

  /**
   * create. This method creates a new collection bookmark.
   * @param payload createBookMarkDto
   */
  async create(payload: createBookMarkDto): Promise<ResponseDto<ICollectionBookmarkDto>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<ICollectionBookmarkDto> = await this.connector.post({
        path: API_PATHS.BOOKMARK,
        body: credentials,
      });
      return response.data;
    });
  }

  /**
   * delete. This method deleted a collection bookmark.
   * @param payload is, the bookmark id
   */
  async delete(id: string): Promise<ResponseDto<ICollectionBookmarkDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<ICollectionBookmarkDto> = await this.connector.delete({
        path: API_PATHS.BOOKMARK + "/" + id,
      });
      return response.data;
    });
  }
}
