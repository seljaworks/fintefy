import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { Fragment, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TextInputProps, View } from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;
const autoComplete = Platform.select<TextInputProps["autoComplete"]>({
  android: "sms-otp",
  default: "one-time-code",
});

const Page = () => {
  const { phoneNumber, isSignInString } = useLocalSearchParams<{
    phoneNumber: string;
    isSignInString: string;
  }>();
  const { signIn } = useSignIn();
  const { setActive, signUp } = useSignUp();

  const [code, setCode] = useState("");

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      if (isSignInString === "true") {
        verifyLogin();
      } else {
        verifySignUp();
      }
    }
  }, [code]);

  const verifySignUp = async () => {
    try {
      await signUp?.attemptPhoneNumberVerification({
        code,
      });

      await setActive!({ session: signUp?.createdSessionId });
    } catch (error) {
      if (error instanceof Error) {
        alert(`Verification failed: ${error.message}`);
      } else {
        alert("Verification failed. Please try again.");
      }
    }
  };

  const verifyLogin = async () => {
    try {
      await signIn?.attemptFirstFactor({
        code,
        strategy: "phone_code",
      });

      if (setActive) {
        await setActive({ session: signIn?.createdSessionId });
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Verification failed: ${error.message}`);
      } else {
        alert("Verification failed. Please try again.");
      }
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digits code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to {phoneNumber}, unless you already have an account.
      </Text>

      <Text style={styles.title}>Verification</Text>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={autoComplete}
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              style={[styles.cellRoot, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused && <Cursor />)}
              </Text>
            </View>
            {index === 2 && (
              <View key={`separator-${index}`} style={styles.separator} />
            )}
          </Fragment>
        )}
      />

      {signUp?.missingFields.map((m) => (
        <Text>{m}</Text>
      ))}
      <Text> {}</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: {
    marginVertical: 20,
    marginHorizontal: "auto",
    gap: 12,
  },
  cellRoot: {
    width: "13%",
    // height: "auto",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
  },
  cellText: {
    color: "#000", // text color
    fontSize: 36,
    textAlign: "center",
  },

  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 1,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
  },
});
