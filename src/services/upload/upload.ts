import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import { CreateFileUpload, FilterUploadDto, FindUploadDto, IUploadDto, UploadModuleType } from "./upload.dto";
import { BackoffOptions } from "../../utils/backOff/options";
import { PAKT_BACKOFF_OPTIONS } from "../../utils/token";
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
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  fileUpload(props: {
    authToken: string;
    payload: CreateFileUpload;
    options?: BackoffOptions;
  }): Promise<ResponseDto<IUploadDto>> {
    const { authToken, payload, options } = props;
    const credentials = { ...payload };
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IUploadDto> = await this.connector.post({
        path: API_PATHS.FILE_UPLOAD,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }

  getFileUploads(props: {
    authToken: string;
    filter: FilterUploadDto;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindUploadDto>> {
    const { authToken, filter, options } = props;
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
    }, options || this.configBackOff);
  }
  getAFileUpload(props: {
    authToken: string;
    fileId: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<IUploadDto>> {
    const { authToken, fileId, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IUploadDto> = await this.connector.get({
        path: `${API_PATHS.FILE_UPLOAD}${fileId}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
}
