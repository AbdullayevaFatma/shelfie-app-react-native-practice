import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useUser } from "../../hooks/useUser"
import GuestOnly from "../../components/auth/GuestOnly";

export default function AuthLayout() {
const {user} = useUser()
console.log(user);
  return (
    <GuestOnly>
      <StatusBar value="auto" />
      <Stack screenOptions={{
       headerShown: false,animation: "none"
      }}/>
      
    </GuestOnly>
  )
}