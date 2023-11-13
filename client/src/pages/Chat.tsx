import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { sendCharRequest } from "../helpers/api-communicators";

// import {
//   deleteUserChats,
//   getUserChats,
//   sendChatRequest,
// } from "../helpers/api-communicator";


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
      <Box
        sx={{
          display: { md: "flex", xs: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        {/* THe side bar chat style */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "75vh",
            bgcolor: "rgb(25,35, 50)",
            borderRadius: 3,
            flexDirection: "column",
            mx: 2,
          }}
        >
          {/* The "I" thing */}
          <Avatar
            sx={{
              mx: "auto",
              my: 3,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {/* Will show the letter I */}
            {auth?.user?.name[0]}
          </Avatar>

          {/* Description of the Chat Bot */}
          <Typography
            sx={{ mx: "auto", fontFamily: "work sans", width: "200px" }}
          >
            You are talking to a Chat Bot
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              my: 0.5,
              width: "200px",
              p: 1,
            }}
          >
            You can ask me questions about your lecture slides and I will you
            summarize them for you.
          </Typography>
          
          {/* The clear conversation button */}
          <Button
            sx={{
              width: "200px",
              height: "30px",
              my: "auto",
              color: "white",
              fontWeight: "600",
              borderRadius: 2,
              bgcolor: "red",
              m: "auto",
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      
      {/* The Chat box */}
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
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
