import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface UserAvatarModel {
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarModel> = ({ className }) => {
  return (
    <>
      <div className={cn("size-48 p-6 bg-amber-100", className)}>
        <User className="w-full h-full text-gray-600" />
      </div>
    </>
  );
};
