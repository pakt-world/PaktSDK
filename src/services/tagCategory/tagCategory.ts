import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS, ErrorUtils, PAKT_BACKOFF_OPTIONS, ResponseDto, Status, parseUrlWithQuery } from "../../utils";
import { FilterTagCategories, FindTagCategories, ITagCategory, TagCategoriesModule } from "./tagCategory.dto";
import { BackoffOptions } from "../../utils/backOff/options";

@Service({
  factory: (data: { id: string }) => {
    return new TagCategoryModule(data.id);
  },
  transient: true,
})
export class TagCategoryModule implements TagCategoriesModule {
  private id: string;
  private connector: PaktConnector;
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  fetchCategories(props: {
    authToken: string;
    filter?: FilterTagCategories | undefined;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindTagCategories>> {
    const { authToken, filter, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const url = `${API_PATHS.FETCH_CATEGORIES}`;
      const fetchUrl = parseUrlWithQuery(url, filter);
      const response: ResponseDto<FindTagCategories> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
  fetchACategory(props: {
    authToken: string;
    id: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<ITagCategory>> {
    const { authToken, id, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const url = `${API_PATHS.FETCH_CATEGORIES_BY_ID}/${id}`;
      const response: ResponseDto<ITagCategory> = await this.connector.get({ path: url, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
}
