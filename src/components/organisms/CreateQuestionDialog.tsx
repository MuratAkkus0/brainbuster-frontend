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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";

const CreateQuestionSchema = z.object({
  type: z.string().min(1, "Type is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  category: z.string().min(1, "Category is required"),
  question: z.string().min(10, "Question must be at least 10 characters"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  incorrectAnswers: z
    .array(z.string().min(1, "Answer cannot be empty"))
    .min(1, "At least one incorrect answer is required"),
});

type CreateQuestionFormData = z.infer<typeof CreateQuestionSchema>;

interface CreateQuestionDialogProps {
  onSuccess: () => void;
}

export const CreateQuestionDialog = ({
  onSuccess,
}: CreateQuestionDialogProps) => {
  const { createQuestion, isLoading } = useQuestions();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<CreateQuestionFormData>({
    defaultValues: {
      type: "",
      difficulty: "",
      category: "",
      question: "",
      correctAnswer: "",
      incorrectAnswers: ["", "", ""],
    },
    resolver: zodResolver(CreateQuestionSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: control as any,
    name: "incorrectAnswers",
  });

  const onSubmit = async (data: CreateQuestionFormData) => {
    try {
      await createQuestion(data);
      reset();
      closeButtonRef.current?.click();
      onSuccess();
    } catch (error) {
      console.error("Failed to create question:", error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Create New Question</DialogTitle>
          <DialogDescription>
            Add a new quiz question to the system. All fields are required.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="question">Question</Label>
            <Input
              {...register("question")}
              id="question"
              placeholder="Enter question"
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
                onValueChange={(value) => setValue("difficulty", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
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
                placeholder="e.g., Science"
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
              placeholder="Enter correct answer"
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
                onClick={() => append("" as any)}
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
                  placeholder={`Incorrect answer ${index + 1}`}
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
            {isLoading ? "Creating..." : "Create Question"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
