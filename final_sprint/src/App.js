import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes will go here */}
          <Route path="/" element={<div>Flight System</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
