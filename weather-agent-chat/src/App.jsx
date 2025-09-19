import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full h-full sm:max-w-3xl sm:h-[90%] bg-white shadow-lg rounded-none sm:rounded-2xl flex flex-col overflow-hidden">
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;
