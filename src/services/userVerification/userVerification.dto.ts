import { ResponseDto } from "../../utils";
import { expectedISOCountries } from "../../utils/constants";

export type VerificationDocumentTypes =
  | "PASSPORT"
  | "ID_CARD"
  | "RESIDENCE_PERMIT"
  | "DRIVERS_LICENSE"
  | "VISA"
  | "OTHER";

export interface ICreateSessionPayload {
  firstName: string;
  lastName: string;
  gender: "M" | "F";
  country: expectedISOCountries;
  fullAddress: string;
  documentType: VerificationDocumentTypes;
  documentNumber: string;
  dateOfBirth: string;
}

export interface ISendSessionMedia {
  context: "face" | "document-front" | "document-back";
  file: object;
}

export interface IVerification {
  _id: string;
  owner: string;
  sessionID?: string;
  sessionToken?: string;
  verificationID?: string;
  providerCreatedTime?: string;
  type?: string;
  status?: IVerificationStatus;
  verificationMetaData?: Record<string, any>;
  country?: string;
  documentType?: string;
  documentValidFrom?: string;
  documentValidUntil?: string;
  providerReason?: string;
  providerReasonCode?: number;
  mediaId?: string;
  mediaMimeType?: string;
  mediaUrl?: string;
  createdAt?: string | Date;
  deletedAt?: string | Date;
  updatedAt?: string | Date;
}

export type IVerificationStatus =
  | "created"
  | "approved"
  | "resubmission_requested"
  | "declined"
  | "expired"
  | "abandoned"
  | "submitted"
  | "review";

export interface CreateSessionResponse {
  status: string;
  verification: {
    id: string;
    url: string;
    vendorData: string;
    host: string;
    status: IVerificationStatus;
    sessionToken: string;
  };
}

export interface SendSessionMediaResponse {
  status: string;
  image: {
    context: "face" | "document-front" | "document-back";
    id: string;
    name: string;
    timestamp: null;
    size: number;
    mimetype: string;
    url: string;
  };
}

export interface SessionAttempts {
  status: "success";
  verifications: IVerification[];
}

export interface UserVerificationModuleType {
  createSession(authToken: string, payload: ICreateSessionPayload): Promise<ResponseDto<CreateSessionResponse>>;
  sendSessionMedia(authToken: string, payload: ISendSessionMedia): Promise<ResponseDto<SendSessionMediaResponse>>;
  getSessionAttempts(authToken: string): Promise<ResponseDto<SessionAttempts>>;
  getUserVerifications(authToken: string): Promise<ResponseDto<IVerification[]>>;
}
