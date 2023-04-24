import {
  View,
  SafeAreaView,
  ScrollView,
  Modal,
  StyleSheet,
  Pressable,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { Portal, Text, Button, Provider, Avatar } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import { BarCodeScanner } from "expo-barcode-scanner";

import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import MyComponent from "./SwipableViews";

const ManufacturingScreen = () => {
  const [modalVisible, setModalVisible] = useState({
    index: null,
    state: false,
  });
  const [plusMenu, setPlusMenu] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const baseOptions = {
    vertical: false,
    width: windowWidth,
    height: windowHeight,
  };
  const cards = [
    { color: "#FF6D60", value: "Job Card 1" },
    { color: "#F7D060", value: "Job Card 2" },
    { color: "#F3E99F", value: "Job Card 3" },
    { color: "#98D8AA", value: "Job Card 4" },
    { color: "#FA9884", value: "Job Card 5" },
  ];
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState({ type: null, data: null });

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("New BARCODE Scanned", `Data : ${data}\nType : ${type}`);
    setBarcode({ type: type, data: data });
  };
  console.log(barcode);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView
      style={{
        position: "relative",
        height: windowHeight,
        backgroundColor: "white",
        width: windowWidth,
        paddingTop: Platform.OS === "android" ? 25 : 0,
      }}
    >
      <View>
        <Carousel
          loop
          style={{ position: "absolute", top: 0 }}
          {...baseOptions}
          withAnimation={{
            type: "spring",
            config: {
              damping: 13,
            },
          }}
          mode="parallax"
          width={windowWidth}
          height={windowWidth / 2}
          autoPlay={false}
          data={cards}
          // onSnapToItem={(index) => console.log(index)}
          scrollAnimationDuration={1000}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ height: 150 }}
              activeOpacity={1}
              onPress={() => setModalVisible({ index: index, state: true })}
            >
              <View
                style={{
                  height: "100%",
                  borderWidth: 1,
                  borderColor: item.color,
                  borderRadius: 30,
                  backgroundColor: item.color,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    color: "#505050",
                  }}
                >
                  {item.value}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{ position: "absolute", top: 188 }}>
        <MyComponent />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: windowHeight * 0.125,
          right: windowWidth * 0.125,
          zIndex: 999,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setPlusMenu(true)}
          style={{
            borderWidth: 1,
            borderRadius: 50,
            borderColor: "#23AF91",
            padding: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Image
            style={{
              resizeMode: "contain",
              height: 50,
              width: 50,
              tintColor: "#23AF91",
            }}
            source={require("../assets/add.png")}
          />
        </TouchableOpacity>
      </View>

      {/* MODAL 1 */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.index === 0 && modalVisible.state === true}
        onRequestClose={() => {
          setModalVisible({ ...modalVisible, state: !modalVisible.state });
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              margin: 20,
              height: windowHeight * 0.75,
              width: windowWidth * 0.75,
              backgroundColor: "gray",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              position: "relative",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={styles.modalText}>
              Hello World {modalVisible.index + 1} !
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                setModalVisible({ ...modalVisible, state: !modalVisible.state })
              }
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* MODAL 2 */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.index === 1 && modalVisible.state === true}
        onRequestClose={() => {
          setModalVisible({ ...modalVisible, state: !modalVisible.state });
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              margin: 20,
              height: windowHeight * 0.75,
              width: windowWidth * 0.75,
              backgroundColor: "gray",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              position: "relative",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={styles.modalText}>
              Hello World {modalVisible.index + 1} !
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                setModalVisible({ ...modalVisible, state: !modalVisible.state })
              }
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* MODAL 3 */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.index === 2 && modalVisible.state === true}
        onRequestClose={() => {
          setModalVisible({ ...modalVisible, state: !modalVisible.state });
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              margin: 20,
              height: windowHeight * 0.75,
              width: windowWidth * 0.75,
              backgroundColor: "gray",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              position: "relative",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={styles.modalText}>
              Hello World {modalVisible.index + 1} !
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                setModalVisible({ ...modalVisible, state: !modalVisible.state })
              }
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* MODAL 4 */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.index === 3 && modalVisible.state === true}
        onRequestClose={() => {
          setModalVisible({ ...modalVisible, state: !modalVisible.state });
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              margin: 20,
              height: windowHeight * 0.75,
              width: windowWidth * 0.75,
              backgroundColor: "gray",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              position: "relative",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={styles.modalText}>
              Hello World {modalVisible.index + 1} !
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                setModalVisible({ ...modalVisible, state: !modalVisible.state })
              }
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* MODAL 5 */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.index === 4 && modalVisible.state === true}
        onRequestClose={() => {
          setModalVisible({ ...modalVisible, state: !modalVisible.state });
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              margin: 20,
              height: windowHeight * 0.75,
              width: windowWidth * 0.75,
              backgroundColor: "gray",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              position: "relative",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={styles.modalText}>
              Hello World {modalVisible.index + 1} !
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                setModalVisible({ ...modalVisible, state: !modalVisible.state })
              }
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* MODAL For Plus Button */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={plusMenu}
        onRequestClose={() => {
          setPlusMenu(!plusMenu);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              height: windowHeight,
              width: windowWidth,
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: "white",
            }}
          >
            <View>
              <Text style={styles.modalText}> Bar Code Scanner</Text>
            </View>

            <View>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{
                  height: 100,
                  width: windowWidth * 0.95,
                  marginBottom: 20,
                }}
              />
            </View>
            <View>
              <Pressable
                style={{
                  height: 50,
                  width: 100,
                  backgroundColor: "#23AF91",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
                }}
                onPress={() => setScanned(false)}
              >
                <Text>Scan Again</Text>
              </Pressable>
            </View>
            <View style={{ height: 200, width: windowWidth, alignItems: "center", justifyContent: "flex-start" }}>
              <View style={{marginTop: 25}}>
                <Text style={{fontSize: 16}} >Item Info</Text>
              </View>
              <View style={{width: windowWidth, alignItems: "flex-start", justifyContent: "space-evenly", marginLeft: 25, height: 150}} >
                <Text style={{fontSize: 14}} >Name : </Text>
                <Text style={{fontSize: 14}} >Warehouse : </Text>
                <Text style={{fontSize: 14}} >Quantity : </Text>


              </View>
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setPlusMenu(!plusMenu)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ManufacturingScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    height: 500,
    width: 250,
    backgroundColor: "gray",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
    borderRadius: 50,
    height: 40,
    width: 40,
    position: "absolute",
    top: 25,
    right: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    marginTop: 50,
    textAlign: "center",
    fontSize: 18,
  },
});
