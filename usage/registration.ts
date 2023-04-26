import { Registration } from '../src/services/authentication';
import * as dotenv from 'dotenv'
dotenv.config()

const authSDK = new Registration('https://pakt-module-api.herokuapp.com');
const email = process.env.EMAIL as string
const password = process.env.PASSWORD as string
const firstName = process.env.FIRSTNAME as string
const lastName = process.env.LASTNAME as string

 
(async () => {
  try {
    const token = await authSDK.registration({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      console.log('Registration was successful:', token);
    } catch (error:Error | any) {
    console.error('Registration was not successful:', error.message);
    }
})();
