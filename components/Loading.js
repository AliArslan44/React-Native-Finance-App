import { Animated, PixelRatio, StyleSheet, Text, View,Image } from "react-native";
import React, { useEffect, useRef } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
export const Loading = () => {
  const rotateAn = useRef(new Animated.Value(0)).current;

  useEffect(() => {});

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={[{ justifyContent: "center", alignItems: "center" }]}>
        <Image source={require('../assets/Animation - 1730199544534.gif')}/>
      </View>
      <Text
        style={{
          fontSize: 17 / PixelRatio.getFontScale(),
          fontWeight: "bold",
          textAlign:'center'
        }}
      >
        Yükleniyor
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
