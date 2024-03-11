import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS, ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from "../../utils";
import { FindUserReferrals, IUserReferralStats, UserReferralModule } from "./referrals.dto";

@Service({
  factory: (data: { id: string }) => {
    return new ReferralsModule(data.id);
  },
  transient: true,
})
export class ReferralsModule implements UserReferralModule {
  private id: string;
  private connector: PaktConnector;
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
  }

  fetchUserReferrals(authToken: string, filter?: Record<string, any>): Promise<ResponseDto<FindUserReferrals>> {
    return ErrorUtils.newTryFail(async () => {
      const url = `${API_PATHS.FETCH_USER_REFERRALS}`;
      const fetchUrl = parseUrlWithQuery(url, filter);
      const response: ResponseDto<FindUserReferrals> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  fetchUserReferralsStats(authToken: string): Promise<ResponseDto<IUserReferralStats>> {
    return ErrorUtils.newTryFail(async () => {
      const url = `${API_PATHS.FETCH_USER_REFERRAL_STATS}`;

      const response: ResponseDto<IUserReferralStats> = await this.connector.get({ path: url, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
  sendReferrralsInvite(authToken: string, emails: string[]): Promise<ResponseDto<{}>> {
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<{}> = await this.connector.post({
        path: API_PATHS.SEND_REFERRALS_INVITE,
        body: emails,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });
  }
}
