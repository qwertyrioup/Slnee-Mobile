import { useCallback, React, useState, useEffect, useRef, Component } from "react";
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
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Audio } from "expo-av";
import { Platform } from "react-native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import axios from "axios";


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
  const [expoToken, setExpoToken] = useState("");
  console.log(expoToken)
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/auth.mp3")
      );
      setSound(sound);
      
      await sound.playAsync();
    }

    const registerForNoyificationsAsync = async() => { 
      
      let token;
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        
        setExpoToken(token)
        
          
        
      } else {
        alert('Must use physical device for Push Notifications');
      }
      
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      
    
    }
    

    const handlePushToken = async () => {
      
     
    axios.post('http://'+currentDomain+'/api/method/frappe.desk.doctype.bulk_update.bulk_update.submit_cancel_or_update_docs?doctype=User&docnames=["'+currentUser.full_name+'"]&action=update&data={"expo_token":"'+expoToken+'"}').catch((error)=> console.log(error))
     
    }
    
    useEffect(() => {
      playSound();
      // registerForNoyificationsAsync()
      // handlePushToken()
   
    
    setTimeout(()=>{navigation.navigate('Main')},1500)
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
      <SafeAreaView
        style={{ flex: 1, height: windowHeight, width: windowWidth }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              
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
              source={require("../assets/success.json")}
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
