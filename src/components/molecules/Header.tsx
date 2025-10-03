import { Link } from "react-router";
import { Logo } from "../atoms/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
            <NavigationMenuLink
              className="bg-accent text-theme-dark-bg font-medium px-3 md:px-6 md:text-base hover:bg-theme-accent"
              asChild
            >
              <Link to={route}>{children}</Link>
            </NavigationMenuLink>
            {isDropdown ? (
              <>
                <NavigationMenuTrigger className="h-7" isVisible={isDropdown}>
                  {children}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {dropdownContent
                    ? dropdownContent.map((i) => (
                        <NavigationMenuLink asChild>
                          <Link to={i.route}>{i.name}</Link>
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

export const Header = () => {
  return (
    <>
      <header className="w-full h-32 bg-theme-dark-bg">
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
