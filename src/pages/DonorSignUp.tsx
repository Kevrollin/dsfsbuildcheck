import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthAsideCarousel from "../components/AuthAsideCarousel";
import AuthFormWrapper from "../components/AuthFormWrapper";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import FloatingLabelInput from "../components/ui/floating-label-input";
import { Check, Loader2, XCircle, CheckCircle } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const DonorSignUp: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
    walletAddress: "",
    walletMode: "none", // 'none' | 'add'
  });
  const [error, setError] = useState<string | null>(null);
  const [showWallet, setShowWallet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleWalletMode = () => {
    setForm({ ...form, walletMode: "add", walletAddress: "" });
    setShowWallet(true);
    setError(null);
  };

  const handlePasteWallet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, walletAddress: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    if (!form.email || !form.phone || !form.password) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Sign up failed!",
          description: "Please fill in all required fields.",
          variant: "destructive",
          icon: <motion.span initial={{ x: -30, rotate: -20, scale: 0 }} animate={{ x: 0, rotate: 0, scale: 1 }} transition={{ type: 'spring', bounce: 0.6 }}><XCircle className="text-red-500" /></motion.span>
        });
      }, 800);
      return;
    }
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast({
        title: "Sign up successful!",
        description: "Welcome to DSFS.",
        variant: "default",
        icon: <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.6 }}><CheckCircle className="text-green-500" /></motion.span>
      });
      setTimeout(() => setSuccess(false), 2000);
    }, 1500);
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-indigo-700 via-blue-600 to-blue-400 dark:from-gray-950 dark:via-indigo-950 dark:to-blue-900 overflow-hidden">
      {/* Aside with carousel */}
      <div className="hidden md:flex w-1/2 h-full">
        <AuthAsideCarousel />
      </div>
      {/* Divider for large screens */}
      <div className="hidden md:block w-px bg-indigo-200 dark:bg-indigo-900 h-full" />
      {/* Main content */}
      <div className={`flex flex-col justify-center items-center w-full md:w-1/2 h-full relative flex-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-l border-indigo-200 dark:border-indigo-900 shadow-2xl ${shake ? 'animate-shake' : ''}`}>
        <motion.button
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/80 shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => navigate("/role-selection")}
          aria-label="Back to Choose Role"
        >
          <ArrowLeft className="h-6 w-6 text-blue-600" />
        </motion.button>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-md rounded-2xl shadow-2xl p-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-indigo-200 dark:border-indigo-800 flex flex-col items-center overflow-y-auto"
          style={{ maxHeight: '90vh' }}
        >
          
          <div className="w-12 h-1 bg-indigo-500 rounded-full mb-6" />
          <AuthFormWrapper title="Donor Sign Up">
            <form onSubmit={handleSubmit} className="w-full">
              <FloatingLabelInput label="Username/Email" name="email" type="email" required value={form.email} onChange={handleChange} />
              <FloatingLabelInput label="Phone Number" name="phone" type="tel" required value={form.phone} onChange={handleChange} />
              <FloatingLabelInput label="Password" name="password" type="password" required value={form.password} onChange={handleChange} />
              {/* Stellar Wallet Section */}
              <div className="mb-4">
                <label className="block mb-2 text-gray-700 font-medium">Stellar Wallet (optional)</label>
                {!showWallet && (
                  <button type="button" className="py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-all duration-200 focus:scale-105" onClick={handleWalletMode}>Add Wallet</button>
                )}
                {showWallet && (
                  <div className="mt-3">
                    <input type="text" name="walletAddress" placeholder="Stellar Public Key" className="w-full p-2 border rounded transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 focus:scale-105 outline-none" onChange={handlePasteWallet} value={form.walletAddress} />
                    <button type="button" className="mt-2 text-xs text-blue-600 underline" onClick={() => { setShowWallet(false); setForm(f => ({ ...f, walletMode: "none", walletAddress: "" })); }}>Remove Wallet</button>
                  </div>
                )}
              </div>
              {error && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded text-center animate-pulse">{error}</div>}
              <motion.button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded font-semibold mt-4 flex items-center justify-center relative"
                whileTap={{ scale: 0.96 }}
                whileHover={{ boxShadow: "0 0 0 4px #2563eb" }}
                disabled={loading || success}
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : success ? <Check className="h-5 w-5 text-green-400" /> : "Sign Up"}
              </motion.button>
            </form>
            <p className="mt-4 text-center text-sm">Already have an account? <button className="text-blue-600 hover:underline" onClick={() => navigate("/donor-login")}>Login</button></p>
          </AuthFormWrapper>
          <div className="mt-8 text-xs text-gray-400 dark:text-gray-500 text-center w-full">Powered by DSFS</div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonorSignUp; 