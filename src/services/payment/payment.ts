import { Container, Service } from "typedi";
import { PaktConnector } from "../../connector/connector";
import { ResponseDto } from "../../utils/response";
import {
  ICreatePaymentDto,
  IPaymentDataDto,
  IReleasePaymentDto,
  IValidatePaymentDto,
  PaymentModuleType,
} from "./payment.dto";

export * from "./payment.dto";

@Service({
  factory: (data: { id: string }) => {
    return new PaymentModule(data.id);
  },
  transient: true,
})
export class PaymentModule implements PaymentModuleType {
  private id: string;
  private connector: PaktConnector;
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  create(authToken: string, payload: ICreatePaymentDto): Promise<ResponseDto<IPaymentDataDto>> {
    throw new Error("Method not implemented.");
  }

  validate(authToken: string, payload: IValidatePaymentDto): Promise<ResponseDto<{}>> {
    throw new Error("Method not implemented.");
  }

  release(authToken: string, payload: IReleasePaymentDto): Promise<ResponseDto<{}>> {
    throw new Error("Method not implemented.");
  }
}
