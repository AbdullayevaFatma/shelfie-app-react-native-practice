import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import { Link } from "expo-router";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useUser } from "../../hooks/useUser";
import { Colors } from "../../constants/Colors";
import { validateEmail, validatePassword } from "../../lib/utils/validation";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useUser();

  const handleSubmit = async () => {
    setError(null);

    if (!email.trim() && !password.trim()) {
      return setError("Email and password are required");
    }

    if (!validateEmail(email)) {
      return setError("Invalid email address");
    }
    if (!validatePassword(password)) {
      return setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character (@$!%*?&)",
      );
    }

    try {
      await register(email, password);
      Toast.show({
        type: "success",
        text1: "Account created",
        text2: "Welcome to Shelfie",
      });
      setError(null);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration failed",
        text2: error.message || "Something went wrong",
      });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText title={true} style={styles.title}>
          Register For an Account
        </ThemedText>
        <ThemedTextInput
          placeholder="Email"
          style={{ width: "80%", marginBottom: 20 }}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <View style={{ width: "80%", marginBottom: 20, position: "relative" }}>
          <ThemedTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            style={{ paddingRight: 50 }}
          />

          <Pressable
            onPress={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: 15,
              top: 18,
            }}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color={Colors.primary}
            />
          </Pressable>
        </View>
        <ThemedButton onPress={handleSubmit}>
          <Text style={{ color: "#f2f2f2" }}>Register</Text>
        </ThemedButton>
        <Spacer height={10} />
        {error && <Text style={styles.error}>{error}</Text>}
        <Spacer height={10} />
        <Link href="/login">
          <ThemedText style={styles.link}>
            Already have an account? Login
          </ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 30,
  },
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: "#f5c1c8",
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: Colors.primary,
  },
});
