import { Image, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import ThemedButton from "../components/ThemedButton";
import Spacer from "../components/Spacer";

import Logo from "../assets/logo.png";
import { Colors } from "../constants/Colors";
import { useUser } from "../hooks/useUser";

const Home = () => {
  const { user } = useUser();
  const isLoggedIn = !!user;
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />

        <ThemedText title={true} style={styles.title}>
          Shelfie
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Track your reading journey, organize your books, and build your habit.
        </ThemedText>
      </View>

      <View style={styles.actions}>
        <Link href={isLoggedIn ? "/books" : "/register"} asChild>
          <ThemedButton>
            <ThemedText style={styles.buttonText}>
              {isLoggedIn ? "Go to Books" : "Get Started"}
            </ThemedText>
          </ThemedButton>
        </Link>

        <Spacer height={20} />

        {!isLoggedIn && (
          <Link href="/login" asChild>
            <ThemedText style={styles.loginText}>
              Already have an account? Login
            </ThemedText>
          </Link>
        )}
      </View>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  header: {
    alignItems: "center",
  },

  logo: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },

  actions: {
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  loginText: {
    color: Colors.primary,
    fontWeight: "500",
  },
});
