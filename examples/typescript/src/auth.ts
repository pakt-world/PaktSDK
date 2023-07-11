import PaktSDKInit from "./helper"

// call login function with pakt sdk
const Login = async () => {
  try {
    const sdk = await PaktSDKInit();
    // test payload for login
    const loginDetails = {
      email: "test@yopmail.com",
      password: "12345678",
    };
    const loginData = await sdk.auth.login(loginDetails.email, loginDetails.password);
    console.log(loginData);
  } catch (error) {
    // handle error response here....
    console.log(error);
  }
}

// call register function with pakt sdk
const Register = async () => {
  try {
    const sdk = await PaktSDKInit();
    // test payload for registeration
    const payload = {
      firstName: "John",
      lastName: "Tunde",
      email: "test@yopmail.com",
      password: "12345678",
    };
    const loginData = await sdk.auth.register(payload.firstName, payload.lastName, payload.email, payload.password);
    console.log(loginData);
  } catch (error) {
    // handle error response here....
    console.log(error);
  }
}


export {
  Login,
}