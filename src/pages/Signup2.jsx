import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

export default function Signup2() {

  const location = useLocation();
  const navigate = useNavigate();

  const step1Data = location.state;

  const [financialData, setFinancialData] = useState({
    totalBalance: "",
    totalCards: "",
    salaryCredit: "",
    pendingMoney: "",
    savingGoals: "",
    totalBillsRemaining: ""
  });

  const handleChange = (e) => {
    setFinancialData({
      ...financialData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = { ...step1Data, ...financialData };

    try {
      await axios.post("http://localhost:8081/api/signup", finalData);

      alert("Account Created Successfully ✅");

      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Error creating account ❌");
    }
  };

  return (
    <div className="signup-container">

      <div className="left-panel">
        <h1>FINANCIAL INFO</h1>
        <h3>Almost There!</h3>
        <p>
          Provide your financial details to complete your account setup.
        </p>
      </div>

      <div className="right-panel">
        <div className="form-card">
          <h2>Open Account - Step 2</h2>
          
          <form onSubmit={handleSubmit} className="form-grid">

            <input name="totalBalance" placeholder="Total Balance" onChange={handleChange} required />
            <input name="totalCards" placeholder="Total Cards" onChange={handleChange} required />
            <input name="salaryCredit" placeholder="Salary Credit" onChange={handleChange} required />
            <input name="pendingMoney" placeholder="Pending Money" onChange={handleChange} required />
            <input name="savingGoals" placeholder="Saving Goals" onChange={handleChange} required />
            <input name="totalBillsRemaining" placeholder="Total Bills Remaining" onChange={handleChange} required />

            <button type="submit" className="signup-btn">
              Finish & Create Account
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}