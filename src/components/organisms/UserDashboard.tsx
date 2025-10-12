import { AppSidebar } from "@/components/molecules/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SectionCard } from "../molecules/SectionCard";
import { Separator } from "@radix-ui/react-select";
import { UserInformationsCard } from "../molecules/UserInformationsCard";

const SectionCards = () => {
  return (
    <SectionCard
      title="High Score"
      titleVal="500"
      tagBadgeVal="+12"
      secondTitle="Rank"
      secondVal="Top #14 Player"
      firstBadgeIcon="IconTrendingUp"
      secondBadgeIcon="IconTrendingUp"
    />
  );
};

export default function UserDashboard() {
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
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-wrap gap-4 px-4 py-4 md:gap-6 md:py-6">
              <UserInformationsCard />
            </div>
            <SectionCards />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
