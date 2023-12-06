import "./LoadingChat.css"
import { Box, Avatar } from "@mui/material";

export const LoadingChat = () => {
  return (
    <Box className="box1 chat-message1">
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
      </Avatar>
      <Box>
        <div className="dots-1"></div>
      </Box>
    </Box>
  )
}
