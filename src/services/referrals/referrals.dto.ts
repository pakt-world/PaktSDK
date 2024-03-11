import { ResponseDto } from "src/utils";
import { IUser } from "../auth";

type IReferralProgramType = "unlimited" | "expiring" | "time_period_reset" | "conditional" | "system" | "limited";

export interface IReferralProgram {
  title: string;
  description: string;
  numberOfReferrals: string;
  invitationCap: string;
  code: string;
  type: IReferralProgramType;
  link: string;
  expiresAt: string;
  timeframe: string;
  status: boolean;
  isSystem: boolean;
  isAdminInvite: boolean;
  counts?: number;
  numberOfDays?: number;
  conditional?: string;
}

type IReferralProgramConditional = "referral" | "five_star_collection_completion";

export interface IUserReferrals {
  referralId: IReferralProgram | string;
  userId: IUser | string;
  referral: IUser | string;
  conditional: IReferralProgramConditional;
  completedGig: boolean;
  status: boolean;
  referred_at: string;
  type: IReferralProgramType;
}

export interface FindUserReferrals extends IUserReferrals {
  data: IUserReferrals[];
  referralMessage: string;
  pages: number;
  total: number;
  limit: number;
}

export interface IUserReferralStats {
  referralLink: string;
  totalAllowedInvites: number | string;
  inviteSent: number | string;
}

export interface UserReferralModule {
  fetchUserReferrals(
    authToken: string,
    filter?: { page?: number; limit?: number } & Record<string, any>,
  ): Promise<ResponseDto<FindUserReferrals>>;
  fetchUserReferralsStats(authToken: string): Promise<ResponseDto<IUserReferralStats>>;
  sendReferrralsInvite(authToken: string, emails: string[]): Promise<ResponseDto<{}>>;
}
