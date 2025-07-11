import Colors from "@/constants/Colors";
import { handlePhoneNumberLogin } from "@/constants/logics/loginLogic";
import { defaultStyles, themeConfig } from "@/constants/Styles";
import { useSignIn } from "@clerk/clerk-expo";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

enum LogInType {
  PhoneNumber,
  Email,
  Google,
  Apple,
}

type THandleLogin = {
  type: LogInType;
};

const Page = () => {
  const [codeCountry, setCodeCountry] = useState("+62");

  const [phoneNumber, setPhoneNumber] = useState("");

  const isPhoneNumberEmpty = phoneNumber === "";

  const router = useRouter();

  const { signIn } = useSignIn();

  const handleLogin = async ({ type }: THandleLogin) => {
    const fullPhoneNumber = `${codeCountry}${phoneNumber}`;

    try {
      switch (type) {
        case LogInType.PhoneNumber:
          await handlePhoneNumberLogin(signIn, fullPhoneNumber);
          router.replace({
            pathname: "/verify/[phoneNumber]",
            params: { phoneNumber: fullPhoneNumber, isSignInString: "true" },
          });
          break;
        case LogInType.Email:
          //TODO:  await handleEmailLogin();
          break;
        case LogInType.Google:
          //TODO: await handleGoogleLogin();
          break;
        case LogInType.Apple:
          //TODO: await handleAppleLogin();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={80}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome Back!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number associated with your account.
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

        <TouchableOpacity
          onPress={() => handleLogin({ type: LogInType.PhoneNumber })}
          activeOpacity={themeConfig.activeOpacityButton}
          disabled={isPhoneNumberEmpty}
          style={[
            defaultStyles.pillButton,
            !isPhoneNumberEmpty ? styles.buttonEnabled : styles.buttonDisabled,
            { paddingBottom: 10 },
          ]}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text>Or</Text>
          <View style={styles.line} />
        </View>

        <View
          style={{
            gap: 18,
          }}
        >
          <TouchableOpacity
            // onPress={() => handleLogin(LogInType.Email)}
            style={[defaultStyles.pillButton, styles.buttonContainer]}
          >
            <Feather name="mail" size={24} color="black" />
            <Text style={[defaultStyles.buttonTextSmall, styles.buttonText]}>
              Log in With email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => handleLogin(LogInType.Google)}
            style={[defaultStyles.pillButton, styles.buttonContainer]}
          >
            <Ionicons name="logo-google" size={24} color="black" />
            <Text style={[defaultStyles.buttonTextSmall, styles.buttonText]}>
              Log in With Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => handleLogin(LogInType.Apple)}
            style={[defaultStyles.pillButton, styles.buttonContainer]}
          >
            <Ionicons name="logo-apple" size={24} color="black" />
            <Text
              style={[defaultStyles.buttonTextSmall, { color: Colors.dark }]}
            >
              Log in With Apple ID
            </Text>
          </TouchableOpacity>
        </View>
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
  buttonText: {
    color: Colors.dark,
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    gap: 16,
  },
  line: {
    backgroundColor: Colors.gray,
    height: StyleSheet.hairlineWidth,
    flex: 1,
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
