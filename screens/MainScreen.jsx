import { useCallback, React, useState, useEffect } from "react";
import { StackedBarChart } from "react-native-skia-charts";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
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
  StatusBar,
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
import { Divider } from "@rneui/themed";

import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { saveList } from "../redux/listSlice.js";

SplashScreen.preventAutoHideAsync();

const HomeScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const currentDomain = useSelector((state) => state.domain.value);
  const module = useSelector((state) => state.module.value);
  const [shortcuts, setShortcuts] = useState([]);
  const [cards, setCards] = useState([]);
  const [charts, setCharts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  console.log(shortcuts);

  const pullMe = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const getHomeData = async () => {
    try {
      const res1 = await axios.get(
        `http://${currentDomain}/api/method/slnee_app.api.get_workspace?page=${module}`
      );

      //  const res = await axios.get("http://"+currentDomain+"/api/method/frappe.desk.desktop.get_desktop_page?page={\"name\":\"Home\",\"title\":\"Home\"}" );

      setCards(res1.data.message.cards.items.map((item) => item));

      setShortcuts(
        res1.data.message.shortcuts.items.map((item) => {
          return { label: item.label, link_to: item.link_to, type: item.type };
        })
      );
      setCharts(res1.data.message.charts.items.map((item) => item));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHomeData();
  }, [module, refresh]);

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
        SafeAreaView
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
        onLayout={onLayoutRootView}
      >
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

              marginBottom: 50,
            }}
          >
            <View
              style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#FA9884",
                    marginVertical: 15,
                    marginHorizontal: 10,
                  }}
                >
                  Your Shortcuts
                </Text>
              </View>
              <View>
                {shortcuts.map((shortcut, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      dispatch(saveList(shortcut));
                      if (shortcut.type === "Report") {
                        navigation.navigate("Report");
                      } else if (shortcut.type === "DocType") {
                        navigation.navigate("List");
                      } else {
                        navigation.navigate("Main");
                      }
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#505050",
                        marginVertical: 10,
                        marginHorizontal: 20,
                      }}
                    >
                      {shortcut.label} ↗
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View
              style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#FA9884",
                    marginVertical: 15,
                    marginHorizontal: 10,
                  }}
                >
                  Your Charts
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: windowWidth,
                }}
              >
                {charts.map((chart, index) => {
                  const data = {
                    labels: chart.data.labels ? chart.data.labels : null,
                    datasets: [
                      {
                        data: chart.data.datasets[0].values
                          ? chart.data.datasets[0].values.map(
                              (value) => value / 1000
                            )
                          : null,
                      },
                    ],
                    legend: ["Values in K"], // optional
                  };
                  if (data) {
                    return (
                      <View
                        key={index}
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#505050",
                            marginVertical: 10,
                            marginHorizontal: 20,
                          }}
                        >
                          {chart.chart_name}
                        </Text>

                        {chart.type === "Line" && (
                          <ScrollView
                            horizontal={true}
                            // style={{ marginHorizontal: 15 }}
                            showsHorizontalScrollIndicator={false}
                            style={{ marginBottom: 50, marginTop: 10 }}
                          >
                            <LineChart
                              data={data}
                              width={chart.data.labels.length * 50 + 50}
                              height={450}
                              yAxisLabel=""
                              chartConfig={{
                                backgroundGradientFrom: "#ffffff00",
                                backgroundGradientFromOpacity: 0.4,
                                backgroundGradientTo: "#ffffff00",
                                backgroundGradientToOpacity: 0.4,
                                color: (opacity = 1) =>
                                  `rgba(24,122,101, ${opacity})`,
                                strokeWidth: 3, // optional, default 3
                                barPercentage: 1,
                                useShadowColorFromDataset: false, // optional
                              }}
                              verticalLabelRotation={90}
                              style={{ borderRadius: 50 }}
                            />
                          </ScrollView>
                        )}

                        {chart.type === "Bar" && (
                          <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{ marginBottom: 50, marginTop: 10 }}
                            // style={{ marginHorizontal: 15 }}
                          >
                            <BarChart
                            data={data}
                            width={chart.data.labels.length * 50 +  150}
                            height={400}
                            yAxisLabel=""
                            chartConfig={{
                              backgroundGradientFrom: "white",
                              backgroundGradientFromOpacity: 1,
                              backgroundGradientTo: "#ffffff",
                              backgroundGradientToOpacity: 1,
                              color: (opacity = 1) =>
                                `rgba(24,122,101, ${opacity})`,
                              strokeWidth: 1, // optional, default 3
                              barPercentage: 1,
                              hideLegend: false,
                              legend: ["Values in K"], 
                              useShadowColorFromDataset: false,
                              
                              
                            }}
                            verticalLabelRotation={90}
                            style={{borderRadius: 10}}
                            // style={{borderRadius: 50, paddingHorizontal: 25, paddingTop: 30, alignItems: "center", justifyContent: "center"}}
                            
                          />
                            
                          </ScrollView>
                        )}
                      </View>
                    );
                  } else if (!data) {
                    return null;
                  }
                })}
              </View>
            </View>
            <View
              style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#FA9884",
                    marginVertical: 15,
                    marginHorizontal: 10,
                  }}
                >
                  Reports & Masters
                </Text>
              </View>
              <View>
                {cards.map((card, index) => {
                  return (
                    <View key={index}>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "flex-start",
                          flexDirection: "row",
                          marginLeft: 15,
                        }}
                      >
                        <Image
                          source={require("../assets/Menu.png")}
                          style={{
                            width: 25,
                            height: 25,
                            resizeMode: "contain",
                            tintColor: "#FA9884",
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#FA9884",
                            marginVertical: 10,
                            marginLeft: 10,
                          }}
                        >
                          {card.label}
                        </Text>
                      </View>

                      {card.links.map((link, index) => {
                        return (
                          <View key={index}>
                            <TouchableOpacity
                              onPress={() => {
                                dispatch(
                                  saveList({
                                    label: link.label,
                                    link_to: link.link_to,
                                  })
                                );
                                navigation.navigate("List");
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: "bold",
                                  color: "#505050",
                                  marginVertical: 10,
                                  marginLeft: 40,
                                }}
                              >
                                ○{"   "}
                                {link.label}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    navigation.navigate("Login");
  }
};

export default HomeScreen;
