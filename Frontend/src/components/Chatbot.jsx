import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaRegSmile } from "react-icons/fa";
import Picker from "emoji-picker-react";

function Chatbot() {
  // State to store chat messages
  const [messages, setMessages] = useState([]);
  // State to handle user input
  const [input, setInput] = useState("");
  // State to toggle chatbot visibility
  const [isOpen, setIsOpen] = useState(false);
  // State to toggle emoji picker visibility
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // State to show "Typing..." animation while fetching response
  const [isLoading, setIsLoading] = useState(false);

  // Ref to scroll chat to the latest message
  const messagesEndRef = useRef(null);

  // Scroll to the latest message whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to handle sending a message
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return; // Prevent empty messages and spamming requests

    // Format timestamp for the message
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

    // Add user message to the chat
    const userMessage = { text: input, sender: "user", time: timestamp };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(""); // Clear input field
    setIsLoading(true); // Show typing animation

    try {
      // Send request to backend chatbot API
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/chat`,
       {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json(); // Get AI response

      // Add AI chatbot response to the chat
      const botMessage = { text: data.reply, sender: "bot", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }) };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [...prevMessages, { text: "Error getting response.", sender: "bot", time: timestamp }]);
    } finally {
      setIsLoading(false); // Hide typing animation after receiving response
    }
  };

  // Function to add an emoji to the input field
  const addEmoji = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false); // Hide emoji picker after selecting
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <button onClick={() => setIsOpen(!isOpen)} className="animate-pulse fixed bottom-6 right-10 bg-gray-700 hover:bg-black text-white p-3 rounded-full shadow-xl transition-all">
        {isOpen ? <FaTimes size={20} /> : <FaRobot size={50} />}
      </button>

      {/* Chatbot UI */}
      {isOpen && (
        <div className="fixed bottom-16 right-8 w-[500px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden">
          {/* Chatbot Header */}
          <div className="bg-gray-500 text-white p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">AI Travel Chatbot</h3>
            <FaTimes className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>

          {/* Chat Messages */}
          <div className="p-3 h-80 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`p-3 my-3 text-sm rounded-md w-fit max-w-[80%] ${msg.sender === "user" ? "ml-auto bg-blue-200" : "mr-auto bg-gray-200"}`}>
                <p>{msg.text}</p>
                <span className="text-xs text-gray-600 block text-right">{msg.time}</span>
              </div>
            ))}

            {/* "Typing..." animation while fetching AI response */}
            {isLoading && (
              <div className="p-3 my-3 text-sm rounded-md w-fit max-w-[80%] mr-auto bg-gray-200">
                <p className="animate-pulse">Typing...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && <Picker onEmojiClick={(emojiObject) => addEmoji(emojiObject)} className="absolute bottom-14 left-3 shadow-md" />}

          {/* Chat Input & Send Button */}
          <div className="p-3 border-t flex items-center space-x-2">
            {/* Emoji Picker Button */}
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2 bg-gray-200 rounded-full">
              <FaRegSmile size={20} />
            </button>

            {/* Input field */}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about travel..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none"
              disabled={isLoading} // Disable input while fetching response
            />

            {/* Send Button */}
            <button onClick={sendMessage} className={`h-10 w-10 text-white ml-2 p-3 rounded-r-lg ${isLoading ? "bg-gray-400" : "bg-gray-700 hover:bg-black"}`} disabled={isLoading}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
