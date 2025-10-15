import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormErrorLabel } from "@/components/atoms/FormErrorLabel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { PlayCircle } from "lucide-react";

const QuizStartSchema = z.object({
  numQuestions: z
    .number()
    .min(1, "At least 1 question is required")
    .max(50, "Maximum 50 questions allowed"),
  category: z.string().min(1, "Please select a category"),
});

type QuizStartFormData = z.infer<typeof QuizStartSchema>;

interface QuizStartDialogProps {
  onStart: (numQuestions: number, category: string) => void;
  onCancel?: () => void;
  availableCategories: string[];
  totalAvailableQuestions: number;
  isLoading?: boolean;
}

export const QuizStartDialog = ({
  onStart,
  onCancel,
  availableCategories,
  totalAvailableQuestions,
  isLoading = false,
}: QuizStartDialogProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [numQuestionsInput, setNumQuestionsInput] = useState<string>("10");

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<QuizStartFormData>({
    defaultValues: {
      numQuestions: 10,
      category: "",
    },
    resolver: zodResolver(QuizStartSchema),
  });

  const onSubmit = (data: QuizStartFormData) => {
    // Check if enough questions are available
    if (data.numQuestions > totalAvailableQuestions) {
      setError("numQuestions", {
        type: "manual",
        message: `Only ${totalAvailableQuestions} questions available. Please choose a lower number.`,
      });
      return;
    }

    onStart(data.numQuestions, data.category);
  };

  const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumQuestionsInput(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setValue("numQuestions", numValue);
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setValue("category", value);
  };

  const handleDialogClose = (e: Event) => {
    e.preventDefault();
    // User closed dialog without starting quiz, redirect to profile
    onCancel?.();
  };

  return (
    <DialogContent
      className="sm:max-w-[450px]"
      onInteractOutside={handleDialogClose}
      onEscapeKeyDown={handleDialogClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl flex items-center justify-center gap-2">
            <PlayCircle className="h-6 w-6 text-primary" />
            Start Quiz
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Configure your quiz settings before starting
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          <div className="grid gap-3">
            <Label htmlFor="numQuestions">Number of Questions</Label>
            <Input
              id="numQuestions"
              type="number"
              min="1"
              max="50"
              value={numQuestionsInput}
              onChange={handleNumQuestionsChange}
              disabled={isLoading}
              placeholder="Enter number of questions"
            />
            <FormErrorLabel errMsg={errors.numQuestions?.message} />
            <p className="text-xs text-muted-foreground">
              Available questions: {totalAvailableQuestions}
            </p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category">Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormErrorLabel errMsg={errors.category?.message} />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Starting..." : "Start Quiz"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
