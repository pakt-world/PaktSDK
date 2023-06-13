import PaktSDK from "../src/services";
import { PaktConfig } from "../src/utils/config";

const run = async () => {
  try {
    // Test SDK initalization
    const configData: PaktConfig = {
      baseUrl: "https://pakt-module-api.herokuapp.com",
      token: "1234567890383",
      verbose: true
    }
    const sdkINit = await PaktSDK.init(configData)
    const loginDetails = {
      email: "test@yopmail.com",
      password: "12345678"
    }
    const loginData = await sdkINit.auth.login(loginDetails.email, loginDetails.password);
    console.log("login--=-=-=", loginData)
  } catch (error) {
    console.log("sdkerror--", error)
  }
}

run()