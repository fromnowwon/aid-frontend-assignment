import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header>
      <Link to="/" className="text-2xl font-bold">
        <h1>AID CLASS TIMETABLE</h1>
      </Link>
      <NavBar />
    </header>
  );
}
