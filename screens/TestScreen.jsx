import { useCallback, React, useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import TypeWriter from 'react-native-typewriter';
import {Dimensions} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { login, loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Axios } from 'axios';
import { Audio } from 'expo-av';
import { StatusBar } from 'react-native';


import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";



SplashScreen.preventAutoHideAsync();


  


const TestScreen = ({navigation}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
 

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const currentDomain = useSelector(state => state.domain.value)
    const [sound, setSound] = useState();

    async function playSound() {
      
      const { sound } = await Audio.Sound.createAsync( require('../assets/auth.mp3')
      );
      setSound(sound);
  
      
      await sound.playAsync();
    }
  
    useEffect(() => {
      playSound()
      setTimeout(()=>{navigation.navigate('Main')},2000)
    }, []);
      
    


      
      


    

    const [fontsLoaded] = useFonts({
        'Mynerve': require("../assets/Fonts/MaShanZheng.ttf"),
        'Merry': require("../assets/Fonts/MerriweatherLight.ttf"),
        'Grand': require("../assets/Fonts/JustMeAgainDownHere.ttf")
      });
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }
      else if (currentUser) {
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
            <BlurView intensity={50}
              tint="light"
              style={{
                height: "100%",
                width: "100%",
                
                alignItems: "center",
                justifyContent: "center",
            
              }}>
            <Text
          style={{
            fontFamily: "Grand",
            fontSize: 40,
            color: "#115748",
            
            letterSpacing: 1.3,
          }}
        >
          You are Successfully
        </Text>
        <Text
          style={{
            fontFamily: "Grand",
            fontSize: 40,
            color: "#115748",
           
            letterSpacing: 1.3,
            marginBottom: 25
          }}
        >
          Logged In.
        </Text>
        {/* <Pressable onPressOut={() => navigation.navigate('Main')} style={{backgroundColor: "#23AF91", height: 40, width: 150, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginVertical: 20}} ><Text style={{ fontFamily: 'Merry', fontSize: 14, color: "white", fontWeight: "bold", letterSpacing: 1.3}} >START</Text></Pressable> */}
       

            </BlurView>

        </LinearGradient>
        
        
        </SafeAreaView>
      );
    } else {navigation.navigate("Domain")}
    }
    


export default TestScreen;