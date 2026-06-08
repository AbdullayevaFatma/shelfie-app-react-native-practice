import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function AuthLayout() {

  return (
    <>
      <StatusBar value="auto" />
      <Stack screenOptions={{
       headerShown: false,animation: "none"
      }}>
        {/* Individual Screens */}
        <Stack.Screen name="index" options={{ title: "Home" }} />
        
      </Stack>
    </>
  )
}