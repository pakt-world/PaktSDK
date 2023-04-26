import { PasswordReset}  from "../src/services/authentication";

const baseUrl = "https://pakt-module-api.herokuapp.com";
const sdk = new PasswordReset(baseUrl);

(async () => {
  try {
    const email = "user@example.com";
    const newPassword = "newSecurePassword";
    const resetToken = "abcdefgh12345678"; // This token should be received from your reset password email

    const response = await sdk.resetPassword(email, newPassword, resetToken);
    console.log("Password reset successful:", response);
  } catch (error:Error | any) {
    console.error("Error resetting password:", error.message);
  }
})();
