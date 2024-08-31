import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import TimetablePage from "./pages/Timetable";
import Header from "./components/Header";

function App() {
  return (
    <div className="h-screen">
      <Router>
        <Header />
        <main className="w-full max-w-[1024px] m-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/timetable" element={<TimetablePage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
