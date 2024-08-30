import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import TimetablePage from "./pages/Timetable";
import NavBar from "./components/layout/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/timetable" element={<TimetablePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
