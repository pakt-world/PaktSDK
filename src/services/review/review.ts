import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS, PAKT_BACKOFF_OPTIONS } from "../../utils";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import { AddReviewDto, FilterReviewDto, FindReviewDto, IReviewDto, ReviewModuleType } from "./review.dto";
import { BackoffOptions } from "../../utils/backOff/options";

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
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  viewAll(props: {
    authToken: string;
    filter?: FilterReviewDto | undefined;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindReviewDto>> {
    const { authToken, filter, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const fetchUrl = parseUrlWithQuery(API_PATHS.GET_REVIEW, filter);

      const response: ResponseDto<FindReviewDto> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  viewAReview(props: {
    authToken: string;
    reviewId: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<IReviewDto>> {
    const { authToken, reviewId, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IReviewDto> = await this.connector.get({
        path: `${API_PATHS.GET_REVIEW}${reviewId}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  addReview(props: { authToken: string; payload: AddReviewDto; options?: BackoffOptions }): Promise<ResponseDto<void>> {
    const { authToken, payload, options } = props;
    const reviewPayload = { ...payload };
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<void> = await this.connector.post({
        path: API_PATHS.ADD_REVIEW,
        body: reviewPayload,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
}
