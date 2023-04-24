import { useCallback, React, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { Avatar } from 'react-native-paper';

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import TypeWriter from "react-native-typewriter";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Axios } from "axios";
import { Divider } from '@rneui/themed';
SplashScreen.preventAutoHideAsync();

const TopBar = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();


  const [fontsLoaded] = useFonts({
    Mynerve: require("../../assets/Fonts/MaShanZheng.ttf"),
    Grand: require("../../assets/Fonts/JustMeAgainDownHere.ttf"),
    Merry: require("../../assets/Fonts/MerriweatherLight.ttf"),
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
    <SafeAreaView onLayout={onLayoutRootView} style={{
      width: "100%",
      height: 70,
     
    }} >
      <View style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        
      }}>
     
  
        <TouchableOpacity onPress={navigation.navigate("Manufacturing")} >
        <Avatar.Image size={50} source={require('../../assets/avatar.png')} />

        </TouchableOpacity>
        <TouchableOpacity onPress={navigation.toggleDrawer()}>
        <Image
          style={{
            flex: 1,
            width: 35,
            height: 35,
            resizeMode: "contain",
            tintColor: "#FA9884",
            
          }}
          source={require("../../assets/user0.png")}
        />
      </TouchableOpacity>

        
      



      </View>
      <View  >
     

      </View>
      
      
    </SafeAreaView>
      );
};

export default TopBar;
