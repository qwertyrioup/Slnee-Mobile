import { useCallback, React, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import TypeWriter from 'react-native-typewriter';
import {Dimensions} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import TopBar from "./components/TopBar.jsx";
import { login, loginFailure, loginStart, loginSuccess, logout } from '../redux/userSlice';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Axios } from 'axios';
import { deleteDomain } from '../redux/domainSlice.js';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';


SplashScreen.preventAutoHideAsync();


  


const ProfileScreen = ({navigation}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const currentUser = useSelector(state => state.user.currentUser)
    const currentDomain = useSelector(state => state.domain.value)
    

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    
    const handleLogOut = () => {
        
        dispatch(logout());
        navigation.navigate("Login")
    }
        
      
    


      
      


    

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
            <SafeAreaView SafeAreaView style={{ width: "100%", height: "100%", alignItems: "center", justifyContent:"center"}} onLayout={onLayoutRootView} >
   
   <LinearGradient
          colors={["#FBAB7E", "#F7CE68"]}
          start={[0, 1]}
          end={[1, 1]}
          location={[0.25, 0.4, 1]}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <BlurView intensity={50}
              tint="light"
              style={{
                height: "100%",
                width: "100%",
                
                
                alignItems: "center",
                
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            
              }}>




              <View style={{ height: 50, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} >
                  <View>
                      <TouchableOpacity onPress={() => navigation.navigate('Main')} style={{marginLeft: 15}}  >
                          <Image style={{tintColor: "#115748",resizeMode: "contain", width: 25, height: 25}} source={require("../assets/back.png")} />
                      </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: "row"}} >
                      <TouchableOpacity>
                          <Image style={{tintColor: "#115748",resizeMode: "contain", width: 25, height: 25}} source={require("../assets/sun.png")} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{marginHorizontal: 15}}>
                          <Image style={{tintColor: "#115748",resizeMode: "contain", width: 25, height: 25}} source={require("../assets/Support.png")} />
                      </TouchableOpacity>
                  </View>
      
              </View>
              <View style={{height: 100, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} >
                  <View style={{flexDirection: "row", justifyContent: "space-between",alignItems: "center", width: 200, marginTop: 50}} >
                     <View>

                      <TouchableOpacity style= {{marginRight:10, marginLeft: 10}} >
                          <Image style={{resizeMode: "contain", width: 65, height: 65, tintColor: "#606060", borderRadius: 50}} source={require("../assets/account.png")} />
                      </TouchableOpacity>

                     </View>
                    
                    <View>

                      <TouchableOpacity  >
                          <Text style={{fontFamily: "Merry", fontSize: 18, color: "#115748", fontWeight: "650", marginBottom: 10}} >{currentUser.full_name}</Text>
                          <Text style={{fontFamily: "Merry", fontSize: 12, color: "#115748", fontWeight: "650", marginBottom: 10}} >Your Current Domain is: {currentDomain}</Text>
                          <Text style={{fontFamily: "Merry", fontSize: 12, color: "#115748", fontWeight: "650"}} >Your Session Expires on: {" "+ currentUser.cookieExpiresDate}</Text>
      
                      </TouchableOpacity>

                    </View>
                      
                  </View>
                  <View style={{marginTop: 50 ,backgroundColor: "#23AF91", width: 120, height: 40, borderTopLeftRadius: 50, borderBottomLeftRadius: 50, alignItems: "center", justifyContent: "flex-start", flexDirection: "row"}} >
                      <Image source={require("../assets/check.png")} style={{resizeMode: "contain", width: 25, height: 25, marginHorizontal: 10}} />
                      <Text style={{fontFamily: "Merry", fontSize: 15, color: "white"}} >Verified</Text>
                  </View>
      
              </View>
              <View style={{position: "absolute", bottom:65}} >
              <Pressable onPress={handleLogOut}  style={{backgroundColor: "#606060", height: 40, width: 150, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginVertical: 20}} ><Text style={{ color:"white", fontFamily: 'Merry', fontSize: 14, fontWeight: "bold", letterSpacing: 1.3}} >Log Out</Text></Pressable>
                  
              </View>
              </BlurView>



              </LinearGradient>
              
              </SafeAreaView>
            );
      } else {navigation.navigate("Login")}
    }
    


export default ProfileScreen;