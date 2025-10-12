import { AppSidebar } from "@/components/molecules/AppSidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SectionCard } from "../molecules/SectionCard";

import data from "../molecules/data.json";
import { ChartAreaInteractive } from "../molecules/ChartAreaInteractive";

const SectionCards = () => {
  return (
    <>
      <SectionCard
        title="High Score"
        titleVal="500"
        tagBadgeVal="+12"
        secondTitle="Rank"
        secondVal="Top #14 Player"
        firstBadgeIcon="IconTrendingUp"
        secondBadgeIcon="IconTrendingUp"
      />
    </>
  );
};

export default function AdminDashboard() {
  return (
    <SidebarProvider
      className="min-h-0 h-full relative"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="overflow-y-auto">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
