// const ChatHistory = ({ history, onSelect, onNewChat, onSaveNewChat, selectedChatId }) => {
//   return (
//     <div className="w-64 bg-white border-r p-4 overflow-y-auto shadow-sm">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Chat History</h2>
//         <div className="flex gap-2">
//           <button
//             onClick={onNewChat}
//             className="text-sm text-blue-600 hover:underline"
//           >
//             + New
//           </button>
//           {!selectedChatId && (
//             <button
//               onClick={onSaveNewChat}
//               className="text-sm text-green-600 hover:underline"
//             >
//               Save
//             </button>
//           )}
//         </div>
//       </div>
//       <ul className="space-y-2">
//         {history.map((chat, idx) => (
//           <li
//             key={chat.id || idx}
//             onClick={() => onSelect(chat)}
//             className="cursor-pointer p-2 bg-gray-100 rounded hover:bg-cyan-100"
//           >
//             {chat.title || `Chat ${idx + 1}`}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ChatHistory;
const ChatHistory = ({ history, onSelect, onNewChat }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Fixed header with New Chat button */}
      <div className="p-4 bg-neutral-50 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chat History</h2>
        {/* <button
          onClick={onNewChat}
          className="text-sm text-blue-600 hover:underline"
        >
          + New
        </button> */}
        <button
          onClick={onNewChat}
          className="text-sm text-blue-600 hover:underline"
        >
          + New Chat
        </button>
      </div>

      {/* Scrollable list below header */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-neutral-50">
        <ul>
          {history.map((chat, idx) => (
            <li
              key={chat.id || idx}
              onClick={() => onSelect(chat)}
              className="cursor-pointer p-2 bg-gray-100 rounded hover:bg-sky-100"
            >
              {chat.title || `Chat ${idx + 1}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatHistory;
