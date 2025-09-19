import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import useWeatherAPI from "../hooks/useWeatherAPI";

export default function ChatWindow() {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! Ask me about the weather 🌤️" },
  ]);

  const { fetchWeather, loading, error } = useWeatherAPI();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    try {
      // Add user message
      setMessages((prev) => [...prev, { role: "user", content: text }]);

      // Try to fetch weather
      const reply = await fetchWeather(text);

      if (!reply) {
        throw new Error("Unable to fetch weather data");
      }

      setMessages((prev) => [...prev, { role: "bot", content: reply }]);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I couldn't fetch the weather data. Please try again.",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h2 className="text-lg font-semibold">Weather Agent Chat</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <Message key={`msg-${i}-${msg.role}`} role={msg.role} content={msg.content} />
        ))}
        {loading && <Message role="bot" content="⏳ Fetching weather data..." />}
        {error && (
          <Message role="bot" content={`❌ Error: ${error}`} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3 bg-white">
        <InputBox onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
