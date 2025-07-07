import { format } from "date-fns";
import { CalendarIcon, Info, Loader, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "../lib/utils";
import type { Project } from "../pages/Projects";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calender";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
  defaultWalletAddress?: string;
}

const NewProjectModal = ({ isOpen, onClose, onProjectCreated, defaultWalletAddress = "" }: NewProjectModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [category, setCategory] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState(defaultWalletAddress);
  const [deadline, setDeadline] = useState<Date | undefined>(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingWalletAddress, setIsLoadingWalletAddress] = useState(false);

  // Fetch wallet address from student profile if not provided
  useEffect(() => {
    if (!defaultWalletAddress) {
      setIsLoadingWalletAddress(true);
      // You can fetch wallet address from user profile here if needed
      setIsLoadingWalletAddress(false);
    }
  }, [defaultWalletAddress, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !category || !targetAmount || !deadline || !walletAddress) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("You need to be logged in");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("objectives", objectives);
      formData.append("deliverables", deliverables);
      formData.append("category", category);
      formData.append("target_amount", targetAmount);
      formData.append("wallet_address", walletAddress);
      formData.append("deadline", deadline?.toISOString() || "");
      if (imageFile) formData.append("image", imageFile);

      const response = await fetch("http://studybae.online:8000/api/projects", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error("Failed to create project");
      const data = await response.json();
      onProjectCreated(data);
      toast.success("Project created successfully");
      onClose();
      setTitle("");
      setDescription("");
      setObjectives("");
      setDeliverables("");
      setCategory("");
      setTargetAmount("");
      setWalletAddress(defaultWalletAddress);
      setDeadline(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
      setImageFile(null);
      setImagePreview(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl w-full max-h-[95vh] overflow-y-auto backdrop-blur-lg bg-white/95 dark:bg-gray-900/95 border border-gray-200 dark:border-gray-700 p-0">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 px-2 sm:px-6 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title*</Label>
              <Input 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
                className="rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Environment">Environment</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project"
              className="rounded-md min-h-[100px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="objectives">Objectives*</Label>
              <Textarea 
                id="objectives"
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                placeholder="List your project objectives"
                className="rounded-md min-h-[100px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliverables">Deliverables*</Label>
              <Textarea 
                id="deliverables"
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                placeholder="List expected deliverables"
                className="rounded-md min-h-[100px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount ($)*</Label>
              <Input 
                id="targetAmount"
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="1000"
                className="rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="walletAddress">Wallet Address*</Label>
                {isLoadingWalletAddress && <span className="text-xs text-blue-500 animate-pulse">Loading...</span>}
              </div>
              <div className="relative">
                <Input 
                  id="walletAddress"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="0x..."
                  className="rounded-md pr-8 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  disabled={isLoadingWalletAddress}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Info className="h-4 w-4 text-blue-500" />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                This is your wallet address automatically fetched from your profile
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline*</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="deadline"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100",
                    !deadline ? "text-muted-foreground" : ""
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  disabled={(date: Date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto border border-gray-100 dark:border-gray-800 rounded-md shadow-md bg-white dark:bg-gray-900")}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>Project Image</Label>
            <div className="border-2 border-dashed rounded-lg p-4 border-gray-300 dark:border-gray-700 transition-colors hover:border-gray-400 dark:hover:border-gray-600">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Project preview" 
                    className="mx-auto max-h-[200px] rounded-md"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full"
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-40 cursor-pointer">
                  <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                  <span className="text-gray-600 dark:text-gray-400">Click to upload image</span>
                  <span className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4 pb-2 sticky bottom-0 bg-white dark:bg-gray-900 z-10">
            <Button 
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="dark:bg-gray-800 dark:border-gray-700"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;
