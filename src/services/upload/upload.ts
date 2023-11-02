import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import { CreateFileUpload, FilterUploadDto, FindUploadDto, IUploadDto, UploadModuleType } from "./upload.dto";
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

  fileUpload(authToken: string, payload: CreateFileUpload): Promise<ResponseDto<IUploadDto>> {
    const credentials = { ...payload };
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IUploadDto> = await this.connector.post({
        path: API_PATHS.FILE_UPLOAD,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  getFileUploads(authToken: string, filter: FilterUploadDto): Promise<ResponseDto<FindUploadDto>> {
    return ErrorUtils.newTryFail(async () => {
      const theFilter = filter ? filter : {};
      const fetchUrl = parseUrlWithQuery(API_PATHS.FILE_UPLOAD, theFilter);
      const url = filter ? API_PATHS.FILE_UPLOAD : fetchUrl;

      const response: ResponseDto<FindUploadDto> = await this.connector.get({
        path: url,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  getAFileUpload(authToken: string, id: string): Promise<ResponseDto<IUploadDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IUploadDto> = await this.connector.get({
        path: `${API_PATHS.FILE_UPLOAD}${id}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
