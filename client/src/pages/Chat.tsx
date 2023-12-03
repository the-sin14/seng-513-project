import React, { useEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { sendChatRequest } from "../helpers/api-communicators";
import { useNavigate } from 'react-router-dom'
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { Font, StyleSheet } from '@react-pdf/renderer';



let contents = "";

type Message = {
  role: "user" | "assistant";
  content: string
}

const ChatDocument = ({ chats }) => (
  <Document>
    <Page>
      {chats.map((chat, index) => (
        <Text key={index}>{chat.content}</Text>
      ))}
    </Page>
  </Document>
);

// export default ChatDocument;


const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setchatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setchatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    chatData.role = "assistant";
    console.log("chatData:", chatData); // Log the chatData object
    setchatMessages([...chatData.chats])
    console.log("chatData.chats:", chatData.chats); // Log the chatData.chats object

  }
  const handleSummarize = async () => {
    let content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content };
    setchatMessages((prev) => [...prev, newMessage]);

    content = "Please summarize the following: " + content;

    const chatData = await sendChatRequest(content);
    chatData.role = "assistant";

    console.log("chatData:", chatData);
    setchatMessages([...chatData.chats]);
    console.log("chatData.chats:", chatData.chats);
  };

  const handleBullets = async () => {
    let content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content };
    setchatMessages((prev) => [...prev, newMessage]);

    content = "Please put the following in a bullet form summary, but numerically: " + content;

    const chatData = await sendChatRequest(content);
    const modifiedChats = [...chatData.chats];

    const lastIndex = modifiedChats.length - 1;
    const lastItem = modifiedChats[lastIndex];

    // Split the content into bullet points using regex
    // This regex captures the bullet numbers as well
    const bullets = lastItem.content.split(/\n(?=\d+\. )|\n(?=- )/).filter(line => line.trim() !== '');

    // Create a new message for each bullet point
    const bulletMessages = bullets.map(bullet => ({ role: 'assistant', content: bullet }));

    // Add new bullet messages to the chat
    setchatMessages(prevMessages => [...prevMessages, ...bulletMessages]);

    console.log("Bullet messages:", bulletMessages);

    // Set processed chats for PDF export
    // setProcessedChats(modifiedChats.concat(bulletMessages));
    contents = lastItem.content;

  };

  // const handleBullets = async () => {
  //   let content = inputRef.current?.value as string;
  //   if (inputRef && inputRef.current) {
  //     inputRef.current.value = "";
  //   }

  //   const newMessage: Message = { role: "user", content };
  //   setchatMessages((prev) => [...prev, newMessage]);

  //   content = "Please put the following in a bullet form summary: " + content;

  //   const chatData = await sendChatRequest(content);
  //   chatData.role = "assistant";

  //   console.log("chatData:", chatData);
  //   setchatMessages([...chatData.chats]);
  //   console.log("chatData.chats:", chatData.chats);
  // };

  const handleQuizMe = async () => {
    let content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content };
    setchatMessages((prev) => [...prev, newMessage]);

    content = "Based on the following, ask me some questions about the information. Provide the answers to the questions under the questions. Please answer with the format 'question: ' and the followed by 'answer: ': " + content;

    const chatData = await sendChatRequest(content);
    chatData.role = "assistant";

    console.log("chatData:", chatData);
    setchatMessages([...chatData.chats]);
    console.log("chatData.chats:", chatData.chats);
  };

  const handleExport = async () => {
    // Generate the PDF and trigger download
    const pdfBlob = await pdf(<ChatDocument chats={chatMessages} />).toBlob();
    saveAs(pdfBlob, 'chatData.pdf');
  };


  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  })
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
            color: "black",
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
        <div style={{ width: "85%", padding: "15px", borderRadius: 8, backgroundColor: "#39354A", display: "flex", margin: "auto", height: 50 }}>

          {/* This is where the upload button goes need to add the functionalities*/}
          {/* So need to change the onclick handlesubmit thing */}
          <button
            onClick={handleExport}
            disabled={chatMessages.length === 0}
          >
            Export to PDF
          </button>


          {/* <IconButton onClick={handleExport} sx={{ color: "white", fontSize: "25px" }}>
            Export |
          </IconButton> */}

          <IconButton onClick={handleSummarize} sx={{ color: "white", fontSize: "25px" }}>
            Summerize |
          </IconButton>

          <IconButton onClick={handleBullets} sx={{ color: "white", fontSize: "25px" }}>
            Bullets |
          </IconButton>

          <IconButton onClick={handleQuizMe} sx={{ color: "white", fontSize: "25px" }}>
            Quiz Me |
          </IconButton>

          <IconButton onClick={handleSubmit} sx={{ color: "white", fontSize: "25px" }}>
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
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />

          <IconButton onClick={handleSubmit} sx={{ mr: "15px", color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>

      </Box>
    </Box>
  );
};

export default Chat;