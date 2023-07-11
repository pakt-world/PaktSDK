import PaktSDK from "../../../src/services";
import { PaktConfig } from "../../../src/utils/config";

  // Test SDK initalization
const PaktSDKInit = () => {
  const configData: PaktConfig = {
    baseUrl: "https://pakt-module-api.herokuapp.com",
    token: "1234567890383",
    verbose: true,
  };
  return PaktSDK.init(configData);
};

export default PaktSDKInit