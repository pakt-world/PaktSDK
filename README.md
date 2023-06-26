![Alt PAKT](https://chainsite-storage.s3.us-east-1.amazonaws.com/lj8mzug9_sdklogo.png)

# PAKT

# Installation

To install PAKT SDK, simply

`npm install pakt-sdk`

`yarn add pakt-sdk`

> :warning: Ensure you are registered on www.pakt.world, with a paid and activated chainsite.

## Usage

### Initialization

```typescript
import PaktSDK from "pakt-sdk";

const apiKey = config.PAKT_SDK_API_KEY;
const configData: PaktConfig = {
  token: apiKey,
  verbose: true,
};

const sdkInit = await PaktSDK.init(configData);
```

```javascript
const PaktSDK = require("pakt-sdk");

const apiKey = config.PAKT_SDK_API_KEY;
const configData = {
  token: apiKey,
  verbose: true,
};
const sdkInit = await PaktSDK.init(configData);
```

The above code initializes the PAKT SDK, ensure the API KEY is generated on www.pakt.world.

---

## Account

With the Pakt SDK, users can:

- Get User Information
- Onboard a User
- Update Account for a user
- Change Password
- Setup Two-factor Authentication
- Activate/Deactivate Two-factor Authentication

### Example

```typescript
//From the initialised sdkInit,

//Setup user information Model

interface UserAccountDto {
  _id: string;
  type: string;
  email: string;
  lastName: string;
  firstName: string;
  afroScore: number;
  profileCompleteness: number;
  profileImage?: {
    url: string;
  };
  ...
}
export const updateUserInfo = async ({payload}:{payload: {userName: string;profileImage: string; socials: {github: string; twitter: string; linkedin: string; website: string;} }}) => {
  const latestUserInfo: UserAccountDto = await sdkInit.account.updateAccount(payload);
};
```

The example above updates a user account, setup the payload with the latest information about the user, which includes, but not limited to the userName, profileImage, social media links etc.

---

### Onboard User

To improve user success, there is the onboarding setup. See example below:

```typescript
export const onboardUser = async (skillCategory: string, profileImage: string, type: "Client" | "Talent") => {
  const payload: OnboardUser = {
    skillCategory,
    profileImage,
    type,
  };

  const onboardUser: UserAccountDto = await sdkInit.account.onboardEndpoint(payload);
};
```

---

### Change Password

With the Pakt SDK, users can change their password, see example below:

```typescript
export const changeUserPassword = async (oldPassword: string, newPassword: string) => {
  const payload: ChangePasswordPayload = {
    oldPassword: oldPassword,
    newPassword: newPassword,
  };
  const userInfo: UserAccountDto = await sdkInit.account.changePassword(payload);
};
```

---

## Two Factor Authentication

To improve user securing their accounts better, the PAKT SDK offers the two-factor authentication. Users can initiate, activate and deactivate the two-factor auth.

See examples below:

### Initiate two-factor authentication

This begins the process of the two-factor auth setup.

```typescript
type TwoFaType = "google_auth" | "email";
export const initiateTwoFa = async (type: TwoFaType) => {
  interface TwoFaResponse {
    type: TwoFaType;
    qrCodeUrl?: string;
    tempToken?: {
      token: string;
      expiresIn: number;
    };
  }

  const twoFaInit: TwoFaResponse = await sdkInit.account.initate2FA(type);
};
```

---

### Activate Two-factor authentication

To activate the two-factor auth, see example:

```typescript
export const activateTwoFa = async (code: string) => {
  await sdkInit.account.active2FA(code);
};
```

### Deactivate Two-factor authentication

To deactivate the two-factor auth, see example:

```typescript
export const activateTwoFa = async (code: string) => {
  await sdkInit.account.deactive2FA(code);
};
```

---

## Notification
