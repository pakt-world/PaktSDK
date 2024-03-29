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

export interface CreateFileUpload {
  file: Object;
}

export interface IUploadDto {
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

export interface FindUploadDto {
  count: number;
  pages: number;
  data: IUploadDto[];
}

export type FilterUploadDto =
  | ({
      page?: string;
      limit?: string;
    } & IUploadDto)
  | any;

export interface UploadModuleType {
  fileUpload(authToken: string, payload: CreateFileUpload): Promise<ResponseDto<IUploadDto>>;
  getFileUploads(authToken: string, filter?: FilterUploadDto): Promise<ResponseDto<FindUploadDto>>;
  getAFileUpload(authToken: string, id: string): Promise<ResponseDto<IUploadDto>>;
}
