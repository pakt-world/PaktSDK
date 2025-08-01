import { BackoffOptions } from "src/utils/backOff/options";
import { ResponseDto } from "../../utils";

export interface ITagCategory {
  name: string;
  description: string;
  type: string;
  icon?: string;
  color?: string;
  isParent?: boolean;
  parent: ITagCategory | string;
  categories: ITagCategory[] | string[];
  entryCount?: number;
}

export interface FindTagCategories {
  data: ITagCategory[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface FilterTagCategories {
  page?: number;
  limt?: number;
  owner?: string;
  type?: string;
  search?: string;
}

export interface TagCategoriesModule {
  fetchCategories(props: {
    authToken: string;
    filter?: FilterTagCategories;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindTagCategories>>;
  fetchACategory(props: {
    authToken: string;
    id: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<ITagCategory>>;
}
