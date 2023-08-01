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
  uploaded_by: UploadedUser;
  url: string;
  meta: Record<string, any> | undefined;
  status: boolean;
  deletedAt: Date;
}

export interface UploadModuleType {
  fileUpload(payload: CreateFileUpload): Promise<ResponseDto<IUploadDto>>;
}
