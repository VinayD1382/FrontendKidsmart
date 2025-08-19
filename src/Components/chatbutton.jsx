import React, { useState } from "react";
import ChatBox from "./ChatBox"; 
import { MessageCircle } from "lucide-react"; 

function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#0d6efd",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
        onClick={() => setOpen(!open)}
      >
        <MessageCircle size={30} />
      </div>

      
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            height: "400px",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          <ChatBox user="customer1@example.com" />
        </div>
      )}
    </div>
  );
}

export default ChatButton;
