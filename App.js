import 'react-native-gesture-handler';
import {
  Easing,Animated, Dimensions, Image,
  
  SafeAreaView,
  
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';
import { persistor, store } from './redux/store.js'
import { Provider, useDispatch, useSelector } from 'react-redux'
import DomainScreen from './screens/DomainScreen'
import LogInScreen from './screens/LogInScreen';
import TestScreen from './screens/TestScreen.jsx';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import DrawerContent from '@react-navigation/drawer';
import DrawerBody from './screens/components/DrawerBody.jsx';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ListScreen from './screens/ListScreen.jsx';

import { StatusBar } from 'expo-status-bar';
import ReportScreen from './screens/ReportScreen.jsx';


SplashScreen.preventAutoHideAsync();





const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainStackNavigator = () => {
  


  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      
    }} >
      <Stack.Screen name='Domain' component={DomainScreen} />
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
    </Stack.Navigator>
  );
}


export default function App() {
  
  
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  

  
  return (
 



    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}    onLayout={onLayoutRootView} >
      <StatusBar style="dark" />

    <NavigationContainer>
      <PersistGate loading={null} persistor={persistor}>
    <Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={(props) => <DrawerBody {...props} />}>
        <Drawer.Screen options={{ swipeEnabled: false }} name="Auth" component={MainStackNavigator} />
      
        <Drawer.Screen name="Main" component={MainScreen} options={{ swipeEnabled: true }}/>
        
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ swipeEnabled: true }}/>
        <Drawer.Screen name="List" component={ListScreen} options={{ swipeEnabled: true }}/>
        <Drawer.Screen name="Report" component={ReportScreen} options={{ swipeEnabled: true }}/>
        
        


      </Drawer.Navigator>
    

      </PersistGate>
    </NavigationContainer>
    </SafeAreaView>



    </Provider>

      
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
