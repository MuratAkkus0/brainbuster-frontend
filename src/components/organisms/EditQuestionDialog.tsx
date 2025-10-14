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
import { useForm, useFieldArray } from "react-hook-form";
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
import { Trash2, Plus } from "lucide-react";

const EditQuestionSchema = z.object({
  type: z.string().min(1, "Type is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  category: z.string().min(1, "Category is required"),
  question: z.string().min(10, "Question must be at least 10 characters"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  incorrectAnswers: z
    .array(z.string().min(1, "Answer cannot be empty"))
    .min(1, "At least one incorrect answer is required"),
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

  // Convert incorrectAnswers to string array
  const getIncorrectAnswersAsStrings = (): string[] => {
    if (Array.isArray(question.incorrectAnswers)) {
      return question.incorrectAnswers.map((answer) =>
        typeof answer === "string" ? answer : answer.text
      );
    }
    return [];
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "incorrectAnswers",
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
            Update question information. All fields are required.
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
              <Select
                defaultValue={question.type}
                onValueChange={(value) => setValue("type", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple">Multiple Choice</SelectItem>
                  <SelectItem value="boolean">True/False</SelectItem>
                </SelectContent>
              </Select>
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
            <div className="flex items-center justify-between">
              <Label>Incorrect Answers</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append("")}
                disabled={isLoading}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Answer
              </Button>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...register(`incorrectAnswers.${index}`)}
                  disabled={isLoading}
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
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
