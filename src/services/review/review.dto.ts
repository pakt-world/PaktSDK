import { ResponseDto } from "src/utils/response";

export interface AddReviewDto {
  jobId: string;
  rating: number;
  review: string;
}

export interface ReviewModuleType {
  addReview(payload: AddReviewDto): Promise<ResponseDto<void>>;
}
