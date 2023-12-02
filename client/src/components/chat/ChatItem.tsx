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
  role: "user" | "ai";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role == "ai" ? (
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
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#008080",
        gap: 2,
        borderRadius: 2,
        flexDirection: "row-reverse", // Reverse the order of elements
        alignItems: "center", // Vertically align the content and Avatar
      }}
    >
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
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
      }}
    >
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
