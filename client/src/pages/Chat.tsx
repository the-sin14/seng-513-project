import React, { useEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { sendCharRequest } from "../helpers/api-communicators";


type Message = {
  role: "user" | "assistant";
  content: string
}

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setchatMessages] = useState<Message[]>([]);
  const handleSubmit = async () =>{
      const content = inputRef.current?.value as string;
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      const newMessage: Message = {role: "user", content};
      setchatMessages((prev) => [...prev, newMessage]);
      const chatData = await sendCharRequest(content);
      setchatMessages([...chatData.chats])
  }
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 15,
        gap: 3,
      }}
    >
   
      {/* The Chat box */}
      <Box
        sx={{
          display: "flex",
          flex: { md: 1, xs: 1, sm: 1 },
          flexDirection: "column",
          gap: 5,
          
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "35px",
            color: "white",
            mx: "auto",
            
          }}
        >
          Welcome To Summarify
        </Typography>
        <Box
          sx={{
            width: "87%",
            height: "52vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div style={{width: "85%", padding:"15px", borderRadius:8, backgroundColor: "#39354A", display:"flex", margin:"auto", height: 50}}>

        {/* This is where the upload button goes need to add the functionalities*/}
        {/* So need to change the onclick handlesubmit thing */}
        <IconButton onClick={handleSubmit} sx={{color:"white", fontSize: "25px"}}>
          +
        </IconButton>
        <input
          ref={inputRef}
          type="text"
          placeholder="Message Summarify"
          style={{
            width: "100%",
            backgroundColor: "transparent",
            padding: "5px",
            border: "none",
            outline:"none",
            color: "white",
            fontSize: "25px",
          }}
        />
     
        <IconButton onClick={handleSubmit} sx={{mr:"15px", color:"white"}}>
          <IoMdSend/>
        </IconButton>
        </div>
        
      </Box>
    </Box>
  );
};

export default Chat;

