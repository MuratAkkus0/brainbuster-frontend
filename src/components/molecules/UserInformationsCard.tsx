import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserAvatar } from "../atoms/UserAvatar";
import { useAuth } from "@/hooks";
import type { MouseEventHandler } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";

export const UserInformationsCard = ({}: {
  onEditIconClick: MouseEventHandler<SVGSVGElement>;
}) => {
  const user = useAuth();
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex gap-4 w-full">
        <UserAvatar className="shrink-0 bg-theme-second-bg p-2 size-32 rounded-lg" />
        <div>
          <CardTitle>{user.user.user?.user.username ?? ""}</CardTitle>
          <CardDescription>{user.user.user?.user.role ?? ""}</CardDescription>
        </div>
        <div className="ml-auto self-center">
          <Link
            to="/quiz"
            onClick={() => localStorage.setItem("qm", "sp")}
            className="cursor-pointer"
          >
            <Button
              className="cursor-pointer bg-theme-accent text-theme-dark-bg hover:bg-theme-accent-hover animate-pulse w-full"
              size={"lg"}
            >
              Play Single Player
            </Button>
          </Link>
        </div>
      </CardHeader>
    </Card>
  );
};
