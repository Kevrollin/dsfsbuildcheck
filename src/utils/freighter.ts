// Simple Freighter wallet utilities for MVP

export const checkFreighterAvailability = async (): Promise<boolean> => {
  return !!window.freighter;
};

export const connectFreighterWallet = async () => {
  if (!window.freighter) {
    throw new Error('Freighter wallet not found');
  }

  try {
    if (typeof window.freighter.requestAccess !== 'function') {
      throw new Error('Freighter requestAccess not available');
    }
    if (typeof window.freighter.getNetwork !== 'function') {
      throw new Error('Freighter getNetwork not available');
    }
    const publicKey = await window.freighter.requestAccess();
    const network = await window.freighter.getNetwork();
    return { publicKey, network };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to connect wallet');
  }
};