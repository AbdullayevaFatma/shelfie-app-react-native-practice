import {
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { useBooks } from "../../../../hooks/useBooks";
import ThemedLoader from "../../../../components/ThemedLoader";
import ThemedView from "../../../../components/ThemedView";
import ThemedText from "../../../../components/ThemedText";
import ThemedButton from "../../../../components/ThemedButton";
import ThemedTextInput from "../../../../components/ThemedTextInput";
import Spacer from "../../../../components/Spacer";
import DefaultBookImage from "../../../../assets/default-book-image.png";

const EditBook = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { fetchBookById, updateBook } = useBooks();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    async function loadBook() {
      const book = await fetchBookById(id);

      if (book) {
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);

        setCoverImage(book.coverImageId);
      }

      setLoading(false);
    }

    loadBook();
  }, [id]);

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

  const handleUpdate = async () => {
    if (!title.trim() || !author.trim() || !description.trim()) return;

    setSaving(true);

    await updateBook(id, {
      title,
      author,
      description,
      coverImage,
    });

    setSaving(false);

    router.replace(`/books`);
  };

  if (loading) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedText title={true} style={styles.heading}>
          Edit Book
        </ThemedText>

        <Spacer />

        <ThemedButton onPress={pickImage}>
          <Text style={{ color: "#fff" }}>
            {coverImage ? "Change Cover Image" : "Select Cover Image"}
          </Text>
        </ThemedButton>

        <Spacer />
        <Image
          source={
            coverImage
              ? {
                  uri: coverImage.startsWith("file")
                    ? coverImage
                    : `${process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.EXPO_PUBLIC_BUCKET_ID}/files/${coverImage}/view?project=${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`,
                }
              : DefaultBookImage
          }
          style={styles.image}
        />

        <Spacer />

        <ThemedTextInput
          placeholder="Book Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <Spacer />

        <ThemedTextInput
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
          style={styles.input}
        />

        <Spacer />

        <ThemedTextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={styles.multiline}
        />

        <Spacer />

        <ThemedButton onPress={handleUpdate} disabled={saving}>
          <Text style={{ color: "#fff" }}>
            {saving ? "Updating..." : "Update Book"}
          </Text>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default EditBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },

  input: {
    alignSelf: "stretch",
    marginHorizontal: 40,
    padding: 20,
    borderRadius: 8,
  },

  multiline: {
    alignSelf: "stretch",
    marginHorizontal: 40,
    padding: 20,
    borderRadius: 8,
    minHeight: 120,
  },

  image: {
    width: 120,
    height: 160,
    borderRadius: 8,
  },
});
