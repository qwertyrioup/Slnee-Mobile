import { useCallback, React, useState } from "react";
import { Shadow } from 'react-native-shadow-2';
import Svg, { Path } from "react-native-svg";



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
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import TypeWriter from "react-native-typewriter";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { saveDomain } from "../redux/domainSlice";
import axios, { Axios } from "axios";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";

import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { saveApp } from "../redux/appSlice";
import { Button } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

const DomainScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [domain, setDomain] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDomain = async() => {
    try {
      const response = await axios.get("http://" + domain + "/api/method/slnee_app.api.appSettings");
      console.log(response.data.message); 
      const d = response.data.message
      dispatch(saveApp(d))
      dispatch(saveDomain(domain))
      // dispatch(saveApp(response.data.message))
      // dispatch(saveDomain(domain));
      // navigation.navigate("Login");
    } catch (error) {
      console.log(error)
    }
    
    navigation.replace("Login")
  
    
    


  };
  
  
  

  const [fontsLoaded] = useFonts({
    Mynerve: require("../assets/Fonts/MaShanZheng.ttf"),
    Merry: require("../assets/Fonts/MerriweatherLight.ttf"),
    Grand: require("../assets/Fonts/JustMeAgainDownHere.ttf"),
    Arabic: require("../assets/Fonts/GE_SS_Unique_Light.otf")

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
      <View style={{ backgroundColor: "white", height: windowHeight, width: windowWidth, position: "relative"}}  >
        <View style={{height: 120, width: windowWidth, backgroundColor: "#FA9884", position: "relative"}} >
          <View style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, justifyContent: "center", alignItems: "center"}} >
          <Text
                    style={{
                      fontFamily: "Merry",
                      fontSize: 30,
                      color: "white",
                      alignContent: "center",
                      letterSpacing: 1.2,
                      textAlign: "center",

                    }}
                  >

                     Welcome To Slnee 
                  </Text>
          </View>

          <Svg 
            height={280}
            width={windowWidth}
            viewBox="0 0 1440 320"
            
          >
            <Path
              fill="#FA9884"
              d='M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'
            />
          </Svg>
        </View>
        <View style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, justifyContent: "center", alignItems: "center"}} >
            <View style={{marginBottom: 25}} >
                   <Text
                    style={{
                      fontFamily: "Merry",
                      fontSize: 15,
                      color: "#FA9884",

                      letterSpacing: 1,
                      textAlign: "center",
                    }}
                  >
                    Type Your Company Domain Please !
                  </Text>
            </View>
            <View style={{marginBottom: 15}} >
                   <TextInput
                      onChangeText={setDomain}
                      placeholderTextColor={"#454545"}
                      placeholder={"example.domain.com"}
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
            
                
                
                </View>
                            
                
                
                <View style={{position: "absolute",  bottom: windowHeight/8, right: -50, justifyContent: "center", alignItems: "flex-start", backgroundColor: "#FA9884", height: 100, width: 100, borderRadius: 50}} >
                  <Pressable onPress={handleDomain}   >
                  <Image source={require("../assets/go.png")} style={{tintColor: "white", resizeMode: "contain", height: 50, width: 50, marginLeft: 7}} />

                  </Pressable >
                </View>
        </View>
      
    </SafeAreaView>
  );
};

export default DomainScreen;
