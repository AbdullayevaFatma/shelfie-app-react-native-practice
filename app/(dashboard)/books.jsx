import { StyleSheet, FlatList, Pressable, Image } from "react-native";
import { useBooks } from "../../hooks/useBooks";
import { Colors } from "../../constants/Colors";

import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import ThemedCard from "../../components/ThemedCard";
import { useRouter } from "expo-router";
import DefaultBookCover from "../../assets/default-book-image.png";
import { getBookCoverUrl } from "../../lib/utils/storage";

const Books = () => {
  const { books } = useBooks();
  const router = useRouter();

if (books.length === 0) {
  return (
    <ThemedView style={styles.emptyContainer} safe={true}>
      <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
        No books yet
      </ThemedText>

      <ThemedText style={{ textAlign: "center", marginTop: 8 }}>
        Tap Create to add your first book.
      </ThemedText>
    </ThemedView>
  );
}

  return (
    <ThemedView style={styles.container} safe={true}>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Your Reading List
      </ThemedText>
  
      

      <FlatList
        data={books}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/books/${item.$id}`)}>
            <ThemedCard style={styles.card}>
              {item.coverImageId ? (
                <Image
                  source={{
                    uri: getBookCoverUrl(item.coverImageId)
                  }}
                  style={{
                    width: "100%",
                    height: 180,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}
                />
              ) : (
                <Image source={DefaultBookCover} style={styles.defaultImage} />
              )}
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText>Written by {item.author}</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />
    </ThemedView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    marginTop: 40,
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
 defaultImage: {
  width: "100%",
  height: 180,
  borderRadius: 8,
  marginBottom: 10,
  resizeMode: "cover",
  backgroundColor: "#eee",
},
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: "cover",
  },
  emptyContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
},
});
