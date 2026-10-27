import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./Components/NavBar";
import ChatHistory from "./Components/ChatHistory";
import ChatBox from "./Components/ChatBox";
import FirstAidGuide from "./Components/FirstAidGuide";
import MediBot from "./Components/MediBot";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Auth from "./Components/Auth";
import Register from "./Components/Register";
import AboutUs from "./Components/AboutUs";
import UserDashboard from "./Components/UserDashboard";
import SettingsPage from "./Components/SettingsPage";
import { Routes, Route } from "react-router-dom";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token")
  );

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    if (!isAuthenticated) return;

    axios
      .get(`${API_URL}/chat`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        const chatsWithPreview = res.data.map((chat) => {
          const firstUserMsg =
            chat.messages.find((msg) => msg.role === "user")?.content ||
            "New Chat";
          const preview =
            firstUserMsg.length > 40
              ? firstUserMsg.slice(0, 40) + "..."
              : firstUserMsg;
          return { ...chat, title: preview };
        });
        setChatHistory(chatsWithPreview);
      })
      .catch((err) => console.error("Failed to fetch chats", err));
  }, [isAuthenticated]);

  const handleSaveChat = async () => {
    // If user is just viewing old chat, don't save
    if (selectedChat || currentMessages.length === 0) {
      // Reset to new blank chat
      setCurrentMessages([]);
      setSelectedChat(null);
      return;
    }

    const title =
      currentMessages[0]?.content?.slice(0, 30) ||
      `Chat ${new Date().toLocaleString()}`;

    try {
      const res = await axios.post(
        `${API_URL}/chat`,
        {
          title,
          messages: currentMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const savedChat = {
        id: res.data.id,
        title,
        messages: currentMessages,
      };

      setChatHistory((prev) => [savedChat, ...prev]);
      setCurrentMessages([]);
      setSelectedChat(null);
    } catch (error) {
      console.error("Error saving chat:", error);
    }
  };

  // Update existing chat (PUT)
  const updateChat = async (chatId, messages) => {
    try {
      await axios.put(
        `${API_URL}/chat/${chatId}`,
        {
          messages,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setChatHistory((prev) =>
        prev.map((chat) => (chat.id === chatId ? { ...chat, messages } : chat))
      );
    } catch (error) {
      console.error("Failed to update chat:", error);
    }
  };

  // When selecting chat from history
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setCurrentMessages(chat.messages);
  };

  // When starting a new chat
  const handleNewChat = () => {
    setSelectedChat(null);
    setCurrentMessages([]);
  };

  const resetChatState = () => {
    setChatHistory([]);
    setCurrentMessages([]);
    setSelectedChat(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        resetChatState={resetChatState}
      />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dashboard" element={<UserDashboard/>} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route
          path="/login"
          element={<Auth setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/firstaid" element={<FirstAidGuide />} />
        <Route
          path="/chat"
          element={
            <div className="flex flex-1 overflow-hidden">
              {/* Chat History column */}
              <div className="w-64 bg-white border-r">
                <ChatHistory
                  history={chatHistory}
                  onSelect={handleSelectChat}
                  onNewChat={handleSaveChat}
                />
              </div>

              {/* Chat box section */}
              <div className="flex-1 flex flex-col">
                <ChatBox
                  messages={currentMessages}
                  setMessages={setCurrentMessages}
                  selectedChatId={selectedChat?.id}
                  updateChat={updateChat}
                />
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
