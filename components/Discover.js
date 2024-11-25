import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Image,
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
  
  export const Discover = () => {
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
    const onPressCategory = (index1, index2) => {
      setselectedIndex1(index1);
      setselectedIndex2(index2);
      console.log(index1 + ".Kutunun" + index2 + ".kategorisi");
    };
    const onPressLiked = (index) => {
      if (!likedlist.includes(index)) {
        setpressliked(true)
        likedlist.push(index);
        likedname.push(name[index]);
        likedsymbol.push(symbol[index]);
        likedprice.push(price[index].toFixed(2));
        likedpriceHour.push(priceHour[index]);
        likedpriceDay.push(priceDay[index]);
        likedpriceWeek.push(priceWeek[index]);
        likedpriceMonth.push(priceMonth[index]);
        likedprice2M.push(price2M[index]);
        likedprice3M.push(price3M[index]);
        if (likedname.length > 0) {
          update(ref(db, "DATA/" + uname + "/" + "favlist/"), {
            name: likedname,
            symbol: likedsymbol,
            price: likedprice,
            priceHour: likedpriceHour,
            priceDay: likedpriceDay,
            priceWeek: likedpriceWeek,
            priceMonth: likedpriceMonth,
            price2M: likedprice2M,
            price3M: likedprice3M,
          });
        }
      } else {
        setpressliked(true)
        likedlist.splice(likedlist.indexOf(index), 1);
        likedname.splice(likedname.indexOf(name[index]), 1);
        likedsymbol.splice(likedsymbol.indexOf(symbol[index]), 1);
        likedprice.splice(likedprice.indexOf(price[index]), 1);
        likedpriceHour.splice(likedpriceHour.indexOf(priceHour[index]), 1);
        likedpriceDay.splice(likedpriceDay.indexOf(priceDay[index]), 1);
        likedpriceWeek.splice(likedpriceWeek.indexOf(priceWeek[index]), 1);
        likedpriceMonth.splice(likedpriceMonth.indexOf(priceMonth[index]));
        likedprice2M.splice(likedprice2M.indexOf(price2M[index]));
        likedprice3M.splice(likedprice3M.indexOf(price3M[index]));
        if (likedname.length > 0) {
          update(ref(db, "DATA/" + uname + "/" + "favlist/"), {
            name: likedname,
            symbol: likedsymbol,
            price: likedprice,
            priceHour: likedpriceHour,
            priceDay: likedpriceDay,
            priceWeek: likedpriceWeek,
            priceMonth: likedpriceMonth,
            price2M: likedprice2M,
            price3M: likedprice3M,
          });
        }
      }
  
      setrenderText((p) => p + 1);
      setlikedIndex(index);
      console.log("likedlist:" + likedlist + isliked);
    };
    const controller = () => {
      let value;
      for (let i = 0; i <= 10; i++) {
        if (selectedIndex1 == i && selectedIndex2 == 0) {
          value = priceHour[i].toFixed(4);
        }
        if (selectedIndex1 == i && selectedIndex2 == 1) {
          value = priceDay[i].toFixed(4);
        }
        if (selectedIndex1 == i && selectedIndex2 == 2) {
          value = priceWeek[i].toFixed(4);
        }
        if (selectedIndex1 == i && selectedIndex2 == 3) {
          value = priceMonth[i].toFixed(4);
        }
        if (selectedIndex1 == i && selectedIndex2 == 4) {
          value = price2M[i].toFixed(4);
        }
        if (selectedIndex1 == i && selectedIndex2 == 5) {
          value = price3M[i].toFixed(4);
        }
      }
      return value;
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
          console.log(name);
        }
      }
    };
    const renderBox = () => {
      const list = [];
      for (let i = 0; i <= 10; i++) {
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
              {name[i]}
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
              {price[i].toFixed(2)}
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
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {Array.from({ length: 6 }, (_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    onPressCategory(i, index);
                  }}
                >
                  <View
                    style={
                      selectedIndex1 == i && selectedIndex2 == index
                        ? {
                            borderRadius: 20,
                            borderWidth: 2,
  
                            borderColor: "#ab9dff",
                            backgroundColor: "#372f68",
                            elevation: 5,
                            marginLeft: 10,
                          }
                        : {
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: "#372f68",
                            backgroundColor: "#ab9dff",
                            elevation: 5,
                            marginLeft: 10,
                          }
                    }
                  >
                    <Text
                      style={
                        selectedIndex1 == i && selectedIndex2 == index
                          ? {
                              fontSize: 16 / PixelRatio.getFontScale(),
                              color: "#ab9dff",
                              padding: 5,
                            }
                          : {
                              fontSize: 16 / PixelRatio.getFontScale(),
                              color: "#372f68",
                              padding: 5,
                            }
                      }
                    >
                      {category[index]}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={
                  selectedIndex1 == i
                    ? {
                        fontSize: 25 / PixelRatio.getFontScale(),
                        fontWeight: "bold",
                        marginRight: 10,
                      }
                    : {
                        display: "none",
                      }
                }
              >
                {"%"}
                {controller()}
              </Text>
              <FontAwesome6
                name={controller() > 0 ? "arrow-trend-up" : "arrow-trend-down"}
                size={selectedIndex1 == i ? 24 : 0}
                color={controller() > 0 ? "#70E4A4" : "#FF7070"}
              />
              <Text
                style={{
                  fontSize: 18 / PixelRatio.getFontScale(),
                  color: controller() > 0 ? "#70E4A4" : "#FF7070",
                  fontWeight: "bold",
                  marginLeft: 10,
                  display: selectedIndex1 == i ? "flex" : "none",
                }}
              >
                {controller() >= 0 ? "+" : ""}
                {((price[i] * controller()) / 100).toFixed(4)}
                <Text
                  style={{
                    color: "#372f68",
                    fontSize: 14,
                  }}
                >
                  {" "}
                  USD
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={{ position: "absolute", right: 20, top: 20, zIndex: 10 }}
              onPress={() => {
                onPressLiked(i);
              }}
            >
              <FontAwesome
                name={likedlist.includes(i) ? "heart" : "heart-o"}
                size={22}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
        );
      }
      return list;
    };
   
    useEffect(() => {
      FetchData();
    }, []);
  
    return loading ? (
      <SafeAreaProvider  style={{flex:1}}>
        <SafeAreaView style={{flex:1}}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {renderBox()}
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
  