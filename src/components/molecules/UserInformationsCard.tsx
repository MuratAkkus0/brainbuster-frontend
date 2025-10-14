import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserAvatar } from "../atoms/UserAvatar";
import { useAuth } from "@/hooks";
import { Edit } from "lucide-react";

export const UserInformationsCard = () => {
  const user = useAuth();
  return (
    <Card className="w-80 md:w-full h-full">
      <CardHeader className="flex gap-4 w-full">
        <UserAvatar className="bg-theme-second-bg p-2 size-32 rounded-lg" />
        <div>
          <CardTitle>{user.user.user?.user.username ?? ""}</CardTitle>
          <CardDescription>{user.user.user?.user.role ?? ""}</CardDescription>
        </div>
        <Edit className="size-5" />
      </CardHeader>
    </Card>
  );
};
