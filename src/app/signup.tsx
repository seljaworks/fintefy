import { defaultStyles } from "@/constants/Styles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Page = () => {
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Let's get started!</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter your phone number. We will send you the confirmation code there
      </Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
