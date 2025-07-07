import { useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { Button } from "../components/ui/button";
import PageWrapper from "../components/PageWrapper";
import { useToast } from "../hooks/use-toast";
import { useLoader } from "../context/LoaderContext";

export default function Donate() {
  const { toast } = useToast();
  const { showLoader, hideLoader } = useLoader();
  const [amount, setAmount] = useState("");
  const [anonymity, setAnonymity] = useState("Show Name");

  useEffect(() => {
    showLoader("Loading Donate...");
    const timer = setTimeout(() => {
      hideLoader();
    }, 1000);
    return () => clearTimeout(timer);
  }, [showLoader, hideLoader]);

  const handleDonate = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast({ title: "Invalid Amount", description: "Please enter a valid amount." });
      return;
    }
    showLoader("Processing Donation...");
    const payload = {
      amount,
      anonymous: anonymity === "Anonymous",
    };
    try {
      await fetch("/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      toast({
        title: "Donation Successful",
      });
      setAmount("");
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      hideLoader();
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Make a Donation</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Amount (XLM)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Student/Project id (Optional)</label>
          <input
            type="string"
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Choose Anonymity</label>

          <Select.Root value={anonymity} onValueChange={setAnonymity}>
            <Select.Trigger
              className="inline-flex items-center justify-between w-full px-3 py-2 border border-gray-400 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              aria-label="Select anonymity"
            >
              <Select.Value placeholder="Select anonymity" />
              <Select.Icon>
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.294l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z" />
                </svg>
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-md z-50">
                <Select.Viewport>
                  <Select.Item
                    value="Show Name"
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <Select.ItemText>Show Name</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    value="Anonymous"
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <Select.ItemText>Anonymous</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        <Button
          onClick={handleDonate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Donate
        </Button>
      </div>
    </PageWrapper>
  );
}
