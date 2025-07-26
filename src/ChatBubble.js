import React from "react";
import { Box, Typography } from "@mui/material";

const ChatBubble = ({ sender, text }) => {
  const isUser = sender === "user";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 1,
      }}
    >
      <Box
        sx={{
          maxWidth: "80%",
          padding: "10px 15px",
          borderRadius: "16px",
          backgroundColor: isUser ? "#1976d2" : "#e0e0e0",
          color: isUser ? "white" : "black",
          wordBreak: "break-word",
        }}
      >
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Box>
  );
};

export default ChatBubble;
