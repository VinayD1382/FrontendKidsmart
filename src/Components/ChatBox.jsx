import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { clearMessages } from "./chatUtils";

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const prevLengthRef = useRef(0);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      if (msgs.length > prevLengthRef.current) {
        const latestMsg = msgs[msgs.length - 1];
        if (latestMsg.sender !== "customer") {
          if (Notification.permission === "granted") new Notification("New Message", { body: latestMsg.message });
          const audio = new Audio("/one.mp3");
          audio.play().catch((err) => console.log("Audio play blocked:", err));
        }
      }

      prevLengthRef.current = msgs.length;
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "messages"), {
      sender: "customer",
      message: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  const startNewChat = async () => {
    await clearMessages();
    setMessages([]);
    prevLengthRef.current = 0;
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <button
  onClick={() => setIsOpen(!isOpen)}
  style={{
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    background: "#007bff",
    color: "white",
    fontSize: "28px",
    border: "none",
    cursor: "pointer",
    position: "relative", 
  }}
>
  💬
  
  
  {messages.length > 0 && !isOpen && (
    <span
      style={{
        position: "absolute",
        top: "5px",
        right: "5px",
        background: "red",
        color: "white",
        borderRadius: "50%",
        padding: "2px 6px",
        fontSize: "12px",
      }}
    >
      {messages.length}
    </span>
  )}
</button>


      {isOpen && (
        <div style={{ width: "300px", height: "400px", background: "#fff", border: "1px solid #ccc", borderRadius: "10px", position: "absolute", bottom: "70px", right: "0", display: "flex", flexDirection: "column" }}>
          <div style={{ background: "#007bff", color: "#fff", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>Customer Support</div>

          <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
            {messages.map((msg) => (
              <p key={msg.id} style={{ textAlign: msg.sender === "customer" ? "right" : "left", margin: "5px 0", color: msg.sender === "customer" ? "blue" : "green" }}>
                <strong>{msg.sender}: </strong> {msg.message}
              </p>
            ))}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: "5px" }} />
            <button onClick={sendMessage} style={{ background: "#007bff", color: "#fff", border: "none", padding: "5px 10px" }}>Send</button>
            <button onClick={startNewChat} style={{ background: "#6c757d", color: "#fff", border: "none", padding: "5px 10px" }}>New Chat</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
