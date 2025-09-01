import React from "react";
import { View, Text, Image } from "react-native";

export default function VideoCard({ video }) {
  return (
    <View style={{ marginVertical: 10, borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 10 }}>
      <Image source={{ uri: video.thumbnail }} style={{ width: "100%", height: 200, borderRadius: 10 }} />
      <Text style={{ marginTop: 5, fontWeight: "bold" }}>{video.title}</Text>
      <Text>{video.likes} Likes • {video.comments.length} Comments</Text>
    </View>
  );
}
