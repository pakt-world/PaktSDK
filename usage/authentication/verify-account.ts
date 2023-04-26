import { Verification } from "../../src/services/authentication";

const authSDK = new Verification("https://pakt-module-api.herokuapp.com");
// const verificationToken = "884072" as string; // Replace with a valid verification token

// authSDK.verifyEmail(verificationToken)
//   .then((response) => {
//     console.log(`Email verification successful with code ${response.code}`);
//   })
//   .catch((error) => {
//     console.error(`Email verification failed: ${error.message}`);
//   });

// (async () => {
//   try {
//     const response = authSDK.verificationToken({
//       verificationToken: verificationToken,
//     });

//     console.log("Veirfy email successful with code:");
//   } catch (error: Error | any) {
//     console.error("Resend verification email failed:", error.message);
//   }
// })();
const token = '807907' as string;
const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDkyMjljODhmOWU5ZmRlMzU4ZDRjMSIsImlhdCI6MTY4MjUxNDU4OCwiZXhwIjoxNjgyNjAwOTg4fQ.r1BMJw84UNnwibohn1KAMArLwlYs11Y1TiWdyG4LIh4' as string;

(async () => {
  try {
    const response = await authSDK.verifyEmail({
        token: token,
        tempToken: tempToken,
      });
    console.log("Email Successfully Verified:", response);

  } catch (error: Error | any) {
    console.error(`Email Verification Failed: ${error.message}`);
  }
})()



