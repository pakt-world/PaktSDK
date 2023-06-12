export interface GetUrl {
  path?: string
  params?: { [key: string]: string | number | boolean | undefined }
}

export interface PostRequest extends GetUrl {
  body?: object | object[]
  method?: string
}