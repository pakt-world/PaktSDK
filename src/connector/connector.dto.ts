export interface GetUrl {
  path?: string;
  params?: { [key: string]: string | number | boolean | undefined };
  headers?: { [key: string]: string };
  authToken?: string;
}

export interface PostRequest extends GetUrl {
  body?: object | object[];
  method?: string;
}
