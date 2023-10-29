import { ResponseDto } from "../../utils/response";
import { IUser } from "../auth";
import { ICollectionDto } from "../collection";

export interface AddReviewDto {
  collectionId: string;
  rating: number;
  review: string;
  receiver: string;
}

export interface FindReviewDto {
  count: number;
  pages: number;
  data: IReviewDto[];
}

export type FilterReviewDto =
  | ({
      page?: string;
      limit?: string;
    } & IReviewDto)
  | any;

export interface IReviewDto {
  _id: string;
  data: ICollectionDto;
  owner: IUser | string;
  receiver: IUser | string;
  type: string;
  review: string;
  rating: number;
  createdAt?: string | Date;
  deletedAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ReviewModuleType {
  addReview(authToken: string, payload: AddReviewDto): Promise<ResponseDto<void>>;
  viewAll(authToken: string, filter?: FilterReviewDto): Promise<ResponseDto<FindReviewDto>>;
  viewAReview(authToken: string, reviewId: string): Promise<ResponseDto<IReviewDto>>;
}
