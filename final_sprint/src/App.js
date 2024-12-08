import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import FlightBoard from "./components/public/FlightBoard/FlightBoard";
import FlightSearch from "./components/public/FlightSearch/FlightSearch";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<FlightBoard />} />
          <Route path="/search" element={<FlightSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
