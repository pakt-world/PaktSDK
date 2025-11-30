export interface PaktConfig {
  baseUrl: string;
  accessToken?: string;
  testnet?: boolean;
  verbose?: boolean;
}

export const encryptString = (authKey: string) => {
  const key = CryptoJS.enc.Utf8.parse(String(authKey));
  const encrypted = CryptoJS.AES.encrypt(
    `${authKey}::${Date.now()}`,
    key.toString()
  );
  return { "x-api-key": encrypted.toString() };
};
