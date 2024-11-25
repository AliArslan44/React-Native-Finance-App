import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../firebaseconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ContextData } from "./context";
export const Login = () => {
  const {
    isClickGetst,
    setisClickGetst,
    isclicklogin,
    setisclicklogin,
    isclicksign,
    setisclicksign,
    uname,
    setuname,
  } = useContext(ContextData);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigation=useNavigation();
  const handlepress = () => {
    onValue(ref(db, "DATA/" + username + "/"), (snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.child("/password").val() == password) {
         
          setuname(username)
          navigation.navigate('screen2')
        }
      }
    });
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
        Giriş Yapın
      </Text>
      <View style={styles.input}>
        <TextInput
          onChangeText={(text) => {
            setusername(text);
          }}
          maxLength={20}
          value={username}
          style={{ width: "90%", fontSize: 17 / PixelRatio.getFontScale() }}
          placeholder="Kullanıcı Adı veya Mail Girin"
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
          placeholder="Şifrenizi Girin"
        />
      </View>
      <TouchableOpacity onPress={handlepress}>
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
          <Text style={{ color: "white", fontSize: 20 }}>Giriş Yap</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: (Dimensions.get("screen").width * 80) / 100,
    height: 45,
    backgroundColor: "lightgray",
    borderRadius: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
