import { Container, Service } from 'typedi';
// import { version } from '../../package.json';
import { GetUrl, PostRequest } from "./connector.dto";
import { PAKT_CONFIG } from '../utils/token';

@Service({
  factory: (data: { id: string }) => {
    return new PaktConnector(data.id)
  },
  transient: true,
})
export class PaktConnector {
  constructor(private readonly id: string) { }

  public async get<T>(request: GetUrl) {
    return this.request<T>({ ...request, method: 'GET' })
  }

  public async post<T>(request: PostRequest) {
    return this.request<T>({ ...request, method: 'POST' })
  }

  public async delete<T>(request: GetUrl) {
    return this.request<T>({ ...request, method: 'DELETE' })
  }

  private async request<T>({ path, params, body, method }: PostRequest, retry = 0, externalUrl?: string): Promise<T> {
    const { verbose } = Container.of(this.id).get(PAKT_CONFIG)

    const url = externalUrl || this.getUrl({ path, params })
    const headers = await this.headers(retry)
    const request: RequestInit = {
      headers,
      method,
      body: body ? JSON.stringify(body) : null,
    }

    const start = Date.now()
    if (verbose) {
      console.debug(new Date().toISOString(), 'SDK Request: ', request.method, url, request.body)
    }
    try {
      return await fetch(url, request).then(async (res) => {
        const end = Date.now() - start
        if (verbose) {
          console.log(
            new Date().toISOString(),
            `SDK Response received in ${end}ms: `,
            res.status,
            await res.clone().text(),
          )
        }
        if (res.ok) {
          return res.json()
        }
      })
    } catch (error) {
      if (verbose) {
        console.warn(new Date().toISOString(), 'Error: ', error)
      }
      return Promise.reject(error)
    }
  }

  private getUrl({ path, params }: GetUrl) {
    const config = Container.of(this.id).get(PAKT_CONFIG)
    const url = new URL(path || "", config.baseUrl)

    if (params) {
      Object.keys(params)
        .filter((key) => !!params[key])
        .forEach((key) => url.searchParams.append(key, `${params[key]}`))
    }

    if (config.testnet) {
      url.searchParams.append('type', 'testnet')
    }

    return url.toString()
  }

  private async headers(retry: number) {
    const config = Container.of(this.id).get(PAKT_CONFIG)
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-pkt-sdk-version': "1.0.0",
      'x-pkt-sdk-product': 'JS',
      'x-pkt-testnet': `${config.testnet}`,
      'x-pkt-sdk-retry': `${retry}`,
    })
    if (config.token) {
      headers.append('x-api-key', config.token)
    }
    return headers
  }

}