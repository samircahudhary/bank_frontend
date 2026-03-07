import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/api/login",
        form
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      alert("Login Successful ✅");

      navigate("/dashboard");

    } catch (err) {
      alert("Wrong Details ❌");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-6 mx-auto">
        <h3 className="text-center mb-3">Bank Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}

export default Login;