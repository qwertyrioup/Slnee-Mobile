import { useCallback, React, useState } from 'react';
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


SplashScreen.preventAutoHideAsync();


  


const SettingsScreen = ({navigation}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    
    const currentUser = useSelector(state => state.user.currentUser)
    const currentDomain = useSelector(state => state.domain.value)  
        
      
    


      
      


    

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
      else if (currentUser && currentDomain) {
      
    return (
        <SafeAreaView style={{backgroundColor: "#121212", width: "100%", height: "100%", alignItems: "center", justifyContent:"center"}} onLayout={onLayoutRootView}>
        
        <Pressable  style={{backgroundColor: "#23AF91", height: 40, width: 150, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginVertical: 20}} ><Text style={{ fontFamily: 'Merry', fontSize: 14, color: "#121212", fontWeight: "bold", letterSpacing: 1.3}} >SettingsScreen</Text></Pressable>
        
        </SafeAreaView>
      );
    }
   else {navigation.navigate("Domain")}
}
    


export default SettingsScreen;