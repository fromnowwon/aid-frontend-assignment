import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink to="/" className={navigationMenuTriggerStyle()}>
            시간표 보기
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink to="/timetable" className={navigationMenuTriggerStyle()}>
            시간표 설정
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
