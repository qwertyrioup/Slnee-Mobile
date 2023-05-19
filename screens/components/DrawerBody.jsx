import { View, StyleSheet, TouchableOpacity, Pressable, Dimensions, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SplashScreen from 'expo-splash-screen';
import {Avatar,Title,Caption,Paragraph,Drawer,Text,TouchableRipple,Switch } from 'react-native-paper';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from 'axios';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { deleteDomain } from '../../redux/domainSlice';
import { logout } from '../../redux/userSlice';
import images from './Images';
import { deleteMenu } from '../../redux/menuSlice';
import { saveModule } from '../../redux/moduleSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';
import { StatusBar } from 'react-native';


SplashScreen.preventAutoHideAsync();


const DrawerBody = (props) => {
  const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const currentDomain = useSelector(state => state.domain.value) 
    const currentMenus = useSelector(state => state.menu.List)
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const handleLogOut = () => {
      
      dispatch(logout());
      props.navigation.navigate("Login")
  }


      
 

    
    const [fontsLoaded] = useFonts({
        'Mynerve': require("../../assets/Fonts/MaShanZheng.ttf"),
        'Merry': require("../../assets/Fonts/MerriweatherLight.ttf"),
        'Grand': require("../../assets/Fonts/JustMeAgainDownHere.ttf")
      });
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }
    

      else if (currentMenus) {
    
    return(

      <SafeAreaView SafeAreaView style={{ flex: 1, width: windowWidth, height: windowHeight, alignItems: "flex-start", justifyContent:"center", paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,}} onLayout={onLayoutRootView} >





        <View style={{flex:1 }}>
            <DrawerContentScrollView showsVerticalScrollIndicator={false}  {...props}>
                <View style={{position: "relative"}} >
                   

                <View   style={{flexDirection: "row", justifyContent: "flex-start",alignItems: "center", width: 250, marginBottom: 10}} >
                      <TouchableOpacity onPress={() => {props.navigation.navigate('Profile')}} style= {{marginHorizontal: 20}} >
                          <Image style={{resizeMode: "contain", width: 65, height: 65, borderRadius: 50}} source={require("../../assets/avatar.png")} />
                      </TouchableOpacity>
                      
                      <TouchableOpacity  onPress={() => {props.navigation.navigate('Profile')}}>
                          <Text style={{fontFamily: "Merry", fontSize: 20, color: "#FA9884"}} >My Profile</Text>
      
                      </TouchableOpacity>
                  </View>


                    
                    {currentMenus.map((menu)=> 




                      
                        
                            <DrawerItem 
                            style={{width: "100%"}}
                        key={menu}
                          icon={() => {
                            switch (menu) {
                              case 'Home': return(<Image
                                
                              
                                source={require("../../assets/Home.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Accounting': return(<Image
                                
                              
                                source={require("../../assets/Accounting.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Assets': return(<Image
                                
                              
                                source={require("../../assets/Assets.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Build': return(<Image
                                
                              
                                source={require("../../assets/Build.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Buying': return(<Image
                                
                              
                                source={require("../../assets/Buying.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'CRM': return(<Image
                                
                              
                                source={require("../../assets/CRM.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Customization': return(<Image
                                
                              
                                source={require("../../assets/Customization.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Employee Lifecycle': return(<Image
                                
                              
                                source={require("../../assets/EmployeeLifecycle.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'ERPNext Integrations': return(<Image
                                
                              
                                source={require("../../assets/ERPNextIntegrations.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'ERPNext Settings': return(<Image
                                
                              
                                source={require("../../assets/ERPNextSettings.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Expense Claims': return(<Image
                                
                              
                                source={require("../../assets/ExpenseClaims.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'HR': return(<Image
                                
                              
                                source={require("../../assets/HR.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Integrations': return(<Image
                                
                              
                                source={require("../../assets/Integrations.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Manufacturing': return(<Image
                                
                              
                                source={require("../../assets/Manufacturing.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Projects': return(<Image
                                
                              
                                source={require("../../assets/Projects.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Quality': return(<Image
                                
                              
                                source={require("../../assets/Quality.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Loans': return(<Image
                                
                              
                                source={require("../../assets/Loans.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Leaves': return(<Image
                                
                              
                                source={require("../../assets/Leaves.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />) 
                              case 'Menu': return(<Image
                                
                              
                                source={require("../../assets/Menu.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />) 
                              case 'Payroll': return(<Image
                                
                              
                                source={require("../../assets/Payroll.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />) 
                              case 'Performance': return(<Image
                                
                              
                                source={require("../../assets/Performance.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Recruitment': return(<Image
                                
                              
                                source={require("../../assets/Recruitment.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Retail': return(<Image
                                
                              
                                source={require("../../assets/Retail.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Salary Payout': return(<Image
                                
                              
                                source={require("../../assets/SalaryPayout.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Selling': return(<Image
                                
                              
                                source={require("../../assets/Selling.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Shift Attendance': return(<Image
                                
                              
                                source={require("../../assets/ShiftAttendance.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Settings': return(<Image
                                
                              
                                source={require("../../assets/Settings.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Stock': return(<Image
                                
                              
                                source={require("../../assets/Stock.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Support': return(<Image
                                
                              
                                source={require("../../assets/Support.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Tools': return(<Image
                                
                              
                                source={require("../../assets/Tools.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Users': return(<Image
                                
                              
                                source={require("../../assets/Users.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Utilities': return(<Image
                                
                              
                                source={require("../../assets/Utilities.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Website': return(<Image
                                
                              
                                source={require("../../assets/Website.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                              case 'Tax Benefits': return(<Image
                                
                              
                                source={require("../../assets/TaxBenefits.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                                
                                break;
                            
                              default: return (<Image
                                
                              
                                source={require("../../assets/Menu.png")}
                                style={{ width: 30, height: 30, tintColor: "#FA9884", resizeMode: "contain", marginLeft: 20 }}
                              />)
                                break;
                            }
                          }
                            
                              
                            }
                            
                              activeTintColor="#505050"
                              inactiveTintColor='#505050'
                              label={menu}
                              labelStyle={{fontSize: 18, fontWeight: "normal"}}
                              onPress={() => {
                                dispatch(saveModule(menu))
                                
                                if(menu === "Manufacturing") {
                                  props.navigation.navigate('Manufacturing')
                                } else {
                                  props.navigation.navigate('Main')
                                }
                              
                              }}
                          />)
                        
                      }
                        
                        
                 
                    
                        
                             
                    <View style={{marginLeft: 60}} >
              <Pressable  onPress={handleLogOut} style={{backgroundColor: "#FF6969", height: 40, width: 150, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 30}} ><Text style={{ color:"white", fontFamily: 'Merry', fontSize: 18, letterSpacing: 1.3}} >Log Out</Text></Pressable>
                  
              </View>

                        
                        
                        
                        
                        
                        
                        
                    
               
                    
                    
                </View>
            </DrawerContentScrollView>
            
        </View>
 
        </SafeAreaView>
      
    );
  } else {return(<View></View>)}
  }


export default DrawerBody
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });