import { IUser } from "../auth";

export type fetchAccountDto = {} & IUser;

export type updateUserDto = {
  userName: string;
  profileImage: string;
  profile: {
    contact: {
      country: string;
      state: string;
      city: string;
      address: string;
      phone: string;
    },
    bio: {
      title: string;
      description: string;
    },
    talent: {
      about: string;
      availability: string;
      skills: string[];
    },
    privateEarnings: boolean;
    privateInvestments: boolean;
  },
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    website: string;
  }
}

export type TwoFATypeDto = "google_auth" | "email"

export type TwoFAresponse = {
  type: TwoFATypeDto;
  qrCodeUrl?: string;
  tempToken?: {
    token: string;
    expiresIn: number;
  };
}
