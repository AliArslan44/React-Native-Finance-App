import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import {onValue, ref} from 'firebase/database'
import { db } from "../firebaseconfig";
export const ContextData = createContext();
export const Context = ({ children }) => {
  const [isClickGetst, setisClickGetst] = useState(false);
  const [isclicksign, setisclicksign] = useState(false);
  const [isclicklogin, setisclicklogin] = useState(false);
  const [pressliked, setpressliked] = useState(false);
  const [likedlist, setlikedlist] = useState([]);
  const [API, setAPI] = useState('')
  const [uname, setuname] = useState("");
  const fetchAPI=()=>{
    onValue(ref(db,'api'),(snapshot)=>{
      console.log('api'+snapshot.val());
      setAPI(snapshot.val())
    })
  }
  useEffect(()=>{
    fetchAPI()
  },[])
  return (
    <ContextData.Provider
      value={{
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
      }}
    >
      {children}
    </ContextData.Provider>
  );
};

const styles = StyleSheet.create({});
