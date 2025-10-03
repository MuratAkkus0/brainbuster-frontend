import { Logo } from "../atoms/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
interface DropdownMenuContentInterface {
  name: string;
  route: string;
}
interface CustomNavigationMenuInterface {
  isDropdown?: boolean;
  dropdownContent?: Array<DropdownMenuContentInterface>;
  children: string;
  route: string;
}

const CustomNavigationMenu: React.FC<CustomNavigationMenuInterface> = ({
  isDropdown = false,
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
              to={route}
              className={({ isActive }) =>
                isActive
                  ? "block bg-theme-accent rounded-sm"
                  : "block bg-accent hover:bg-theme-accent rounded-sm"
              }
            >
              <NavigationMenuLink
                className="text-theme-dark-bg font-medium px-3 md:px-6 md:text-base "
                style={{}}
              >
                {children}
              </NavigationMenuLink>
            </NavLink>
            {isDropdown ? (
              <>
                <NavigationMenuTrigger className="h-7" isVisible={isDropdown}>
                  {children}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {dropdownContent
                    ? dropdownContent.map((item, i) => (
                        <NavigationMenuLink asChild key={i}>
                          <NavLink to={item.route}>{item.name}</NavLink>
                        </NavigationMenuLink>
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
  return (
    <>
      <header className={cn("w-full bg-theme-dark-bg", className)}>
        <div className="container px-2 h-full mx-auto flex flex-col gap-3 md:gap-0 md:flex-row justify-center md:justify-between items-center">
          <Logo />
          <div className="flex gap-2">
            <CustomNavigationMenu route="/">Home</CustomNavigationMenu>
            <CustomNavigationMenu route="/login">Sign in</CustomNavigationMenu>
            <CustomNavigationMenu route="/register">
              Sign up
            </CustomNavigationMenu>
          </div>
        </div>
      </header>
    </>
  );
};
