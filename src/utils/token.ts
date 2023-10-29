import { Token } from "typedi";
import { PaktConfig } from "./config";

export const PAKT_CONFIG = new Token<PaktConfig>("PAKT_CONFIG");
export const AUTH_TOKEN = new Token<string>("AUTH_TOKEN");
export const TEMP_TOKEN = new Token<string>("TEMP_TOKEN");

export const isEmpty = (value: unknown) => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value === "" && value.trim().length === 0) ||
    value === "undefined" ||
    value === "null"
  );
};
