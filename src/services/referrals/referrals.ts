import Container, { Service } from "typedi";
import { PaktConnector } from "../../connector";
import { API_PATHS, ErrorUtils, PAKT_BACKOFF_OPTIONS, ResponseDto, Status, parseUrlWithQuery } from "../../utils";
import { FindUserReferrals, IUserReferralStats, UserReferralModule } from "./referrals.dto";
import { BackoffOptions } from "../../utils/backOff/options";

@Service({
  factory: (data: { id: string }) => {
    return new ReferralsModule(data.id);
  },
  transient: true,
})
export class ReferralsModule implements UserReferralModule {
  private id: string;
  private connector: PaktConnector;
  private configBackOff: BackoffOptions;

  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector);
    this.configBackOff = Container.of(this.id).get(PAKT_BACKOFF_OPTIONS);
  }

  fetchUserReferrals(props: {
    authToken: string;
    filter?: Record<string, any>;
    options?: BackoffOptions;
  }): Promise<ResponseDto<FindUserReferrals>> {
    const { authToken, filter, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const url = `${API_PATHS.FETCH_USER_REFERRALS}`;
      const fetchUrl = parseUrlWithQuery(url, filter);
      const response: ResponseDto<FindUserReferrals> = await this.connector.get({ path: fetchUrl, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
  fetchUserReferralsStats(props: {
    authToken: string;
    options?: BackoffOptions;
  }): Promise<ResponseDto<IUserReferralStats>> {
    const { authToken, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const url = `${API_PATHS.FETCH_USER_REFERRAL_STATS}`;

      const response: ResponseDto<IUserReferralStats> = await this.connector.get({ path: url, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options || this.configBackOff);
  }
  sendReferrralsInvite(props: {
    authToken: string;
    emails: string[];
    options?: BackoffOptions;
  }): Promise<ResponseDto<{}>> {
    const { authToken, emails, options } = props;
    return ErrorUtils.newTryFail(async () => {
      const response: ResponseDto<{}> = await this.connector.post({
        path: API_PATHS.SEND_REFERRALS_INVITE,
        body: emails,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    }, options);
  }
}
