import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TRoundedBtn = {
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
  title: string;
};

const RoundedBtn = ({ iconName, onPress, title }: TRoundedBtn) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={styles.container}
    >
      <View style={styles.circle}>
        <Ionicons name={iconName} size={40} color={Colors.dark} />
      </View>
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default RoundedBtn;

const styles = StyleSheet.create({
  container: { gap: 10, alignItems: "center" },
  circle: {
    backgroundColor: Colors.lightGray,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: Colors.dark,
    fontWeight: 500,
  },
});
