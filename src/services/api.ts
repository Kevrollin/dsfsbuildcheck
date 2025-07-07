import getPublicKey, { signTransaction } from "@stellar/freighter-api";

const BASE_URL = "http://studybae.online:8000/api"; 

interface AuthResponse {
  message: string;
  token?: string;
  challenge?: ChallengeResponse;
}

interface ChallengeResponse {
  type: string; // Example: "OTP", "Signature"
  challengeToken: string;
}

// Connect Wallet for Login
export const connectWalletLogin = async (): Promise<AuthResponse> => {
  try {
    // Get wallet address
    const { address: publicKey, error } = await getPublicKey.getAddress();

    if (error || !publicKey) throw new Error("Wallet connection failed");

    const response = await fetch(`${BASE_URL}/wallet-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicKey }),
    });

    return await response.json();
  } catch (error: any) {
    return { message: error.message };
  }
};

// Connect Wallet for Registration
export const connectWalletRegister = async (email: string): Promise<AuthResponse> => {
  try {
    // Get wallet address
    const { address: publicKey, error } = await getPublicKey.getAddress();

    if (error || !publicKey) throw new Error("Wallet connection failed");

    const response = await fetch(`${BASE_URL}/wallet-register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicKey, email }),
    });

    return await response.json();
  } catch (error: any) {
    return { message: error.message };
  }
};

// Handle Signature Challenge Response
export const submitSignatureChallenge = async (challengeToken: string): Promise<AuthResponse> => {
  try {
    // Sign challenge using Freighter
    const signedTransaction = await signTransaction(challengeToken, { networkPassphrase: "Test SDF Network ; September 2015" });

    const response = await fetch(`${BASE_URL}/verify-signature`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ signedTransaction }),
    });

    return await response.json();
  } catch (error: any) {
    return { message: error.message };
  }
};
