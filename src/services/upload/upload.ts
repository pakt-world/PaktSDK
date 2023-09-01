import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status } from "../../utils/response";
import { CreateFileUpload, IUploadDto, UploadModuleType } from "./upload.dto";
export * from "./upload.dto";

@Service({
  factory: (data: { id: string }) => {
    return new UploadModule(data.id);
  },
  transient: true,
})
export class UploadModule implements UploadModuleType {
  private id: string;
  private connector: PaktConnector;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  fileUpload(payload: CreateFileUpload): Promise<ResponseDto<IUploadDto>> {
    const credentials = { ...payload };
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IUploadDto> = await this.connector.post({
        path: API_PATHS.FILE_UPLOAD,
        body: credentials,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR)
        throw new Error(response.message);
      return response.data;
    });
  }
}
