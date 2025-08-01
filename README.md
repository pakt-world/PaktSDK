![Alt PAKT](https://s3.amazonaws.com/storage-paktbuild.chain.site/public/mdrvr2d2_pakt_sdk.png)

# PAKT SDK

PAKT SDK is a comprehensive software development kit for building applications on the PAKT Operating System. It provides a complete suite of tools for project
collaboration, blockchain payments, user management, and more.collaboration, blockchain payments, user management, and more.

## Installation

To install PAKT SDK, simply

```bash
npm install pakt-sdk
# OR
yarn add pakt-sdk
# OR
pnpm add pakt-sdk
```

## Quick Start

```typescript
import PaktSDK, { ResponseDto, LoginDto, BackoffOptions } from "pakt-sdk";

// Initialize SDK with default backoff configuration
const sdk = await PaktSDK.init({
  baseUrl: "https://api.pakt.world", // Required: API base URL
  verbose: true, // Optional: Enable detailed logging
  testnet: false, // Optional: Use testnet environment
  defaultBackoff: { // Optional: Default backoff configuration
    numOfAttempts: 5,
    startingDelay: 200,
    timeMultiple: 2,
    maxDelay: 5000,
    jitter: "full",
    delayFirstAttempt: false
  }
});

// Now you can use all SDK features with typed responses
const loginResponse: ResponseDto<LoginDto> = await sdk.auth.login({
  email: "user@example.com",
  password: "yourpassword",
});

if (loginResponse.status === "success") {
  console.log("User ID:", loginResponse.data._id);
  console.log("Token:", loginResponse.data.token);
  console.log("User verified:", loginResponse.data.isVerified);
}
```

## Table of Contents

- [Authentication](#authentication)
- [Account Management](#account-management)
- [Collections (Projects)](#collections-projects)
- [Wallet & Payments](#wallet--payments)
- [Direct Deposits](#direct-deposits)
- [Communication](#communication)
- [File Management](#file-management)
- [User Verification](#user-verification)
- [Bookmarks](#bookmarks)
- [Reviews & Ratings](#reviews--ratings)
- [Additional Features](#additional-features)
- [Error Handling](#error-handling)
- [TypeScript Support](#typescript-support)

---

## Authentication

The authentication module provides complete user registration, login, password management, and OAuth integration.

### Login

```typescript
import { LoginPayload, ResponseDto, LoginDto, BackoffOptions } from "pakt-sdk";

const loginData: LoginPayload = {
  email: "user@example.com",
  password: "yourpassword",
};

// Optional: Custom backoff for this specific call
const customBackoff: BackoffOptions = {
  numOfAttempts: 3,
  startingDelay: 500,
  maxDelay: 2000
};

const response: ResponseDto<LoginDto> = await sdk.auth.login(loginData, customBackoff);

if (response.status === "success") {
  console.log("Logged in successfully");
  console.log("User ID:", response.data._id);
  console.log("Email:", response.data.email);
  console.log("Token:", response.data.token);
  console.log("Onboarded:", response.data.onboarded);
  console.log("Verified:", response.data.isVerified);
  console.log("Profile completeness:", response.data.profileCompleteness);
  // Token is automatically stored for subsequent requests
}
```

### Registration

```typescript
import { RegisterPayload, ResponseDto, RegisterDto } from "pakt-sdk";

const registrationData: RegisterPayload = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "securepassword",
  confirmPassword: "securepassword",
  referral: "optional-referral-code", // Optional
  type: "talent", // Optional: "talent" or "business"
};

const response: ResponseDto<RegisterDto> = await sdk.auth.register(registrationData);

if (response.status === "success") {
  console.log("Registration successful, check email for verification");
  console.log("Token:", response.data.token);
  console.log("Token type:", response.data.token_type);
  console.log("Expires in:", response.data.expiresIn);
}
```

### Account Verification

After registration, users need to verify their account:

```typescript
import { ResponseDto, AccountVerifyDto } from "pakt-sdk";

const verificationResponse: ResponseDto<AccountVerifyDto> = await sdk.auth.verifyAccount({
  tempToken: "token-from-registration",
  token: "verification-token-from-email",
});

if (verificationResponse.status === "success") {
  console.log("Account verified successfully");
  console.log("User ID:", verificationResponse.data._id);
  console.log("Email:", verificationResponse.data.email);
  console.log("Token:", verificationResponse.data.token);
  console.log("Code:", verificationResponse.data.code);
  console.log("Expires in:", verificationResponse.data.expiresIn);
  // User is now fully authenticated
}
```

### Password Management

#### Reset Password

```typescript
// Send password reset email
await sdk.auth.resetPassword({
  email: "user@example.com",
});

// Change password with reset token
await sdk.auth.changePassword({
  token: "reset-token-from-email",
  tempToken: "temp-token",
  password: "newpassword",
});
```

### Google OAuth Integration

```typescript
import { ResponseDto, GoogleOAuthValidateDto, GoogleOAuthState } from "pakt-sdk";

// Step 1: Generate OAuth URL
const oauthResponse: ResponseDto<GoogleOAuthState> = await sdk.auth.googleOAuthGenerateState();
const { googleAuthUrl, state } = oauthResponse.data;

// Redirect user to googleAuthUrl

// Step 2: Validate OAuth callback
const validationResponse: ResponseDto<GoogleOAuthValidateDto> = await sdk.auth.googleOAuthValidateState({
  state: "state-from-step-1",
  code: "authorization-code-from-callback",
});

if (validationResponse.status === "success") {
  console.log("OAuth validation successful");
  console.log("Token:", validationResponse.data.token);
  console.log("Token type:", validationResponse.data.token_type);
  console.log("Expires in:", validationResponse.data.expiresIn);
  console.log("Verified:", validationResponse.data.isVerified);
  console.log("Timezone:", validationResponse.data.timeZone);
  
  if (validationResponse.data.type === "sign_up") {
    console.log("New user registered via Google");
  } else {
    console.log("Existing user signed in");
  }
}
```

### Referral Validation

```typescript
import { ResponseDto, ValidateReferralDto } from "pakt-sdk";

const referralResponse: ResponseDto<ValidateReferralDto> = await sdk.auth.validateReferral("referral-token");

if (referralResponse.status === "success" && referralResponse.data.valid) {
  console.log(`Valid referral from user ${referralResponse.data.userId}`);
  console.log(`Referral ID: ${referralResponse.data.referralId}`);
  console.log(`Role: ${referralResponse.data.role}`);
  console.log(`KYC status: ${referralResponse.data.isKyc}`);
  console.log(
    `Referral counts: ${referralResponse.data.referralCounts}/${referralResponse.data.totalAllowedReferrals}`,
  );
}
```

## Account Management

### Example

### Get Current User Profile

```typescript
import { ResponseDto, IUser } from "pakt-sdk";

const userProfile: ResponseDto<IUser> = await sdk.account.getUser();

if (userProfile.status === "success") {
  console.log("User ID:", userProfile.data._id);
  console.log("Name:", `${userProfile.data.firstName} ${userProfile.data.lastName}`);
  console.log("Email:", userProfile.data.email);
  console.log("Type:", userProfile.data.type);
  console.log("Score:", userProfile.data.score);
  console.log("Profile completeness:", userProfile.data.profileCompleteness);
  if (userProfile.data.profileImage) {
    console.log("Profile image:", userProfile.data.profileImage.url);
  }
}
```

### Update User Profile

```typescript
import { UpdateUserDto, ResponseDto, IUser } from "pakt-sdk";

const profileUpdate: UpdateUserDto = {
  profile: {
    contact: {
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "+1234567890",
    },
    bio: {
      title: "Full-Stack Developer",
      description: "Experienced developer with expertise in React and Node.js",
    },
    talent: {
      availability: "available", // "available" | "busy" | "working"
      tags: ["React", "Node.js", "TypeScript"],
      tagsIds: ["tag-id-1", "tag-id-2"],
      tagsCategory: "development",
      about: "I love building scalable web applications",
    },
    socials: {
      github: "https://github.com/username",
      linkedin: "https://linkedin.com/in/username",
      twitter: "https://twitter.com/username",
    },
  },
  isPrivate: false,
};

const response: ResponseDto<IUser> = await sdk.account.updateAccount(profileUpdate);

if (response.status === "success") {
  console.log("Profile updated successfully");
  console.log("Updated user:", response.data);
}
```

### User Onboarding

Complete the initial onboarding process:

```typescript
import { UserOnboardDto, ResponseDto, IUser } from "pakt-sdk";

const onboardingData: UserOnboardDto = {
  profile: {
    bio: {
      title: "Software Developer",
      description: "Building amazing applications",
    },
    talent: {
      availability: "available",
      tags: ["JavaScript", "React"],
      tagsCategory: "development",
    },
  },
};

const response: ResponseDto<IUser> = await sdk.account.onboardEndpoint(onboardingData);

if (response.status === "success") {
  console.log("Onboarding completed successfully");
  console.log("User profile:", response.data);
}
```

### Two-Factor Authentication (2FA)

#### Setup 2FA

```typescript
import { ResponseDto, TwoFAresponse } from "pakt-sdk";

// Initiate 2FA setup
const twoFAResponse: ResponseDto<TwoFAresponse> = await sdk.account.initate2FA({
  type: "google_auth", // or "email"
  password: "current-password",
});

if (twoFAResponse.status === "success") {
  console.log("2FA Type:", twoFAResponse.data.type);
  // For Google Authenticator, use the provided QR code
  if (twoFAResponse.data.qrCodeUrl) {
    console.log("QR Code URL:", twoFAResponse.data.qrCodeUrl);
  }
  if (twoFAResponse.data.tempToken) {
    console.log("Temp token:", twoFAResponse.data.tempToken.token);
    console.log("Expires in:", twoFAResponse.data.tempToken.expiresIn);
  }
}

// Activate 2FA with verification code
const activateResponse: ResponseDto<any> = await sdk.account.activate2FA({
  code: "123456", // Code from authenticator app
  type: "google_auth",
});

if (activateResponse.status === "success") {
  console.log("2FA activated successfully");
}
```

#### Use 2FA for Login

`````typescript
// When 2FA is enabled, use email 2FA
await sdk.account.sendEmailTwoFA({
  type: "email",
  tempToken: "temp-token-from-login",
});
```

### User Search and Discovery

```typescript
import { FilterUserDto, ResponseDto, FindUsers } from "pakt-sdk";

const searchFilters: FilterUserDto = {
  tags: ["React", "Node.js"],
  type: "talent",
  scoreRange: { min: 80, max: 100 },
  limit: 20,
  offset: 0,
};

const users: ResponseDto<FindUsers> = await sdk.account.getUsers(searchFilters);

if (users.status === "success") {
  console.log(`Found ${users.data.total} users`);
  console.log(`Page ${users.data.page} of ${users.data.pages}`);
  console.log(`Limit: ${users.data.limit}`);
  
  users.data.data.forEach((user: any) => {
    console.log(`User: ${user.firstName} ${user.lastName} (${user.email})`);
    console.log(`Score: ${user.score}`);
  });
}
```

---

## Collections (Projects)

Collections are the core entity representing projects, jobs, or collaborative work in the PAKT ecosystem.

### Create a Collection

```typescript
import { CreateCollectionDto, ResponseDto, ICollectionDto } from "pakt-sdk";

const newCollection: CreateCollectionDto = {
  name: "E-commerce Website Development",
  description: "Build a modern e-commerce platform",
  collectionType: "development-project",
  isPrivate: false,
  deliveryDate: new Date("2024-12-31"),
  tags: ["React", "Node.js", "E-commerce"],
  maxParticipants: 3,
  budget: {
    amount: 5000,
    currency: "USD",
  },
};

const collection: ResponseDto<ICollectionDto> = await sdk.collection.create(newCollection);

if (collection.status === "success") {
  console.log("Collection created successfully");
  console.log("Collection ID:", collection.data._id);
  console.log("Name:", collection.data.name);
  console.log("Status:", collection.data.status);
}
```

### Get Collections

```typescript
import { ResponseDto, FindCollectionsDto, ICollectionDto } from "pakt-sdk";

// Get all collections with filters
const collections: ResponseDto<FindCollectionsDto> = await sdk.collection.getAll({
  status: "ongoing",
  limit: 10,
  offset: 0,
});

if (collections.status === "success") {
  console.log(`Found ${collections.data.total} collections`);
  console.log(`Page ${collections.data.page} of ${collections.data.pages}`);
  collections.data.data.forEach((col: any) => {
    console.log(`Collection: ${col.name} (${col.status})`);
  });
}

// Get specific collection
const collection: ResponseDto<ICollectionDto> = await sdk.collection.getById("collectionId");

if (collection.status === "success") {
  console.log("Collection name:", collection.data.name);
  console.log("Description:", collection.data.description);
  console.log("Status:", collection.data.status);
}
```

### Update Collection

```typescript
import { UpdateCollectionDto, ResponseDto, ICollectionDto } from "pakt-sdk";

const updates: UpdateCollectionDto = {
  description: "Updated project description",
  status: "ongoing",
  deliveryDate: new Date("2024-12-31"),
};

const response: ResponseDto<ICollectionDto> = await sdk.collection.updateCollection("collection-id", updates);

if (response.status === "success") {
  console.log("Collection updated successfully");
  console.log("Updated description:", response.data.description);
  console.log("Status:", response.data.status);
}
```

### Collection Types

```typescript
import { ResponseDto, ICollectionTypeDto } from "pakt-sdk";

// Get all available collection types
const types: ResponseDto<ICollectionTypeDto[]> = await sdk.collection.getTypes();

if (types.status === "success") {
  console.log("Available collection types:");
  types.data.forEach((type: ICollectionTypeDto) => {
    console.log(`- ${type.name}: ${type.description}`);
  });
}

// Get specific collection type
const type: ResponseDto<ICollectionTypeDto> = await sdk.collection.getACollectionType("_id");

if (type.status === "success") {
  console.log("Type name:", type.data.name);
  console.log("Description:", type.data.description);
}
```

### Bulk Operations

```typescript
import { CreateCollectionDto, ResponseDto } from "pakt-sdk";

// Create multiple collections
const collectionsData: CreateCollectionDto[] = [
  /* array of CreateCollectionDto */
];
const createResponse: ResponseDto<any> = await sdk.collection.createMany(collectionsData);

if (createResponse.status === "success") {
  console.log("Multiple collections created successfully");
}

// Update multiple collections
const updates = [
  /* array of updates with IDs */
];
const updateResponse: ResponseDto<any> = await sdk.collection.updateManyCollections(updates);

if (updateResponse.status === "success") {
  console.log("Multiple collections updated successfully");
}
```

---

## Wallet & Payments

Comprehensive blockchain-based payment system with multi-cryptocurrency support.

### Wallet Management

```typescript
import { ResponseDto, IWalletResponseDto, IWalletDto } from "pakt-sdk";

// Get all user wallets
const wallets: ResponseDto<IWalletResponseDto> = await sdk.wallet.getWallets();

if (wallets.status === "success") {
  console.log("Total balance:", wallets.data.totalBalance);
  console.log("Total value:", wallets.data.value);
  
  wallets.data.wallets.forEach((wallet: IWalletDto) => {
    console.log(`${wallet.coin.toUpperCase()}: $${wallet.spendable} available`);
    console.log(`Locked: $${wallet.lock}`);
    console.log(`USD Value: $${wallet.usdValue}`);
    console.log(`Status: ${wallet.status}`);
  });
}

// Get specific wallet by cryptocurrency
const usdcWallet: ResponseDto<IWalletDto> = await sdk.wallet.getSingleWalletByCoin("usdc");
const avaxWallet: ResponseDto<IWalletDto> = await sdk.wallet.getSingleWalletByCoin("avax");

if (usdcWallet.status === "success") {
  console.log("USDC Wallet:", usdcWallet.data.address);
  console.log("Spendable:", usdcWallet.data.spendable);
}
```

### Payment Processing

```typescript
import { ICreatePaymentDto, ResponseDto, IPaymentDataDto } from "pakt-sdk";

// Create payment order
const paymentOrder: ICreatePaymentDto = {
  coin: "usdc", // or "avax"
  collectionId: "collectionId",
};

const payment: ResponseDto<IPaymentDataDto> = await sdk.payment.create(paymentOrder);

if (payment.status === "success") {
  console.log("Payment order created");
  console.log("Coin:", payment.data.coin);
  console.log("Amount to pay:", payment.data.amountToPay);
  console.log("Blockchain address:", payment.data.address);
  console.log("Collection amount:", payment.data.collectionAmount);
  console.log("Expected fee:", payment.data.expectedFee);
  console.log("USD amount:", payment.data.usdAmount);
  console.log("Chain ID:", payment.data.chainId);
}
```

### Payment Validation & Release

```typescript
import { ResponseDto } from "pakt-sdk";

// Validate payment transaction
const validation: ResponseDto<any> = await sdk.payment.validate({
  paymentId: "payment-id",
  transactionHash: "blockchain-tx-hash",
});

if (validation.status === "success") {
  console.log("Payment validated successfully");
  console.log("Validation data:", validation.data);
}

// Release escrowed payment (for collection completion)
const release: ResponseDto<any> = await sdk.payment.release({
  collectionId: "collectionId",
  recipientId: "user-id",
});

if (release.status === "success") {
  console.log("Payment released successfully");
}
```

### Transaction History

```typescript
import { ResponseDto, FindTransactionsDto, ITransactionDto } from "pakt-sdk";

// Get all transactions
const transactions: ResponseDto<FindTransactionsDto> = await sdk.wallet.getTransactions({
  limit: 50,
  offset: 0,
  type: "sent", // Optional: filter by transaction type
});

if (transactions.status === "success") {
  console.log(`Found ${transactions.data.total} transactions`);
  console.log(`Page ${transactions.data.page} of ${transactions.data.pages}`);
  
  transactions.data.transactions.forEach((tx: ITransactionDto) => {
    console.log(`Transaction: ${tx._id}`);
    console.log(`Amount: ${tx.amount} ${tx.currency}`);
    console.log(`Type: ${tx.type}`);
    console.log(`Status: ${tx.status}`);
    console.log(`Hash: ${tx.hash}`);
  });
}

// Get specific transaction
const transaction: ResponseDto<ITransactionDto> = await sdk.wallet.getATransaction("transaction-id");

if (transaction.status === "success") {
  console.log("Transaction details:", transaction.data);
}

// Get transaction statistics
const stats: ResponseDto<any> = await sdk.wallet.getTransactionStats("usdc");

if (stats.status === "success") {
  console.log("Total sent:", stats.data.totalSent);
  console.log("Total received:", stats.data.totalReceived);
}
```

### Cryptocurrency Exchange Rates

```typescript
import { ResponseDto } from "pakt-sdk";

// Get current exchange rates
const exchange: ResponseDto<any> = await sdk.wallet.getExchange();

if (exchange.status === "success") {
  console.log("USDC to USD:", exchange.data.usdc.usd);
  console.log("AVAX to USD:", exchange.data.avax.usd);
  console.log("Exchange data:", exchange.data);
}
```

### Withdrawals

```typescript
import { CreateWithdrawal, ResponseDto, IWithdrawalDto, FindWithdrawalsDto } from "pakt-sdk";

const withdrawalRequest: CreateWithdrawal = {
  coin: "usdc",
  amount: 100.5,
  address: "0x742d35Cc6634C0532925a3b8D6cf1C4394c64DF8",
  password: "account-password",
};

const withdrawal: ResponseDto<IWithdrawalDto> = await sdk.withdrawal.createWithdrawal(withdrawalRequest);

if (withdrawal.status === "success") {
  console.log("Withdrawal created successfully");
  console.log("Withdrawal ID:", withdrawal.data._id);
  console.log("Amount:", withdrawal.data.amount);
  console.log("Status:", withdrawal.data.status);
}

// Check withdrawal status
const withdrawals: ResponseDto<FindWithdrawalsDto> = await sdk.withdrawal.fetchWithdrawal({
  limit: 10,
  offset: 0,
});

if (withdrawals.status === "success") {
  console.log(`Found ${withdrawals.data.total} withdrawals`);
  withdrawals.data.data.forEach((w: any) => {
    console.log(`Withdrawal: ${w._id} - ${w.status}`);
  });
}
```

---

## Direct Deposits

Direct deposits allow for streamlined collection funding and validation without going through the traditional escrow process.

### Create Direct Deposit

```typescript
import { ICreateDirectDepositPayload, ResponseDto, IDirectDepositDto } from "pakt-sdk";

const directDepositData: ICreateDirectDepositPayload = {
  collectionType: "development-project",
  amount: 1000,
  coin: "usdc", // or "avax"
  name: "Project Direct Funding",
  description: "Direct deposit for project completion",
  owner: "user-id",
};

const directDeposit: ResponseDto<IDirectDepositDto> = await sdk.directDeposit.createDirectDeposit({
  authToken: "your-auth-token",
  payload: directDepositData,
});

if (directDeposit.status === "success") {
  console.log("Direct deposit created successfully");
  console.log("Collection ID:", directDeposit.data.collectionId);
  console.log("Payment address:", directDeposit.data.address);
  console.log("Amount to pay:", directDeposit.data.amountToPay);
  console.log("Expected fee:", directDeposit.data.expectedFee);
  console.log("Chain ID:", directDeposit.data.chainId);
}
```

### Validate Direct Deposit

```typescript
import { IValidateDirectDepositPayload, ResponseDto } from "pakt-sdk";

const validationData: IValidateDirectDepositPayload = {
  collection: "collection-id",
  method: "blockchain", // validation method
  status: "completed", // deposit status
  owner: "owner-user-id",
  meta: {
    transactionHash: "0x...",
    blockNumber: 123456,
  },
  release: true, // whether to release funds immediately
};

const validation: ResponseDto<any> = await sdk.directDeposit.validateDirectDeposit({
  authToken: "your-auth-token",
  payload: validationData,
});

if (validation.status === "success") {
  console.log("Direct deposit validated successfully");
  console.log("Collection updated:", validation.data);
}
```

### Get Payment Methods

```typescript
import { ResponseDto, IBlockchainCoinDto } from "pakt-sdk";

// Get available blockchain payment methods for direct deposits
const paymentMethods: ResponseDto<IBlockchainCoinDto[]> = await sdk.directDeposit.fetchPaymentMethods("your-auth-token");

if (paymentMethods.status === "success") {
  console.log("Available payment methods:");
  paymentMethods.data.forEach((coin: IBlockchainCoinDto) => {
    console.log(`${coin.name} (${coin.symbol})`);
    console.log(`Contract: ${coin.contractAddress}`);
    console.log(`Chain ID: ${coin.rpcChainId}`);
    console.log(`Active: ${coin.active}`);
    console.log(`Is Token: ${coin.isToken}`);
  });
}
```

### Get Active RPC Configuration

```typescript
import { ResponseDto, IRpcConfigDto } from "pakt-sdk";

// Get current blockchain RPC server configuration
const rpcConfig: ResponseDto<IRpcConfigDto> = await sdk.directDeposit.fetchActiveRPC("your-auth-token");

if (rpcConfig.status === "success") {
  console.log("RPC Name:", rpcConfig.data.rpcName);
  console.log("Chain ID:", rpcConfig.data.rpcChainId);
  console.log("RPC URLs:", rpcConfig.data.rpcUrls);
  console.log("Block Explorer:", rpcConfig.data.blockExplorerUrls);
  console.log("Native Currency:", rpcConfig.data.rpcNativeCurrency);
}
```

### Direct Deposit vs Regular Payment

Direct deposits offer several advantages over regular escrow payments:

- **Faster Processing**: No escrow holding period
- **Lower Fees**: Reduced transaction costs
- **Immediate Release**: Funds can be released immediately upon validation
- **Simplified Workflow**: Direct collection funding without complex escrow management

Use direct deposits when:

- You have established trust with the collection owner
- The project requires immediate funding
- You want to minimize transaction fees and complexity

---

## Communication

### Invitations

Send and manage project collaboration invites:

```typescript
import { SendInviteDto, ResponseDto, IInviteDto, FindInvitesDto } from "pakt-sdk";

// Send invite
const inviteData: SendInviteDto = {
  receiverId: "user-id",
  collectionId: "project-id",
};

const invite: ResponseDto<IInviteDto> = await sdk.invite.sendInvite(inviteData);

if (invite.status === "success") {
  console.log("Invite sent successfully");
  console.log("Invite ID:", invite.data._id);
  console.log("Status:", invite.data.status);
}

// Manage invites
const acceptResponse: ResponseDto<any> = await sdk.invite.acceptInvite("invite-id");
const declineResponse: ResponseDto<any> = await sdk.invite.declineInvite("invite-id");
const cancelResponse: ResponseDto<any> = await sdk.invite.cancelInvite("invite-id");

// Get all invites
const invites: ResponseDto<FindInvitesDto> = await sdk.invite.getAll({
  status: "pending",
  limit: 10,
});

if (invites.status === "success") {
  console.log(`Found ${invites.data.total} invites`);
  invites.data.data.forEach((inv: any) => {
    console.log(`Invite: ${inv._id} - ${inv.status}`);
  });
}
```

### Chat System

```typescript
import { ResponseDto, FindMessagesDto } from "pakt-sdk";

// Get user messages/conversations
const messages: ResponseDto<FindMessagesDto> = await sdk.chat.getUserMessages({
  limit: 50,
  offset: 0,
});

if (messages.status === "success") {
  console.log(`Found ${messages.data.total} conversations`);
  messages.data.data.forEach((conversation: any) => {
    console.log("Conversation with:", conversation.recipients);
    if (conversation.messages) {
      conversation.messages.forEach((message: any) => {
        console.log(`${message.sender}: ${message.content}`);
      });
    }
  });
}
```

### Notifications

```typescript
import { ResponseDto, FindNotificationsDto } from "pakt-sdk";

// Get all notifications
const notifications: ResponseDto<FindNotificationsDto> = await sdk.notifications.getAll({
  limit: 20,
  offset: 0,
});

if (notifications.status === "success") {
  console.log(`Found ${notifications.data.total} notifications`);
  notifications.data.data.forEach((notif: any) => {
    console.log(`Notification: ${notif.title} - ${notif.read ? 'Read' : 'Unread'}`);
  });
}

// Mark notifications as read
const markAllResponse: ResponseDto<any> = await sdk.notifications.markAll();
const markOneResponse: ResponseDto<any> = await sdk.notifications.markOneAsRead("notification-id");

if (markAllResponse.status === "success") {
  console.log("All notifications marked as read");
}
```

### Activity Feeds

```typescript
import { CreateFeedDto, ResponseDto, IFeedDto, FindFeedsDto } from "pakt-sdk";

// Create feed entry
const feedEntry: CreateFeedDto = {
  type: "COLLECTION_CREATED",
  title: "New Project Created",
  description: "Started working on e-commerce platform",
  isPublic: true,
  data: "collectionId",
};

const createResponse: ResponseDto<IFeedDto> = await sdk.feed.create(feedEntry);

if (createResponse.status === "success") {
  console.log("Feed entry created successfully");
  console.log("Feed ID:", createResponse.data._id);
}

// Get activity feeds
const feeds: ResponseDto<FindFeedsDto> = await sdk.feed.getAll({
  limit: 10,
  isPublic: true,
});

if (feeds.status === "success") {
  console.log(`Found ${feeds.data.total} feeds`);
  feeds.data.data.forEach((feed: any) => {
    console.log(`Feed: ${feed.title} - ${feed.type}`);
  });
}

// Dismiss feeds
const dismissOneResponse: ResponseDto<any> = await sdk.feed.dismissAFeed("feed-id");
const dismissAllResponse: ResponseDto<any> = await sdk.feed.dismissAllFeeds();

if (dismissAllResponse.status === "success") {
  console.log("All feeds dismissed successfully");
}
```

---

## File Management

### File Upload

```typescript
import { CreateFileUpload, ResponseDto, IUploadDto } from "pakt-sdk";

const fileData: CreateFileUpload = {
  file: fileBuffer, // or file data
  fileName: "document.pdf",
  fileType: "application/pdf",
};

const upload: ResponseDto<IUploadDto> = await sdk.file.fileUpload(fileData);

if (upload.status === "success") {
  console.log("File uploaded successfully");
  console.log("File ID:", upload.data._id);
  console.log("File name:", upload.data.name);
  console.log("File URL:", upload.data.url);
  console.log("Upload status:", upload.data.status);
}
```

### File Management

```typescript
import { ResponseDto, FindUploadDto, IUploadDto } from "pakt-sdk";

// Get all uploaded files
const files: ResponseDto<FindUploadDto> = await sdk.file.getFileUploads({
  limit: 20,
  offset: 0,
});

if (files.status === "success") {
  console.log(`Found ${files.data.count} files`);
  console.log(`Pages: ${files.data.pages}`);
  files.data.data.forEach((file: IUploadDto) => {
    console.log(`File: ${file.name} - ${file.url}`);
    console.log(`Status: ${file.status}`);
  });
}

// Get specific file
const file: ResponseDto<IUploadDto> = await sdk.file.getAFileUpload("file-id");

if (file.status === "success") {
  console.log("File details:", file.data);
}
```

---

## User Verification

Complete identity verification system using third-party verification services.

### Start Verification Session

```typescript
import { ICreateSessionPayload, ResponseDto, ISessionDto } from "pakt-sdk";

const verificationData: ICreateSessionPayload = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1990-01-01",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "US",
  },
  documentType: "passport", // or "driving_license", "national_id"
  documentCountry: "US",
};

const session: ResponseDto<ISessionDto> = await sdk.userVerification.createSession(verificationData);

if (session.status === "success") {
  console.log("Verification session created successfully");
  console.log("Session ID:", session.data.sessionId);
  console.log("Status:", session.data.status);
}
```

### Upload Verification Documents

```typescript
import { ISendSessionMedia, ResponseDto } from "pakt-sdk";

// Upload document photo
const documentMedia: ISendSessionMedia = {
  sessionId: "session-id",
  mediaType: "document",
  file: documentImageBuffer,
};

const documentUpload: ResponseDto<any> = await sdk.userVerification.sendSessionMedia(documentMedia);

if (documentUpload.status === "success") {
  console.log("Document uploaded successfully");
}

// Upload face photo for verification
const faceMedia: ISendSessionMedia = {
  sessionId: "session-id",
  mediaType: "face",
  file: facePhotoBuffer,
};

const faceUpload: ResponseDto<any> = await sdk.userVerification.sendSessionMedia(faceMedia);

if (faceUpload.status === "success") {
  console.log("Face photo uploaded successfully");
}
```

### Check Verification Status

```typescript
import { ResponseDto, FindSessionAttemptsDto, FindUserVerificationsDto } from "pakt-sdk";

// Get verification attempts
const attempts: ResponseDto<FindSessionAttemptsDto> = await sdk.userVerification.getSessionAttempts({
  limit: 10,
  offset: 0,
});

if (attempts.status === "success") {
  console.log(`Found ${attempts.data.total} attempts`);
  attempts.data.data.forEach((attempt: any) => {
    console.log(`Attempt: ${attempt._id} - ${attempt.status}`);
  });
}

// Get user verification status
const verifications: ResponseDto<FindUserVerificationsDto> = await sdk.userVerification.getUserVerifications({
  limit: 5,
  offset: 0,
});

if (verifications.status === "success") {
  console.log(`Found ${verifications.data.total} verifications`);
  verifications.data.data.forEach((verification: any) => {
    console.log("Status:", verification.status);
    console.log("Provider:", verification.provider);
    console.log("Document verified:", verification.documentVerified);
    console.log("Face verified:", verification.faceVerified);
  });
}
```

---

## Bookmarks

```typescript
import { createBookMarkDto, ResponseDto, IBookmarkDto, FindBookmarksDto } from "pakt-sdk";

// Create bookmark
const bookmark: createBookMarkDto = {
  data: "collectionId", // or feed-id, user-id, invite-id
  type: "collection", // or "feed", "user", "invite"
};

const createResponse: ResponseDto<IBookmarkDto> = await sdk.bookmark.create(bookmark);

if (createResponse.status === "success") {
  console.log("Bookmark created successfully");
  console.log("Bookmark ID:", createResponse.data._id);
}

// Get bookmarks
const bookmarks: ResponseDto<FindBookmarksDto> = await sdk.bookmark.getAll({
  type: "collection",
  limit: 10,
});

if (bookmarks.status === "success") {
  console.log(`Found ${bookmarks.data.total} bookmarks`);
  bookmarks.data.data.forEach((bm: any) => {
    console.log(`Bookmark: ${bm._id} - ${bm.type}`);
  });
}

// Delete bookmark
const deleteResponse: ResponseDto<any> = await sdk.bookmark.delete("bookmark-id");

if (deleteResponse.status === "success") {
  console.log("Bookmark deleted successfully");
}
```

---

## Reviews & Ratings

```typescript
import { AddReviewDto, ResponseDto, IReviewDto, FindReviewsDto } from "pakt-sdk";

// Add review for completed collection
const reviewData: AddReviewDto = {
  collectionId: "collection-id",
  receiverId: "user-id",
  rating: 5, // 1-5 scale
  text: "Excellent work, highly recommended!",
};

const addResponse: ResponseDto<IReviewDto> = await sdk.review.addReview(reviewData);

if (addResponse.status === "success") {
  console.log("Review added successfully");
  console.log("Review ID:", addResponse.data._id);
  console.log("Rating:", addResponse.data.rating);
}

// Get reviews
const reviews: ResponseDto<FindReviewsDto> = await sdk.review.viewAll({
  collectionId: "collection-id",
  limit: 10,
});

if (reviews.status === "success") {
  console.log(`Found ${reviews.data.total} reviews`);
  reviews.data.data.forEach((review: any) => {
    console.log(`Review: ${review.rating}/5 - ${review.text}`);
  });
}
```

---

## Additional Features

### Connection Filtering

```typescript
import { CreateConnectionFilterDto, ResponseDto, IConnectionFilterDto } from "pakt-sdk";

// Create automatic connection filter
const filter: CreateConnectionFilterDto = {
  event: "CREATE_CONVERSATION",
  key: "afroScore",
  value: "80",
  decider: "greater_than", // Only connect with users having score > 80
};

const createResponse: ResponseDto<IConnectionFilterDto> = await sdk.connectionFilter.create(filter);

if (createResponse.status === "success") {
  console.log("Connection filter created successfully");
  console.log("Filter ID:", createResponse.data._id);
  console.log("Event:", createResponse.data.event);
}

// Get user's connection filters
const filters: ResponseDto<IConnectionFilterDto[]> = await sdk.connectionFilter.getForAUser("user-id");

if (filters.status === "success") {
  console.log(`Found ${filters.data.length} connection filters`);
  filters.data.forEach((filter: IConnectionFilterDto) => {
    console.log(`Filter: ${filter.key} ${filter.decider} ${filter.value}`);
  });
}
```

---

## Error Handling

All SDK methods return a consistent response format:

```typescript
interface ResponseDto<T> {
  status: "success" | "error";
  message: string;
  data: T;
  statusCode?: number;
  code?: number;
}

// Example error handling
try {
  const response = await sdk.auth.login(loginData);

  if (response.status === "error") {
    console.error("Login failed:", response.message);
    return;
  }

  // Success - use response.data
  console.log("User:", response.data);
} catch (error) {
  console.error("Network or unexpected error:", error);
}
```

---

## TypeScript Support

The SDK is built with TypeScript and provides comprehensive type definitions:

```typescript
import { 
  PaktSDK, 
  LoginPayload, 
  RegisterPayload, 
  CreateCollectionDto, 
  IUser, 
  IWalletDto, 
  ResponseDto,
  LoginDto,
  BackoffOptions,
  IBackOffOptions,
  JitterType,
  Status
} from "pakt-sdk";

// All interfaces and types are available for import
const loginPayload: LoginPayload = {
  email: "user@example.com",
  password: "password",
};

// Custom backoff options for this specific call
const customBackoff: BackoffOptions = {
  numOfAttempts: 3,
  startingDelay: 500,
  jitter: "full"
};

const response: ResponseDto<LoginDto> = await sdk.auth.login(loginPayload, customBackoff);

if (response.status === Status.SUCCESS) {
  console.log("Login successful");
  console.log("User data:", response.data);
}
```

---

## Configuration Options

```typescript
import { PaktConfig, BackoffOptions } from "pakt-sdk";

interface PaktConfig {
  baseUrl: string; // Required: API base URL
  testnet?: boolean; // Optional: Use testnet environment (default: false)
  verbose?: boolean; // Optional: Enable detailed logging (default: false)
  defaultBackoff?: BackoffOptions; // Optional: Default backoff configuration
}

const sdk = await PaktSDK.init({
  baseUrl: "https://api.pakt.world",
  testnet: false,
  verbose: true,
  defaultBackoff: {
    numOfAttempts: 5,
    startingDelay: 200,
    timeMultiple: 2,
    maxDelay: 5000,
    jitter: "full",
    delayFirstAttempt: false
  }
});
```

---

## Links & Resources

- **Documentation**: [https://pakt-1.gitbook.io/pakt-sdk/web-sdk/overview/getting-started](https://pakt-1.gitbook.io/pakt-sdk/web-sdk/overview/getting-started)
- **Sample Project**: [https://github.com/Jendorski/PAKT-SDK-Sample](https://github.com/Jendorski/PAKT-SDK-Sample)
- **PAKT Platform**: [https://www.pakt.world](https://www.pakt.world)
- **Issues**: [https://github.com/pakt-world/PaktSDK/issues](https://github.com/pakt-world/PaktSDK/issues)

---

## License

BSD-3-Clause © PAKT
