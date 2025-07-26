import React, { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]); // היסטוריית שיחה
  const [loading, setLoading] = useState(false);

  const askPDF = async () => {
    if (!question.trim()) return;
    const newMessage = { sender: "user", text: question };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask_pdf", {
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
    <div style={styles.container}>
      <h1 style={{ textAlign: "center" }}>shira.med.ai</h1>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#cce5ff" : "#e6e6e6",
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div style={{ ...styles.message, backgroundColor: "#f8f8f8" }}>
            ...שולח תשובה
          </div>
        )}
      </div>
      <div style={styles.inputArea}>
        <textarea
          rows="2"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="הקלד שאלה..."
          style={styles.textarea}
        />
        <button onClick={askPDF} disabled={loading} style={styles.button}>
          {loading ? "שולח..." : "שלח"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", height: "100vh", padding: 20 },
  chatBox: {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: 10,
    overflowY: "auto",
    marginBottom: 10,
    backgroundColor: "#fdfdfd",
  },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
    marginBottom: 5,
    wordWrap: "break-word",
  },
  inputArea: { display: "flex", gap: 10 },
  textarea: { flex: 1, padding: 10, borderRadius: 5, border: "1px solid #ccc" },
  button: { padding: "10px 20px", borderRadius: 5, cursor: "pointer" },
};

export default App;
