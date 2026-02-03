import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils/response";
import { ICreateFileDto, IFilterFileDto, IFindFileDto, IFileDto, FileModuleType } from "./file.dto";
export * from "./file.dto";

@Service({
  factory: (data: { id: string }) => {
    return new FileModule(data.id);
  },
  transient: true,
})
export class FileModule implements FileModuleType {
  private id: string;
  private connector: PaktConnector;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  fileUpload(authToken: string, payload: ICreateFileDto): Promise<ResponseDto<IFileDto>> {
    const credentials = { ...payload };
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IFileDto> = await this.connector.post({
        path: API_PATHS.v1.FILE_UPLOAD,
        body: credentials,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }

  getFiles(authToken: string, filter: IFilterFileDto): Promise<ResponseDto<IFindFileDto>> {
    return ErrorUtils.newTryFail(async () => {
      const theFilter = filter ? filter : {};
      const fetchUrl = parseUrlWithQuery(API_PATHS.v1.FILE_UPLOAD, theFilter);

      const response: ResponseDto<IFindFileDto> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  getFile(authToken: string, id: string): Promise<ResponseDto<IFileDto>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<IFileDto> = await this.connector.get({
        path: `${API_PATHS.v1.FILE_UPLOAD}${id}`,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
