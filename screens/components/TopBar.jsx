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
  const goToProfile = () => {
    
    navigation.toggleDrawer();
  };

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
      height: 40,
     
    }} >
      <View style={{
        width: "100%",
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <TouchableOpacity onPress={goToProfile}>
        <Image
          style={{
            flex: 1,
            width: 27.5,
            height: 27.5,
            resizeMode: "contain",
            tintColor: "#115748",
            marginLeft: 10,
            marginRight: 15
          }}
          source={require("../../assets/user0.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 175,
          height: 30,
          borderWidth: 1.2,
          borderColor: "#115748",
          borderRadius: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Image
            style={{
              flex: 1,
              width: 15,
              height: 15,
              resizeMode: "contain",
              tintColor: "#115748",
              marginHorizontal: 5,
            }}
            source={require("../../assets/search.png")}
          />
        </View>

        <View>
          <TextInput
            placeholder="Search ..."
            placeholderTextColor={"#115748"}
            style={{ width: 100, color: "gray", fontFamily: "Merry" }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity>
          <Image
            style={{
              flex: 1,
              width: 25,
              height: 25,
              resizeMode: "contain",
              tintColor: "#115748",
              marginHorizontal: 5,
            }}
            source={require("../../assets/Support.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              width: 20,
              height: 20,
              backgroundColor: "#115748",
              borderRadius: 50,
              zIndex: 999,
              left: 13,
              top: 0,
            }}
          >
            <Text style={{ fontFamily: "Merry", color: "white",textAlign: "center" }}>5</Text>
          </View>

          <Image
            style={{
              flex: 1,
              width: 25,
              height: 25,
              resizeMode: "contain",
              tintColor: "#115748",
              marginHorizontal: 5,
              marginRight: 15,
            }}
            source={require("../../assets/notifications0.png")}
          />
        </TouchableOpacity>
      </View>



      </View>
      <View  >
      <Divider  color={"#115748"} width={1.2}/>

      </View>
      
      
    </SafeAreaView>
      );
};

export default TopBar;
