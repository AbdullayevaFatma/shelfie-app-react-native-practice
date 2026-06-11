import {Client,Account,Avatars,Databases, TablesDB} from "react-native-appwrite"



export const client = new Client()
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)

export const account = new Account(client)
export const avatars = new Avatars(client)
export const tablesDB = new TablesDB(client)