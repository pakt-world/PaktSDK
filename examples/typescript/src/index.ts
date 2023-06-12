import PaktSDK from "../../../src/services"
import { PaktConfig } from "../../../src/utils/config"

const run = async () => {
  // Test SDK initalization
  const configData: PaktConfig = {
    baseUrl: "https://api-afrofund-dev.chain.site",
    token: "1234567890383"
  }
  const sdkINit = await PaktSDK.init(configData)
  // sdkINit.auth.login()
}

run()