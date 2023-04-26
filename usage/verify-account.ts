import { Verification } from '../src/services/authentication';

const authSDK = new Verification('https://pakt-module-api.herokuapp.com');
const verificationToken = 'abcd1234' as string; // Replace with a valid verification token

// authSDK.verifyEmail(verificationToken)
//   .then((response) => {
//     console.log(`Email verification successful with code ${response.code}`);
//   })
//   .catch((error) => {
//     console.error(`Email verification failed: ${error.message}`);
//   });

(async () => {
    try {
      const response =  authSDK.verificationToken({
        verificationToken: verificationToken
      });
  
      console.log('Resend verification email successful with code:');
    } catch (error: Error | any) {
      console.error('Resend verification email failed:', error.message);
    }
  })();