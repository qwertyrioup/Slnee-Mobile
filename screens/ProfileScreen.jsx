import { useCallback, React, useState } from "react";

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
  Image,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Dimensions } from "react-native";
import Svg from "react-native-svg";
import { Path } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

SplashScreen.preventAutoHideAsync();

const DomainScreen = ({navigation}) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentDomain = useSelector((state) => state.domain.value);
  const dispatch = useDispatch()
  const handleLogOut = () => {
      
    dispatch(logout());
    navigation.navigate("Login")
}



  const [fontsLoaded] = useFonts({
    Mynerve: require("../assets/Fonts/MaShanZheng.ttf"),
    Merry: require("../assets/Fonts/MerriweatherLight.ttf"),
    Grand: require("../assets/Fonts/JustMeAgainDownHere.ttf"),
    Arabic: require("../assets/Fonts/GE_SS_Unique_Light.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }else if(currentUser) {
  return (
    <SafeAreaView style={{ flex: 1, height: windowHeight, width: windowWidth }}>
      <View
        style={{
          backgroundColor: "white",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <View
          style={{
            height: 120,
            width: windowWidth,
            backgroundColor: "#FA9884",
            position: "relative",
          }}
        >
          <View
            style={{
              position: "absolute",
              zIndex: 999,
              top: 150,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                resizeMode: "contain",
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
              source={require("../assets/avatar.png")}
            />
          </View>

          <Svg height={280} width={windowWidth} viewBox="0 0 1440 320">
            <Path
              fill="#FA9884"
              d="M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
          </Svg>
        </View>
        <ScrollView
          style={{
            position: "absolute",
            top: 225,
            left: 0,
            right: 0,
          
          }}
          contentContainerStyle={{  justifyContent: "center",
          alignItems: "center"}}
        >
          <View style={{ marginBottom: 25 }}>
            <Text
              style={{
                fontFamily: "Merry",
                fontSize: 25,
                color: "#FA9884",

                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              {currentUser.full_name}
            </Text>
          </View>
          <View style={{ marginTop: 25 }}>
            <Text
              style={{
                fontFamily: "Merry",
                fontSize: 18,
                color: "#FA9884",

                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              Your Current Domain is :{" "}
            </Text>
            <Text
              style={{
                fontFamily: "Merry",
                fontSize: 16,
                color: "#505050",
                marginTop: 25,
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              {currentDomain}{" "}
            </Text>

            <Text
              style={{
                fontFamily: "Merry",
                fontSize: 18,
                color: "#FA9884",
                marginTop: 50,
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              Your Current Session Expires On :{" "}
            </Text>
            <Text
              style={{
                fontFamily: "Merry",
                fontSize: 16,
                color: "#505050",
                marginTop: 25,
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              {currentUser.cookieExpiresDate}{" "}
            </Text>
          </View>
          <Pressable
          onPress={handleLogOut}
            style={{
              backgroundColor: "#FF6969",
              height: 40,
              width: 150,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 50,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Merry",
                fontSize: 18,
                letterSpacing: 1.3,
              }}
            >
              Log Out
            </Text>
          </Pressable>
        </ScrollView>
       
      </View>
    </SafeAreaView>
  );
  }
  else {
    navigation.navigate("Login");
  }
};

export default DomainScreen;
