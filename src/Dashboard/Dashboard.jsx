import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import ATM from "../ATM/atm";
import AtmCard from "../ATM/atmcard";
import Bot from "../BOT/bot";

import {
  Bell,
  CreditCard,
  DollarSign,
  PiggyBank,
  Send,
  Settings,
  X,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {

  const navigate = useNavigate();
const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState("dark");
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
const [transactions, setTransactions] = useState([]);

// Navigation to ATM page

const goToATM = () => {
  navigate("/atm");
};



const storedUser = JSON.parse(localStorage.getItem("user"));
const userId = storedUser?.id;

const refreshDashboardData = async () => {

  try {

    if (!userId) return;

    const userRes = await fetch(`http://localhost:8081/api/users/${userId}`);
    const userData = await userRes.json();

    setUser(userData);

    const txnRes = await fetch(`http://localhost:8081/transaction/user/${userId}`);

    if (txnRes.ok) {
      const txns = await txnRes.json();
      setTransactions(txns);
    }

  } catch (err) {
    console.error("Dashboard refresh error", err);
  }

};

useEffect(() => {
  refreshDashboardData();
}, []);


useEffect(() => {

  const handleTransactionUpdate = () => {
    refreshDashboardData();
  };

  window.addEventListener("transactionUpdate", handleTransactionUpdate);

  return () => {
    window.removeEventListener("transactionUpdate", handleTransactionUpdate);
  };

}, []);

  
  // Load user from localStorage
  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }

  }, [navigate]);



  

  // Theme changer
  useEffect(() => {

    const root = document.documentElement;

    if (theme === "dark") {

      root.style.setProperty("--bg-color", "#0a0e23");
      root.style.setProperty("--text-color", "#f0f4ff");
      root.style.setProperty("--card-bg", "rgba(255,255,255,0.05)");
      root.style.setProperty("--card-hover", "rgba(255,255,255,0.1)");
      root.style.setProperty("--button-bg", "linear-gradient(135deg,#0f4c75,#3282b8)");
      root.style.setProperty("--credit-color", "#4ade80");
      root.style.setProperty("--debit-color", "#f87171");

    }

    else if (theme === "light") {

      root.style.setProperty("--bg-color", "#f4f6f8");
      root.style.setProperty("--text-color", "#1a1a1a");
      root.style.setProperty("--card-bg", "rgba(0,0,0,0.05)");
      root.style.setProperty("--card-hover", "rgba(0,0,0,0.1)");
      root.style.setProperty("--button-bg", "linear-gradient(135deg,#6c63ff,#00c4ff)");
      root.style.setProperty("--credit-color", "#27ae60");
      root.style.setProperty("--debit-color", "#e74c3c");

    }

    else if (theme === "colorful") {
  // Deep Silk Gradient Background
  root.style.setProperty("--bg-color", "radial-gradient(circle at top left, #efefee, #ff0593, #0ea9b1)");
  root.style.setProperty("--text-color", "#ffffff");
  
  // Ultra-clear Glassmorphism
  root.style.setProperty("--card-bg", "rgba(255, 255, 255, 0.12)"); 
  root.style.setProperty("--card-hover", "rgba(255, 255, 255, 0.25)");
  
  // Vivid Neon Button (with a white-to-vivid gradient)
  root.style.setProperty("--button-bg", "linear-gradient(135deg, #ffffff 0%, #ff6a00 50%, #ee0979 100%)");
  
  // Neon Success/Danger colors
  root.style.setProperty("--credit-color", "#00ffcc"); // Neon Mint (more premium than basic green)
  root.style.setProperty("--debit-color", "#ffdfdf");  // Soft White-Pink (cleaner than pure white)
}
  }, [theme]);



  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };


  if (!user) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }


  return (







    

    <div className="db-container">

      {/* HEADER */}

      <header className="db-header">
<div 
className="db-menu-icon"
onClick={() => setMenuOpen(!menuOpen)}
>
  <div className={`bar ${menuOpen ? "open" : ""}`}></div>
  <div className={`bar ${menuOpen ? "open" : ""}`}></div>
  <div className={`bar ${menuOpen ? "open" : ""}`}></div>
</div>
        <h1 className="db-title">Premium Bank of  INDIA</h1>

        <div className="db-header-icons">

          <Bell className="db-icon" />

          <Settings
            className="db-icon"
            onClick={() => setShowSettings(true)}
          />

          <LogOut
            className="db-icon"
            onClick={logout}
          />

          <div
            className="db-profile-circle"
            onClick={() => setShowProfile(true)}
          >
            {user.fullName?.charAt(0).toUpperCase()}
          </div>

        </div>

      </header>



      {/* SETTINGS PANEL */}

      {showSettings && (

        <div className="db-settings-panel">

          <div className="db-settings-header">
            <h3>Choose Theme</h3>
            <X
              className="db-icon"
              onClick={() => setShowSettings(false)}
            />
          </div>

          <div className="db-theme-options">

            <button
              className="db-theme-button light"
              onClick={() => setTheme("light")}
            >
              Light Mode
            </button>

            <button
              className="db-theme-button dark"
              onClick={() => setTheme("dark")}
            >
              Dark Mode
            </button>

            <button
              className="db-theme-button colorful"
              onClick={() => setTheme("colorful")}
            >
              Colorful Mode
            </button>

          </div>

        </div>

      )}



      {/* PROFILE PANEL */}

      {showProfile && (

        <div className="db-profile-panel">

          <div className="db-settings-header">

            <h3>Personal Information</h3>

            <X
              className="db-icon"
              onClick={() => setShowProfile(false)}
            />

          </div>

          <div className="db-profile-info">

            <p><strong>Full Name:</strong> {user.fullName}</p>

            <p><strong>Email:</strong> {user.email}</p>

            <p><strong>Mobile:</strong> {user.mobile}</p>

            <p><strong>Aadhaar:</strong> {user.aadhaar}</p>

            <p><strong>PAN:</strong> {user.pan}</p>

            <p><strong>Address:</strong> {user.address}</p>

            <p><strong>Account Type:</strong> {user.accountType}</p>

          </div>

        </div>

      )}




      {/* DASHBOARD CARDS */}

      <section className="db-overview">

        <DbCard
          icon={<DollarSign size={28} />}
          title="Total Balance"
          value={`₹ ${user.totalBalance}`}
        />

        <DbCard
          icon={<CreditCard size={28} />}
          title="Active Cards"
          value={`${user.totalCards} Cards`}
        />

        <DbCard
          icon={<PiggyBank size={28} />}
          title="Saving Goals"
          value={`₹ ${user.savingGoals}`}
        />

        <DbCard
          icon={<DollarSign size={28} />}
          title="Salary Credit"
          value={`₹ ${user.salaryCredit}`}
        />

        <DbCard
          icon={<Send size={28} />}
          title="Pending Money"
          value={`₹ ${user.pendingMoney}`}
        />

        <DbCard
          icon={<CreditCard size={28} />}
          title="Bills Remaining"
          value={`₹ ${user.totalBillsRemaining}`}
        />

      </section>


<div className="dashboard-container">

  <div className="atm-section">
    <AtmCard user={user} />
  </div>

  <div className="bot-section">
    <Bot />
  </div>

</div>



      {/* QUICK ACTIONS */}

      <section className="db-quick-actions">

        <h2>Quick Actions</h2>

        <div className="db-actions-grid"
         >

          <DbActionButton
  icon={<Send size={18} />}
  text="Transfer Money"
  onClick={goToATM}
/>

          <DbActionButton
            icon={<CreditCard size={18} />}
            text="Pay Bills"
            onClick={goToATM}
          />

          <DbActionButton
            icon={<PiggyBank size={18} />}
            text="Recipt"
            onClick={goToATM}
          />

          <DbActionButton
            icon={<DollarSign size={18} />}
            text="Withdraw Cash"
            onClick={goToATM}
          />

        </div>

      </section>



      {/* TRANSACTIONS */}

      <section className="db-transactions">

        <h2>Recent Transactions</h2>

        <DbTransaction
          name="Amazon Purchase"
          amount="- ₹3200"
          type="debit"
        />

        <DbTransaction
          name="Salary Credit"
          amount={`+ ₹${user.salaryCredit}`}
          type="credit"
        />

        <DbTransaction
          name="Electricity Bill"
          amount="- ₹1450"
          type="debit"
        />



      </section>



      

    </div>

  );

}



/* COMPONENTS */

function DbCard({ icon, title, value }) {

  return (

    <div className="db-card">

      <div className="db-card-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{value}</p>

    </div>

  );

}



function DbActionButton({ icon, text, onClick }) {

  return (

    <button 
      className="db-action-button"
      onClick={onClick}
    >

      {icon}

      <span>{text}</span>

    </button>

  );

}


function DbTransaction({ name, amount, type }) {

  return (

    <div className="db-transaction">

      <span>{name}</span>

      <span
        className={
          type === "credit"
            ? "db-credit"
            : "db-debit"
        }
      >
        {amount}
      </span>

    </div>

  );

}