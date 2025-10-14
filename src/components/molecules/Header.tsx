import { Logo } from "../atoms/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks";
import { cn } from "@/lib/utils";
import { UserRoles } from "@/types/enums/UserRoles";
import { type MouseEventHandler, type ReactNode } from "react";
import { NavLink } from "react-router";
interface DropdownMenuContentInterface {
  name: string;
  route: string;
}
interface CustomNavigationMenuInterface {
  isDropdown?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  dropdownContent?: Array<DropdownMenuContentInterface>;
  children: ReactNode;
  route: string;
}

const CustomNavigationMenu: React.FC<CustomNavigationMenuInterface> = ({
  isDropdown = false,
  onClick,
  dropdownContent = [],
  children,
  route = "",
}) => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavLink
              onClick={onClick}
              to={route}
              className={({ isActive }) =>
                cn(
                  "text-theme-dark-bg font-medium py-1 md:py-2 px-3 md:px-6 md:text-base",
                  isActive
                    ? "block bg-theme-accent rounded-sm"
                    : "block bg-accent hover:bg-theme-accent rounded-sm"
                )
              }
            >
              {children}
            </NavLink>
            {isDropdown ? (
              <>
                <NavigationMenuTrigger className="h-7" isVisible={isDropdown}>
                  {children}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {dropdownContent
                    ? dropdownContent.map((item, i) => (
                        <NavLink
                          onClick={onClick}
                          key={i}
                          to={item.route}
                          className={({ isActive }) =>
                            cn(
                              "text-theme-dark-bg font-medium py-1 md:py-2 px-3 md:px-6 md:text-base",
                              isActive
                                ? "block bg-theme-accent rounded-sm"
                                : "block bg-accent hover:bg-theme-accent rounded-sm"
                            )
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))
                    : ""}
                </NavigationMenuContent>
              </>
            ) : (
              ""
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export const Header = ({ className }: { className?: string }) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <header className={cn("w-full bg-theme-dark-bg ", className)}>
        <div className="container px-2 h-full mx-auto flex flex-col gap-1 md:gap3 md:gap-0 md:flex-row justify-center md:justify-between items-center">
          <Logo />
          <div className="flex gap-2">
            <CustomNavigationMenu route="/">Home</CustomNavigationMenu>
            {isAuthenticated ? (
              <>
                {user.user?.user?.role === UserRoles.ADMIN ? (
                  <>
                    <CustomNavigationMenu route="/admin/dashboard">
                      Admin Dashboard
                    </CustomNavigationMenu>
                  </>
                ) : (
                  <CustomNavigationMenu route="/profile">
                    <span>Profile</span>
                  </CustomNavigationMenu>
                )}

                <CustomNavigationMenu route="/logout">
                  Logout
                </CustomNavigationMenu>
              </>
            ) : (
              <>
                <CustomNavigationMenu route="/login">
                  Login
                </CustomNavigationMenu>
                <CustomNavigationMenu route="/register">
                  Register
                </CustomNavigationMenu>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
