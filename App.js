import { StatusBar } from "expo-status-bar";
import { PixelRatio, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Getstarted } from "./components/getstarted";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PagerView from "react-native-pager-view";
import { Context, ContextData } from "./components/context";
import { useContext, useEffect, useRef, useState } from "react";
import { Home } from "./components/Home";
import { Discover } from "./components/Discover";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { BlurView } from "expo-blur";
import { Calc } from "./components/calc";
const Stack = createStackNavigator();

export default function App() {
  return (
    <Context>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="screen1"
            component={MainPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screen2"
            component={Secpage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Context>
  );
}
const MainPage = () => {
  const { isClickGetst, setisClickGetst } = useContext(ContextData);
  const pageview = useRef(null);
  useEffect(() => {
    if (isClickGetst) {
      pageview.current.setPage(1);
      setisClickGetst(false);
    }
  }, [isClickGetst]);
  return (
    <PagerView style={{ flex: 1 }} ref={pageview}>
      <View style={styles.container}>
        <Getstarted />
      </View>
      <View style={styles.container}>
        <Signup />
      </View>
      <View style={styles.container}>
        <Login />
      </View>
    </PagerView>
  );
};
const Secpage = () => {
  const pageref=useRef(null)
  const [currentPage, setcurrentPage] = useState(0)
  const handleChangepage=(e)=>{
    setcurrentPage(e.nativeEvent.position);
  }
  const handlepressliked=()=>{
    pageref.current.setPage(0)
  }
  const handlepressdiscover=()=>{
    pageref.current.setPage(1)
  }
  const handlepresscalc=()=>{
    pageref.current.setPage(2)
  }
  return (
    <>
      <PagerView style={{ flex: 1 }} ref={pageref} onPageScroll={handleChangepage}>
        <View style={styles.container}>
          <Home />
        </View>
        <View style={styles.container}>
          <Discover />
        </View>
        <View style={styles.container}>
          <Calc />
        </View>
      </PagerView>
      <BlurView
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 80,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          flexDirection: "row",
        }}
        intensity={50}
        tint="systemMaterialDark"
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity onPress={handlepressliked}>
            <Fontisto name="like" size={24} color={currentPage==0?"black":'white'} />
           
          </TouchableOpacity>
          <Text style={{color:currentPage==0?"black":'white',fontSize:13/PixelRatio.getFontScale()}}>Beğenilenler</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity onPress={handlepressdiscover}>
          <MaterialIcons name="currency-bitcoin" size={24} color={currentPage==1?"black":'white'}/>
          </TouchableOpacity>
          <Text style={{color:currentPage==1?"black":'white',fontSize:13/PixelRatio.getFontScale()}}>Keşfet</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity onPress={handlepresscalc}>
          <Entypo name="calculator" size={24} color={currentPage==2?"black":'white'} />
          </TouchableOpacity>
          <Text style={{color:currentPage==2?"black":'white',fontSize:13/PixelRatio.getFontScale()}}>Hesapla</Text>
        </View>
      </BlurView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
