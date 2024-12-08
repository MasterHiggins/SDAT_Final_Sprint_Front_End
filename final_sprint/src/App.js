import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import FlightBoard from "./components/public/FlightBoard/FlightBoard";
import FlightSearch from "./components/public/FlightSearch/FlightSearch";
import AdminPage from "./components/admin/AdminPage";
import PassengerPage from "./components/admin/passenger/PassengerPage";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<FlightBoard />} />
          <Route path="/search" element={<FlightSearch />} />
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/admin/passengers" element={<PassengerPage/>}/>
        </Routes>                          

      </div>
    </Router>
  );
}

export default App;
