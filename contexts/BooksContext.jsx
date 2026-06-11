import { createContext, useEffect, useState } from "react"
import { databases, tablesDB } from "../lib/appwrite";
import { ID, Permission, Query, Role, TablesDB } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID;
const TABLE_ID = process.env.EXPO_PUBLIC_TABLE_ID;

export const BooksContext = createContext()

export function BooksProvider({children}) {
  const [books, setBooks] = useState([])
    const { user } = useUser()

 async function fetchBooks() {
  try {
    const response = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [
        Query.equal("userId", user.$id)
      ]
    });

    setBooks(response.rows);
    console.log(response.rows);
  } catch (error) {
    console.error(error.message);
  }
}

  async function fetchBookById(id) {
    try {

  
      return response 
    } catch (error) {
      console.log(error.message)
    }
  }

async function createBook(data) {
  try {
    await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),
      data: {
        ...data,
        userId: user.$id,
      },
      permissions: [
        Permission.read(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
        Permission.delete(Role.user(user.$id)),
      ],
    });
  } catch (error) {
    console.log(error.message);
  }
}

  async function deleteBook(id) {
    try {
      
    } catch (error) {
      console.log(error.message)
    }
  }


  useEffect(() => {

    if (user) {
      fetchBooks()
    } else {
      setBooks([])
    }

  }, [user])

  return (
    <BooksContext.Provider 
      value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  )
}