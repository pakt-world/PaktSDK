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

  viewAll(authToken: string, filter?: FilterReviewDto | undefined): Promise<ResponseDto<FindReviewDto>> {
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = parseUrlWithQuery(API_PATHS.GET_REVIEW, filter);

      const response: ResponseDto<FindReviewDto> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  viewAReview(authToken: string, reviewId: string): Promise<ResponseDto<IReviewDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IReviewDto> = await this.connector.get({
        path: `${API_PATHS.GET_REVIEW}${reviewId}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  addReview(authToken: string, payload: AddReviewDto): Promise<ResponseDto<void>> {
    const reviewPayload = { ...payload };
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<void> = await this.connector.post({
        path: API_PATHS.ADD_REVIEW,
        body: reviewPayload,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
