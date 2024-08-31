import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <NavigationMenu className="flex gap-4 py-3">
      <NavigationMenuList className="flex justify-between items-center  mx-auto">
        <NavigationMenuItem>
          <NavLink
            to="/"
            className="text-sm py-1 pr-5 mr-3 font-bold hover:text-main transition-colors"
          >
            시간표 보기
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink
            to="/timetable"
            className="text-sm py-1 pr-5 mr-3 font-bold hover:text-main transition-colors"
          >
            시간표 설정
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
