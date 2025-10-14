import { NavProjects } from "@/components/molecules/NavProjects";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./TeamSwitcher";
import { useAuth } from "@/hooks";
import { useMemo } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const userRole = user.user?.user.role;

  const isAdmin = useMemo(() => {
    return userRole ? userRole.toLowerCase().includes("admin") : false;
  }, [userRole]);

  const menuItems = useMemo(() => {
    if (isAdmin) {
      return [
        {
          name: "Dashboard",
          url: "/admin/dashboard",
          icon: "LayoutDashboard",
        },
        {
          name: "Profile",
          url: "/profile",
          icon: "User",
        },
      ];
    }

    return [
      {
        name: "Profile",
        url: "/profile",
        icon: "User",
      },
      {
        name: "Quiz",
        url: "/quiz",
        icon: "HelpCircle",
      },
    ];
  }, [isAdmin]);

  const menuLabel = isAdmin ? "Admin Menu" : "Navigation";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={menuItems} label={menuLabel} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
