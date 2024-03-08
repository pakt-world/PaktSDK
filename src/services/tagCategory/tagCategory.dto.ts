import { ResponseDto } from "src/utils";

export interface ITagCategory {
  name: string;
  description: string;
  type: string;
  icon?: string;
  color?: string;
  isParent?: boolean;
  parent: ITagCategory | string;
  categories: ITagCategory[] | string[];
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
  fetchCategories(authToken: string, filter?: FilterTagCategories): Promise<ResponseDto<FindTagCategories>>;
  fetchACategory(authToken: string, id: string): Promise<ResponseDto<ITagCategory>>;
}
