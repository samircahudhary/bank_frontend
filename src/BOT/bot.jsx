import React, { useState, useEffect, useRef } from 'react';
import './bot.css';

const Bot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your Premium Banking Assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            // Replace with your actual Backend API endpoint
            const response = await fetch("http://localhost:8081/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: input
  })
});
            const data = await response.json();
            
            setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: "I'm having trouble connecting to the vault. Please try again.", sender: 'bot' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="bot-container">
            <div className="bot-header">
                <div className="bot-status-dot"></div>
                <span>Premium Bank Support</span>
            </div>
            
            <div className="bot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message-wrapper ${msg.sender}`}>
                        <div className="message-bubble">
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && <div className="typing-indicator">Assistant is thinking...</div>}
                <div ref={chatEndRef} />
            </div>

            <div className="bot-input-area">
                <input 
                    type="text" 
                    placeholder="Ask about your balance or transfers..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Bot;