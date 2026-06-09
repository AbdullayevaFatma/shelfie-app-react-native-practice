import { Keyboard, StyleSheet, Text } from "react-native";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import { Link } from "expo-router";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";

const Register = () => {
  const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
   const handleSubmit =()=>{
    console.log("register form submitted",email,password);
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.title}>
        Register For an Account
      </ThemedText>
      <ThemedTextInput placeholder="Email" style={{width: "80%",marginBottom: 20}} keyboardType="email-address" onChangeText={setEmail} value={email}/>
            <ThemedTextInput placeholder="Password" style={{width: "80%",marginBottom: 20}}  onChangeText={setPassword} value={password} secureTextEntry />
       <ThemedButton onPress={handleSubmit}>
      <Text style={{color: "#f2f2f2"}}>Register</Text>
    </ThemedButton>
      <Spacer height={100} />
      <Link href="/login">
        <ThemedText style={{ textAlign: "center" }}>
          Login instead
        </ThemedText>
      </Link>
    </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

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
  }
});
