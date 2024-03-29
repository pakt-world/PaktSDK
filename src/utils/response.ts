export enum Status {
  SUCCESS = "success",
  ERROR = "error",
}

export interface ResponseDto<T> {
  data: T;
  status: Status;
  message?: string;
  code?: string;
  statusCode?: number;
  validation?: Record<string, any>;
}

type ErrorWithMessage = {
  message: string[] | object[] | any;
  code?: string;
};

export const ErrorUtils = {
  tryFail: async <T>(f: (() => Promise<T>) | (() => T)): Promise<ResponseDto<T>> => {
    try {
      const data = await f();
      return {
        data,
        status: Status.SUCCESS,
      };
    } catch (e) {
      const parseErr = ErrorUtils.toErrorWithMessage(e);
      return {
        data: null as unknown as T,
        status: Status.ERROR,
        message: parseErr ? parseErr.message : ["Internal Server Error"],
        code: parseErr.code,
      };
    }
  },
  newTryFail: async <T>(f: (() => Promise<T>) | (() => T)): Promise<T> => {
    try {
      const data = await f();
      return {
        ...data,
      };
    } catch (e) {
      const parseErr = ErrorUtils.toErrorWithMessage(e);
      return {
        data: null as unknown as T,
        status: Status.ERROR,
        message: parseErr ? parseErr.message : ["Internal Server Error"],
        code: parseErr.code,
      } as unknown as T;
    }
  },
  formatErrorMsg: (message: string) => {
    return message.replace("attr.", "");
  },
  toErrorWithMessage: (maybeError: unknown): ErrorWithMessage => {
    if (typeof maybeError === "string") {
      try {
        const error = JSON.parse(maybeError as string);
        if (error.data instanceof Array && error.data.length > 0) {
          return {
            message: (error.data as string[]).map((message) => ErrorUtils.formatErrorMsg(message)),
            code: error.errorCode,
          };
        }

        return {
          message: [error.message ?? maybeError],
          code: error.errorCode,
        };
        // eslint-disable-next-line no-empty
      } catch (_) {}
    }

    if (ErrorUtils.isErrorWithMessage(maybeError)) {
      return { message: [maybeError.message] };
    }

    try {
      return {
        message: [JSON.stringify(maybeError, null, 2)],
      };
    } catch {
      // fallback in case there's an error stringifying the maybeError
      // like with circular references for example.
      return { message: [String(maybeError)] };
    }
  },
  isErrorWithMessage(e: unknown): e is ErrorWithMessage {
    return (
      typeof e === "object" &&
      e !== null &&
      "message" in e &&
      typeof (e as Record<string, unknown>).message === "string"
    );
  },
};

export const parseUrlWithQuery = (url: string, filter: object | any) => {
  let querys = "?";
  const objectKeys = Object.keys(filter || {});
  if (objectKeys.length === 0) return url;
  objectKeys.map((key, i) => {
    let $and = "&";
    if (key === undefined || key === "undefined" || key === null || key === "null" || key.length === 0) {
      querys = querys;
    }
    if (i + 1 === objectKeys.length) {
      $and = "";
    }
    querys = querys + `${key}=${filter[key]}${$and}`;
  });
  return url + querys;
};
