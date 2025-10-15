import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormErrorLabel } from "@/components/atoms/FormErrorLabel";
import { useQuestions } from "@/hooks/admin/useQuestions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef } from "react";
import type { Question } from "@/types/models/Question";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditQuestionSchema = z.object({
  type: z.string().min(1, "Type is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  category: z.string().min(1, "Category is required"),
  question: z.string().min(10, "Question must be at least 10 characters"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  incorrectAnswers: z
    .array(z.string().min(1, "Answer cannot be empty"))
    .length(3, "Exactly 3 incorrect answers are required"),
});

type EditQuestionFormData = z.infer<typeof EditQuestionSchema>;

interface EditQuestionDialogProps {
  question: Question;
  onSuccess: () => void;
}

export const EditQuestionDialog = ({
  question,
  onSuccess,
}: EditQuestionDialogProps) => {
  const { updateQuestion, isLoading } = useQuestions();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Convert incorrectAnswers to string array (exactly 3)
  const getIncorrectAnswersAsStrings = (): string[] => {
    if (Array.isArray(question.incorrectAnswers)) {
      const answers = question.incorrectAnswers.map((answer) =>
        typeof answer === "string" ? answer : answer.text
      );
      // Ensure exactly 3 answers
      while (answers.length < 3) answers.push("");
      return answers.slice(0, 3);
    }
    return ["", "", ""];
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditQuestionFormData>({
    defaultValues: {
      type: question.type,
      difficulty: question.difficulty,
      category: question.category,
      question: question.question,
      correctAnswer: question.correctAnswer,
      incorrectAnswers: getIncorrectAnswersAsStrings(),
    },
    resolver: zodResolver(EditQuestionSchema),
  });

  const onSubmit = async (data: EditQuestionFormData) => {
    try {
      await updateQuestion(question.id, data);
      closeButtonRef.current?.click();
      onSuccess();
    } catch (error) {
      console.error("Failed to update question:", error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>
            Update quiz question with 1 correct answer and 3 incorrect answers.
            All fields are required.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="question">Question</Label>
            <Input
              {...register("question")}
              id="question"
              disabled={isLoading}
            />
            <FormErrorLabel errMsg={errors.question?.message} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="grid gap-3">
              <Label htmlFor="type">Type</Label>
              <Input
                {...register("type")}
                id="type"
                placeholder="e.g., Multiple Choice"
                disabled={isLoading}
              />
              <FormErrorLabel errMsg={errors.type?.message} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                defaultValue={question.difficulty}
                onValueChange={(value) => setValue("difficulty", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <FormErrorLabel errMsg={errors.difficulty?.message} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Input
                {...register("category")}
                id="category"
                disabled={isLoading}
              />
              <FormErrorLabel errMsg={errors.category?.message} />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="correctAnswer">Correct Answer</Label>
            <Input
              {...register("correctAnswer")}
              id="correctAnswer"
              disabled={isLoading}
            />
            <FormErrorLabel errMsg={errors.correctAnswer?.message} />
          </div>

          <div className="grid gap-3">
            <Label>Incorrect Answers (3 required)</Label>
            {[0, 1, 2].map((index) => (
              <Input
                key={index}
                {...register(`incorrectAnswers.${index}`)}
                placeholder={`Incorrect answer ${index + 1}`}
                disabled={isLoading}
              />
            ))}
            <FormErrorLabel errMsg={errors.incorrectAnswers?.message} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button variant="outline" type="button" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Question"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
