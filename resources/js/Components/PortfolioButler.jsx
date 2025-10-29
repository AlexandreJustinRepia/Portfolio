import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaTimes } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

export default function PortfolioButler() {
  const sessionIdRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = crypto.randomUUID();
    }
  }, []);

  // Auto-greeting when chat first opens
  useEffect(() => {
    if (isChatOpen) {
      const timer = setTimeout(() => {
        setMessages([
          {
            role: "bot",
            text: "Hi there! I’m Aelex, Alexandre Justin Repia’s assistant. How can I help you today?",
          },
        ]);
      }, 500);
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
      const response = await axios.post("/butler", {
        message: input,
        conversation: messages,
        session_id: sessionIdRef.current,
      });

      const botReply = response.data.reply;

      const botMessage = { role: "bot", text: "" };
      setMessages((prev) => [...prev, botMessage]);
      setIsThinking(false);
      setIsTyping(true);

      // Typing effect
      let typedText = "";
      const typingInterval = setInterval(() => {
        if (typedText.length < botReply.length) {
          typedText += botReply[typedText.length];
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1].text = typedText;
            return updated;
          });
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30);
    } catch (error) {
      setIsThinking(false);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I couldn’t process that request." },
      ]);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking, isTyping]);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
    setShowBubble(false);
  };

  return (
    <>
      {/* Floating Chat Button with Animated Speech Bubble */}
      <div className="fixed bottom-6 right-6 z-[9998] group">
        <button
          onClick={toggleChat}
          className="bg-gray-900 text-red-400 p-4 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110 animate-pulse-slow"
          data-aos="fade-up"
          data-aos-delay="200"
          aria-label={isChatOpen ? "Close chat" : "Open chat"}
        >
          <FaRobot className="text-3xl" />
        </button>

        {/* Pop-up Speech Bubble */}
        {showBubble && (
          <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-md after:content-[''] after:absolute after:top-full after:right-4 after:border-8 after:border-transparent after:border-t-gray-800 animate-pop-up">
            Tap me if you want assistance!
          </div>
        )}
      </div>

      {/* Chat Window with Pop-up Animation */}
      {isChatOpen && (
        <div
          className="fixed bottom-20 right-6 w-80 md:w-96 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700 flex flex-col z-[9999] h-[500px] max-h-[80vh] animate-pop-up"
          data-aos="slide-up"
          data-aos-duration="300"
        >
          {/* Chat Header */}
          <div className="flex flex-col p-3 bg-red-500 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Aelex</h3>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-transform duration-300 hover:scale-110"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <p className="text-xs text-white/80 mt-1">Powered by Llama-3.1-8B Instruct</p>
          </div>

          {/* Chat Messages - Scrollable */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-800">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md max-w-[90%] break-words ${
                  msg.role === "user"
                    ? "bg-red-500 text-right ml-auto"
                    : "bg-gray-700 text-left"
                }`}
              >
                <ReactMarkdown
                  components={{
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-sm">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-sm">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="ml-4">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-red-400 font-semibold">{children}</strong>
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
                {isTyping && i === messages.length - 1 && msg.role === "bot" && (
                  <span className="ml-1 animate-pulse">|</span>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-300"></div>
                <span>Aelex is thinking...</span>
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
              placeholder="Ask Aelex..."
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

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes pop-up {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          60% {
            opacity: 1;
            transform: scale(1.05) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-pop-up {
          animation: pop-up 0.4s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}