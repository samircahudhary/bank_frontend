import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    aadhaar: "",
    pan: "",
    address: "",
    accountType: "Savings",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Go to Signup2 and send data
    navigate("/signup2", { state: formData });
  };

  return (
    <div className="signup-container">

      <div className="left-panel">
        <h1>BANKING</h1>
        <h3>Secure. Simple. Smart.</h3>
        <p>
          Join thousands of users who trust our platform for their daily 
          financial needs. Open an account in minutes and enjoy seamless banking.
        </p>
      </div>

      <div className="right-panel">
        <div className="form-card">
          <h2>Open Account - Step 1</h2>
          
          <form onSubmit={handleSubmit} className="form-grid">

            <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
            <input name="aadhaar" placeholder="Aadhaar Number" onChange={handleChange} required />
            <input name="pan" placeholder="PAN Card Number" onChange={handleChange} required />
            <input name="address" placeholder="Permanent Address" onChange={handleChange} required />

            <select name="accountType" onChange={handleChange}>
              <option value="Savings">Savings Account</option>
              <option value="Current">Current Account</option>
              <option value="Salary">Salary Account</option>
            </select>

            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

            <button type="submit" className="signup-btn">
              Next →
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}