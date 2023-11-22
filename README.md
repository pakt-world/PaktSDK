![Alt PAKT](./PAKT_SDK.png)

# PAKT

[![Npm package version](https://badgen.net/npm/v/pakt-sdk)](https://www.npmjs.com/package/pakt-sdk)
[![Npm package monthly downloads](https://badgen.net/npm/dt/pakt-sdk)](https://npmjs.ccom/package/pakt-sdk)
[![Latest release](https://badgen.net/github/release/pakt-world/PaktSDK)](https://github.com/pakt-world/PaktSDK/releases)
[![Npm package license](https://badgen.net/npm/license/pakt-sdk)](https://npmjs.com/package/pakt-sdk)

PAKT SDK is a modern software development kit, built for NodeJs.

## Installation

To install PAKT SDK, simply

`npm install pakt-sdk`

`yarn add pakt-sdk`

> :warning: Ensure you are registered on www.pakt.world, with a paid and activated chainsite.

## Initialization

See below the code block for initialization

```typescript
//Typescript
import PaktSDK from "pakt-sdk";

const apiKey = config.PAKT_SDK_API_KEY;
const configData: PaktConfig = {
  token: apiKey,
  verbose: true,
};

const sdkInit = await PaktSDK.init(configData);
```

```javascript
//Javascript
const PaktSDK = require("pakt-sdk");

const apiKey = config.PAKT_SDK_API_KEY;
const configData = {
  token: apiKey,
  verbose: true,
};
const sdkInit = await PaktSDK.init(configData);
```

The above code initializes the PAKT SDK and ensures the API KEY is generated on www.pakt.world.

---

If you want to learn how to use the PAKT SDK, visit this link for the [documentation & guide.](https://pakt-1.gitbook.io/pakt-sdk/web-sdk/overview/getting-started)

# Table of Contents

[Authentication](https://docs.pakt.world/pakt/web-sdk/overview/references/authentication)

[Account](https://docs.pakt.world/pakt/web-sdk/overview/references/account)

[Notification](https://docs.pakt.world/pakt/web-sdk/overview/references/notifications)

[Upload](https://docs.pakt.world/pakt/web-sdk/overview/references/upload)

[Review](https://docs.pakt.world/pakt/web-sdk/overview/references/reviews)

[Wallet](https://docs.pakt.world/pakt/web-sdk/overview/references/wallet)

[Withdrawal](https://docs.pakt.world/pakt/web-sdk/overview/references/wallet/withdrawal)

[Collections](https://docs.pakt.world/pakt/web-sdk/overview/references/collections)

[Bookmarks](https://docs.pakt.world/pakt/web-sdk/overview/references/bookmarks)

[Verification](https://docs.pakt.world/pakt/web-sdk/overview/references/verification)

[Connection Filter](https://docs.pakt.world/pakt/web-sdk/overview/references/connection-filters)

[Invite](https://docs.pakt.world/pakt/web-sdk/overview/references/invite)

[Chat](https://docs.pakt.world/pakt/web-sdk/overview/references/messaging-wip)

## Example

Explore our example project which effectively demonstrates the practical application of our SDK:
[Sample Project](https://github.com/Jendorski/PAKT-SDK-Sample)
