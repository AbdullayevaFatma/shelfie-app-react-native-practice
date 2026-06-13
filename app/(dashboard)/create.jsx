import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { useBooks } from "../../hooks/useBooks";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedTextInput from "../../components/ThemedTextInput";
import ThemedButton from "../../components/ThemedButton";
import Spacer from "../../components/Spacer";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);

  const { createBook } = useBooks();
  const router = useRouter();
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setCoverImage(result.assets[0].uri);
    }
  };

  async function handleSubmit() {
    if (!title.trim() || !author.trim() || !description.trim()) return;

    setLoading(true);

    await createBook({ title, author, description, coverImage });

    setTitle("");
    setAuthor("");
    setDescription("");
    setCoverImage(null);

    router.replace("/books");

    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedText title={true} style={styles.heading}>
          Add a New Book
        </ThemedText>
        <Spacer />
        <ThemedButton onPress={pickImage}>
          <Text style={{ color: "#fff" }}>
            {coverImage ? "Change Cover Image" : "Select Cover Image"}
          </Text>
        </ThemedButton>

        {coverImage && (
          <Image
            source={{ uri: coverImage }}
            style={{
              width: 120,
              height: 160,
              marginTop: 10,
              borderRadius: 6,
            }}
          />
        )}

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Book Title"
          value={title}
          onChangeText={setTitle}
        />
        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
        />
        <Spacer />

        <ThemedTextInput
          style={styles.multiline}
          placeholder="Book Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{ color: "#fff" }}>
            {loading ? "Saving..." : "Create Book"}
          </Text>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
});
