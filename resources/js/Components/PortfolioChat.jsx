import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaTimes } from "react-icons/fa";

export default function PortfolioChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat visibility
  const chatEndRef = useRef(null);

  // Auto-greeting when chat first opens
  useEffect(() => {
    if (isChatOpen) {
      const timer = setTimeout(() => {
        setMessages([
          {
            role: "bot",
            text: "Hi there! 👋 I’m AjBot, Alexandre Justin Repia’s assistant. How can I help you today?",
          },
        ]);
      }, 500); // Small delay for natural feel
      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsThinking(true);

    try {
      const response = await axios.post("/chatbot", { message: input });
      const botReply = response.data.reply;

      const botMessage = { role: "bot", text: "" };
      setMessages((prev) => [...prev, botMessage]);
      setIsThinking(false);
      setIsTyping(true);

      // Instant typing
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = botReply;
        return updated;
      });

      setIsTyping(false);
    } catch (error) {
      setIsThinking(false);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I couldn’t process that request." },
      ]);
    }
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking, isTyping]);

  // Toggle chat window
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gray-900 text-red-400 p-4 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110 z-[9998]"
        data-aos="fade-up"
        data-aos-delay="200"
        aria-label={isChatOpen ? "Close chat" : "Open chat"}
      >
        <FaRobot className="text-3xl" />
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div
          className="fixed bottom-20 right-6 w-80 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700 flex flex-col z-[9999]"
          data-aos="slide-up"
          data-aos-duration="300"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between p-3 bg-red-500 rounded-t-lg">
            <h3 className="text-lg font-bold text-white">AjBot</h3>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-transform duration-300 hover:scale-110"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3 h-96 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md max-w-[90%] break-words ${
                  msg.role === "user"
                    ? "bg-red-500 text-right ml-auto"
                    : "bg-gray-700 text-left"
                }`}
              >
                {msg.text}
                {isTyping && i === messages.length - 1 && msg.role === "bot" && (
                  <span className="ml-1 animate-pulse">▌</span>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-300"></div>
                <span>AjBot is thinking...</span>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Input Area */}
          <div className="flex p-2 border-t border-gray-700">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask AjBot..."
              className="flex-grow px-2 py-1 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              disabled={isThinking || isTyping}
            />
            <button
              onClick={sendMessage}
              disabled={isThinking || isTyping}
              className={`ml-2 px-3 py-1 rounded-md transition-colors ${
                isThinking || isTyping
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}