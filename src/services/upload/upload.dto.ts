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
  name: string;
  uploaded_by: UploadedUser | string;
  url: string;
  meta: Record<string, any> | undefined;
  status: boolean;
  deletedAt: Date;
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
  fileUpload(payload: CreateFileUpload): Promise<ResponseDto<IUploadDto>>;
  getFileUploads(filter?: FilterUploadDto): Promise<ResponseDto<FindUploadDto>>;
  getAFileUpload(id: string): Promise<ResponseDto<IUploadDto>>;
}
