import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";

export function Auth() {
  if (Platform.OS === "ios")
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 50 }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // Sign in via Supabase Auth.
            if (credential.identityToken) {
              console.log(credential);
              // do something here
            } else {
              throw new Error("No identityToken.");
            }
          } catch (e) {
            console.log(e);
          }
        }}
      />
    );
  return <>{/* Implement Android Auth options. */}</>;
}
