import React, { useState } from "react";
import { Container, Box, Typography, Paper, TextField, IconButton, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubble from "./ChatBubble";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askPDF = async () => {
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ask_pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMsg = { sender: "bot", text: "שגיאה בחיבור ל-API" };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setLoading(false);
    setQuestion("");
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", height: "100vh", padding: "20px" }}>
      {/* כותרת עליונה */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          shira.med.ai
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          צ'אט רפואי מבוסס ספר האריסון
        </Typography>
      </Box>

      {/* חלון הצ'אט */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          padding: "10px",
          borderRadius: "12px",
          overflowY: "auto",
          mb: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, i) => (
          <ChatBubble key={i} sender={msg.sender} text={msg.text} />
        ))}
        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress size={30} />
          </Box>
        )}
      </Paper>

      {/* אזור הקלט */}
      <Box sx={{ display: "flex", gap: "10px" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="הקלד שאלה..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askPDF()}
        />
        <IconButton color="primary" onClick={askPDF} disabled={loading}>
          <SendIcon />
        </IconButton>
      </Box>
    </Container>
  );
}

export default App;
