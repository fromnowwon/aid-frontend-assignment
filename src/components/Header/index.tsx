import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="flex flex-col w-full pt-4">
      <div className="flex justify-center w-full max-w-[1024px] mx-auto">
        <Link to="/" className="text-2xl font-bold">
          <h1 className="text-main">AID CLASS TIMETABLE</h1>
        </Link>
      </div>
      <div className="w-full border-b-2 border-b-primary border-t-2 border-t-slate-100 mt-4">
        <div className="flex justify-center w-full items-center max-w-[1024px] mx-auto">
          <NavBar />
        </div>
      </div>
    </header>
  );
}
