import React, { useState } from 'react';
import '../../styles/ChatBot.css';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! How can I help you with farming today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { type: 'user', text: input }]);
    
    // Simple bot responses - replace with actual AI integration
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 1000);
    
    setInput('');
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('price') || input.includes('cost')) {
      return 'You can check live crop prices in our Crop Prices section. Is there a specific crop you\'re interested in?';
    } else if (input.includes('disease') || input.includes('plant')) {
      return 'For plant disease detection, please visit our Plant Disease section where you can upload images for AI analysis.';
    } else if (input.includes('soil')) {
      return 'Our Soil Recommendation system can help you analyze soil conditions. Visit the Soil Analysis section to get started.';
    } else if (input.includes('equipment') || input.includes('buy')) {
      return 'Check out our Marketplace for farming equipment with detailed descriptions and videos.';
    } else {
      return 'I\'m here to help with farming-related questions. You can ask about equipment, crop prices, plant diseases, or soil analysis.';
    }
  };

  return (
    <div className="chatbot">
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬 Chat
      </button>
      
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>Farm Assistant</h4>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about farming..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;