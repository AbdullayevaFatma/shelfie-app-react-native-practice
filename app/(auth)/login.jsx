import {StyleSheet, Text, TextInput } from "react-native";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import { Link } from "expo-router";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";

const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const {login} = useUser()

  const handleSubmit = async()=>{
    try {
      await login(email,password)
    } catch (error) {
      console.log(error);
    }

   
  }

  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.title}>
        Login to Your Account
      </ThemedText>
      <ThemedTextInput placeholder="Email" style={{width: "80%",marginBottom: 20}} keyboardType="email-address" onChangeText={setEmail} value={email}/>
      <ThemedTextInput placeholder="Password" style={{width: "80%",marginBottom: 20}}  onChangeText={setPassword} value={password} secureTextEntry />
    <ThemedButton onPress={handleSubmit}>
      <Text style={{color: "#f2f2f2"}}>Login</Text>
    </ThemedButton>
      <Spacer height={100} />
      <Link href="/register">
        <ThemedText style={{ textAlign: "center" }}>
          Register instead
        </ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title:{
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30
  },

});
