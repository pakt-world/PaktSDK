import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Container, Service } from "typedi";
import { version } from "../../package.json";
import { PAKT_CONFIG } from "../utils/token";
import { GetUrl, PostRequest } from "./connector.dto";

@Service({
  factory: (data: { id: string }) => {
    return new PaktConnector(data.id);
  },
  transient: true,
})
export class PaktConnector {
  constructor(private readonly id: string) {}

  public fetchConfig() {
    return Container.of(this.id).get(PAKT_CONFIG);
  }

  public async get<T>(request: GetUrl) {
    return this.request<T>({ ...request, method: "GET" });
  }

  public async post<T>(request: PostRequest) {
    return this.request<T>({ ...request, method: "POST" });
  }

  public async patch<T>(request: PostRequest) {
    return this.request<T>({ ...request, method: "PATCH" });
  }

  public async put<T>(request: PostRequest) {
    return this.request<T>({ ...request, method: "PUT" });
  }

  public async delete<T>(request: GetUrl) {
    return this.request<T>({ ...request, method: "DELETE" });
  }

  private async request<T>(
    { path, params, body, method, authToken, headers: _postRequestHeaders }: PostRequest,
    retry = 0,
    externalUrl?: string,
  ): Promise<T> {
    const { verbose } = Container.of(this.id).get(PAKT_CONFIG);

    const url = externalUrl || this.getUrl({ path, params });
    const headers = await this.headers(retry, authToken);

    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      headers: { ...headers, ..._postRequestHeaders },
      data: body,
      timeout: 30000, // 30 second timeout
    };

    const start = Date.now();
    if (verbose) {
      console.debug(new Date().toISOString(), "SDK Request: ", method, url, body);
    }

    try {
      const response: AxiosResponse<T> = await axios(axiosConfig);
      const end = Date.now() - start;

      if (verbose) {
        console.log(new Date().toISOString(), `SDK Response received in ${end}ms: `, response.status, response.data);
      }

      return { ...response.data, code: response.status };
    } catch (error: unknown) {
      if (verbose) {
        console.warn(new Date().toISOString(), "Error: ", error);
      }

      // Handle axios error response
      if (axios.isAxiosError(error) && error.response) {
        return { ...error.response.data, code: error.response.status };
      }

      return Promise.reject(error);
    }
  }

  private getUrl({ path, params }: GetUrl) {
    const config = Container.of(this.id).get(PAKT_CONFIG);
    // const realPath = API_PATHS.API_VERSION + path;
    const url = new URL(path || "", config.baseUrl);
    console.log(path, url);

    if (params) {
      Object.keys(params)
        .filter((key) => !!params[key])
        .forEach((key) => url.searchParams.append(key, `${params[key]}`));
    }

    if (config.testnet) {
      url.searchParams.append("type", "testnet");
    }

    return url.toString();
  }

  private async headers(retry: number, authToken?: string) {
    let authHeader = {};
    const config = Container.of(this.id).get(PAKT_CONFIG);

    if (authToken) {
      authHeader = {
        Authorization: `Bearer ${authToken}`,
      };
    }

    return {
      "Content-Type": "application/json",
      "x-pkt-sdk-version": version,
      "x-pkt-sdk-product": "JS",
      "x-pkt-testnet": `${config.testnet}`,
      "x-pkt-sdk-retry": `${retry}`,
      ...authHeader,
    };
  }
}
