import { Image, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useBooks } from "../../../hooks/useBooks";

import ThemedText from "../../../components/ThemedText";
import ThemedButton from "../../../components/ThemedButton";
import ThemedView from "../../../components/ThemedView";
import Spacer from "../../../components/Spacer";
import ThemedCard from "../../../components/ThemedCard";
import ThemedLoader from "../../../components/ThemedLoader";
import { Colors } from "../../../constants/Colors";
import { getBookCoverUrl } from "../../../lib/utils/storage";
import Toast from "react-native-toast-message";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { id } = useLocalSearchParams();
  const bookId = Array.isArray(id) ? id[0] : id;
  const { fetchBookById, deleteBook } = useBooks();
  const router = useRouter();


  const handleDelete = async () => {
  setDeleting(true);

  try {
    await deleteBook(bookId);

    Toast.show({
      type: "success",
      text1: "Deleted 🗑️",
      text2: "Book removed successfully",
    });
    

    router.replace("/books");
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Delete failed",
      text2: error instanceof Error ? error.message : "Try again",
    });
  } finally {
    setDeleting(false);
  }
};

useFocusEffect(
  useCallback(() => {
    const loadBook = async () => {
      const bookData = await fetchBookById(bookId);
      setBook(bookData);
    };

    loadBook();
  }, [bookId,fetchBookById])
);

  if (!book) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedCard style={styles.card}>
        {book.coverImageId && (
          <Image
            source={{
              uri: getBookCoverUrl(book.coverImageId)
            }}
            style={styles.coverImage}
          />
        )}

        <ThemedText style={styles.title}>{book.title}</ThemedText>
        <ThemedText>Written by {book.author}</ThemedText>

        <Spacer />

        <ThemedText title={true}>Book description:</ThemedText>

        <Spacer height={10} />

        <ThemedText>{book.description}</ThemedText>
      </ThemedCard>
      <View style={styles.actions}>
        <ThemedButton
          style={styles.edit}
          onPress={() => router.push(`/books/edit/${book.$id}`)}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Edit Book</Text>
        </ThemedButton>

        <ThemedButton style={styles.delete} onPress={handleDelete}  disabled={deleting}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Delete Book
          </Text>
        </ThemedButton>
      </View>
    </ThemedView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20,
  },
 coverImage: {
  width: "100%",
  height: 250,
  borderRadius: 10,
  marginBottom: 20,
},

actions: {
  flexDirection: "row",
  justifyContent: "space-evenly",
  marginTop: 30,
},

edit: {
  backgroundColor: Colors.primary,
  width: 140,
},

delete: {
  backgroundColor: Colors.warning,
  width: 140,
},
});
