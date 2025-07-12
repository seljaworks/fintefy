import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: top }]}>
      <TouchableOpacity style={styles.avatar}>
        <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
          SG
        </Text>
      </TouchableOpacity>
      <View style={styles.searchWrapper}>
        <Ionicons
          style={styles.searchIcon}
          name="search"
          size={20}
          color={Colors.dark}
        />
        <TextInput
          style={styles.InputText}
          placeholder="Search"
          placeholderTextColor={Colors.dark}
        />
      </View>
      <TouchableOpacity style={styles.circle}>
        <Ionicons name="stats-chart" size={20} color={Colors.dark} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.circle}>
        <Ionicons name="card" size={20} color={Colors.dark} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    gap: 10,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.lightGray,
    alignItems: "center",
    borderRadius: 20,
  },
  InputText: {
    height: 40,
    borderColor: "gray",
    flex: 1,
    padding: 20,
    color: Colors.dark,
    paddingLeft: 8,
  },
  searchIcon: { padding: 10, paddingRight: 0 },
  circle: {
    backgroundColor: Colors.lightGray,
    borderRadius: 50,
    padding: 10,
  },
});
