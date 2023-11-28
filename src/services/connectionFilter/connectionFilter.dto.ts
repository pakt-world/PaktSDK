import { ResponseDto } from "../../utils";

export type IConnectionKeys = "tags" | "tagCount" | "afroScore";

export type IConnectionFilterDecider = "greater_than" | "less_than" | "equal_to" | "contains" | "between";

export type IConnectionEvents = "CREATE_CONVERSATION";

export interface IConnectionFilter {
  _id?: string;
  event: IConnectionEvents;
  key: IConnectionKeys;
  value: string | number | string[];
  decider: IConnectionFilterDecider;
  createdAt?: string | Date;
  deletedAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ConnectionFilterModuleType {
  create(authToken: string, payload: IConnectionFilter): Promise<ResponseDto<IConnectionFilter>>;
  getForAUser(authToken: string): Promise<ResponseDto<IConnectionFilter>>;
  update(authToken: string, payload: IConnectionFilter): Promise<ResponseDto<IConnectionFilter>>;
}
