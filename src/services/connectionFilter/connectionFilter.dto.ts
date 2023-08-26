import { ResponseDto } from "../../utils";

export type IConnectionKeys = "tags" | "tagCount" | "afroScore";

export type IConnectionFilterDecider = "greater_than" | "less_than" | "equal_to" | "contains" | "between";

export interface IConnectionFilter {
  owner: string;
  event: string;
  key: IConnectionKeys;
  value: any;
  decider: IConnectionFilterDecider;
}

export interface ConnectionFilterModuleType {
  create(payload: IConnectionFilter): Promise<ResponseDto<IConnectionFilter>>;
  update(payload: IConnectionFilter): Promise<ResponseDto<IConnectionFilter>>;
  getForAUser(): Promise<ResponseDto<IConnectionFilter>>;
}
