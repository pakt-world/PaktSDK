import { Login } from '../src/services/authentication';
import * as dotenv from 'dotenv'
dotenv.config()

const authSDK = new Login('https://pakt-module-api.herokuapp.com');
const email = process.env.EMAIL as string
const password = process.env.PASSWORD as string

 
(async () => {
  try {
    const token = await authSDK.login({
        email: email,
        password: password,
      });
      console.log('Login Was Successfull:', token);
    } catch (error:Error | any) {
    console.error('Login Failed:', error.message);
    }
})();
