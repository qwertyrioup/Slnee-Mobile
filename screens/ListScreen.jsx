import { useCallback, React, useState, useEffect } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {  Divider } from '@rneui/themed';
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
  ScrollView,
  Image,
  RefreshControl,
  StatusBar
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import TypeWriter from "react-native-typewriter";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import TopBar from "./components/TopBar.jsx";
import {
  login,
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/userSlice";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios, { Axios } from "axios";

import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';
import CheckBox from 'expo-checkbox';


SplashScreen.preventAutoHideAsync();

const ListScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const currentDomain = useSelector((state) => state.domain.value);
  const module = useSelector((state) => state.module.value);
  const [rows, setRows] = useState([]);
  const [tableWidth, setTableWidth] = useState(windowWidth);
  const [settings, setSettings] = useState([])
  const [headers, setHeaders] = useState([])
  const [emptyList, setEmptyList] = useState(false)
  console.log(headers)
  console.log(rows)  
  console.log(emptyList)
  


  
 

    
  
  
  

 
  
  const [refresh, setRefresh] = useState(false);
  const listDetails = useSelector((state)=> state.list.value);
  const listName = useSelector((state)=> state.list.value.link_to)

  

  const pullMe = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const getListData = async () => {
    
     axios.get(`http://${currentDomain}/api/method/slnee_app.api.list_settings?doctype=${listName}`).then((response) => {
      const data = response.data.message;
      
        setSettings(data)
        const conf = (JSON.stringify(data.filter(function(item) {
            return item.fieldname !== "status_field";
        }).map((item) => {if (item.fieldname !==  "status_field") {
            return item.fieldname
        }})))
        const titles = (JSON.stringify(data.filter(function(item) {
          return item.fieldname !== "status_field";
      }).map((item) => {if (item.fieldname !==  "status_field") {
          return item.label
      }})))
      setHeaders(JSON.parse(titles))
      try {
        axios.get("http://"+currentDomain+"/api/method/slnee_app.api.get_list_data?doctype="+listName+"&fields="+conf).then((response)=>{

          setRows(response.data.message.map((item)=> item.filter((x)=> {return x.fieldname!== "name"})))

        })
      } catch (error) {
        setEmptyList(true)
        console.error(error)
      }
  
      


  
     }).catch((err) => {
      
      try {
        axios.get("http://"+currentDomain+"/api/method/slnee_app.api.get_list_data?doctype="+listName+"&fields=[\"name\"]").then((response)=>{
          if(response.data.message.length > 0) {

            setHeaders(["Name"])
            setRows(response.data.message)
          } else {setEmptyList(true)}
        

        })
      } catch (error) {
        console.error(error)
      }
      console.error(err)
     })


    // try {
      
    //   const res0 = await axios.get(`http://${currentDomain}/api/method/slnee_app.api.list_settings?doctype=${listName}`)
      
       
    //       const data = res0.data.message
          

     
    //       setSettings(data)
          
       
          
          
    //       const conf = (JSON.stringify(data.filter(function(item) {
    //         return item.fieldname !== "status_field";
    //     }).map((item) => {if (item.fieldname !==  "status_field") {
    //         return item.fieldname
    //     }})))
    //     const titles = (JSON.stringify(data.filter(function(item) {
    //       return item.fieldname !== "status_field";
    //   }).map((item) => {if (item.fieldname !==  "status_field") {
    //       return item.label
    //   }})))
    //   setHeaders(JSON.parse(titles))
        
     

      

           

        
      

    //   const res1 = await axios.get("http://"+currentDomain+"/api/method/slnee_app.api.get_list_data?doctype="+listName+"&fields="+conf);
      

    
      
    //   setRows(res1.data.message.map((item)=> item.filter((x)=> {return x.fieldname!== "name"})))
      



    // } catch (err) {
    //   console.log(err);
    // }
  };
  const calculateWidth = () =>{
    if (settings.length <= 4) {
     setTableWidth(windowWidth*1)
    }
    else if (settings.length > 4 ) {
      setTableWidth(windowWidth*1.5)
    }
   
  }

  useEffect(() => {
    setEmptyList(false)
    setSettings([])
    setRows([])
    setHeaders([])
    getListData()
    calculateWidth()
  }, [listDetails, refresh]);


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
            <BlurView intensity={50}
                tint="light"
                style={{
                  height: "100%",
                  width: "100%",
                  
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
              
                }}>
  
  
  
  
          <TopBar navigation={navigation} />
          <ScrollView
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            showsVerticalScrollIndicator={false}
            style={{ width: "100%", paddingVertical: 25, paddingBottom: 25 }}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={pullMe} />
            }
          >
            <View
              style={{
                width: windowWidth,
                
                marginBottom: 50
                
              }}
            >
              <View
                style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
              
              >
                <View>
                      <TouchableOpacity onPress={() => navigation.navigate('Main')} style={{marginLeft: 10}}  >
                          <Image style={{tintColor: "#115748",resizeMode: "contain", width: 25, height: 25}} source={require("../assets/back.png")} />
                      </TouchableOpacity>
                  </View>
                <View>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      color: "#28675a",
                      marginVertical: 15,
                      marginHorizontal: 10,
                    }}
                  >
                    {listDetails.label}
                  </Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width: windowWidth}} contentContainerStyle={{alignItems: "center", justifyContent: "center"}} >
                    

                    {!emptyList &&<View style={{width: tableWidth}}>
                    <View style={{paddingVertical:15, paddingHorizontal: 10 ,width:"100%", flexDirection: "row", backgroundColor: "#28675a"}} >
                      {headers.map((head,i) => {return(<View key={i} style={{flex: 1, alignItems: "center", justifyContent: "center"}} ><Text  style={{color: "white", textAlign: "center", fontFamily: "Merry"}} >{head}</Text></View>)} )}
                    </View>
                    

                    {rows.map((row,i)=><TouchableOpacity style={{paddingVertical:15, paddingHorizontal: 10 ,width:"100%", flexDirection: "row", backgroundColor: null}} key={i} >{row.map((item,j)=> {
                      if(item.type === "Check") {

                        switch (item.value) {
                          
                          case 0: return(<View key={j} style={{flex: 1, alignItems: "center", justifyContent: "center"}} ><CheckBox value={false} color={"#28675a"} style={{borderRadius: 50}}/></View>)
                            
                            break;
                          case 1: return(<View key={j} style={{flex: 1, alignItems: "center", justifyContent: "center"}} ><CheckBox value={true} color={"#28675a"} style={{borderRadius: 50}}/></View>)
                            
                            break;
                        
                          default: return(<View key={j} style={{flex: 1, alignItems: "center", justifyContent: "center"}} ><Text  style={{color: "black", textAlign: "center", fontFamily: "Merry"}} >
                        
                        
                          {item.value}
                          
                          </Text></View>)
                            break;
                        } 

                      }

                      else {
                        
                        return (<View key={j} style={{flex: 1, alignItems: "center", justifyContent: "center"}}><Text style={{color: "black", textAlign: "center", fontFamily: "Merry"}} key={j}>{item.value}</Text></View>)
                      }
                    
                    }
                      )}</TouchableOpacity>)}

                    

                  </View>  }
                  {emptyList && <View style={{width: tableWidth}}>
                    <View style={{paddingVertical:15, paddingHorizontal: 10 ,width:"100%", flexDirection: "row", backgroundColor: null}} >
                      <View  style={{flex: 1, alignItems: "center", justifyContent: "center"}} ><Text  style={{color: "#191919", textAlign: "center", fontFamily: "Merry", fontSize: 17}} >🗅 Empty List</Text></View>
                    </View>
                    

                  </View> }
              
                  
                </ScrollView  >
              </View>

              
              
                   
                
            </View>
          </ScrollView>
                </BlurView>
  
  
  
          </LinearGradient>
        </SafeAreaView>
      );
                  
    } 
                
  else {
    navigation.navigate("Login");
  }
};

export default ListScreen;
