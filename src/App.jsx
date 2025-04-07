import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Schedule from "./pages/Schedule";
import Roster from "./pages/Roster";
import Standings from "./pages/Standings";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#041E42]">
        <Navbar />
        <main className="flex-grow">
          <RoutesWithLocation />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// This component is inside the Router context, so we can use useLocation hook here
function RoutesWithLocation() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Home key={location.pathname} />} />
      <Route path="/roster" element={<Roster key={location.pathname} />} />
      <Route path="/stats" element={<Stats key={location.pathname} />} />
      <Route path="/schedule" element={<Schedule key={location.pathname} />} />
      <Route
        path="/standings"
        element={<Standings key={location.pathname} />}
      />
    </Routes>
  );
}

export default App;
