import { ResponseDto } from "../../utils";

export type IConnectionKeys = "tags" | "tagCount" | "afroScore";

export type IConnectionFilterDecider = "greater_than" | "less_than" | "equal_to" | "contains" | "between";

export type IConnectionEvents = "CREATE_CONVERSATION" | "CREATE_JOB" | "ASSIGN_JOB";

export interface IConnectionFilter {
  _id: string;
  event: IConnectionEvents;
  key: IConnectionKeys;
  value: any;
  decider: IConnectionFilterDecider;
  createdAt?: string | Date;
  deletedAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ConnectionFilterModuleType {
  create(payload: IConnectionFilter): Promise<ResponseDto<IConnectionFilter>>;
  getForAUser(): Promise<ResponseDto<IConnectionFilter>>;
  update(payload: IConnectionFilter): Promise<ResponseDto<IConnectionFilter>>;
}
