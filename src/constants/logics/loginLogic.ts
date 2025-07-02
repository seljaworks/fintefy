import { useSignIn } from "@clerk/clerk-expo";

export const handlePhoneNumberLogin = async (
  signIn: ReturnType<typeof useSignIn>["signIn"],
  fullPhoneNumber: string
) => {
  if (!signIn) {
    throw new Error("SignIn instance is not available");
  }
  const signInAttempt = await signIn.create({
    identifier: fullPhoneNumber,
  });

  const phoneFactor = signInAttempt?.supportedFirstFactors?.find(
    (factor) => factor.strategy === "phone_code" && "phoneNumberId" in factor
  );

  if (!phoneFactor) {
    throw new Error("No supported phone factor found");
  }

  await signIn.prepareFirstFactor({
    strategy: "phone_code",
    phoneNumberId: phoneFactor.phoneNumberId,
  });
};

export const handleEmailLogin = async () => {
  // Implement email login logic here
};

export const handleGoogleLogin = async () => {
  // Implement Google login logic here
};

export const handleAppleLogin = async () => {
  // Implement Apple login logic here
};
