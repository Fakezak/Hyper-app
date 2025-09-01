import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChat(prev => [...prev, data]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={chat}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <TextInput value={message} onChangeText={setMessage} placeholder="Type a message" style={{ borderWidth: 1, marginVertical: 10, padding: 10 }} />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}
