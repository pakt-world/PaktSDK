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
import { PaktSDK } from "pakt-sdk";

const sdk = await PaktSDK.init({
  baseUrl: "https://api.pakt.world", // Required: API base URL
  verbose: true, // Optional: Enable detailed logging
  testnet: false, // Optional: Use testnet environment
});

// Now you can use all SDK features
const loginResponse = await sdk.auth.login({
  email: "user@example.com",
  password: "yourpassword",
});
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
import { LoginPayload } from "pakt-sdk";

const loginData: LoginPayload = {
  email: "user@example.com",
  password: "yourpassword",
};

const sdkInit = await PaktSDK.init(configData);
const response = await sdk.auth.login(loginData);

if (response.status === "success") {
  console.log("Logged in successfully");
  console.log("User data:", response.data);
  // Token is automatically stored for subsequent requests
}
```

### Login With TwoFA

```typescript
import { LoginTwoFAPayload } from "pakt-sdk";

const loginData: LoginTwoFAPayload = {
  code: "123456",
  tempToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWJlYTQRmZWQ4IiwiaWF0IjoxNzA0Nzg3MjkwLCJleHAiOjE3Nzc4NjAwMzB9.cPkZ-",
};

const sdkInit = await PaktSDK.init(configData);
const response = await sdk.auth.loginTwoFa(loginData);

if (response.status === "success") {
  console.log("Logged in successfully");
  console.log("User data:", response.data);
  // Token is automatically stored for subsequent requests
}
```

### Registration

```typescript
import { RegisterPayload } from "pakt-sdk";

const registrationData: RegisterPayload = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "securepassword",
  confirmPassword: "securepassword",
  referral: "optional-referral-code", // Optional
  type: "talent", // Optional: "talent" or "business"
};

const sdkInit = await PaktSDK.init(configData);

const response = await sdk.auth.register(registrationData);

if (response.status === "success") {
  // Registration successful, but account needs verification
  console.log("Registration successful, check email for verification");
}
```

### Account Verification

After registration, users need to verify their account:

```typescript
const verificationResponse = await sdk.auth.verifyAccount({
  tempToken: "token-from-registration",
  token: "verification-token-from-email",
});

if (verificationResponse.status === "success") {
  console.log("Account verified successfully");
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

#### Resend Reset Password

If the initial password reset email is not received, you can resend it:

```typescript
import { ResetPasswordPayload, ResponseDto, ResetDto } from "pakt-sdk";

const resendData: ResetPasswordPayload = {
  email: "user@example.com",
};

const response: ResponseDto<ResetDto> = await sdk.auth.resendResetPassword(resendData);

if (response.status === "success") {
  console.log("Reset password email resent successfully");
  console.log("Temp token:", response.data.tempToken.token);
  console.log("Token type:", response.data.tempToken.token_type);
  console.log("Expires in:", response.data.tempToken.expiresIn);
}
```

### Google OAuth Integration

```typescript
// Step 1: Generate OAuth URL
const oauthResponse = await sdk.auth.googleOAuthGenerateState();
const { googleAuthUrl, state } = oauthResponse.data;

// Redirect user to googleAuthUrl

// Step 2: Validate OAuth callback
const validationResponse = await sdk.auth.googleOAuthValidateState({
  state: "state-from-step-1",
  code: "authorization-code-from-callback",
});

if (validationResponse.data.type === "sign_up") {
  // New user registered via Google
} else {
  // Existing user signed in
}
```

### Referral Validation

```typescript
const referralResponse = await sdk.auth.validateReferral("referral-token");

if (referralResponse.data.valid) {
  console.log(`Valid referral from user ${referralResponse.data.userId}`);
  console.log(
    `Referral counts: ${referralResponse.data.referralCounts}/${referralResponse.data.totalAllowedReferrals}`,
  );
}
```

## Account Management

### Example

### Get Current User Profile

```typescript
const userProfile = await sdk.account.getUser();
console.log("Current user:", userProfile.data);
```

### Update User Profile

```typescript
import { UpdateUserDto } from "pakt-sdk";

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

const response = await sdk.account.updateAccount(profileUpdate);
```

### User Onboarding

Complete the initial onboarding process:

```typescript
import { UserOnboardDto } from "pakt-sdk";

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

await sdk.account.onboardEndpoint(onboardingData);
```

### Two-Factor Authentication (2FA)

#### Setup 2FA

```typescript
// Initiate 2FA setup
const twoFAResponse = await sdk.account.initate2FA({
  type: "google_auth", // or "email"
  password: "current-password",
});

// For Google Authenticator, use the provided QR code
console.log("QR Code:", twoFAResponse.data.qrCode);

// Activate 2FA with verification code
await sdk.account.activate2FA({
  code: "123456", // Code from authenticator app
  type: "google_auth",
});
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

````typescript
import { FilterUserDto } from "pakt-sdk";

const searchFilters: FilterUserDto = {
  tags: ["React", "Node.js"],
  type: "talent",
  scoreRange: { min: 80, max: 100 },
  limit: 20,
  offset: 0,
};

const users = await sdk.account.getUsers(searchFilters);
`````

---

## Collections (Projects)

Collections are the core entity representing projects, jobs, or collaborative work in the PAKT ecosystem.

### Create a Collection

```typescript
import { CreateCollectionDto } from "pakt-sdk";

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

const collection = await sdk.collection.create(newCollection);
console.log("Collection created:", collection.data._id);
```

### Get Collections

```typescript
// Get all collections with filters
const collections = await sdk.collection.getAll({
  status: "ongoing",
  limit: 10,
  offset: 0,
});

// Get specific collection
const collection = await sdk.collection.getById("collectionId");
```

### Update Collection

`````typescript
import { UpdateCollectionDto } from "pakt-sdk";

const updates: UpdateCollectionDto = {
  description: "Updated project description",
  status: "ongoing",
  deliveryDate: new Date("2024-12-31"),
};

await sdk.collection.updateCollection("collection-id", updates);
```

### Collection Types

````typescript
// Get all available collection types
const types = await sdk.collection.getTypes();

// Get specific collection type
const type = await sdk.collection.getACollectionType("_id");
`````

### Bulk Operations

```typescript
// Create multiple collections
const collectionsData = [
  /* array of CreateCollectionDto */
];
await sdk.collection.createMany(collectionsData);

// Update multiple collections
const updates = [
  /* array of updates with IDs */
];
await sdk.collection.updateManyCollections(updates);
```

---

## Wallet & Payments

Comprehensive blockchain-based payment system with multi-cryptocurrency support.

### Wallet Management

```typescript
// Get all user wallets
const wallets = await sdk.wallet.getWallets();

wallets.data.forEach((wallet) => {
  console.log(`${wallet.coin.toUpperCase()}: $${wallet.balance.spendable} available`);
  console.log(`Locked: $${wallet.balance.locked}`);
});

// Get specific wallet by cryptocurrency
const usdcWallet = await sdk.wallet.getSingleWalletByCoin("usdc");
const avaxWallet = await sdk.wallet.getSingleWalletByCoin("avax");
```

### Payment Processing

```typescript
import { ICreatePaymentDto } from "pakt-sdk";

// Create payment order
const paymentOrder: ICreatePaymentDto = {
  coin: "usdc", // or "avax"
  collectionId: "collectionId",
};

const payment = await sdk.payment.create(paymentOrder);

if (payment.status === "success") {
  console.log("Payment order created");
  console.log("Amount to pay:", payment.data.amount);
  console.log("Blockchain address:", payment.data.address);
  console.log("Required confirmations:", payment.data.confirmation);
}
```

### Payment Validation & Release

```typescript
// Validate payment transaction
const validation = await sdk.payment.validate({
  paymentId: "payment-id",
  transactionHash: "blockchain-tx-hash",
});

// Release escrowed payment (for collection completion)
await sdk.payment.release({
  collectionId: "collectionId",
  recipientId: "user-id",
});
```

### Transaction History

```typescript
// Get all transactions
const transactions = await sdk.wallet.getTransactions({
  limit: 50,
  offset: 0,
  type: "sent", // Optional: filter by transaction type
});

// Get specific transaction
const transaction = await sdk.wallet.getATransaction("transaction-id");

// Get transaction statistics
const stats = await sdk.wallet.getTransactionStats("usdc");
console.log("Total sent:", stats.data.totalSent);
console.log("Total received:", stats.data.totalReceived);
```

### Cryptocurrency Exchange Rates

```typescript
// Get current exchange rates
const exchange = await sdk.wallet.getExchange();

console.log("USDC to USD:", exchange.data.usdc.usd);
console.log("AVAX to USD:", exchange.data.avax.usd);
```

### Withdrawals

```typescript
import { CreateWithdrawal } from "pakt-sdk";

const withdrawalRequest: CreateWithdrawal = {
  coin: "usdc",
  amount: 100.5,
  address: "0x742d35Cc6634C0532925a3b8D6cf1C4394c64DF8",
  password: "account-password",
};

const withdrawal = await sdk.withdrawal.createWithdrawal(withdrawalRequest);

// Check withdrawal status
const withdrawals = await sdk.withdrawal.fetchWithdrawal({
  limit: 10,
  offset: 0,
});
```

---

## Direct Deposits

Direct deposits allow for streamlined collection funding and validation without going through the traditional escrow process.

### Create Direct Deposit

```typescript
import { ICreateDirectDepositPayload } from "pakt-sdk";

const directDepositData: ICreateDirectDepositPayload = {
  collectionType: "development-project",
  amount: 1000,
  coin: "usdc", // or "avax"
  name: "Project Direct Funding",
  description: "Direct deposit for project completion",
  owner: "user-id",
  systemDeposit: true,
};

const directDeposit = await sdk.directDeposit.createDirectDeposit({
  authToken: "your-auth-token",
  payload: directDepositData,
});

if (directDeposit.status === "success") {
  console.log("Direct deposit created");
  console.log("Collection ID:", directDeposit.data.collectionId);
  console.log("Payment address:", directDeposit.data.address);
  console.log("Amount to pay:", directDeposit.data.amountToPay);
  console.log("Expected fee:", directDeposit.data.expectedFee);
  console.log("Chain ID:", directDeposit.data.chainId);
}
```

### Validate Direct Deposit

```typescript
import { IValidateDirectDepositPayload } from "pakt-sdk";

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

const validation = await sdk.directDeposit.validateDirectDeposit({
  authToken: "your-auth-token",
  payload: validationData,
});

if (validation.status === "success") {
  console.log("Direct deposit validated");
  console.log("Collection updated:", validation.data);
}
```

### Get Payment Methods

```typescript
// Get available blockchain payment methods for direct deposits
const paymentMethods = await sdk.directDeposit.fetchPaymentMethods("your-auth-token");

paymentMethods.data.forEach((coin) => {
  console.log(`${coin.name} (${coin.symbol})`);
  console.log(`Contract: ${coin.contractAddress}`);
  console.log(`Chain ID: ${coin.rpcChainId}`);
  console.log(`Active: ${coin.active}`);
});
```

### Get Active RPC Configuration

```typescript
// Get current blockchain RPC server configuration
const rpcConfig = await sdk.directDeposit.fetchActiveRPC("your-auth-token");

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
import { SendInviteDto } from "pakt-sdk";

// Send invite
const inviteData: SendInviteDto = {
  receiverId: "user-id",
  collectionId: "project-id",
};

const invite = await sdk.invite.sendInvite(inviteData);

// Manage invites
await sdk.invite.acceptInvite("invite-id");
await sdk.invite.declineInvite("invite-id");
await sdk.invite.cancelInvite("invite-id");

// Get all invites
const invites = await sdk.invite.getAll({
  status: "pending",
  limit: 10,
});
```

### Chat System

```typescript
// Get user messages/conversations
const messages = await sdk.chat.getUserMessages({
  limit: 50,
  offset: 0,
});

messages.data.forEach((conversation) => {
  console.log("Conversation with:", conversation.recipients);
  conversation.messages.forEach((message) => {
    console.log(`${message.sender}: ${message.content}`);
  });
});
```

### Notifications

```typescript
// Get all notifications
const notifications = await sdk.notifications.getAll({
  limit: 20,
  offset: 0,
});

// Mark notifications as read
await sdk.notifications.markAll(); // Mark all as read
await sdk.notifications.markOneAsRead("notification-id"); // Mark specific notification
```

### Activity Feeds

```typescript
import { CreateFeedDto } from "pakt-sdk";

// Create feed entry
const feedEntry: CreateFeedDto = {
  type: "COLLECTION_CREATED",
  title: "New Project Created",
  description: "Started working on e-commerce platform",
  isPublic: true,
  data: "collectionId",
};

await sdk.feed.create(feedEntry);

// Get activity feeds
const feeds = await sdk.feed.getAll({
  limit: 10,
  isPublic: true,
});

// Dismiss feeds
await sdk.feed.dismissAFeed("feed-id");
await sdk.feed.dismissAllFeeds();
```

---

## File Management

### File Upload

```typescript
import { CreateFileUpload } from "pakt-sdk";

const fileData: CreateFileUpload = {
  file: fileBuffer, // or file data
  fileName: "document.pdf",
  fileType: "application/pdf",
};

const upload = await sdk.file.fileUpload(fileData);
console.log("File uploaded:", upload.data.url);
```

### File Management

```typescript
// Get all uploaded files
const files = await sdk.file.getFileUploads({
  limit: 20,
  offset: 0,
});

// Get specific file
const file = await sdk.file.getAFileUpload("file-id");
```

---

## User Verification

Complete identity verification system using third-party verification services.

### Start Verification Session

```typescript
import { ICreateSessionPayload } from "pakt-sdk";

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

const session = await sdk.userVerification.createSession(verificationData);
console.log("Verification session created:", session.data.sessionId);
```

### Upload Verification Documents

```typescript
import { ISendSessionMedia } from "pakt-sdk";

// Upload document photo
const documentMedia: ISendSessionMedia = {
  sessionId: "session-id",
  mediaType: "document",
  file: documentImageBuffer,
};

await sdk.userVerification.sendSessionMedia(documentMedia);

// Upload face photo for verification
const faceMedia: ISendSessionMedia = {
  sessionId: "session-id",
  mediaType: "face",
  file: facePhotoBuffer,
};

await sdk.userVerification.sendSessionMedia(faceMedia);
```

### Check Verification Status

```typescript
// Get verification attempts
const attempts = await sdk.userVerification.getSessionAttempts({
  limit: 10,
  offset: 0,
});

// Get user verification status
const verifications = await sdk.userVerification.getUserVerifications({
  limit: 5,
  offset: 0,
});

verifications.data.forEach((verification) => {
  console.log("Status:", verification.status);
  console.log("Provider:", verification.provider);
  console.log("Document verified:", verification.documentVerified);
  console.log("Face verified:", verification.faceVerified);
});
```

---

## Bookmarks

```typescript
import { createBookMarkDto } from "pakt-sdk";

// Create bookmark
const bookmark: createBookMarkDto = {
  data: "collectionId", // or feed-id, user-id, invite-id
  type: "collection", // or "feed", "user", "invite"
};

await sdk.bookmark.create(bookmark);

// Get bookmarks
const bookmarks = await sdk.bookmark.getAll({
  type: "collection",
  limit: 10,
});

// Delete bookmark
await sdk.bookmark.delete("bookmark-id");
```

---

## Reviews & Ratings

```typescript
import { AddReviewDto } from "pakt-sdk";

// Add review for completed collection
const reviewData: AddReviewDto = {
  collectionId: "collection-id",
  receiverId: "user-id",
  rating: 5, // 1-5 scale
  text: "Excellent work, highly recommended!",
};

await sdk.review.addReview(reviewData);

// Get reviews
const reviews = await sdk.review.viewAll({
  collectionId: "collection-id",
  limit: 10,
});
```

---

## Additional Features

### Connection Filtering

```typescript
import { CreateConnectionFilterDto } from "pakt-sdk";

// Create automatic connection filter
const filter: CreateConnectionFilterDto = {
  event: "CREATE_CONVERSATION",
  key: "afroScore",
  value: "80",
  decider: "greater_than", // Only connect with users having score > 80
};

await sdk.connectionFilter.create(filter);

// Get user's connection filters
const filters = await sdk.connectionFilter.getForAUser("user-id");
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
import { PaktSDK, LoginPayload, RegisterPayload, CreateCollectionDto, IUser, IWalletDto, ResponseDto } from "pakt-sdk";

// All interfaces and types are available for import
const loginPayload: LoginPayload = {
  email: "user@example.com",
  password: "password",
};

const response: ResponseDto<LoginDto> = await sdk.auth.login(loginPayload);
```

---

## Configuration Options

```typescript
interface PaktConfig {
  baseUrl: string; // Required: API base URL
  testnet?: boolean; // Optional: Use testnet environment (default: false)
  verbose?: boolean; // Optional: Enable detailed logging (default: false)
}

const sdk = await PaktSDK.init({
  baseUrl: "https://api.pakt.world",
  testnet: false,
  verbose: true,
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
