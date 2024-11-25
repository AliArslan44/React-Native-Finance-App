import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ContextData } from "./context";

export const Calc = () => {
  const [coinlist, setcoinlist] = useState([]);
  const [priceList, setpriceList] = useState([]);
  const [renderText, setrenderText] = useState(0);
  const [renderItem, setrenderItem] = useState([]);
  const [renderprice, setrenderprice] = useState([])
  const [activeCoin, setactiveCoin] = useState()
  const [display, setdisplay] = useState('flex')
  const [price, setprice] = useState([])
  const [wordlist, setwordlist] = useState([]);
  const [text, settext] = useState("");
  const [clickedCoin, setclickedCoin] = useState('')
  const [clickedPrice, setclickedPrice] = useState(0)
  const [result, setresult] = useState(0)
  const {API}=useContext(ContextData)
  const fetchData = async () => {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY="+API
    );
    for (let i = 0; i <= 100; i++) {
      coinlist.push(response.data.data[i].name);
      priceList.push(response.data.data[i].quote.USD.price);
    }
  };
  const changedText = (tex) => {
    settext(tex);
  };
const handlePresscoin=(index)=>{
console.log('basılı deger'+renderItem[index])
setclickedCoin(renderItem[index])
setclickedPrice(renderprice[index])
console.log('BAsılı degeri'+renderprice[index]);

setdisplay('none')
}
  useEffect(() => {
    if (coinlist.length == 0) {
      fetchData();
    }
  }, []);
  useEffect(() => {
    if (text.trim()) {
      setdisplay('flex')
      setwordlist([]);
      setrenderItem([]);
      setrenderprice([])
      setprice([])
      for (let i = 0; i <= 99; i++) {
        if (coinlist[i].split("")[0].includes(text) && text.trim()) {
          console.log("iceriyor" + coinlist[i]+'deger:'+priceList[i]);
          if (!wordlist.includes(coinlist[i])) {
            wordlist.push(coinlist[i]);
            price.push(priceList[i])
            setrenderItem(wordlist);
            setrenderprice(price)
          }
        }
      }
    }
    else{
      setdisplay('none')
    }
  }, [text]);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{ flex: 1, alignItems: "center",justifyContent:'center' }}>
          <View style={{ position: "absolute", top: 0 }}>
            <TextInput
              style={{
                width: 300,
                height: 50,
                backgroundColor: "lightgray",
                borderRadius: 25,
                color: "black",
                paddingLeft: 20,
                fontSize: 16,
              }}
              value={text}
              onChangeText={changedText}
              placeholder="Coin Arayın"
            />
            <ScrollView style={{ width: "100%", height: 300,display:display }} >
              {Array.from({ length: renderItem.length }, (_, i) => (
                <TouchableOpacity onPress={()=>handlePresscoin(i)}>
                  <View
                  key={i}
                  style={{
                    backgroundColor: "lightgray",
                    height: 70,
                    justifyContent: "center",
                    paddingLeft:20
                  }}
                >
                  <Text style={{fontSize:16,fontWeight:'bold'}}>{renderItem[i]}</Text>
                  <Text style={{fontSize:16,fontWeight:'bold'}}>{renderprice[i].toFixed(3)}</Text>
                </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {text.trim()?<View style={{justifyContent:'center',alignItems:'center'}} >
            <Text style={{fontWeight:'bold',fontSize:20}}>{clickedCoin}</Text>
            <TextInput onChangeText={(t)=>{setresult(parseFloat(clickedPrice*t))}} style={{width:150,height:40,backgroundColor:'lightgray',fontSize:17,paddingLeft:20,borderRadius:25}} placeholder="deger girin" inputMode="numeric"/>
            <Text>{result}</Text>
          </View>:null}
          
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});
