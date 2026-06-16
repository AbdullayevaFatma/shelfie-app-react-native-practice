import { StyleSheet, Text } from 'react-native'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import { useUser } from '../../hooks/useUser'
import ThemedButton from '../../components/ThemedButton'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'

const Profile = () => {
  const {logout,user} = useUser()
   const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();

      Toast.show({
        type: "success",
        text1: "Logged out",
        text2: "See you soon ",
      });

      router.replace("/login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Logout failed",
        text2: error.message,
      });
    }
  };
  return (
    <ThemedView style={styles.container}>

      <ThemedText title={true} style={styles.heading}>
        {user.email}
      </ThemedText>
      <Spacer />

      <ThemedText>Time to start reading some books...</ThemedText>
      <Spacer />

      <ThemedButton onPress={handleLogout}>
        <Text style={{color: "#f2f2f2"}}>Logout</Text>
      </ThemedButton>

    </ThemedView>
  )
}

export default Profile

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
})