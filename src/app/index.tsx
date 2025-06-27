import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Colors from "@/constants/Colors";
import { defaultStyles, themeConfig } from "@/constants/Styles";
import { Link } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";

const videoAssetId = require("@/assets/videos/intro.mp4");

const Page = () => {
  const player = useVideoPlayer(videoAssetId, (player) => {
    player.loop = true;
    player.play();
  });
  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        contentFit="cover"
        nativeControls={false}
      />

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Ready to change the way your money?
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 12,
          paddingHorizontal: 20,
          paddingBottom: 60,
        }}
      >
        <Link
          href={"/login"}
          asChild
          style={[
            defaultStyles.pillButton,
            { backgroundColor: Colors.dark, flex: 1 },
          ]}
        >
          <TouchableOpacity activeOpacity={themeConfig.activeOpacityButton}>
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "500",
              }}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/signup"}
          asChild
          style={[
            defaultStyles.pillButton,
            { backgroundColor: "white", flex: 1 },
          ]}
        >
          <TouchableOpacity activeOpacity={themeConfig.activeOpacityButton}>
            <Text
              style={{ color: Colors.dark, fontSize: 22, fontWeight: "500" }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    marginTop: 80,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontWeight: "900",
    fontSize: 30,
    textTransform: "uppercase",
  },
  video: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
});

export default Page;
