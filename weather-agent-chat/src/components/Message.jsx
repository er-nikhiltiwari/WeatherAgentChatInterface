export default function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm leading-relaxed
          ${isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
          }`}
      >
        {content}
      </div>
    </div>
  );
}
