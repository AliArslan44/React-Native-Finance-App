import {
  PixelRatio,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { db } from "../firebaseconfig";
import { onValue, ref, set, update } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ContextData } from "./context";
export const Signup = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigation=useNavigation()
  const {isClickGetst,
    setisClickGetst,
    isclicklogin,
    setisclicklogin,
    isclicksign,
    setisclicksign,
    uname,
    setuname,}=useContext(ContextData)
  const handlePress = () => {
    if (email.trim() && password.trim() && username.trim()) {
      update(ref(db, "DATA/" + username), {
        username: username,
        email: email,
        password: password,
      });
      setuname(username);
      navigation.navigate("screen2");
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 30 / PixelRatio.getFontScale(),
          fontWeight: "bold",
          marginBottom: 20,
          letterSpacing: 0.5,
        }}
      >
        Kayıt Olun
      </Text>
      <Text
        style={{
          color: "red",
          fontSize: 16,
        }}
      >
        Girdiğiniz verileri kontrol edin
      </Text>
      <View style={styles.input}>
        <TextInput
          onChangeText={(text) => {
            setusername(text);
          }}
          maxLength={20}
          value={username}
          style={{ width: "90%", fontSize: 17 / PixelRatio.getFontScale() }}
          placeholder="Kullanıcı Adınızı Girin(0-20)"
        />
      </View>
      <View style={styles.input}>
        <TextInput
          onChangeText={(text) => {
            setpassword(text);
          }}
          inputMode="password"
          maxLength={12}
          value={password}
          style={{ width: "90%", fontSize: 17 / PixelRatio.getFontScale() }}
          placeholder="Şifrenizi Girin(0-12)"
        />
      </View>
      <View style={styles.input}>
        <TextInput
          onChangeText={(text) => {
            setemail(text);
          }}
          maxLength={40}
          value={email}
          style={{ width: "90%", fontSize: 17 / PixelRatio.getFontScale() }}
          placeholder="Mailinizi Girin"
        />
      </View>
      <TouchableOpacity onPress={handlePress}>
        <View
          style={{
            height: 50,
            width: 280,
            borderRadius: 10,
            backgroundColor: "#0056B3",
            flexDirection: "row",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Kayıt Ol</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: (Dimensions.get("window").width * 80) / 100,
    height: 45,
    backgroundColor: "lightgray",
    borderRadius: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
