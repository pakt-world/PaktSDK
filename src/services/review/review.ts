import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import { AddReviewDto, FilterReviewDto, FindReviewDto, IReviewDto, ReviewModuleType } from "./review.dto";

export * from "./review.dto";

@Service({
  factory: (data: { id: string }) => {
    return new ReviewModule(data.id);
  },
  transient: true,
})
export class ReviewModule implements ReviewModuleType {
  private id: string;
  private connector: PaktConnector;
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  viewAll(filter?: FilterReviewDto | undefined): Promise<ResponseDto<FindReviewDto>> {
    return ErrorUtils.tryFail(async () => {
      const theFilter = filter ? filter : {};
      const fetchUrl = parseUrlWithQuery(API_PATHS.GET_REVIEW, theFilter);
      const url = filter ? API_PATHS.GET_REVIEW : fetchUrl;

      const response: ResponseDto<FindReviewDto> = await this.connector.get({
        path: url,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  viewAReview(reviewId: string): Promise<ResponseDto<IReviewDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IReviewDto> = await this.connector.get({
        path: `${API_PATHS.GET_REVIEW}${reviewId}`,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }

  addReview(payload: AddReviewDto): Promise<ResponseDto<void>> {
    const reviewPayload = { ...payload };
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<void> = await this.connector.post({
        path: API_PATHS.ADD_REVIEW,
        body: reviewPayload,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
}
