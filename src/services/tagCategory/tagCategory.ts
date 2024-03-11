import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS, ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils";
import { FilterTagCategories, FindTagCategories, ITagCategory, TagCategoriesModule } from "./tagCategory.dto";

@Service({
  factory: (data: { id: string }) => {
    return new TagCategoryModule(data.id);
  },
  transient: true,
})
export class TagCategoryModule implements TagCategoriesModule {
  private id: string;
  private connector: PaktConnector;
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  fetchCategories(
    authToken: string,
    filter?: FilterTagCategories | undefined,
  ): Promise<ResponseDto<FindTagCategories>> {
    return ErrorUtils.newTryFail(async () => {
      const url = `${API_PATHS.FETCH_CATEGORIES}`;
      const fetchUrl = parseUrlWithQuery(url, filter);
      const response: ResponseDto<FindTagCategories> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  fetchACategory(authToken: string, id: string): Promise<ResponseDto<ITagCategory>> {
    return ErrorUtils.newTryFail(async () => {
      const url = `${API_PATHS.FETCH_CATEGORIES_BY_ID}/${id}`;
      const response: ResponseDto<ITagCategory> = await this.connector.get({ path: url, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
