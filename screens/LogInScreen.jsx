import { useCallback, React, useState, useEffect } from "react";
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
import TypeWriter from "react-native-typewriter";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Audio } from 'expo-av';
import {
  login,
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/userSlice";
import Axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import domainSlice, { saveDomain } from "../redux/domainSlice";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { saveMenu } from "../redux/menuSlice";
import { saveModule } from "../redux/moduleSlice";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Shadow } from "react-native-shadow-2";
SplashScreen.preventAutoHideAsync();

const LogInScreen = ({ navigation }) => {
  // const currentUser = useSelector(state => state.user.currentUser)
  const currentDomain = useSelector((state) => state.domain.value);
  const appSettings = useSelector((state)=>state.app.app_info)
  
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
      
    const { sound } = await Audio.Sound.createAsync( require('../assets/error.mp3')
    );
    setSound(sound);

    try {
      
      await sound.playAsync();
    } catch (error) {
      console.log(error)
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
      navigation.navigate("Test");
    } catch (error) {
      console.log(error);
      playSound()
      setError(true);
      
      dispatch(loginFailure());
    }
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
    <SafeAreaView SafeAreaView style={{ width: "100%", height: "100%", alignItems: "center", justifyContent:"center"}} onLayout={onLayoutRootView} >
   
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
        >
        <KeyboardAvoidingView style={{height: windowHeight, width: windowWidth, alignItems:"center", justifyContent: "center"}}>
            
        <Shadow sides={['top']}
      corners={['topLeft', 'topRight']} distance={50} >



            <BlurView
              intensity={50}
              tint="light"
              style={{
                height: windowHeight - windowHeight * 0.15,
                width: windowWidth - windowWidth * 0.25,
                borderRadius: 25,
                
                alignItems: "center",
                justifyContent: "space-between",
                
                shadowOffset: { width: -6, height: 6 },
                shadowColor: "#191919",
                shadowOpacity: 0.5,
                shadowRadius: 10,
              
              }}
            >
              <View style={{  alignItems: 'center', justifyContent: 'center', marginTop:10 }}>

              <Image  style={{width: 100, height: 100, resizeMode: 'contain'}} source={{uri: "http://"+currentDomain+appSettings.splash}}/>

              </View>
              <View style={{  height: 100 , alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: "Grand",
                    fontSize: 30,
                    color: "#115748",
                    height: "100%",
                    alignContent: "center",
                    letterSpacing: 1,
                    textAlign: "center",
                    
                  }}
                >
                  

                  Login to {appSettings.app}.
                </Text>
              </View>
              <View  style={{marginBottom: 15}} >
                <Text
                  style={{
                    fontFamily: "Merry",
                    fontSize: 14,
                    color: "#115748",

                    letterSpacing: 1.2,
                    textAlign: "center",
                  }}
                >
                  Enter Your Credentials Please !
                </Text>
              </View>
              <View >
                <View style={{marginBottom: 15}} >
                  <TextInput
                    onChangeText={setUsername}
                    placeholderTextColor={"#191919"}
                    placeholder={"Username"}
                    style={{
                      borderWidth: 1.5,
                      borderColor: "#115748",
                      height: 50,
                      width: windowWidth - windowWidth * 0.3,
                      borderRadius: 5,
                      paddingHorizontal: 15,
                      color: "#191919",
                    }}
                  />
                </View>
                <View>
                  <View
                    style={{
                      borderWidth: 1.5,
                      borderColor: "#115748",
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
                        placeholderTextColor={"#191919"}
                        placeholder={"Password"}
                        style={{ height: 40, width: 200, color: "#191919" }}
                      />
                    </View>
                    <TouchableOpacity
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
                          tintColor: "#191919",
                        }}
                        source={require("../assets/hide.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              

              {error && (
                <View style={{marginBottom: 25}} >
                  <Text
                    style={{
                      fontFamily: "Merry",
                      fontSize: 12,
                      color: "red",
                     
                      fontWeight: "bold",
                      letterSpacing: 1.3,
                     
                    }}
                  >
                    Wrong Credentials
                  </Text>
                </View>
              )}
              <View style={{marginBottom: 25}} >
                <TouchableOpacity onPress={toggleModal}>
                  <Text
                    style={{
                      fontFamily: "Merry",
                      fontSize: 12,
                      
                      color: "#191919",
                      fontWeight: "bold",
                      letterSpacing: 1.3,
                      
                    }}
                  >
                    Change Your Domain ?
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Modal
                  isVisible={isModalVisible}
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 25,
                    
                  }}
                >
                  
                  <View
                    style={{
                      width: "95%",
                      height: 300,
                      
                      
        
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >

<LinearGradient
            colors={["#FBAB7E", "#F7CE68"]}
            start={[0, 1]}
            end={[1, 1]}
            location={[0.25, 0.4, 1]}
            style={{
              width: "95%",
              height: 300,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
            }}
          >
             <Text
                      style={{
                        fontFamily: "Merry",
                        fontSize: 14,
                        color: "#191919",
                      }}
                    >
                      Update Your Domain Please !
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Merry",
                        fontSize: 12,
                        color: "#191919",
                      }}
                    >
                      Your Current Domain is : {currentDomain}
                    </Text>
                    <TextInput
                      onChangeText={setDomain}
                      placeholderTextColor={"#191919"}
                      placeholder={"Domain"}
                      style={{
                        borderWidth: 1.5,
                        borderColor: "#115748",
                        height: 40,
                        width: 250,
                        borderRadius: 5,
                        paddingHorizontal: 15,
                        color: "#191919",
                        marginTop: 30,
                      }}
                    />
                    <View style={{ flexDirection: "row" }}>
                      <Pressable
                        onPress={functionOne}
                        style={{
                          backgroundColor: "#115748",
                          height: 40,
                          width: 100,
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 100,
                          marginHorizontal: 10,
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
                          Update
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={functionTwo}
                        style={{
                          backgroundColor: "#606060",

                          height: 40,
                          width: 100,
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 100,
                          marginHorizontal: 10,
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
                          Close
                        </Text>
                      </Pressable>
                    </View>


          </LinearGradient>

                   
                  </View>
                </Modal>
              </View>

              <View style={{marginBottom: 10}}>
                <Pressable
                  onPress={handleLogin}
                  style={{
                    backgroundColor: "#187a65",
                    height: 40,
                    width: 150,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
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
                    Login
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

export default LogInScreen;
