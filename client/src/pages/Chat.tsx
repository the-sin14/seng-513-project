import "./Chat.css"
import React, { useEffect, useRef, useState } from "react";
import { FaCirclePlus, FaFileExport } from "react-icons/fa6";
import { IoArrowRedoSharp } from "react-icons/io5";
import { Box, Avatar, Typography, Button, IconButton, FormControl, Select, MenuItem, Divider } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
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
  const [initialView, setInitialView] = useState(true);

  const [uploadSlidesContent, setUploadSlidesContent] = React.useState(
    <div className="upload-slides-text">
      <Typography
        variant="h1"
        style={{ color: "#515458", fontSize: "35px", fontWeight: "bolder",
        display: "block", marginBottom: "35px", textAlign: "center"}}
      >
        UPLOAD YOUR LECTURE SLIDES
      </Typography>
      <Typography
        variant="h5"
        style={{ color: "#888484", fontSize: "20px", textAlign: "center" }}
      >
        Supported files types: TXT
      </Typography>
    </div>
  );

  const [fileInputKey, setFileInputKey] = useState(0);
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadSlidesContent('');
    setInitialView(false);
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
    setUploadSlidesContent('');
    setInitialView(false);
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
    setUploadSlidesContent('');
    setInitialView(false);
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
    setUploadSlidesContent('');
    setInitialView(false);
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
    setUploadSlidesContent('');
    setInitialView(false);
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
    setUploadSlidesContent('');
    setInitialView(false);
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
        {/* <FormControl>
          <div className="user-options">
            <div className="user-option-1">
              <Typography variant="h6" id="summarization-type-label">Summarization Type</Typography>
              <Select id="summarization-type-drop-down" sx={{
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #344055",
                '.MuiSvgIcon-root': {
                  backgroundColor: "#344055",
                  color: "#F2F1EE",
                  fontSize: "58px",
                  borderRadius: "6px",
                  marginRight: "-7px"
                },
                '&:before': {
                  borderBottom: "1px solid #F2F1EE"
                }
              }} MenuProps={{
                sx: {
                  '& .MuiMenu-paper': {
                    border: "1px solid #344055",
                    marginTop: "5px",
                    color: "#000000"
                  },
                  '& .MuiMenuItem-root:hover': {
                    color: "#000000",
                  },
                  '& .MuiMenuItem-root': {
                    color: "black"
                  },
                  '& .Mui-selected': {
                    backgroundColor: "#61728F",
                    color: "#F2F1EE"
                  }
                }
              }}>
                <MenuItem value={"Paragraph"}>Paragraph</MenuItem>
                <MenuItem value={"Point"}>Point</MenuItem>
              </Select>
            </div>

            <div className="user-options-2">
              <Typography variant="h6" id="generate-flashcards-label">Generate Questions?</Typography>
              <Select id="generate-quiz-questions-dropdown" sx={{
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #344055",
                '.MuiSvgIcon-root': {
                  backgroundColor: "#344055",
                  color: "#F2F1EE",
                  fontSize: "58px",
                  borderRadius: "6px",
                  marginRight: "-7px"
                },
                '&:before': {
                  borderBottom: "1px solid #F2F1EE"
                },
              }} MenuProps={{
                sx: {
                  '& .MuiMenu-paper': {
                    border: "1px solid #344055",
                    marginTop: "5px",
                    color: "#000000"
                  },
                  '& .MuiMenuItem-root:hover': {
                    color: "#000000",
                  },
                  '& .MuiMenuItem-root': {
                    color: "black"
                  },

                  '& .Mui-selected': {
                    backgroundColor: "#61728F",
                    color: "#F2F1EE"
                  }
                }
              }}>
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
            </div>
          </div>
        </FormControl>

        <Divider className="section-break"/> */}

        <Box sx={{
            width: "87%",
            height: initialView ? "63vh" : "100%",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            alignItems: initialView ? "center" : "auto",
            justifyContent: initialView ? "center" : "flex-start",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}>
  
          {uploadSlidesContent}

          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>

          <div className="chat-input-field">

            {/* This is where the upload button goes need to add the functionalities*/}
            {/* So need to change the onclick handlesubmit thing */}
            {/* <button
              onClick={handleExport}
              disabled={chatMessages.length === 0}
            >
              Export to PDF
            </button> */}

            <IconButton onClick={handleExport} disabled={chatMessages.length === 0}>
              <FaFileExport className="export-button"/>
            </IconButton>

            <IconButton onClick={handleSummarize}>
              <Typography variant="h6" sx={{ color: "#344055", fontSize: "23px" }}>Summarize</Typography>
            </IconButton>
            <Typography variant="h6" sx={{ color: "#344055"}}>|</Typography>

            <IconButton onClick={handleBullets} sx={{ color: "#344055", fontSize: "25px" }}>
            <Typography variant="h6" sx={{ color: "#344055", fontSize: "23px" }}>Bullets</Typography>
            </IconButton>
            <Typography variant="h6" sx={{ color: "#344055"}}>|</Typography>
            
            <IconButton onClick={handleQuizMe} sx={{ color: "#344055", fontSize: "25px" }}>
            <Typography variant="h6" sx={{ color: "#344055", fontSize: "23px" }}>Questions</Typography>
            </IconButton>
            <Typography variant="h6" sx={{ color: "#344055"}}>|</Typography>

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
                <FaCirclePlus className="upload-file-button" />
              </IconButton>
            </label>

            <input
              ref={inputRef}
              type="text"
              placeholder="Message Summarify"
              className="text-field"
            />

            <IconButton onClick={handleSubmit} sx={{ mr: "15px", color: "white" }}>
              <IoArrowRedoSharp className="enter-notes-button"/>
            </IconButton>
          </div>

      </Box>
    </Box>
  );
};

export default Chat;