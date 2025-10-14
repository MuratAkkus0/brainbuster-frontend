import { NavProjects } from "@/components/molecules/NavProjects";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { data } from "../../../public/data/sidebar-data.json";
import { TeamSwitcher } from "./TeamSwitcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
