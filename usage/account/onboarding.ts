import { Onboarding, OnboardingRequest, OnboardingResponse } from '../../src/services/account';


// const accountSDK = new Onboarding("https://pakt-module-api.herokuapp.com");

const baseUrl = 'https://pakt-module-api.herokuapp.com';
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDk0YjQ3NmM1ZDg2ZDVmYjI1OGNhYSIsIm93bmVyIjoiNjQ0OTRiNDc2YzVkODZkNWZiMjU4Y2FhIiwiaWF0IjoxNjgyNTI1MTE2LCJleHAiOjE2ODI2MTE1MTZ9.eF_PLfPl9hD4Az2d3R1TX2_NawbOcROr3gH4e-9cxao';
const accountSDK = new Onboarding(baseUrl, apiToken);

const skillCategory = 'Developer' as string
const profileImage = 'avatar.img' as string
const type = 'creator' as string

(async () => {
    try {
      const response = await accountSDK.onboarding({
        skillCategory: skillCategory,
        profileImage: profileImage,
        type: type
      });
      console.log("Onboarding Completed:", response);
    } catch (error: Error | any) {
      console.error("Onboarding Failed:", error.message);
    }
  })();

//   (async () => {
//     try {
    
//     console.log(request);
//     //   const response: OnboardingResponse = await accountSDK.onboarding(request);
//       const response = await accountSDK.onboarding({
      
//     //   console.log(response);
//       console.log("Registration was successful:", request);
//     } catch (error: Error | any) {
//       console.error('Error:', error.message);
//     }
//   })();
  