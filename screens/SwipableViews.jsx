import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import LottieView from 'lottie-react-native';
import { useRef } from "react";


import SwipeableViews from "react-swipeable-views-native/lib/SwipeableViews.scroll";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  slideContainer: {
    height: 400,
    marginTop: 0,
    marginBottom: 25
  },
  slide: {
    padding: 15,
    height: 400,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  slide1: {
    backgroundColor: "white",
  },
  slide2: {
    backgroundColor: "white",
  },
  slide3: {
    backgroundColor: "white",
  },
  title: {
    color: "#656565",
    fontSize: 18
  },
  text: {
    color: "#505050",
    fontSize: 16,
  },
});

const MyComponent = () => {
  const animation = useRef(null)
return(
  <View style={{alignItems: "center", justifyContent: "center"}} >

  <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 75,
          height: 75,
          margin: 0,
          
        }}
        source={require('../assets/swipe1.json')}
        />

  <SwipeableViews style={styles.slideContainer}>
    <View style={[styles.slide, styles.slide1]}>
      <Text style={styles.title}>Recent Transfered Items</Text>
    </View>
    <View style={[styles.slide, styles.slide2]}>
      <Text style={styles.title}>Recent Transfered Items</Text>
    </View>
    <View style={[styles.slide, styles.slide3]}>
      <Text style={styles.title}>Recent Transfered Items</Text>
    </View>
  </SwipeableViews>
        </View>
);
      }

export default MyComponent;
