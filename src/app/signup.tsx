import Colors from "@/constants/Colors";
import { defaultStyles, themeConfig } from "@/constants/Styles";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Page = () => {
  const [codeCountry, setCodeCountry] = useState("+62");

  const [phoneNumber, setPhoneNumber] = useState("");

  const { signUp } = useSignUp();

  const router = useRouter();

  const isPhoneNumberEmpty = phoneNumber === "";

  const handleSignUp = async () => {
    const fullPhoneNumber = `${codeCountry}${phoneNumber}`;

    try {
      await signUp?.create({ phoneNumber: fullPhoneNumber });
      signUp?.preparePhoneNumberVerification();

      router.push({
        pathname: "/verify/[phoneNumber]",
        params: { phoneNumber: fullPhoneNumber },
      });
    } catch (e) {
      alert("Error sign up: " + (e instanceof Error ? e.message : String(e)));
      console.error("Error sign up", e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={80}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you the confirmation code there
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setCodeCountry}
            value={codeCountry}
            editable={false}
            maxLength={3}
            placeholderTextColor={Colors.gray}
          />
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile Number"
            keyboardType="numeric"
            placeholderTextColor={Colors.gray}
          />
        </View>

        <Link href={"/"} asChild>
          <TouchableOpacity activeOpacity={themeConfig.activeOpacityButton}>
            <Text style={defaultStyles.textLink}>
              Already have a account? Log in.
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          activeOpacity={themeConfig.activeOpacityButton}
          disabled={isPhoneNumberEmpty}
          onPress={handleSignUp}
          style={[
            defaultStyles.pillButton,
            !isPhoneNumberEmpty ? styles.buttonEnabled : styles.buttonDisabled,
            { paddingBottom: 10 },
          ]}
        >
          <Text style={defaultStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
    gap: 10,
  },
  input: {
    padding: 20,
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 16,
    backgroundColor: Colors.lightGray,
  },
  buttonEnabled: {
    backgroundColor: Colors.primary,
  },
  buttonDisabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
