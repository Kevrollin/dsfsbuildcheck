// components/WalletConnection.tsx
import React, { useState, useEffect } from 'react';
import { connectFreighterWallet, checkFreighterAvailability } from '../utils/freighter';

interface WalletConnectionProps {
  onConnect: (publicKey: string) => void;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ onConnect }) => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [freighterAvailable, setFreighterAvailable] = useState(false);

  useEffect(() => {
    checkFreighterAvailability().then(setFreighterAvailable);
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const { publicKey } = await connectFreighterWallet();
      setPublicKey(publicKey);
      onConnect(publicKey);
    } finally {
    setIsConnecting(false);
    }
  };

  if (!freighterAvailable) {
    return (
      <div className="wallet-error">
        <p>Freighter wallet not found!</p>
        <a href="https://freighter.app/" target="_blank" rel="noopener noreferrer">
          Install Freighter Wallet
        </a>
      </div>
    );
  }

  return (
    <div className="wallet-connection">
      {!publicKey ? (
        <button 
          onClick={handleConnect} 
          disabled={isConnecting}
          className="connect-btn"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="wallet-connected">
          <p>Connected: {publicKey.slice(0, 8)}...{publicKey.slice(-8)}</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnection;