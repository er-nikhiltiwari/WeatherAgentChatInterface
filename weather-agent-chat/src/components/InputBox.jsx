import { useState } from "react";
import { ArrowUpCircle } from "lucide-react";

export default function InputBox({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2 shadow-sm"
    >
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        className="flex-1 bg-transparent border-none focus:outline-none px-2 text-gray-800 placeholder-gray-400 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled}
        className="text-blue-600 hover:text-blue-800 disabled:opacity-40"
      >
        <ArrowUpCircle size={28} />
      </button>
    </form>
  );
}
