import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { connectFreighterWallet, checkFreighterAvailability } from '../utils/freighter';

const Login: React.FC = () => {
  const { isAuthenticated, login, user } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFreighterAvailable, setIsFreighterAvailable] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const checkWallet = async () => {
      const available = await checkFreighterAvailability();
      setIsFreighterAvailable(available);
    };
    checkWallet();
  }, []);

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
    setError(null);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setError(null);
  };

  const handleWalletConnect = async () => {
    if (!selectedRole) {
      setError("Please select a role before connecting your wallet.");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const walletData = await connectFreighterWallet();
      login(walletData.publicKey, walletData.network, selectedRole);
      if (selectedRole === "student") {
        navigate("/dashboard");
      } else if (selectedRole === "donor") {
        navigate("/dashboard-d");
      }
    } catch (err: any) {
      setError("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleAdminLogin = (event: React.FormEvent) => {
    event.preventDefault();
    login("admin", "admin", "admin");
    navigate('/admin-panel');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        {!selectedRole ? (
          <>
            <p className="text-sm text-gray-500 text-center mt-2">
              Select your role to login to the platform.
            </p>
            {/* Role Selection */}
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => handleRoleSelection("student")}
                className="px-4 py-2 rounded-md transition bg-gray-200 text-gray-700 hover:bg-indigo-100"
              >
                Student
              </button>
              <button
                onClick={() => handleRoleSelection("donor")}
                className="px-4 py-2 rounded-md transition bg-gray-200 text-gray-700 hover:bg-indigo-100"
              >
                Donor
              </button>
              <button
                onClick={() => handleRoleSelection("admin")}
                className="px-4 py-2 rounded-md transition bg-gray-200 text-gray-700 hover:bg-indigo-100"
              >
                Admin
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={handleBack}
              className="mb-4 px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition"
            >
              ← Back
            </button>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            {/* Wallet Connection for Students & Donors */}
            {(selectedRole === "student" || selectedRole === "donor") && (
              <div className="mt-2">
                {!isFreighterAvailable ? (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      Freighter wallet is required to login.
                    </p>
                    <button
                      onClick={() => window.open('https://freighter.app/', '_blank')}
                      className="w-full px-4 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition font-medium"
                    >
                      Install Freighter Wallet
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleWalletConnect}
                    disabled={isConnecting}
                    className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 transition font-medium flex items-center justify-center"
                  >
                    {isConnecting ? "Connecting..." : `Login as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
                  </button>
                )}
              </div>
            )}
            {/* Admin Login Form */}
            {selectedRole === "admin" && (
              <form onSubmit={handleAdminLogin} className="mt-2">
                <input type="email" placeholder="Admin Email" className="w-full px-4 py-3 border rounded-md mb-2" required />
                <input type="password" placeholder="Password" className="w-full px-4 py-3 border rounded-md mb-2" required />
                <button type="submit" className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition font-medium">
                  Login as Admin
                </button>
              </form>
            )}
          </>
        )}
        {/* Redirect to Registration (only show if not admin form) */}
        {/* {(!selectedRole || selectedRole !== "admin") && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">New to the platform?</p>
            <button
              onClick={() => navigate('/register')}
              className="mt-2 px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Create Student Profile
            </button>
          </div>
        )} */}
        {/* Display User Info When Connected */}
        {user && (
          <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-md text-center">
            <p className="text-xs text-green-700">Connected as: {user.publicKey?.substring(0, 12)}...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
