import "./ChatItem.css"
import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";


function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role == "user" ? (
    // <Box
    //   sx={{
    //     display: "flex",
    //     p: 2,
    //     bgcolor: "#004d5612",
    //     gap: 2,
    //     borderRadius: 2,
    //     my: 1,
    //   }}
    // >
    //   <Avatar sx={{ ml: "0" }}>
    //     <img src="openai.png" alt="openai" width={"30px"} />
    //   </Avatar>

    // </Box>
    <Box className="box chat-message">
      <Avatar sx={{ ml: "0", bgcolor: "white", color: "black" }}>
        {/* Avatar content */}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              { block }
            ) : (
              <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>

  ) : (
    <Box className="box1 chat-message1">
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>

      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (

              { block }

            ) : (
              <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
