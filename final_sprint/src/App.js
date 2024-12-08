import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import FlightBoard from "./components/public/FlightBoard/FlightBoard";
import AdminPage from "./components/admin/AdminPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<FlightBoard />} />
          <Route path="/admin" element={<AdminPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
