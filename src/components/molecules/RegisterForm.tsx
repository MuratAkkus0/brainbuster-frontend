import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const questions = [
  "What was the name of your first childhood friend that no one else knows?",
  "What is the nickname you gave to your favorite toy as a child?",
  "What was the first concert or event you attended without your family?",
  "What unusual place did you visit that left a strong memory on you?",
  "What was the exact title of the first book that truly inspired you?",
];

const CustomSelect = () => {
  return (
    <>
      <Select>
        <div className="flex flex-col">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a question" />
          </SelectTrigger>
          <SelectContent className="max-md:w-[calc(100vw-3rem)]">
            <SelectGroup>
              <SelectLabel>Questions</SelectLabel>
              {questions.map((item, i) => (
                <SelectItem value={i.toString()}>
                  <span className="max-md:w-[calc(100vw-7rem)] overflow-hidden">
                    {item}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </div>
      </Select>
    </>
  );
};

const CustomRegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Card className="max-md:rounded-none">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your username below to register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Tony" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="surname">Surname</Label>
                <Input id="surname" type="text" placeholder="Stark" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="tony_stark"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <div className="grid gap-3">
                <Label>Your Secret Question</Label>
                <CustomSelect />
                <Input
                  id="question-answer"
                  type="text"
                  placeholder="The secret is : i am a nerd..."
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="text-lg text-theme-dark-bg bg-theme-accent cursor-pointer hover:bg-theme-accent-hover"
                >
                  Register
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export const RegisterForm = () => {
  return (
    <>
      <CustomRegisterForm />
    </>
  );
};
