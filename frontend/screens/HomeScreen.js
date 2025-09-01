import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import VideoCard from "../components/VideoCard";

export default function HomeScreen({ navigation }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/videos")
      .then(res => setVideos(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Hyper Feed</Text>
      <FlatList
        data={videos}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: item.user._id })}>
            <VideoCard video={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
