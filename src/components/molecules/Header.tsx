import { Link } from "react-router";
import { Logo } from "../atoms/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
interface DropdownMenuContentInterface {
  name: string;
  route: string;
}
interface CustomNavigationMenuInterface {
  isDropdown?: boolean;
  dropdownContent?: Array<DropdownMenuContentInterface>;
  children: string;
}

const CustomNavigationMenu: React.FC<CustomNavigationMenuInterface> = ({
  isDropdown = false,
  dropdownContent = [],
  children,
}) => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger isVisible={isDropdown}>
              {children}
            </NavigationMenuTrigger>
            {isDropdown ? (
              <NavigationMenuContent>
                {dropdownContent
                  ? dropdownContent.map((i) => (
                      <NavigationMenuLink asChild>
                        <Link to={i.route}>{i.name}</Link>
                      </NavigationMenuLink>
                    ))
                  : ""}
              </NavigationMenuContent>
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
        <div className="container h-full mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex gap-2">
            <CustomNavigationMenu>Home</CustomNavigationMenu>
            <CustomNavigationMenu>Sign in</CustomNavigationMenu>
            <CustomNavigationMenu>Sign up</CustomNavigationMenu>
          </div>
        </div>
      </header>
    </>
  );
};
