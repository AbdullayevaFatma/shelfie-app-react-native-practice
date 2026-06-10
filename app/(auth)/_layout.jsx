import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useUser } from "../../hooks/useUser"

export default function AuthLayout() {
const {user} = useUser()
console.log(user);
  return (
    <>
      <StatusBar value="auto" />
      <Stack screenOptions={{
       headerShown: false,animation: "none"
      }}/>
      
    </>
  )
}