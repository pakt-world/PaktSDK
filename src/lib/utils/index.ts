import { Response } from "express";

type JSONResponse = Response;

function json_send(
  res: JSONResponse,
  data: unknown,
  message: string,
  status: string,
  status_code: number,
  meta = {}
) {
  data = data || null;
  message = message || "";
  status = status || "success";

  const d = {
    status,
    message,
    data,
  };

  res.statusCode = status_code;
  if (process.env.ENVIRONMENT !== "test") {
  }
  return res.status(status_code).json(d);
}
const Utils = {
  jsonS: (
    express_res: JSONResponse,
    data: unknown,
    message: string,
    status_code = 200,
    meta = {}
  ) => {
    return json_send(express_res, data, message, "success", status_code, meta);
  },
  json401: (
    express_res: JSONResponse,
    data: unknown,
    message: string,
    error = {}
  ) => {
    return json_send(express_res, data, message, "error", 401, error);
  },
  jsonFailed: (
    express_res: JSONResponse,
    data: unknown,
    message: string,
    status_code = 400,
    meta = {}
  ) => {
    return json_send(express_res, data, message, "error", status_code, meta);
  },
  internalResponse: (
    error: boolean,
    statusCode: number,
    message: string,
    data: any
  ) => {
    return { error, statusCode, message, data };
  },
};

export default Utils;