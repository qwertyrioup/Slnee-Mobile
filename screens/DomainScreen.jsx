import { useCallback, React, useState } from "react";
import { Shadow } from 'react-native-shadow-2';


import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import TypeWriter from "react-native-typewriter";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { saveDomain } from "../redux/domainSlice";
import axios, { Axios } from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";

import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { saveApp } from "../redux/appSlice";
import { Button } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

const DomainScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  
  
  const [domain, setDomain] = useState("");
  
  const dispatch = useDispatch();
  
  const handleDomain = async() => {
    try {
      const response = await axios.get("http://" + domain + "/api/method/slnee_app.api.appSettings");
      
      dispatch(saveApp(response.data.message))
    } catch (error) {
      console.log(error)
    }
    
    dispatch(saveDomain(domain));
    navigation.replace("Login");
    
   

  };
  

  const [fontsLoaded] = useFonts({
    Mynerve: require("../assets/Fonts/MaShanZheng.ttf"),
    Merry: require("../assets/Fonts/MerriweatherLight.ttf"),
    Grand: require("../assets/Fonts/JustMeAgainDownHere.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={{ width: "100%", height: "100%", alignItems: "center", justifyContent:"center"}} onLayout={onLayoutRootView}>
   
      <LinearGradient
          colors={["#FBAB7E", "#F7CE68"]}
          start={[0, 1]}
          end={[1, 1]}
          location={[0.25, 0.4, 1]}
          style={{
            width: "100%",
            height: "100%"
          }}
        >
      <ScrollView
        contentContainerStyle={{ alignItems: "center", justifyContent: "center"}}
        style={{height: windowHeight, width: windowWidth}}
        showsVerticalScrollIndicator={false}
        >
        <KeyboardAvoidingView style={{height: windowHeight, width: windowWidth, alignItems:"center", justifyContent: "center"}}>
            <Shadow sides={['top']}
      corners={['topLeft', 'topRight']} distance={50} >


            <BlurView
              intensity={50}
              tint="light"
              style={{
                height: windowHeight - windowHeight * 0.25,
                width: windowWidth - windowWidth * 0.25,
                
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "space-between",
                
              
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Grand",
                    fontSize: 40,
                    color: "#115748",
                    letterSpacing: 1.2,
                    textAlign: "center",
                  }}
                >
                  Welcome to Slnee.
                </Text>
              </View>
              <View style={{ marginBottom: 25 }}>
                <Text
                  style={{
                    fontFamily: "Merry",
                    fontSize: 14,
                    color: "#115748",
                    width: 250,

                    letterSpacing: 1.2,
                    textAlign: "center",
                  }}
                >
                  Type Your Company Domain Please !
                </Text>
              </View>
              <View style={{ marginBottom: 75 }}>
                <TextInput
                  onChangeText={setDomain}
                  placeholderTextColor={"#191919"}
                  placeholder={"example.domain.com"}
                  style={{
                    borderWidth: 1.5,
                    borderColor: "#115748",
                    height: 40,
                    width: windowWidth - windowWidth * 0.3,
                    borderRadius: 5,
                    paddingHorizontal: 15,
                    color: "#191919",
                  }}
                />
              </View>
              <View style={{marginBottom: 50}} >
                <Pressable
                  onPress={handleDomain}
                  style={{
                    backgroundColor: "#187a65",
                    height: 40,
                    width: 150,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Merry",
                      fontSize: 14,
                      color: "white",
                      fontWeight: "bold",
                      letterSpacing: 1.3,
                    }}
                  >
                    Send
                  </Text>
                </Pressable>
              </View>
            </BlurView>
            </Shadow>
        </KeyboardAvoidingView>
      </ScrollView>
          </LinearGradient>
    </SafeAreaView>
  );
};

export default DomainScreen;
