import React, { useState, useEffect } from "react";
import "./atm.css";
import atmImage from "../assets/atm.jpg";
import Bot from "../BOT/bot";
export default function ATM() {
  // Get logged-in user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

  const [user, setUser] = useState(storedUser);
  const [screenText, setScreenText] = useState("Insert Card");
  const [transactions, setTransactions] = useState([]);

  // Play ATM sound
  const playSound = () => {
    const audio = new Audio("/atm-sound.mp3");
    audio.play();
  };

  // Fetch user & transactions from backend
  const fetchUserAndTransactions = async () => {
    if (!userId) return;

    try {
      // Fetch user info
      const userRes = await fetch(`http://localhost:8081/api/users/${userId}`);
      if (!userRes.ok) throw new Error("User not found");
      const userData = await userRes.json();
      setUser(userData);

      // Fetch transaction history (if you have a separate endpoint for transactions)
      const txnRes = await fetch(`http://localhost:8081/transaction/user/${userId}`);
      if (txnRes.ok) {
        const txns = await txnRes.json();
        setTransactions(txns);
      }
    } catch (err) {
      console.error(err);
      setScreenText("Error fetching data");
    }
  };

  useEffect(() => {
    fetchUserAndTransactions();
  }, [userId]);

  // Withdraw money
  const withdrawMoney = async () => {
    const amount = prompt("Enter amount to withdraw");
    if (!amount || Number(amount) <= 0) return;

    try {
      const res = await fetch(
        `http://localhost:8081/api/atm/withdraw/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: Number(amount) }),
        }
      );

      if (!res.ok) return alert("Error withdrawing money");
      const updatedUser = await res.json();

      setUser(updatedUser);
      window.dispatchEvent(new Event("transactionUpdate"));
      setScreenText(`Cash Withdrawn ₹${amount}`);

      // Add transaction locally
      const newTxn = {
        type: "withdraw",
        amount: Number(amount),
        name: updatedUser.fullName,
        email: updatedUser.email,
        date: new Date().toISOString(),
      };
      setTransactions([newTxn, ...transactions]);

      playSound();
    } catch (err) {
      console.error(err);
      alert("Error processing withdrawal");
    }
  };

  // Deposit money
  const depositMoney = async () => {
    const amount = prompt("Enter deposit amount");
    if (!amount || Number(amount) <= 0) return;

    try {
      const res = await fetch(
        `http://localhost:8081/api/atm/deposit/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: Number(amount) }),
        }
      );

      if (!res.ok) return alert("Error depositing money");
      const updatedUser = await res.json();

      setUser(updatedUser);
      window.dispatchEvent(new Event("transactionUpdate"));
      setScreenText(`Money Deposited ₹${amount}`);

      // Add transaction locally
      const newTxn = {
        type: "deposit",
        amount: Number(amount),
        name: updatedUser.fullName,
        email: updatedUser.email,
        date: new Date().toISOString(),
      };
      setTransactions([newTxn, ...transactions]);

      playSound();
    } catch (err) {
      console.error(err);
      alert("Error processing deposit");
    }
  };

  // Check balance
  const checkBalance = () => {
    if (!user) return;
    setScreenText(`Balance ₹${user.totalBalance}`);
    playSound();
  };

  // Show receipt
  const receipt = () => {
    if (!user) return;

    let receiptText = `ATM RECEIPT
-------------------------
User: ${user.fullName}
Email: ${user.email}
Balance: ₹${user.totalBalance}
Transactions:\n`;

    transactions.forEach((t, i) => {
      const date = new Date(t.date).toLocaleString();
      receiptText += `${i + 1}. ${t.type.toUpperCase()} ₹${t.amount} | ${t.name} | ${t.email} | ${date}\n`;
    });

    alert(receiptText);
    playSound();
  };

  if (!user) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="atm-container">
      <img src={atmImage} className="atm-img" alt="ATM" />

      <div className="atm-screen">{screenText}</div>

      <button className="atm-btn withdraw" onClick={withdrawMoney}>
        Withdraw
      </button>
      <button className="atm-btn deposit" onClick={depositMoney}>
        Deposit
      </button>
      <button className="atm-btn balance" onClick={checkBalance}>
        Balance
      </button>
      <button className="atm-btn receipt" onClick={receipt}>
        Receipt
      </button>






      {/* Transactions */}
      <div className="atm-transactions">
        <h3>Transaction History</h3>
        {transactions.length === 0 && <p>No transactions yet</p>}
        {transactions.map((t, i) => (
          <div key={i} className={`atm-transaction ${t.type}`}>
            <span>
              {t.type.toUpperCase()} ₹{t.amount}
            </span>
            <span>
              {t.name} | {t.email}
            </span>
          </div>
        ))}
      </div>

      
    </div>



  );
}