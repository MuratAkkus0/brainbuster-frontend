import { AppSidebar } from "@/components/molecules/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SectionCard } from "../molecules/SectionCard";
import { Separator } from "@radix-ui/react-select";
import { UserInformationsCard } from "../molecules/UserInformationsCard";
import { Button } from "../ui/button";
import { Link } from "react-router";
import type { MouseEventHandler } from "react";
import { useAuth, useRefreshUserProfile } from "@/hooks";
import { useEffect } from "react";

const handleEdit: MouseEventHandler<SVGSVGElement> = (e) => {
  console.log(e.currentTarget);
};

export default function UserDashboard() {
  const { user } = useAuth();
  const { refreshUserProfile } = useRefreshUserProfile();
  const highScore = user.user?.user.highScore || 0;

  // Refresh user profile when dashboard mounts
  useEffect(() => {
    const refreshProfile = async () => {
      try {
        await refreshUserProfile(false);
      } catch (error) {
        console.error(
          "Failed to refresh user profile on dashboard mount:",
          error
        );
      }
    };

    refreshProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const SectionCards = () => {
    return (
      <SectionCard
        title="High Score"
        titleVal={highScore.toString()}
        tagBadgeVal="+12"
        secondTitle="Rank"
        secondVal="Top #14 Player"
        firstBadgeIcon="IconTrendingUp"
        secondBadgeIcon="IconTrendingUp"
      />
    );
  };
  return (
    <SidebarProvider className="min-h-0 h-full relative">
      <AppSidebar />
      <SidebarInset className="overflow-y-auto">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mr-2 data-[orientation=vertical]:h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main grid grid-cols-1 md:grid-cols-2 grid-rows-12 px-4">
            <div className="row-start-1 row-end-4 md:col-span-2 flex justify-center flex-wrap gap-4 md:gap-5 lg:gap-6 ">
              <div className="min-w-46 max-w-80 w-full shrink-0">
                <UserInformationsCard onEditIconClick={handleEdit} />
              </div>
              <div className="min-w-46 max-w-80 flex-1 shrink-0 w-full">
                <SectionCards />
              </div>
            </div>
            <div
              className="row-start-4 sm:row-start-5 row-span-3 md:col-span-2 flex flex-wrap gap-4 px-4 py-4 md:gap-6 md:py-6 animate-pulse 
            "
            >
              <Link
                to="/quiz"
                onClick={() => localStorage.setItem("qm", "sp")}
                className="max-w-1/2 cursor-pointer mx-auto"
              >
                <Button
                  className="cursor-pointer bg-theme-accent text-theme-dark-bg hover:bg-theme-accent-hover"
                  size={"lg"}
                >
                  Play Single Player
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
