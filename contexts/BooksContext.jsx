import { createContext, useEffect, useState } from "react";
import { tablesDB } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";
import { storage } from "../lib/appwrite";
import * as FileSystem from "expo-file-system";

const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID;
const TABLE_ID = process.env.EXPO_PUBLIC_TABLE_ID;
const BUCKET_ID = process.env.EXPO_PUBLIC_BUCKET_ID;

export const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const { user } = useUser();

  async function fetchBooks() {
    try {
      const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        queries: [Query.equal("userId", user.$id)],
      });

      setBooks(response.rows);
      console.log(response.rows);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchBookById(id) {
    try {
      const response = await tablesDB.getRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: id,
      });

      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  async function uploadImage(imageUri) {
    if (!imageUri) return null;

    try {
      const fileInfo = await FileSystem.getInfoAsync(imageUri);

      const file = {
        uri: imageUri,
        name: "cover.jpg",
        type: "image/jpeg",
        size: fileInfo.size,
      };

      const uploaded = await storage.createFile({
        bucketId: BUCKET_ID,
        fileId: ID.unique(),
        file,
      });

      return uploaded.$id;
    } catch (error) {
      console.log("UPLOAD ERROR:", error);
      return null;
    }
  }
  async function createBook(data) {
    try {
      let coverImageId = null;

      if (data.coverImage) {
        coverImageId = await uploadImage(data.coverImage);
      }
      console.log("coverImage:", data.coverImage);
      console.log("uploaded coverImageId:", coverImageId);

      const payload = {
        title: data.title,
        author: data.author,
        description: data.description,
        userId: user.$id,
        coverImageId,
      };

      await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: payload,
        permissions: [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ],
      });

      await fetchBooks();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function updateBook(id, data) {
    try {
      const existingBook = await fetchBookById(id);

      let coverImageId = existingBook.coverImageId;

      if (data.coverImage && data.coverImage !== existingBook.coverImageId) {
        if (existingBook.coverImageId) {
          try {
            await storage.deleteFile({
              bucketId: BUCKET_ID,
              fileId: existingBook.coverImageId,
            });
          } catch (error) {
            console.log("DELETE IMAGE ERROR:", error);
          }
        }

        coverImageId = await uploadImage(data.coverImage);
      }

      await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: id,
        data: {
          title: data.title,
          author: data.author,
          description: data.description,
          coverImageId,
        },
      });

      await fetchBooks();
    } catch (error) {
      console.log("UPDATE ERROR:", error);
    }
  }

  async function deleteBook(id) {
    try {
      const book = await fetchBookById(id);

      if (book.coverImageId) {
        await storage.deleteFile({
          bucketId: BUCKET_ID,
          fileId: book.coverImageId,
        });
      }

      await tablesDB.deleteRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: id,
      });

      await fetchBooks();
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (!user) {
      setBooks([]);
      return;
    }

    fetchBooks();
  }, [user]);

  return (
    <BooksContext.Provider
      value={{
        books,
        fetchBooks,
        fetchBookById,
        createBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
