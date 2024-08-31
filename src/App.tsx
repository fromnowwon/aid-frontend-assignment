import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import TimetablePage from "./pages/Timetable";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <main className="h-screen w-full max-w-[1024px] m-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/timetable" element={<TimetablePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
