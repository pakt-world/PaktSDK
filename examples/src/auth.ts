import { LoginPayload, RegisterPayload } from "../../src/services";
import PaktSDKInit from "./helper";

// call login function with pakt sdk
const Login = async () => {
  try {
    const sdk = await PaktSDKInit();
    // test payload for login
    const loginDetails: LoginPayload = {
      email: "test@email.com",
      password: "12345678",
    };
    const loginData = await sdk.auth.login(loginDetails);
    console.log(loginData);
  } catch (error) {
    // handle error response here....
    console.log(error);
  }
};

// call register function with pakt sdk
const Register = async () => {
  try {
    const sdk = await PaktSDKInit();
    // test payload for registration
    const payload: RegisterPayload = {
      firstName: "John",
      lastName: "Tunde",
      email: "test@email.com",
      password: "12345678",
      confirmPassword: "12345678",
    };
    const loginData = await sdk.auth.register(payload);
    console.log(loginData);
  } catch (error) {
    // handle error response here....
    console.log(error);
  }
};

export { Login, Register };
