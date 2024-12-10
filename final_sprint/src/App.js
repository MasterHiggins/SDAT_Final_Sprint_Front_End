import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import FlightBoard from "./components/public/FlightBoard/FlightBoard";
import FlightSearch from "./components/public/FlightSearch/FlightSearch";
import AdminPage from "./components/admin/AdminPage";
import PassengerPage from "./components/admin/passenger/PassengerPage";
import FlightManagement from "./components/admin/flights/FlightManagement/FlightManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AircraftManagement from "./components/admin/aircraft/AircraftManagement";
import AirportPage from "./components/admin/airport/AirportPage";



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<FlightBoard />} />
          <Route path="/search" element={<FlightSearch />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/passengers" element={<PassengerPage />} />
          <Route path="/admin/flights" element={<FlightManagement />} />
          <Route path="/admin/aircraft" element={<AircraftManagement/>}/>
          <Route path="/admin/airports" element={<AirportPage/>}/>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;