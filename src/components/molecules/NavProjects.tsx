import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DynamicIcon, type IconName } from "../atoms/DynamicIcon";
import { NavLink } from "react-router";
import type { ReactNode } from "react";

export const CustomNavLink = ({
  url,
  children,
  className = "",
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <>
      <NavLink
        to={url}
        className={({ isActive }) =>
          isActive ? `bg-theme-second-bg ${className}` : `${className}`
        }
      >
        {children}
      </NavLink>
    </>
  );
};

export function NavProjects({
  projects,
  label = "Menu",
}: {
  projects: {
    name: string;
    url: string;
    icon: string;
  }[];
  label?: string;
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <CustomNavLink url={item.url}>
                <DynamicIcon icon={item.icon as IconName} />
                <span>{item.name}</span>
              </CustomNavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
