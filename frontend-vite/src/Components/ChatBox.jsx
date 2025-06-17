// import { useState } from "react";
// import axios from "axios";

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input) return;

//     const userMessage = { role: "user", content: input };
//     setMessages(prev => [...prev, userMessage]);

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/query`, {
//         query: input,
//       });
//       const botMessage = { role: "assistant", content: res.data.result };
//       setMessages(prev => [...prev, botMessage]);
//     } catch (err) {
//       setMessages(prev => [...prev, { role: "assistant", content: "Error from server" }]);
//     }

//     setInput("");
//   };

//   return (
//     <div >
//       <h2>MediBot</h2>
//       <div className="messages">
//         {messages.map((msg, i) => (
//           <div key={i} className={msg.role}>{msg.content}</div>
//         ))}
//       </div>
//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         placeholder="Type your question..."
//       />
//     </div>
//   );
// };

// export default ChatBox;
// import { useState, useRef, useEffect } from "react";
// import axios from "axios";

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/query`, {
//         query: input,
//       });
//       const botMessage = { role: "assistant", content: res.data.result };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "Error from server." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col flex-1 bg-gray-100">
//       <header className="text-emerald-400 py-1 ps-2">
//         <h1 className="text-lg font-bold">MediBot</h1>
//       </header>

//       <main className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`max-w-3xl mx-auto px-4 py-2 rounded-lg text-sm whitespace-pre-line ${
//               msg.role === "user"
//                 ? "bg-cyan-100 text-right ml-auto"
//                 : "bg-white text-left mr-auto"
//             }`}
//           >
//             {msg.content}
//           </div>
//         ))}

//         {loading && (
//           <div className="max-w-3xl mx-auto bg-white px-4 py-2 rounded-lg text-left text-sm italic text-gray-500">
//             MediBot is typing...
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </main>

//       {/* <footer className="bg-white">
//         <div className="max-w-3xl mx-auto flex gap-2">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Type your question..."
//             className="flex-1 p-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />
//           <button
//             onClick={sendMessage}
//             className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
//           >
//             Send
//           </button>
//         </div>
//       </footer> */}
//       <footer className="sticky bottom-0 bg-gray-100 p-2 shadow-md">
//         <div className="max-w-3xl mx-auto flex gap-2">
//             <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 placeholder="Type your question..."
//                 className="flex-1 ps-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//             />
//             <button
//                 onClick={sendMessage}
//                 className="px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
//             >
//                 Send
//             </button>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ChatBox;
import { useRef, useEffect, useState } from "react";
import axios from "axios";

const ChatBox = ({ messages, setMessages, selectedChatId, updateChat }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/query", {
        query: input,
        language: language,//changes
      });
      const botMessage = { role: "assistant", content: res.data.result };
      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);

      if (selectedChatId) {
        // Update existing chat on backend
        await updateChat(selectedChatId, finalMessages);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Server error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    // <div className="flex flex-col h-full bg-gray-100">
    //   {/* Chat messages scroll area */}
    //   <div className="flex-1 overflow-y-auto p-4 space-y-4">
    //     {messages.map((msg, idx) => (
    //       <div
    //         key={idx}
    //         className={`max-w-3xl mx-auto px-4 py-2 rounded-lg text-sm whitespace-pre-line ${
    //           msg.role === "user"
    //             ? "bg-cyan-100 text-right ml-auto"
    //             : "bg-white text-left mr-auto"
    //         }`}
    //       >
    //         {msg.content}
    //       </div>
    //     ))}

    //     {loading && (
    //       <div className="max-w-3xl mx-auto text-left text-sm italic text-gray-500">
    //         MediBot is typing...
    //       </div>
    //     )}

    //     <div ref={messagesEndRef} />
    //   </div>

    //   {/* Input box pinned to bottom */}
    //   <div className="border-t p-4 bg-white shadow-md">
    //     <div className="max-w-3xl mx-auto flex gap-2">
    //       <input
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    //         placeholder={
    //           selectedChatId ? "Editing existing chat..." : "Type your question..."
    //         }
    //         className="flex-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
    //       />
    //       <button
    //         onClick={sendMessage}
    //         className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
    //       >
    //         Send
    //       </button>
    //     </div>
    //   </div>
    // </div>
    // ChatBox.js
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Scrollable messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-3xl mx-auto px-4 py-2 rounded-lg text-sm whitespace-pre-line ${
              msg.role === "user"
                ? "bg-sky-100 text-right ml-auto"
                : "bg-white text-left mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="max-w-3xl mx-auto text-left text-sm italic text-gray-500">
            MediBot is thinking
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box fixed at bottom */}
      <div className="p-5 mb-5 mx-auto w-200 bg-sky-100 shadow-md rounded-xl">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={!!selectedChatId}
            placeholder={
              selectedChatId
                ? "Read-only: viewing past chat"
                : "Type your question..."
            }
            className="flex-1 px-3 py-2 border border-gray-500 rounded-lg shadow-sm bg-sky-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 disabled:bg-gray-100"
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-2 py-1 border rounded-lg"
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="tamil">Tamil</option>
            <option value="bengali">Bengali</option>
            <option value="gujarati">Gujarati</option>
            {/* Add more as needed */}
          </select>

          <button
            onClick={sendMessage}
            disabled={!!selectedChatId}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
