import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "./Loading";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ContextData } from "./context";
import { onValue, ref, update } from "firebase/database";
import { db } from "../firebaseconfig";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as imagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";

export const Home = () => {
  const [category, setcategory] = useState([
    "Saatlik değişimi gör",
    "Günlük değişimi gör",
    "Haftalık değişimi gör",
    "Aylık değişimi gör",
    "2 Aylık değişimi gör",
    "3 Aylık değişimi gör",
  ]);
  const {
    isClickGetst,
    setisClickGetst,
    isclicklogin,
    setisclicklogin,
    isclicksign,
    setisclicksign,
    uname,
    setuname,
    pressliked,
    setpressliked,
    likedlist,
    setlikedlist,
    API
  } = useContext(ContextData);
  const [name, setname] = useState([]);
  const [symbol, setsymbol] = useState([]);
  const [price, setprice] = useState([]);
  const [priceHour, setpriceHour] = useState([]);
  const [priceDay, setpriceDay] = useState([]);
  const [priceWeek, setpriceWeek] = useState([]);
  const [priceMonth, setpriceMonth] = useState([]);
  const [price2M, setprice2M] = useState([]);
  const [price3M, setprice3M] = useState([]);
  const [likedname, setlikedname] = useState([]);
  const [likedsymbol, setlikedsymbol] = useState([]);
  const [likedprice, setlikedprice] = useState([]);
  const [likedpriceHour, setlikedpriceHour] = useState([]);
  const [likedpriceDay, setlikedpriceDay] = useState([]);
  const [likedpriceWeek, setlikedpriceWeek] = useState([]);
  const [likedpriceMonth, setlikedpriceMonth] = useState([]);
  const [likedprice2M, setlikedprice2M] = useState([]);
  const [likedprice3M, setlikedprice3M] = useState([]);


  const [loading, setloading] = useState(false);
  const [isliked, setisliked] = useState(false);
  const [selectedIndex1, setselectedIndex1] = useState();
  const [selectedIndex2, setselectedIndex2] = useState();
  const [likedIndex, setlikedIndex] = useState();
  const [renderText, setrenderText] = useState(0);
  const [profilePath, setprofilePath] = useState("");
  const [profilepage, setprofilepage] = useState(false);
  
  const handlepresspro = () => {
    setprofilepage(true);
  };
  const selectImage = async () => {
    let result = await imagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: imagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setprofilePath(result.assets[0].uri);
      setprofilepage(false);
    }
  };
  
  
  const FetchData = async () => {
    try {
      setloading(false);
      const response = await axios.get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY="+API
      );
      for (let i = 0; i <= 10; i++) {
        name.push(response.data.data[i].name);
        symbol.push(response.data.data[i].symbol);
        price.push(response.data.data[i].quote.USD.price);
        priceHour.push(response.data.data[i].quote.USD.percent_change_1h);
        priceDay.push(response.data.data[i].quote.USD.percent_change_24h);
        priceWeek.push(response.data.data[i].quote.USD.percent_change_7d);
        priceMonth.push(response.data.data[i].quote.USD.percent_change_30d);
        price2M.push(response.data.data[i].quote.USD.percent_change_60d);
        price3M.push(response.data.data[i].quote.USD.percent_change_90d);
      }
    } catch (e) {
    } finally {
      if (name[0] == "Bitcoin") {
        setloading(true);
      }
    }
  };

  useEffect(() => {
    if (pressliked) {
      console.log("discoverda begenildi");
      setrenderText((p) => p + 1);
      setpressliked(false);
    }
  }, [pressliked]);
  const getValue = () => {
    const list = [];
if(likedlist.length>0){
  onValue(ref(db, "DATA/" + uname + "/" + "favlist/"), (snapshot) => {
    for (
      let i = 0;
      i < Object.values(snapshot.child("/name").val()).length;
      i++
    ) {
      list.push(
        <View
          key={i}
          style={{
            width: "90%",
            padding: 20,
            backgroundColor: "#ab9dff",
            borderRadius: 20,
            marginTop: 19,
            position: "relative",
          }}
        >
          <Text
            style={{
              fontSize: 19 / PixelRatio.getFontScale(),
              color: "#242334",
              fontWeight: "bold",
            }}
          >
            {snapshot.child("/name").val()[i]}
          </Text>
          <Text
            style={{
              fontSize: 17 / PixelRatio.getFontScale(),
              color: "#5c519d",
            }}
          >
            Anlık değeri
          </Text>
          <Text
            style={{
              fontSize: 35 / PixelRatio.getFontScale(),
              color: "#372f68",
              fontWeight: "bold",
            }}
          >
            {snapshot.child("/price").val()[i]}
            <Text
              style={{
                fontSize: 20 / PixelRatio.getFontScale(),
                color: "#372f68",
                fontWeight: "bold",
              }}
            >
              {" "}
              USD
            </Text>
          </Text>
          <View style={{ flexDirection: "row",alignItems:'center' }}>
            <Text>Saatlik değer analizi:</Text>
            <FontAwesome6
              name={snapshot.child('/priceHour').val()[i] > 0 ? "arrow-trend-up" : "arrow-trend-down"}
              size={24}
              color={snapshot.child('/priceHour').val()[i] > 0 ? "#70E4A4" : "#FF7070"}
            />
            <Text
              style={{
                fontSize: 18 / PixelRatio.getFontScale(),
                color:snapshot.child('/priceHour').val()[i] > 0 ? "#70E4A4" : "#FF7070",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >{((snapshot.child('/priceHour').val()[i]*snapshot.child("/price").val()[i])/100).toFixed(4)} </Text>
            <Text style={{color: "#372f68",fontSize:16/PixelRatio.getFontScale()}}> USD</Text>
          </View>
          <View style={{ flexDirection: "row",alignItems:'center' }}>
            <Text>Günlük değer analizi:</Text>
            <FontAwesome6
              name={snapshot.child('/priceDay').val()[i]> 0 ? "arrow-trend-up" : "arrow-trend-down"}
              size={24}
              color={snapshot.child('/priceDay').val()[i]> 0 ? "#70E4A4" : "#FF7070"}
            />
            <Text
              style={{
                fontSize: 18 / PixelRatio.getFontScale(),
                color:snapshot.child('/priceDay').val()[i] > 0 ? "#70E4A4" : "#FF7070",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >{((snapshot.child('/priceDay').val()[i]*snapshot.child("/price").val()[i])/100).toFixed(4)} </Text>
            <Text style={{color: "#372f68",fontSize:16/PixelRatio.getFontScale()}}> USD</Text>
          </View>
          <View style={{ flexDirection: "row",alignItems:'center' }}>
            <Text>Haftalık değer analizi:</Text>
            <FontAwesome6
              name={snapshot.child('/priceWeek').val()[i]> 0 ? "arrow-trend-up" : "arrow-trend-down"}
              size={24}
              color={snapshot.child('/priceWeek').val()[i]> 0 ? "#70E4A4" : "#FF7070"}
            />
            <Text
              style={{
                fontSize: 18 / PixelRatio.getFontScale(),
                color:snapshot.child('/priceWeek').val()[i] > 0 ? "#70E4A4" : "#FF7070",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >{((snapshot.child('/priceWeek').val()[i]*snapshot.child("/price").val()[i])/100).toFixed(4)} </Text>
            <Text style={{color: "#372f68",fontSize:16/PixelRatio.getFontScale()}}> USD</Text>
          </View>
          <View style={{ flexDirection: "row",alignItems:'center' }}>
            <Text>Aylık değer analizi:</Text>
            <FontAwesome6
              name={snapshot.child('/priceMonth').val()[i]> 0 ? "arrow-trend-up" : "arrow-trend-down"}
              size={24}
              color={snapshot.child('/priceMonth').val()[i]> 0 ? "#70E4A4" : "#FF7070"}
            />
            <Text
              style={{
                fontSize: 18 / PixelRatio.getFontScale(),
                color:snapshot.child('/priceMonth').val()[i] > 0 ? "#70E4A4" : "#FF7070",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >{((snapshot.child('/priceMonth').val()[i]*snapshot.child("/price").val()[i])/100).toFixed(4)} </Text>
            <Text style={{color: "#372f68",fontSize:16/PixelRatio.getFontScale()}}> USD</Text>
          </View>
          <View style={{ flexDirection: "row",alignItems:'center' }}>
            <Text>2 Aylık değer analizi:</Text>
            <FontAwesome6
              name={snapshot.child('/price2M').val()[i]> 0 ? "arrow-trend-up" : "arrow-trend-down"}
              size={24}
              color={snapshot.child('/price2M').val()[i]> 0 ? "#70E4A4" : "#FF7070"}
            />
            <Text
              style={{
                fontSize: 18 / PixelRatio.getFontScale(),
                color:snapshot.child('/price2M').val()[i] > 0 ? "#70E4A4" : "#FF7070",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >{((snapshot.child('/price2M').val()[i]*snapshot.child("/price").val()[i])/100).toFixed(4)} </Text>
            <Text style={{color: "#372f68",fontSize:16/PixelRatio.getFontScale()}}> USD</Text>
          </View>
          <View style={{ flexDirection: "row",alignItems:'center' }}>
            <Text>3 Aylık değer analizi:</Text>
            <FontAwesome6
              name={snapshot.child('/price3M').val()[i]> 0 ? "arrow-trend-up" : "arrow-trend-down"}
              size={24}
              color={snapshot.child('/price3M').val()[i]> 0 ? "#70E4A4" : "#FF7070"}
            />
            <Text
              style={{
                fontSize: 18 / PixelRatio.getFontScale(),
                color:snapshot.child('/price3M').val()[i] > 0 ? "#70E4A4" : "#FF7070",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >{((snapshot.child('/price3M').val()[i]*snapshot.child("/price").val()[i])/100).toFixed(4)} </Text>
            <Text style={{color: "#372f68",fontSize:16/PixelRatio.getFontScale()}}> USD</Text>
          </View>
        </View>
      );
    }
  });
} 
     
    
    
    

    return list;
  };
  useEffect(() => {
    FetchData();
  }, []);

  return loading ? (
    <SafeAreaProvider>
      <SafeAreaView>
        {profilepage ? (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1000,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "70%",
                height: 300,
                backgroundColor: "white",
                borderRadius: 20,
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => setprofilepage(false)}
                style={{ position: "absolute", top: 15, right: 15 }}
              >
                <AntDesign name="close" size={26} color={"black"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={selectImage}>
                <Text style={{ textAlign: "center" }}>
                  Buraya Tıklayarak bir resim seçim
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <View
          style={{
            width: (Dimensions.get("window").width * 90) / 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              zIndex: 10,
              width: "90%",
              height: 80,
              backgroundColor: "#b7dcd4",
              borderRadius: 30,
              flexDirection: "row",
              elevation: 10,
              marginBottom: 10,
              display: "flex",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={handlepresspro}>
                {profilePath == "" ? (
                  <View
                    style={{
                      backgroundColor: "black",
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                  ></View>
                ) : (
                  <Image
                    source={{ uri: profilePath }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                  />
                )}
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 18 / PixelRatio.getFontScale(),
                  marginLeft: 10,
                  color: "#242334",
                }}
              >
                {uname}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14 / PixelRatio.getFontScale(),
                    color: "#242334",
                  }}
                >
                  Değerlenenleri gör
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={{ width: "100%", height: "100%", marginTop: 80 }}>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {getValue()}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({});
