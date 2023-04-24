import { useCallback, React, useState, useEffect } from "react";
import Svg, { Path } from "react-native-svg";
import LottieView from "lottie-react-native";

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  Button,
  KeyboardAvoidingView,
  Image,
  StatusBar,
} from "react-native";
import Modal from "react-native-modal";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Audio } from "expo-av";
import {
  login,
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/userSlice";
import Axios from "axios";

import domainSlice, { saveDomain } from "../redux/domainSlice";

import axios from "axios";
import { saveMenu } from "../redux/menuSlice";
import { saveModule } from "../redux/moduleSlice";
import { useRef } from "react";

SplashScreen.preventAutoHideAsync();

const LogInScreen = ({ navigation }) => {
  const animation = useRef(null);
  // const currentUser = useSelector(state => state.user.currentUser)
  const currentDomain = useSelector((state) => state.domain.value);
  const appSettings = useSelector((state) => state.app.app_info);
  
  const [hide, setHide] = useState(true);
 
    

  

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [sound, setSound] = useState();
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/error.mp3")
    );
    setSound(sound);

    try {
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  const [isModalVisible, setModalVisible] = useState(false);
  const getSideBarItems = async () => {
    const titles = [];

    try {
      const res = await axios.get(
        "http://" +
          currentDomain +
          "/api/method/frappe.desk.desktop.get_workspace_sidebar_items"
      );
      titles.push(
        res.data.message.pages.map(({ title }) => {
          return title;
        })
      );
      dispatch(saveMenu(titles[0]));
    } catch (err) {}
  };

  const functionOne = () => {
    dispatch(saveDomain(domain));
  };
  const functionTwo = () => {
    toggleModal();
  };
  const combinedFunction = () => {
    functionOne();
    functionTwo();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      const response = await Axios.post(
        "http://" + currentDomain + "/api/method/login",
        {
          usr: username,
          pwd: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const splittedHeadData = response.headers["set-cookie"][0].split(";");
      const sid = Object.assign({}, splittedHeadData[0].split(";"));
      const expiresOnDate = Object.assign({}, splittedHeadData[1].split(";"));

      const cookie = sid["0"].split("=")[1];
      const cookieExpiresDate = expiresOnDate["0"].split("=")[1];

      dispatch(loginSuccess({ ...response.data, cookie, cookieExpiresDate }));
      getSideBarItems();
      dispatch(saveModule("Home"));
      navigation.replace("Test");
    } catch (error) {
      console.log(error);
      playSound();
      setError(true);

      dispatch(loginFailure());
    }
  };

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
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "white",
          height: windowHeight,
          width: windowWidth,
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
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Arabic",
                fontSize: 30,
                color: "white",
                alignContent: "center",
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              {appSettings.app}
            </Text>
          </View>

          <Svg height={280} width={windowWidth} viewBox="0 0 1440 320">
            <Path
              fill="#FA9884"
              d="M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
          </Svg>
        </View>
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
          <View style={{ marginBottom: 25 }}>
            <Text
              style={{
                fontFamily: "Merry",
                fontSize: 15,
                color: "#FA9884",

                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              Enter Your Credentials Please !
            </Text>
          </View>
          <View style={{ marginBottom: 15 }}>
            <TextInput
              onChangeText={setUsername}
              placeholderTextColor={"#454545"}
              placeholder={"Username"}
              style={{
                borderBottomWidth: 1.5,
                borderColor: "#FA9884",
                height: 50,
                width: windowWidth - windowWidth * 0.3,

                paddingHorizontal: 15,
                color: "#454545",
              }}
            />
          </View>
          <View>
            <View
              style={{
                borderBottomWidth: 1.5,
                borderColor: "#FA9884",
                height: 50,
                width: windowWidth - windowWidth * 0.3,
                borderRadius: 5,
                paddingHorizontal: 15,
                color: "white",

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <TextInput
                  onChangeText={setPassword}
                  secureTextEntry={hide}
                  placeholderTextColor={"#454545"}
                  placeholder={"Password"}
                  style={{ height: 40, width: 200, color: "#454545" }}
                />
              </View>
              <Pressable
                onPress={() => {
                  setHide(!hide);
                }}
              >
                <Image
                  style={{
                    flex: 1,
                    width: 25,
                    height: 25,
                    resizeMode: "contain",
                    tintColor: "#454545",
                  }}
                  source={require("../assets/hide.png")}
                />
              </Pressable>
            </View>
          </View>
          <View style={{ marginTop: 25, marginBottom: 15 }}>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: "Merry",
                  fontSize: 14,

                  color: "#FBAB7E",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Change Your Domain ?
              </Text>
            </TouchableOpacity>
          </View>

          <LottieView
      autoPlay={true}
      
      ref={animation}
      style={{
        display: !error ? "none" :  "flex",
        width: 50,
        height: 50,
        
      }}
      source={require("../assets/error1.json")}
    />
        </View>

        <View
          style={{
            position: "absolute",
            bottom: windowHeight / 8,
            right: -50,
            justifyContent: "center",
            alignItems: "flex-start",
            backgroundColor: "#FA9884",
            height: 100,
            width: 100,
            borderRadius: 50,
          }}
        >
          <Pressable onPress={handleLogin}>
            <Image
              source={require("../assets/go.png")}
              style={{
                tintColor: "white",
                resizeMode: "contain",
                height: 50,
                width: 50,
                marginLeft: 7,
              }}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LogInScreen;
