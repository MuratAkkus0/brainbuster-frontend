import { AppSidebar } from "@/components/molecules/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SectionCard } from "../molecules/SectionCard";
import { Separator } from "@radix-ui/react-select";
import { UserInformationsCard } from "../molecules/UserInformationsCard";
import { LeaderboardCard } from "../molecules/LeaderboardCard";
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
          <div className="@container/main grid grid-cols-1 md:grid-cols-12 gap-4 px-4">
            {/* User information card - full width on all screens */}
            <div className="col-span-1 md:col-span-12 mb-6">
              <div className="h-fit w-full max-w-md mx-auto md:max-w-none">
                <UserInformationsCard onEditIconClick={handleEdit} />
              </div>
            </div>

            {/* Stats section - left side on desktop */}
            <div className="col-span-1 md:col-span-12 space-y-6 p-4 ">
              <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
                <SectionCards />
                <LeaderboardCard />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
