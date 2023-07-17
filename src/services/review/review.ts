import { PaktConnector } from "src/connector";
import { API_PATHS } from "src/utils";
import { ErrorUtils, ResponseDto } from "src/utils/response";
import Container, { Service } from "typedi";
import { AddReviewDto, ReviewModuleType } from "./review.dto";

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
      return response.data;
    });
  }
}
