import { BaseToast, ErrorToast } from "react-native-toast-message";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";

export const toastConfig = (theme) => ({
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.primary,
        backgroundColor: theme.uiBackground,
      }}
      text1Style={{
        color: theme.title,
        fontSize: 16,
        fontWeight: "bold",
      }}
      text2Style={{
        color: theme.text,
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#e03c55",
        backgroundColor: theme.uiBackground,
      }}
      text1Style={{
        color: theme.title,
        fontSize: 16,
        fontWeight: "bold",
      }}
      text2Style={{
        color: theme.text,
      }}
    />
  ),
});