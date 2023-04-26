// Import required modules
import axios, { AxiosError, AxiosResponse } from "axios";

// Define the request payload interface
interface ResetPasswordPayload {
  email: string;
  new_password: string;
  reset_token: string;
}

// Define the response data interface
interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

// Define the error response data interface
interface ErrorResponseData {
  message: string;
}

// Create a class for the SDK
class PasswordReset {
  private baseUrl: string;
  private resetPasswordEndpoint: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.resetPasswordEndpoint = "/v1/auth/password/reset";
  }

  async resetPassword(
    email: string,
    newPassword: string,
    resetToken: string
  ): Promise<ResetPasswordResponse> {
    try {
      // Construct the request payload
      const payload: ResetPasswordPayload = {
        email,
        new_password: newPassword,
        reset_token: resetToken,
      };

      // Make a POST request to the reset password endpoint
      const response: AxiosResponse<ResetPasswordResponse> = await axios.post(
        `${this.baseUrl}${this.resetPasswordEndpoint}`,
        payload
      );

      // Return the response data
      return response.data;
    } catch (error) {
      // Handle errors and return a proper error message
      const axiosError = error as AxiosError<ErrorResponseData>;
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(
          `Error resetting password: ${axiosError.response.status} - ${axiosError.response.data.message}`
        );
      } else if (axiosError.request) {
        // The request was made but no response was received
        throw new Error("Error resetting password: No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(`Error resetting password: ${axiosError.message}`);
      }
    }
  }
}

export default PasswordReset
