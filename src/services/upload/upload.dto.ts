import { ResponseDto } from "src/utils/response";

interface UploadedUser {
  profile: {
    talent: {
      skills: string[];
      availability: string;
      skillIds: object[];
    };
  };
  _id: string;
  firstName: string;
  lastName: string;
  type: string;
  afroScore: number;
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
  fileUpload(): Promise<ResponseDto<IUploadDto>>;
}
