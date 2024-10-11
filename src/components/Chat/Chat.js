import React, { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.css";
import user from "../../photo/user.png"
import ass from "../../photo/assis.png"

const Chat = ({ pdfContent }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("https://ai-pdf-backend.vercel.app/submit_pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdfContent, userQuestion: input }),
      });
      
      const result = await response.json();

      if (result.success && result.data.success) {
        const aiMessage = { role: "ai", content: result.data.result.response };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errorMessage = { role: "ai", content: "Failed to fetch a response." };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = { role: "ai", content: "Error occurred while submitting the question." };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div>
      <div className={styles.chatContainer}>
        <div className={styles.chatBox} ref={chatBoxRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${message.role === "user" ? styles.userMessage : styles.aiMessage}`}
            >
              {/* Avatar Image */}
              <img
                src={message.role === "user" ? `${user}` : `${ass}`}
                alt={message.role === "user" ? "User" : "Assistant"}
                className={styles.avatar}
              />
              <div className={styles.messageContent}>
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className={styles.input}
          aria-label="Message input"
        />
        <button
          type="submit"
          className={styles.sendButton}
          aria-label="Send message"
        >
          ➤
        </button>
      </form>
    </div>
  );
};

export default Chat;
