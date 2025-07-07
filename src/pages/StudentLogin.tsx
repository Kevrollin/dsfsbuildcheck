import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthAsideCarousel from "../components/AuthAsideCarousel";
import AuthFormWrapper from "../components/AuthFormWrapper";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import FloatingLabelInput from "../components/ui/floating-label-input";
import { Check, Loader2, XCircle, CheckCircle } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import Loader from "../components/Loader";

const StudentLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error] = useState<string | null>(null);
  const [loading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const [shake, setShake] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    if (!form.username || !form.password) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => {
        toast({
          title: "Login failed!",
          description: "Please fill in all required fields.",
          variant: "destructive",
          icon: <motion.span initial={{ x: -30, rotate: -20, scale: 0 }} animate={{ x: 0, rotate: 0, scale: 1 }} transition={{ type: 'spring', bounce: 0.6 }}><XCircle className="text-red-500" /></motion.span>
        });
      }, 800);
      return;
    }
    // Show loader for smooth transition
    setShowLoader(true);
    login(form.username, "testnet", "student");
    toast({
      title: "Login successful!",
      description: "Welcome back.",
      variant: "default",
      icon: <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.6 }}><CheckCircle className="text-green-500" /></motion.span>
    });
    setTimeout(() => {
      setShowLoader(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <>
      <Loader show={showLoader} />
      <div className={`h-screen flex bg-gradient-to-br from-indigo-700 via-blue-600 to-blue-400 dark:from-gray-950 dark:via-indigo-950 dark:to-blue-900 overflow-hidden`}>
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
            className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/80 shadow hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onClick={() => navigate("/role-selection")}
            aria-label="Back to Choose Role"
          >
            <ArrowLeft className="h-6 w-6 text-indigo-600" />
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-sm rounded-xl shadow-lg p-4 md:p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex flex-col items-center overflow-y-auto"
            style={{ maxHeight: '92vh' }}
          >

          <AuthFormWrapper title="Student Login">
            <form onSubmit={handleSubmit} className="w-full">
              <FloatingLabelInput label="Username" name="username" type="text" required value={form.username} onChange={handleChange} />
              <FloatingLabelInput label="Password" name="password" type="password" required value={form.password} onChange={handleChange} />
              {error && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded text-center animate-pulse">{error}</div>}
              <motion.button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded font-semibold mt-4 flex items-center justify-center relative"
                whileTap={{ scale: 0.96 }}
                whileHover={{ boxShadow: "0 0 0 4px #6366f1" }}
                disabled={loading || success}
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : success ? <Check className="h-5 w-5 text-green-400" /> : "Login"}
              </motion.button>
            </form>
        
          </AuthFormWrapper>
            <p className="mt-4 text-center text-sm">Don't have an account? <button className="text-indigo-600 hover:underline" onClick={() => navigate("/student-signup")}>Sign Up</button></p>
            <div className="mt-6 text-xs text-gray-400 dark:text-gray-500 text-center w-full">Powered by DSFS</div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default StudentLogin; 