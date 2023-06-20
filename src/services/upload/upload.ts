import { PaktConnector } from "src/connector";
import { API_PATHS } from "src/utils/constants";
import { ErrorUtils, ResponseDto } from "src/utils/response";
import Container, { Service } from "typedi";
import { IUploadDto, UploadModuleType } from "./upload.dto";

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

  fileUpload(): Promise<ResponseDto<IUploadDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<IUploadDto> = await this.connector.get({
        path: API_PATHS.FILE_UPLOAD,
      });
      return response.data;
    });
  }
}
