import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./Dashboard/Dashboard";
import Signup2 from "./pages/Signup2";
import ATM from "./ATM/atm";
import ATMCard from "./ATM/atmcard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/atm" element={<ATM />} />
        <Route path="/atm-card" element={<ATMCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;