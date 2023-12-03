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

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setchatMessages] = useState<Message[]>([]);


  const [fileInputKey, setFileInputKey] = useState(0);
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const content = e.target?.result as string;
      const truncatedContent = content.slice(0, 1000);

      const newMessage: Message = { role: "user", content: truncatedContent };
      setchatMessages((prev) => [...prev, newMessage]);

      const chatData = await sendChatRequest(truncatedContent);
      setchatMessages([...chatData.chats]);

      setFileInputKey((prevKey) => prevKey + 1);
    };

    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    const content = inputRef.current?.value.trim(); // Trim to remove any leading/trailing whitespaces

    // Clear the input field
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    // Check if the content is empty
    if (!content) {
      // Add a message from the assistant in case of empty input
      const emptyInputMessage = {
        role: "assistant",
        content: "Please enter something into the chat box",
      };
      setchatMessages(prevMessages => [...prevMessages, emptyInputMessage]);
    } else {
      // Add the user's message
      const newMessage: Message = { role: "user", content };
      setchatMessages(prevMessages => [...prevMessages, newMessage]);

      // Make the API call and process the response
      const chatData = await sendChatRequest(content);
      chatData.role = "assistant";
      console.log("chatData:", chatData); // Log the chatData object
      setchatMessages([...chatData.chats]);
      console.log("chatData.chats:", chatData.chats); // Log the chatData.chats object
    }
  };

  const handleSummarize = async () => {
    let content = inputRef.current?.value.trim();

    if (!content) {
      const emptyInputMessage = { role: "assistant", content: "Please enter something into the chat box to summarize" };
      setchatMessages(prev => [...prev, emptyInputMessage]);
    } else {
      const newMessage: Message = { role: "user", content };
      setchatMessages(prev => [...prev, newMessage]);

      content = "Please summarize the following: " + content;
      inputRef.current.value = "";  // Clear the input field

      const chatData = await sendChatRequest(content);
      chatData.role = "assistant";

      console.log("chatData:", chatData);
      setchatMessages([...chatData.chats]);
      console.log("chatData.chats:", chatData.chats);
    }
  };


  const handleBullets = async () => {
    let content = inputRef.current?.value.trim();

    if (!content) {
      const emptyInputMessage = { role: "assistant", content: "Please enter something into the chat box for bullet points" };
      setchatMessages(prev => [...prev, emptyInputMessage]);
    } else {
      const newMessage: Message = { role: "user", content };
      setchatMessages(prev => [...prev, newMessage]);

      content = "Please put the following in a bullet form summary, but numerically: " + content;
      inputRef.current.value = "";  // Clear the input field

      const chatData = await sendChatRequest(content);
      const modifiedChats = [...chatData.chats];

      const lastIndex = modifiedChats.length - 1;
      const lastItem = modifiedChats[lastIndex];
      const bullets = lastItem.content.split(/\n(?=\d+\. )|\n(?=- )/).filter(line => line.trim() !== '');
      const bulletMessages = bullets.map(bullet => ({ role: 'assistant', content: bullet }));

      setchatMessages(prevMessages => [...prevMessages, ...bulletMessages]);

      console.log("Bullet messages:", bulletMessages);
      contents = lastItem.content;
    }
  };

  const handleQuizMe = async () => {
    let content = inputRef.current?.value.trim();

    if (!content) {
      const emptyInputMessage = {
        role: "assistant",
        content: "Please enter some information for me to generate questions."
      };
      setchatMessages(prevMessages => [...prevMessages, emptyInputMessage]);
    } else {
      const newMessage: Message = { role: "user", content };
      setchatMessages(prevMessages => [...prevMessages, newMessage]);

      content = "Based on the following, ask me some questions about the information. Provide the answers to the questions under the questions. Please answer with the format 'question: ' and the followed by 'answer: ': " + content;
      inputRef.current.value = "";  // Clear the input field

      const chatData = await sendChatRequest(content);
      chatData.role = "assistant";

      console.log("chatData:", chatData);
      setchatMessages([...chatData.chats]);
      console.log("chatData.chats:", chatData.chats);
    }
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

          <IconButton onClick={handleSummarize} sx={{ color: "white", fontSize: "25px" }}>
            Summerize |
          </IconButton>

          <IconButton onClick={handleBullets} sx={{ color: "white", fontSize: "25px" }}>
            Bullets |
          </IconButton>

          <IconButton onClick={handleQuizMe} sx={{ color: "white", fontSize: "25px" }}>
            Quiz Me |
          </IconButton>

          <input
            key={fileInputKey}
            type="file"
            onChange={handleFileUpload}
            accept=".txt"
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <IconButton component="span" sx={{ color: "white", fontSize: "25px" }}>
              +
            </IconButton>
          </label>


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