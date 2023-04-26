import { ResendVerificationEmail } from '../src/services/authentication';

const authSDK = new ResendVerificationEmail('https://pakt-module-api.herokuapp.com');
const email = 'johndoe@example.com'; // Replace with a valid email address

  (async () => {
    try {
      const token = await authSDK.resendVerificationEmail({
          email: email
        });
        console.log('Resend verification email successful with code:', token);
      } catch (error:Error | any) {
      console.error('Resend verification email failed:', error.message);
      }
  })();
  