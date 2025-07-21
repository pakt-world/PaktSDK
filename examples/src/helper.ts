import PaktSDK from "../../src/services";
import { PaktConfig } from "../../src/utils/config";

const baseUrl = "http://localhost:9090";

// Test SDK initalization
const PaktSDKInit = () => {
  const configData: PaktConfig = {
    baseUrl,
    verbose: true,
  };
  return PaktSDK.init(configData);
};

export default PaktSDKInit;
