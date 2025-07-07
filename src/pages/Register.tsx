{/* @ts-nocheck 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectFreighterWallet} from "../utils/freighter";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    yearOfStudy: "",
    course: "",
    country: "",
    bio: "",
    password: "",
    walletAddress: ""
  });

  const handleRoleSelection = (role: string) => setSelectedRole(role);

  const handleWalletConnect = async () => {
    setIsConnecting(true);
    try {
      const walletData = await connectFreighterWallet();
      setFormData({ ...formData, walletAddress: walletData.publicKey });
    } catch {
      setError("Failed to connect wallet.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  if (!selectedRole) return setError("Select a role before registering.");
  if ((selectedRole === "student" || selectedRole === "donor") && !formData.walletAddress)
    return setError("Wallet connection is required.");

  try {
    const response = await fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, role: selectedRole }),
    });

    const data = await response.json();

    if (response.ok) {
      navigate("/login");
    } else {
      setError(data.message || "Registration failed. Try again.");
    }
  } catch (error) {
    setError("Error registering. Please check your details.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600">Create Account</h2>

        
        <div className="mt-4 flex space-x-2">
          {["student", "donor", "admin"].map((role) => (
            <button key={role} onClick={() => handleRoleSelection(role)} className={`flex-1 py-2 rounded-md ${selectedRole === role ? "bg-indigo-600 text-white" : "bg-gray-200"}`}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        {error && <p className="mt-3 p-2 text-red-600 bg-red-100 text-center rounded">{error}</p>}

        {/* Wallet Connection for Students & Donors /}
        {selectedRole && selectedRole !== "admin" && (
          <>
            <button onClick={handleWalletConnect} className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md">
              {isConnecting ? "Connecting..." : "Connect Stellar Wallet"}
            </button>
            {formData.walletAddress && (
              <div className="mt-2 text-xs text-green-700 bg-green-100 rounded p-2 break-all">
                Wallet Connected: {formData.walletAddress}
              </div>
            )}
          </>
        )}

        {/* Registration Form /}
        <form onSubmit={handleRegister} className="mt-4 space-y-3">
          <label className="block">Full Name</label>
          <input type="text" name="name" className="w-full p-2 border rounded-md" required onChange={handleChange} />

          <label className="block">Email</label>
          <input type="email" name="email" className="w-full p-2 border rounded-md" required onChange={handleChange} />

          {selectedRole !== "admin" && (
            <>
              
              {selectedRole === "student" && (
                <>
                  <label className="block">Institution</label>
                  <input type="text" name="institution" className="w-full p-2 border rounded-md" required onChange={handleChange} />

                  <label className="block">Year of Study</label>
                  <input type="text" name="yearOfStudy" className="w-full p-2 border rounded-md" required onChange={handleChange} />

                  <label className="block">Course of Study</label>
                  <input type="text" name="course" className="w-full p-2 border rounded-md" required onChange={handleChange} />

                  <label className="block">Country</label>
                  <input type="text" name="country" className="w-full p-2 border rounded-md" required onChange={handleChange} />

                  <label className="block">Bio</label>
                  <textarea name="bio" className="w-full p-2 border rounded-md" required onChange={handleChange} />
                </>
              )}
            </>
          )}

          {selectedRole === "admin" && (
            <>
              <label className="block">Password</label>
              <input type="password" name="password" className="w-full p-2 border rounded-md" required onChange={handleChange} />
            </>
          )}

          <button type="submit" className="mt-3 w-full py-2 bg-indigo-600 text-white rounded-md">
            Register
          </button>
        </form>

        <p className="mt-3 text-center">Already have an account? <a href="/login" className="text-indigo-600">Login</a></p>
      </div>
    </div>
  );
};



export default Register;


*/}