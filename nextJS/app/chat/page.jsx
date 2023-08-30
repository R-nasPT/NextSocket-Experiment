"use client";
import { Box, Container, Paper, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4001");

export default function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]); //<-- เห็นฝั่งตรงข้าม
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <Box
      sx={{
        flex: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingX: "300px",
        marginTop: "100px",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0.5, 0.5, 0.5, 0.5)",
        }}
      >
        {!showChat ? (
          <>
            <span>Join A Chat : </span>
            <TextField
              variant="outlined"
              label="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Room"
              onChange={(e) => setRoom(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={joinRoom}>
              Join a Room
            </Button>
          </>
        ) : (
          <Paper
            sx={{
              height: "500px",
              backgroundColor: "#eeeeee",
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            {/* Header */}
            <Box
              padding="10px"
              backgroundColor="#1976D2"
              color="white"
              borderBottom="1px solid #2a3eb1"
              boxSizing="border-box"
              textAlign="center"
            >
              <h2>Live Chat</h2>
            </Box>

            {/* Chat content */}
            <div style={{ flex: 1, maxHeight: "400px", overflowY: "auto" }}>
              {/* Chat content here */}
              {messageList.map((content) => (
                <div
                  key={content.time}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
                      content.author === username ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      background:
                        content.author === username ? "#DCF8C6" : "#FFF",
                      paddingY: "5px",
                      // paddingX: "15px",
                      paddingX:"15px",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 6px rgba(0.5, 0.5, 0.5, 0.1)",
                    }}
                  >
                    <p>{content.message}</p>
                  </div>
                  <div style={{ fontSize: "12px", color: "#888" }}>
                    <p>{content.time}</p>
                    <p>{content.author}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Text input and send button */}
            <Box
              display="flex"
              width="100%"
              backgroundColor="white"
              padding="10px"
              boxSizing="border-box"
            >
              <TextField
                fullWidth
                variant="outlined"
                label="Message"
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => {
                  e.key === "Enter" && sendMessage();
                }}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "10px" }}
                onClick={sendMessage}
              >
                Send
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
}
