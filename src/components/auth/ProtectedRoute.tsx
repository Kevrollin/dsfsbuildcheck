import React from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import WalletConnection from '../WalletConnection';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="auth-required">
        <h2>Connect Your Wallet</h2>
        <p>Please connect your Stellar wallet to continue</p>
        <WalletConnection onConnect={(publicKey) => login(publicKey, "mockNetwork", "student")} />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
