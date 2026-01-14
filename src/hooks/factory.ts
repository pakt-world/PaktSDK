import { PaktSDK } from "../services";

/**
 * Singleton class for managing SDK instance and auth token.
 * Provides a centralized way for hooks to access the SDK instance and token.
 */
class SDKFactory {
  private sdkInstance: PaktSDK | null = null;
  private authToken: string | null = null;

  /**
   * Store SDK instance for hooks to use.
   * Call this after initializing SDK with PaktSDK.init()
   * @param sdk - The initialized PaktSDK instance
   */
  setSDK(sdk: PaktSDK): void {
    this.sdkInstance = sdk;
  }

  /**
   * Retrieve the stored SDK instance.
   * @throws Error if SDK instance has not been set
   * @returns The stored PaktSDK instance
   */
  getSDK(): PaktSDK {
    if (!this.sdkInstance) {
      throw new Error("SDK instance not set. Call setSDK() after initializing with PaktSDK.init()");
    }
    return this.sdkInstance;
  }

  /**
   * Store auth token for hooks to use.
   * @param token - The authentication token
   */
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  /**
   * Retrieve the stored auth token.
   * @returns The stored auth token or null if not set
   */
  getToken(): string | null {
    return this.authToken;
  }

  /**
   * Clear SDK instance and auth token.
   * Useful for testing or logout scenarios.
   */
  reset(): void {
    this.sdkInstance = null;
    this.authToken = null;
  }
}

// Export singleton instance
const sdkFactory = new SDKFactory();

// Export convenience functions that delegate to the singleton instance
export function setSDK(sdk: PaktSDK): void {
  sdkFactory.setSDK(sdk);
}

export function getSDK(): PaktSDK {
  return sdkFactory.getSDK();
}

export function setAuthToken(token: string): void {
  sdkFactory.setAuthToken(token);
}

export function getToken(): string | null {
  return sdkFactory.getToken();
}

export function reset(): void {
  sdkFactory.reset();
}
