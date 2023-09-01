import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils";
import { ErrorUtils, ResponseDto, Status } from "../../utils/response";
import { AddReviewDto, ReviewModuleType } from "./review.dto";

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
