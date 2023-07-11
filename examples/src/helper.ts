import PaktSDK from "../../../src/services";
import { PaktConfig } from "../../../src/utils/config";

const baseUrl = "http://localhost:9090";
const apiToken = "token";

// Test SDK initalization
const PaktSDKInit = () => {
  const configData: PaktConfig = {
    baseUrl,
    token: apiToken,
    verbose: true,
  };
  return PaktSDK.init(configData);
};

export default PaktSDKInit