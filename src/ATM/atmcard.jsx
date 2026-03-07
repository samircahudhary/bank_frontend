import React, { useState, useEffect } from "react";
import "./AtmCard.css";
import { Wifi } from "lucide-react";

export default function AtmCard({ user }) {
  const [particles, setParticles] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  
  const name = user?.fullName || "PREMIUM HOLDER";

  const triggerBlast = (e) => {
    if (isExploding) return; // Prevent spamming
    
    setIsExploding(true);
    const newParticles = [];
    const count = 40; // Number of firework sparks
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const velocity = 5 + Math.random() * 10;
      const color = `hsl(${Math.random() * 360}, 100%, 60%)`; // Vivid colors
      
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color: color
      });
    }
    
    setParticles(newParticles);

    // Reset after animation
    setTimeout(() => {
      setParticles([]);
      setIsExploding(false);
    }, 1000);
  };

  return (
    <div className="premium-scene">
      <div 
        className={`premium-card ${isExploding ? "card-pulse" : ""}`} 
        onClick={triggerBlast}
      >
        <div className="glass-overlay"></div>
        
        <div className="card-content">
          <div className="card-top">
            <span className="premium-label">PLATINUM EXCLUSIVE</span>
            <Wifi size={22} className="wifi-icon" />
          </div>

          <div className="gold-chip-container">
            <div className="gold-chip"></div>
          </div>

          <div className="card-number-display">
            4582 8812 0043 9421
          </div>

          <div className="card-footer-info">
            <div className="info-group">
              <span className="info-label">CARD HOLDER</span>
              <span className="info-value">{name}</span>
            </div>
            <div className="info-group">
              <span className="info-label">VALID THRU</span>
              <span className="info-value">12/30</span>
            </div>
            <div className="visa-logo">VISA</div>
          </div>
        </div>

        {/* FIREWORK PARTICLES */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              "--vx": `${p.vx * 20}px`,
              "--vy": `${p.vy * 20}px`,
              "--color": p.color
            }}
          />
        ))}
      </div>
    </div>
  );
}