"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = void 0;
// error-codes.ts
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes["BadRequest"] = "BAD_REQUEST";
    ErrorCodes["Unauthorized"] = "UNAUTHORIZED";
    ErrorCodes["PaymentRequired"] = "PAYMENT_REQUIRED";
    ErrorCodes["Forbidden"] = "FORBIDDEN";
    ErrorCodes["NotFound"] = "NOT_FOUND";
    ErrorCodes["MethodNotAllowed"] = "METHOD_NOT_ALLOWED";
    ErrorCodes["NotAcceptable"] = "NOT_ACCEPTABLE";
    ErrorCodes["ProxyAuthenticationRequired"] = "PROXY_AUTHENTICATION_REQUIRED";
    ErrorCodes["RequestTimeout"] = "REQUEST_TIMEOUT";
    ErrorCodes["Conflict"] = "CONFLICT";
    ErrorCodes["Gone"] = "GONE";
    ErrorCodes["LengthRequired"] = "LENGTH_REQUIRED";
    ErrorCodes["PreconditionFailed"] = "PRECONDITION_FAILED";
    ErrorCodes["PayloadTooLarge"] = "PAYLOAD_TOO_LARGE";
    ErrorCodes["URITooLong"] = "URI_TOO_LONG";
    ErrorCodes["UnsupportedMediaType"] = "UNSUPPORTED_MEDIA_TYPE";
    ErrorCodes["RangeNotSatisfiable"] = "RANGE_NOT_SATISFIABLE";
    ErrorCodes["ExpectationFailed"] = "EXPECTATION_FAILED";
    ErrorCodes["ImATeapot"] = "IM_A_TEAPOT";
    ErrorCodes["MisdirectedRequest"] = "MISDIRECTED_REQUEST";
    ErrorCodes["UnprocessableEntity"] = "UNPROCESSABLE_ENTITY";
    ErrorCodes["Locked"] = "LOCKED";
    ErrorCodes["FailedDependency"] = "FAILED_DEPENDENCY";
    ErrorCodes["TooEarly"] = "TOO_EARLY";
    ErrorCodes["UpgradeRequired"] = "UPGRADE_REQUIRED";
    ErrorCodes["PreconditionRequired"] = "PRECONDITION_REQUIRED";
    ErrorCodes["TooManyRequests"] = "TOO_MANY_REQUESTS";
    ErrorCodes["RequestHeaderFieldsTooLarge"] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
    ErrorCodes["UnavailableForLegalReasons"] = "UNAVAILABLE_FOR_LEGAL_REASONS";
    ErrorCodes["InternalServerError"] = "INTERNAL_SERVER_ERROR";
    ErrorCodes["NotImplemented"] = "NOT_IMPLEMENTED";
    ErrorCodes["BadGateway"] = "BAD_GATEWAY";
    ErrorCodes["ServiceUnavailable"] = "SERVICE_UNAVAILABLE";
    ErrorCodes["GatewayTimeout"] = "GATEWAY_TIMEOUT";
    ErrorCodes["HTTPVersionNotSupported"] = "HTTP_VERSION_NOT_SUPPORTED";
    ErrorCodes["VariantAlsoNegotiates"] = "VARIANT_ALSO_NEGOTIATES";
    ErrorCodes["InsufficientStorage"] = "INSUFFICIENT_STORAGE";
    ErrorCodes["LoopDetected"] = "LOOP_DETECTED";
    ErrorCodes["NotExtended"] = "NOT_EXTENDED";
    ErrorCodes["NetworkAuthenticationRequired"] = "NETWORK_AUTHENTICATION_REQUIRED";
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
