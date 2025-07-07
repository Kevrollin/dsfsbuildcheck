export const networkPassphrase = "Test SDF Network ; September 2015";

// Mock functions for MVP testing
export const getAccountInfo = async (publicKey: string) => {
  // Mock a minimal Account object for TransactionBuilder
  return {
    accountId: () => publicKey,
    sequenceNumber: () => "0",
    incrementSequenceNumber: () => {},
  } as any;
};

export const getAccountBalance = async (publicKey: string): Promise<string> => {
  console.log('Mock: Getting balance for', publicKey);
  return '100.0000000'; // Mock balance
};

// TODO: Add real Stellar SDK integration later
// Uncomment the following lines to use the Stellar SDK when ready
/*
import { Server, Networks } from "@stellar/stellar-sdk";
export const server = new Server("https://horizon-testnet.stellar.org");
*/