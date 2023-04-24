import { useCallback, React, useState, useEffect, useRef } from "react";
import Svg, { Path } from "react-native-svg";
import LottieView from "lottie-react-native";

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import TypeWriter from "react-native-typewriter";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/userSlice";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Axios } from "axios";
import { Audio } from "expo-av";
import { StatusBar } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

SplashScreen.preventAutoHideAsync();

const TestScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const animation = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentDomain = useSelector((state) => state.domain.value);
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/auth.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    playSound();
    setTimeout(()=>{navigation.navigate('Main')},3000)
  }, []);

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
  } else if (currentUser) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "white",
            height: windowHeight,
            width: windowWidth,
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >

            <LottieView
              autoPlay
              
              ref={animation}
              style={{
                width: 200,
                height: 200,
                backgroundColor: "white",
                
              }}
              source={require("../assets/success3.json")}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    navigation.navigate("Domain");
  }
};

export default TestScreen;
