import { ResendVerificationEmail } from "../../src/services/authentication";
import * as dotenv from 'dotenv'
dotenv.config();

const authSDK = new ResendVerificationEmail(
  "https://pakt-module-api.herokuapp.com"
);

const email = process.env.EMAIL as string;


(async () => {
  try {
    const token = await authSDK.resendVerificationEmail({
      email: email,
    });
    console.log("Resend verification email Sent:", token);
  } catch (error: Error | any) {
    console.error("Resend verification email failed:", error.message);
  }
})();
