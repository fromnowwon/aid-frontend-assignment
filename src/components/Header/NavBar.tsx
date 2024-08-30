import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              시간표 보기
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink to="/timetable">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              시간표 설정
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
