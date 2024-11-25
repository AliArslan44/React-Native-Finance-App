import {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    TouchableOpacity,
    Dimensions,
  } from "react-native";
  import React, { useContext, useEffect, useRef, useState } from "react";
  import {useFonts}from "expo-font";
  import PagerView from "react-native-pager-view";
  import AntDesign from "@expo/vector-icons/AntDesign";
import { ContextData } from "./context";
  
  export const Getstarted = () => {
    const {isClickGetst,setisClickGetst} =useContext(ContextData);
    const [currentPage, setcurrentPage] = useState(0);
    const [isSelectPage0, setisSelectPage0] = useState(true);
    const [isSelectPage1, setisSelectPage1] = useState(false);
    const [isSelectPage2, setisSelectPage2] = useState(false);
    const [pageCounter, setpageCounter] = useState(1)
    const Arrowval = useRef(new Animated.Value(-80)).current;
    const ArrowOp=useRef(new Animated.Value(0)).current
    const PagerViewRef=useRef(null);
   
    const showCards=()=>{
      if(PagerViewRef.current){
        PagerViewRef.current.setPage(pageCounter);
        setpageCounter(prev=>prev+1);
      }
      
    }
    
    const Arrowan = () => {
      Animated.timing(Arrowval, {
        toValue: -20,
        duration: 900,
        useNativeDriver: true,
      }).start();
      Animated.timing(ArrowOp, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }).start();
    };
    const pageslider=(e)=>{
      if(PagerViewRef.current){
      setcurrentPage(e.nativeEvent.position);
     
      }
    }
    useEffect(() => {
     
      switch (currentPage) {
        case 0:
          setisSelectPage0(true);
          setisSelectPage1(false);
          setisSelectPage2(false);
          break;
        case 1:
          setisSelectPage0(false);
          setisSelectPage1(true);
          setisSelectPage2(false);
          break;
        case 2:
          setisSelectPage0(false);
          setisSelectPage1(false);
          setisSelectPage2(true);
          break;
        default:
          break;
      }
    
    }, [currentPage]);
    const handlePress = () => {
      
      setcurrentPage((prev) => prev + 1);
      showCards();
      if(pageCounter==3){
        setisClickGetst(true)
          setpageCounter(0)
      }
      
      ArrowOp.setValue(0);
      Arrowval.setValue(-80);
      Arrowan();
    
    };
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PagerView
          style={{ height: 450, width: (Dimensions.get('screen').width*100)/100}}
          ref={PagerViewRef}
          onPageSelected={pageslider}
        >
          <View style={{ width: "100%", alignItems: "center" }} key={"0"}>
            <Image
              source={require("../assets/—Pngtree—finance_5418202.png")}
              style={{ height: 350, width: (Dimensions.get('screen').width*100)/100 }}
            />
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                width: "100%",
              }}
            >
              Finance App ile Yatırımlarınıza Bugün Başlayın
            </Text>
          </View>
          <View style={{ width: "100%", alignItems: "center" }} key={"1"}>
            <Image
              source={require("../assets/—Pngtree—finance_5418202.png")}
              style={{ height: 350, width: "100%" }}
            />
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                width: "80%",
              }}
            >
              Anlık Güncellenen Coin Değerleri İzleyin
            </Text>
          </View>
          <View style={{ width: "100%", alignItems: "center" }} key={"3"}>
            <Image
              source={require("../assets/—Pngtree—finance_5418202.png")}
              style={{ height: 350, width: "100%" }}
            />
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                width: "100%",
              }}
            >
              Finance App ile Yatırımlarınızı Yapın ve Kazançlarınızı Görün
            </Text>
          </View>
        </PagerView>
  
        <View style={{ flexDirection: "row",marginBottom:30 }}>
          <View
            style={isSelectPage0 ? styles.selectedNokta : styles.nokta}
          ></View>
          <View
            style={isSelectPage1 ? styles.selectedNokta : styles.nokta}
          ></View>
          <View
            style={isSelectPage2 ? styles.selectedNokta : styles.nokta}
          ></View>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <View
            style={{
              height: 60,
              width: 350,
              borderRadius: 10,
              backgroundColor: "#0056B3",
              flexDirection: "row",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              Başlarken
            </Text>
            <Animated.View
              style={[
                {
                  position: "absolute",
                  flex: 1,
                  width: "100%",
                  alignItems: "flex-end",
                  opacity:ArrowOp,
                },
                { transform: [{ translateX: Arrowval }] },
              ]}
            >
              <AntDesign name="arrowright" size={24} color="white" />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    nokta: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "lightgray",
      margin: 5,
    },
    selectedNokta: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "gray",
      margin: 5,
    },
  });
  