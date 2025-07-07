// Payment Transaction Builder
import { TransactionBuilder, Operation, Asset } from '@stellar/stellar-sdk';
import { networkPassphrase, getAccountInfo } from './stellar';

export interface PaymentParams {
  fromPublicKey: string;
  toPublicKey: string;
  amount: string;
  memo?: string;
}

export const createPaymentTransaction = async (params: PaymentParams) => {
  try {
    // Load sender account
    const senderAccount = await getAccountInfo(params.fromPublicKey);
    
    // Build transaction
    const transaction = new TransactionBuilder(senderAccount as any, {
      fee: '100000', // 0.01 XLM fee
      networkPassphrase,
    })
      .addOperation(
        Operation.payment({
          destination: params.toPublicKey,
          asset: Asset.native(), // XLM
          amount: params.amount,
        })
      )
      .setTimeout(30) // 30 seconds timeout
      .build();

  
    return transaction.toXDR();
  } catch (error) {
    console.error('Error creating payment transaction:', error);
    throw error;
  }
};

export const submitPaymentWithFreighter = async (params: PaymentParams) => {
  try {
    // Create transaction XDR
    const transactionXDR = await createPaymentTransaction(params);
    // Sign with Freighter
    if (!window.freighter || typeof window.freighter.signTransaction !== 'function') {
      throw new Error('Freighter wallet not available or signTransaction not supported');
    }
    const signedTransaction = await window.freighter.signTransaction(
      transactionXDR,
      networkPassphrase
    );
    // Mock submit to network for MVP
    const result = { hash: 'mockHash', result: 'mockResult' };
    return {
      success: true,
      hash: result.hash,
      result: result,
      signedTransaction,
    };
  } catch (error) {
    console.error('Payment failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment failed',
    };
  }
};