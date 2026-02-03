import { ResponseDto } from "../../utils/response";

interface UploadedUser {
  profile: {
    talent: {
      tags: string[];
      availability: string;
      tagsIds: object[];
    };
  };
  _id: string;
  firstName: string;
  lastName: string;
  type: string;
  score: number;
}

export interface ICreateFileDto {
  file: Object;
}

export interface IFileDto {
  _id: string;
  name: string;
  uploaded_by: UploadedUser | string;
  url: string;
  meta: Record<string, any> | undefined;
  status: boolean;
  createdAt?: string | Date;
  deletedAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IFindFileDto {
  count: number;
  pages: number;
  data: IFileDto[];
}

export type IFilterFileDto =
  | ({
      page?: string;
      limit?: string;
    } & IFileDto)
  | any;

export interface FileModuleType {
  fileUpload(authToken: string, payload: ICreateFileDto): Promise<ResponseDto<IFileDto>>;
  getFiles(authToken: string, filter?: IFilterFileDto): Promise<ResponseDto<IFindFileDto>>;
  getFile(authToken: string, id: string): Promise<ResponseDto<IFileDto>>;
}
