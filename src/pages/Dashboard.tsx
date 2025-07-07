import { Wallet, ClipboardCopy, Info } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardAnalytics from "../components/DashboardAnalytics";
import PageWrapper from "../components/PageWrapper";
import TransactionCard from "../components/TransactionCard";
import { Button } from "../components/ui/button";
import { getAccountBalance } from '../utils/stellar';
import { useAuth } from "../context/AuthContext";
import { useLoader } from "../context/LoaderContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function Index() {
  const { user } = useAuth();
  const { showLoader, hideLoader } = useLoader();

  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    showLoader("Loading Dashboard...");
    const timer = setTimeout(() => {
      hideLoader();
    }, 1000);
    return () => clearTimeout(timer);
  }, [showLoader, hideLoader]);

  useEffect(() => {
    if (user?.publicKey) {
      getAccountBalance(user.publicKey).then(setBalance);
    }
  }, [user?.publicKey]);

  const [showBanner, setShowBanner] = useState(true);

  // Mock transaction data
  const recentTransactions = [
    {
      type: "incoming" as const,
      amount: "2,500",
      stellarAddress: "GD5DJQDDBKGAYNEAXU562HYGOOSYAEOO6AS53PZXBOZGCP5M2OPGMZV3",
      timestamp: "2 days ago",
      status: "completed" as const,
      memo: "Scholarship Grant"
    },
    {
      type: "outgoing" as const,
      amount: "150",
      stellarAddress: "GAZKLL5ESQC35BOIB23CBHJLKWWVMJZAOMCLES2YXQWJGLRXHMSLDYDD",
      timestamp: "1 week ago",
      status: "completed" as const,
      memo: "Tuition Fee"
    },
    {
      type: "incoming" as const,
      amount: "800",
      stellarAddress: "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ",
      timestamp: "2 weeks ago",
      status: "completed" as const
    },
    {
      type: "outgoing" as const,
      amount: "50",
      stellarAddress: "GDRV7QAYQMFQG5FJ2ZFCLPF7OGJWMKKKJ4DBV6TQYAG7U4IJKQLS4MJP",
      timestamp: "3 weeks ago",
      status: "pending" as const
    }
  ];

  // Mock analytics data
  const analyticsData = {
    totalFunded: "15,250",
    pendingPayouts: "2,500",
    availableBalance: "8,320",
    transactionHistory: [
      { month: "Jan", received: 1200, sent: 800 },
      { month: "Feb", received: 1800, sent: 1200 },
      { month: "Mar", received: 1500, sent: 1400 },
      { month: "Apr", received: 2200, sent: 1100 },
      { month: "May", received: 2800, sent: 1300 },
      { month: "Jun", received: 2500, sent: 1500 }
    ]
  };
  
  const handleCopy = () => {
    if (user?.publicKey) {
      navigator.clipboard.writeText(user.publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <PageWrapper>
      {/* Welcome Banner at the very top */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 mb-6"
          >
            <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg shadow p-4">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-blue-900 dark:text-blue-100">Welcome back! Your <span className="font-medium">donation wallet</span> is active.</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-xs"
                aria-label="Dismiss welcome banner"
                onClick={() => setShowBanner(false)}
              >
                Dismiss
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        {/* Wallet Info Card with Actions inside */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Wallet className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Stellar Wallet</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 rounded px-2 py-1">
                    {user?.publicKey ? `${user.publicKey.slice(0, 8)}...${user.publicKey.slice(-8)}` : 'N/A'}
                  </span>
                  {user?.publicKey && (
                    <button
                      onClick={handleCopy}
                      aria-label="Copy wallet address"
                      className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                    >
                      <ClipboardCopy className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </button>
                  )}
                  {copied && <span className="text-xs text-green-500 ml-2">Copied!</span>}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Balance</p>
              <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{balance} XLM</span>
              {/* Wallet Actions inside the card */}
              <div className="flex flex-row w-full items-center justify-between gap-2 mt-2 md:mt-0">
                <Button
                  variant="outline"
                  onClick={() => toast.info("Withdraw funds functionality coming soon")}
                  className="w-1/3 border-orange-500 dark:border-orange-400 text-orange-500 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 flex items-center gap-2 transition-all duration-300 text-xs px-2 py-2"
                  aria-label="Withdraw funds"
                >
                  <Wallet className="h-4 w-4" /> Withdraw
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.info("Send funds functionality coming soon")}
                  className="w-1/3 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-2 transition-all duration-300 text-xs px-2 py-2"
                  aria-label="Send funds"
                >
                  <Wallet className="h-4 w-4" /> Send
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.info("Receive funds functionality coming soon")}
                  className="w-1/3 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-2 transition-all duration-300 text-xs px-2 py-2"
                  aria-label="Receive funds"
                >
                  <Wallet className="h-4 w-4" /> Receive
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analytics Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-4 sm:p-6 transition-colors mx-0"
            >
              <DashboardAnalytics
                totalFunded={analyticsData.totalFunded}
                pendingPayouts={analyticsData.pendingPayouts}
                availableBalance={analyticsData.availableBalance}
                transactionHistory={analyticsData.transactionHistory}
              />
            </motion.div>
          </div>
          {/* Transactions Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-4 sm:p-6 transition-colors flex flex-col h-full mx-0"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Transactions</h2>
                <Button
                  variant="ghost"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0"
                  aria-label="View all transactions"
                  onClick={() => toast.info("View all transactions functionality coming soon")}
                >
                  View all
                </Button>
              </div>
              <div className="space-y-4 flex-1">
                {recentTransactions.map((transaction, index) => (
                  <TransactionCard
                    key={index}
                    type={transaction.type}
                    amount={transaction.amount}
                    stellarAddress={transaction.stellarAddress}
                    timestamp={transaction.timestamp}
                    status={transaction.status}
                    memo={transaction.memo}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
