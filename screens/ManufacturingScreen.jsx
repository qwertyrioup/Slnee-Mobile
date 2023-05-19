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
  TouchableOpacity,
  StatusBar,
  Text,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";

import Carousel from "react-native-reanimated-carousel";
import { Camera, CameraType } from "expo-camera";


import SelectDropdown from "react-native-select-dropdown";

import React, { useEffect, useState, useRef } from "react";
import { Image } from "react-native";
import MyComponent from "./SwipableViews";
import axios from "axios";
import { useSelector } from "react-redux";
import PieChartWithCenteredLabels from "./components/ManufacturingScreenChart";
import { RefreshControl } from "react-native";
import { DataTable, FAB, Portal } from "react-native-paper";

const ManufacturingScreen = () => {
  const [modalVisible, setModalVisible] = useState({
    index: null,
    state: false,
  });
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });
  const [qtyToTransfer, setQtyToTransfer] = React.useState("");
  console.log(qtyToTransfer);

  const { open } = state;
  const [itemData, setItemData] = useState({});
  const ddd = {
    bins: [
      {
        warehouse: "Goods In Transit - PCLP",
        actual_qty: 6.0,
      },
      {
        warehouse: "Stores - PCLP",
        actual_qty: 994.0,
      },
      {
        warehouse: "Finished Goods - PCLP",
        actual_qty: 0.0,
      },
    ],
    item_code: "1",
    item_name: "1",
    image: "/files/Screenshot from 2023-05-15 12-37-08.png",
    prices: [
      {
        price: 100.0,
        valid_from: "2023-05-15",
      },
      {
        price: 50.0,
        valid_from: "2023-05-25",
      },
    ],
  };
  const [workOrder, setWorkOrder] = useState([]);
  const [jobCard, setJobCard] = useState([]);
  const [stockEntry, setStockEntry] = useState([]);
  const [bom, setBom] = useState([]);
  const [plusMenu, setPlusMenu] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const baseOptions = {
    vertical: false,
    width: windowWidth,
    height: windowHeight,
  };
  const cards = [
    { color: "#BE5A83", value: "Job Card" },
    { color: "#E06469", value: "Work Order" },
    { color: "#F2B6A0", value: "Stock Entry" },
    { color: "#DEDEA7", value: "Bill Of Materials" },
  ];

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentDomain = useSelector((state) => state.domain.value);
  const appSettings = useSelector((state) => state.app.app_info);
  const module = useSelector((state) => state.module.value);
  const [refresh, setRefresh] = useState(false);
  const [jobCardCount, setJobCardCount] = useState(0);
  const [workOrderCount, setWorkOrderCount] = useState(0);
  const [stockEntryCount, setStockEntryCount] = useState(0);
  const [bomCount, setBomCount] = useState(0);
  const [Warehouses, setWarehouses] = useState([])
  console.log(Warehouses)
  const getWarehouses = async()=>{
    axios.get('http://'+currentDomain+'/api/method/slnee_app.api.getWarehouses?doctype=Warehouse').then((response)=>setWarehouses(response.data.message)).catch((error)=>console.log(error))
  }
  const getCounts = async () => {
    axios
      .get(
        "http://" +
          currentDomain +
          "/api/method/frappe.desk.reportview.get_count?doctype=Job Card"
      )
      .then((response) => {
        setJobCardCount(response.data.message);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        "http://" +
          currentDomain +
          "/api/method/frappe.desk.reportview.get_count?doctype=Work Order"
      )
      .then((response) => {
        setWorkOrderCount(response.data.message);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        "http://" +
          currentDomain +
          "/api/method/frappe.desk.reportview.get_count?doctype=Stock Entry"
      )
      .then((response) => {
        setStockEntryCount(response.data.message);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        "http://" +
          currentDomain +
          "/api/method/frappe.desk.reportview.get_count?doctype=BOM"
      )
      .then((response) => {
        setBomCount(response.data.message);
      })
      .catch((err) => console.log(err));
  };

  const pullMe = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  console.log(StatusBar.currentHeight);

  const workOrderFields = [
    "Item To Manufacture",
    "Status",
    "Company",
    "Quantity",
    "BOM No",
  ];
  const jobCardFields = [
    "Operation",
    "Status",
    "Work Order",
    "Qty To Manufacture",
    "Workstation",
    "ID",
  ];
  const stockEntryFields = [
    "Stock Entry Type",
    "Purpose",
    "Source Warehouse",
    "Target Warehouse",
    "ID",
  ];
  const bomFields = ["ID", "Item", "Is Active", "Is Default", "Quantity"];

  const getBom = async () => {
    axios
      .get(
        "http://" +
          currentDomain +
          '/api/method/frappe.desk.reportview.get?doctype=BOM&fields=["`tabBOM`.`name`","`tabBOM`.`owner`","`tabBOM`.`creation`","`tabBOM`.`modified`","`tabBOM`.`modified_by`","`tabBOM`.`_user_tags`","`tabBOM`.`_comments`","`tabBOM`.`_assign`","`tabBOM`.`_liked_by`","`tabBOM`.`docstatus`","`tabBOM`.`idx`","`tabBOM`.`item`","`tabBOM`.`is_active`","`tabBOM`.`is_default`","`tabBOM`.`operating_cost`","`tabBOM`.`raw_material_cost`","`tabBOM`.`scrap_material_cost`","`tabBOM`.`total_cost`","`tabBOM`.`has_variants`","`tabBOM`.`image`","`tabBOM`.`currency`","`tabBOM`.`quantity`"]'
      )
      .then((response) => {
        const d = response.data.message;

        setBom(
          d.values.map((i) => {
            return [
              {
                key: "name",
                value: i[d.keys.indexOf("name")],
              },
              {
                key: "item",
                value: i[d.keys.indexOf("item")],
              },
              {
                key: "is_active",
                value: i[d.keys.indexOf("is_active")],
              },
              {
                key: "is_default",
                value: i[d.keys.indexOf("is_default")],
              },

              {
                key: "quantity",
                value: i[d.keys.indexOf("quantity")],
              },
            ];
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStockEntry = async () => {
    axios
      .get(
        "http://" +
          currentDomain +
          '/api/method/frappe.desk.reportview.get?doctype=Stock+Entry&fields=["`tabStock+Entry`.`name`","`tabStock+Entry`.`owner`","`tabStock+Entry`.`creation`","`tabStock+Entry`.`modified`","`tabStock+Entry`.`modified_by`","`tabStock+Entry`.`_user_tags`","`tabStock+Entry`.`_comments`","`tabStock+Entry`.`_assign`","`tabStock+Entry`.`_liked_by`","`tabStock+Entry`.`docstatus`","`tabStock+Entry`.`idx`","`tabStock+Entry`.`stock_entry_type`","`tabStock+Entry`.`purpose`","`tabStock+Entry`.`from_warehouse`","`tabStock+Entry`.`to_warehouse`","`tabStock+Entry`.`per_transferred`","`tabStock+Entry`.`is_return`"]'
      )
      .then((response) => {
        const d = response.data.message;

        setStockEntry(
          d.values.map((i) => {
            return [
              {
                key: "stock_entry_type",
                value: i[d.keys.indexOf("stock_entry_type")],
              },
              {
                key: "purpose",
                value: i[d.keys.indexOf("purpose")],
              },
              {
                key: "from_warehouse",
                value: i[d.keys.indexOf("from_warehouse")],
              },
              {
                key: "to_warehouse",
                value: i[d.keys.indexOf("to_warehouse")],
              },

              {
                key: "name",
                value: i[d.keys.indexOf("name")],
              },
            ];
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getJobCard = async () => {
    axios
      .get(
        "http://" +
          currentDomain +
          '/api/method/frappe.desk.reportview.get?doctype=Job+Card&fields=["`tabJob+Card`.`name`","`tabJob+Card`.`owner`","`tabJob+Card`.`creation`","`tabJob+Card`.`modified`","`tabJob+Card`.`modified_by`","`tabJob+Card`.`_user_tags`","`tabJob+Card`.`_comments`","`tabJob+Card`.`_assign`","`tabJob+Card`.`_liked_by`","`tabJob+Card`.`docstatus`","`tabJob+Card`.`idx`","`tabJob+Card`.`work_order`","`tabJob+Card`.`for_quantity`","`tabJob+Card`.`operation`","`tabJob+Card`.`workstation`","`tabJob+Card`.`status`"]'
      )
      .then((response) => {
        const d = response.data.message;

        setJobCard(
          d.values.map((i) => {
            return [
              {
                key: "operation",
                value: i[d.keys.indexOf("operation")],
              },
              {
                key: "status",
                value: i[d.keys.indexOf("status")],
              },
              {
                key: "work_order",
                value: i[d.keys.indexOf("work_order")],
              },

              {
                key: "for_quantity",
                value: i[d.keys.indexOf("for_quantity")],
              },
              {
                key: "workstation",
                value: i[d.keys.indexOf("workstation")],
              },
              {
                key: "name",
                value: i[d.keys.indexOf("name")],
              },
            ];
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getWorkOrder = async () => {
    axios
      .get(
        "http://" +
          currentDomain +
          '/api/method/frappe.desk.reportview.get?doctype=Work Order&fields=["`tabWork+Order`.`name`","`tabWork+Order`.`owner`","`tabWork+Order`.`creation`","`tabWork+Order`.`modified`","`tabWork+Order`.`modified_by`","`tabWork+Order`.`_user_tags`","`tabWork+Order`.`_comments`","`tabWork+Order`.`_assign`","`tabWork+Order`.`_liked_by`","`tabWork+Order`.`docstatus`","`tabWork+Order`.`idx`","`tabWork+Order`.`status`","`tabWork+Order`.`production_item`","`tabWork+Order`.`image`","`tabWork+Order`.`bom_no`","`tabWork+Order`.`sales_order`","`tabWork+Order`.`qty`","`tabWork+Order`.`produced_qty`","`tabWork+Order`.`expected_delivery_date`","`tabWork+Order`.`planned_start_date`","`tabWork+Order`.`planned_end_date`","`tabWork+Order`.`_seen`"]'
      )
      .then((response) => {
        setWorkOrder(
          response.data.message.values.map((i) => {
            return [
              {
                key: "production_item",
                value: i[response.data.message.keys.indexOf("production_item")],
              },
              {
                key: "status",
                value: i[response.data.message.keys.indexOf("status")],
              },
              { key: "company", value: appSettings.app },
              {
                key: "qty",
                value: i[response.data.message.keys.indexOf("qty")],
              },
              {
                key: "bom_no",
                value: i[response.data.message.keys.indexOf("bom_no")],
              },
            ];
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [type, setType] = useState(CameraType.back);
  const [source, setSource] = useState('')
  const [target, setTarget] = useState('')
  const transferItem = async()=> {
    try {
      const res = await axios.post('http://'+currentDomain+'/api/method/erpnext.stock.doctype.stock_entry.stock_entry_utils.make_stock_entry?item_code='+itemData.item_code+'&source='+source+'&target='+target+'&qty='+qtyToTransfer)
      Alert.alert("New Item Transferred", `Item Name : ${itemData.item_name}\nItem Code : ${itemData.item_code}\nQuantity : ${qtyToTransfer}\nSource Warehouse : ${source}\nTarget Warehouse : ${target}`);
      setQtyToTransfer("")
    } catch (error) {
      Alert.alert("Transfer Error", "Please Check Your Source, Target and Quantity");
      console.log(error);
    }
  }

  useEffect(() => {
    getWarehouses();
    getCounts();
    getWorkOrder();
    getJobCard();
    getStockEntry();
    getBom();
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, [module, refresh]);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    Alert.alert("New BARCODE Scanned", `Data : ${data}\nType : ${type}`);
    axios
      .post(
        "http://" +
          currentDomain +
          "/api/method/slnee_app.api.getItemByBarcode?barcode=" +
          data
      )
      .then((response) => setItemData(response.data.message))
      .catch((error) => console.log(error));
      setScanned(false)
  };

  if (hasPermission === null) {
    return <SafeAreaView><Text>Requesting for camera permission</Text></SafeAreaView>
   
  }
  if (hasPermission === false) {
    
    return <SafeAreaView><Text>No access to camera</Text></SafeAreaView>
      
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: windowHeight,
        backgroundColor: "white",
        width: windowWidth,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View
        style={{
          position: "absolute",
          bottom: windowHeight * 0.125,
          right: windowWidth * 0.125,
          zIndex: 999,
        }}
      >
        <Portal>
          <FAB.Group
            open={open}
            icon={open ? "minus" : "plus"}
            actions={[
              {
                icon: "transfer",
                label: "Transfer Items",
                onPress: () => setPlusMenu(true),
              },
              {
                icon: "email",
                label: "Email",
                onPress: () => console.log("Pressed email"),
              },
              {
                icon: "bell",
                label: "Remind",
                onPress: () => console.log("Pressed notifications"),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullMe} />
        }
        showsVerticalScrollIndicator={false}
        style={{
          height: "100%",
          position: "relative",
          backgroundColor: "white",
        }}
      >
        <View>
          <Carousel
            loop
            // style={{ position: "absolute", top: 0 }}
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
                      color: "white",
                    }}
                  >
                    {item.value}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ width: windowWidth, flexDirection: "row" }}>
          <View
            style={{
              width: windowWidth / 2,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: windowWidth / 2,
              }}
            >
              <View
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 50,
                  marginHorizontal: 15,
                  backgroundColor: "#BE5A83",
                }}
              ></View>
              <Text
                style={{ fontSize: 17, color: "#505050", fontWeight: "750" }}
              >
                Job Card
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: windowWidth / 2,
              }}
            >
              <View
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 50,
                  marginHorizontal: 15,
                  backgroundColor: "#E06469",
                }}
              ></View>
              <Text
                style={{ fontSize: 17, color: "#505050", fontWeight: "750" }}
              >
                Work Order
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: windowWidth / 2,
              }}
            >
              <View
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 50,
                  marginHorizontal: 15,
                  backgroundColor: "#F2B6A0",
                }}
              ></View>
              <Text
                style={{ fontSize: 17, color: "#505050", fontWeight: "750" }}
              >
                Stock Entry
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: windowWidth / 2,
              }}
            >
              <View
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 50,
                  marginHorizontal: 15,
                  backgroundColor: "#DEDEA7",
                }}
              ></View>
              <Text
                style={{ fontSize: 17, color: "#505050", fontWeight: "750" }}
              >
                Bill Of Materials
              </Text>
            </View>
          </View>
          <View style={{ width: windowWidth / 2 }}>
            <PieChartWithCenteredLabels
              jobCard={jobCardCount}
              workOrder={workOrderCount}
              stockEntry={stockEntryCount}
              billOfMaterials={bomCount}
            />
          </View>
        </View>
        <View>
          <MyComponent />
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
                height: windowHeight,
                width: windowWidth,
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "#F9F5EB",
              }}
            >
              <Text style={styles.modalText}>Job Card</Text>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={{ flexDirection: "column" }}
                style={{ width: windowWidth }}
              >
                <View
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    width: windowWidth * 1.5,
                    flexDirection: "row",
                    backgroundColor: "#FA9884",
                  }}
                >
                  {jobCardFields.map((item, i) => {
                    return (
                      <View
                        key={i}
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontFamily: "Merry",
                            fontSize: 18,
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                <ScrollView
                  vertical={true}
                  showsVerticalScrollIndicator={true}
                  style={{ marginBottom: 25 }}
                >
                  {jobCard.map((row, i) => (
                    <TouchableOpacity
                      style={{
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        width: windowWidth * 1.5,
                        flexDirection: "row",
                        backgroundColor: null,
                      }}
                      key={i}
                    >
                      {row.map((item, j) => {
                        return (
                          <View
                            key={j}
                            style={{
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center",
                              width: windowWidth * 1.5,
                            }}
                          >
                            <Text
                              style={{
                                color: "black",
                                textAlign: "center",
                                fontFamily: "Merry",
                                fontSize: 16,
                              }}
                              key={j}
                            >
                              {item.value}
                            </Text>
                          </View>
                        );
                      })}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </ScrollView>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  setModalVisible({
                    ...modalVisible,
                    state: !modalVisible.state,
                  })
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
                height: windowHeight,
                width: windowWidth,
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "#F9F5EB",
              }}
            >
              <Text style={styles.modalText}>Work Order</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={{ flexDirection: "column" }}
                style={{ width: windowWidth }}
              >
                <View
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    width: windowWidth * 1.5,
                    flexDirection: "row",
                    backgroundColor: "#FA9884",
                  }}
                >
                  {workOrderFields.map((item, i) => {
                    return (
                      <View
                        key={i}
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontFamily: "Merry",
                            fontSize: 18,
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <ScrollView
                  vertical={true}
                  showsVerticalScrollIndicator={true}
                  style={{ marginBottom: 25 }}
                >
                  {workOrder.map((row, i) => (
                    <TouchableOpacity
                      style={{
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        width: windowWidth * 1.5,
                        flexDirection: "row",
                        backgroundColor: null,
                      }}
                      key={i}
                    >
                      {row.map((item, j) => {
                        return (
                          <View
                            key={j}
                            style={{
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "black",
                                textAlign: "center",
                                fontFamily: "Merry",
                                fontSize: 16,
                              }}
                              key={j}
                            >
                              {item.value}
                            </Text>
                          </View>
                        );
                      })}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </ScrollView>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  setModalVisible({
                    ...modalVisible,
                    state: !modalVisible.state,
                  })
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
                height: windowHeight,
                width: windowWidth,
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "#F9F5EB",
              }}
            >
              <Text style={styles.modalText}>Stock Entry</Text>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={{ flexDirection: "column" }}
                style={{ width: windowWidth }}
              >
                <View
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    width: windowWidth * 1.5,
                    flexDirection: "row",
                    backgroundColor: "#FA9884",
                  }}
                >
                  {stockEntryFields.map((item, i) => {
                    return (
                      <View
                        key={i}
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontFamily: "Merry",
                            fontSize: 18,
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                <ScrollView
                  vertical={true}
                  showsVerticalScrollIndicator={true}
                  style={{ marginBottom: 25 }}
                >
                  {stockEntry.map((row, i) => (
                    <TouchableOpacity
                      style={{
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        width: windowWidth * 1.5,
                        flexDirection: "row",
                        backgroundColor: null,
                      }}
                      key={i}
                    >
                      {row.map((item, j) => {
                        return (
                          <View
                            key={j}
                            style={{
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center",
                              width: windowWidth * 1.5,
                            }}
                          >
                            <Text
                              style={{
                                color: "black",
                                textAlign: "center",
                                fontFamily: "Merry",
                                fontSize: 16,
                              }}
                              key={j}
                            >
                              {item.value}
                            </Text>
                          </View>
                        );
                      })}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </ScrollView>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  setModalVisible({
                    ...modalVisible,
                    state: !modalVisible.state,
                  })
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
                height: windowHeight,
                width: windowWidth,
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "#F9F5EB",
              }}
            >
              <Text style={styles.modalText}>Bill Of Materials</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={{ flexDirection: "column" }}
                style={{ width: windowWidth }}
              >
                <View
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    width: windowWidth * 1.5,
                    flexDirection: "row",
                    backgroundColor: "#FA9884",
                  }}
                >
                  {bomFields.map((item, i) => {
                    return (
                      <View
                        key={i}
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontFamily: "Merry",
                            fontSize: 18,
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <ScrollView
                  vertical={true}
                  showsVerticalScrollIndicator={true}
                  style={{ marginBottom: 25 }}
                >
                  {bom.map((row, i) => (
                    <TouchableOpacity
                      style={{
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        width: windowWidth * 1.5,
                        flexDirection: "row",
                        backgroundColor: null,
                      }}
                      key={i}
                    >
                      {row.map((item, j) => {
                        return (
                          <View
                            key={j}
                            style={{
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "black",
                                textAlign: "center",
                                fontFamily: "Merry",
                                fontSize: 16,
                              }}
                              key={j}
                            >
                              {item.value}
                            </Text>
                          </View>
                        );
                      })}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </ScrollView>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  setModalVisible({
                    ...modalVisible,
                    state: !modalVisible.state,
                  })
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                height: windowHeight * 1.05,
                width: windowWidth,
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "white",
              }}
            >
              <View>
                <Text style={styles.modalText}> Bar Code Scanner</Text>
              </View>

              <View
                style={{
                  width: windowWidth,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Camera
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  type={type}
                  style={{
                    height: 100,
                    width: windowWidth * 0.95,
                    marginBottom: 20,
                  }}
                />
              </View>
              {/* <View>
                <Button
                  icon="camera"
                  mode="contained"
                  style={{ backgroundColor: "#FA9884" }}
                  onPress={() => setScanned(false)}
                >
                  Scan Again
                </Button>
              </View> */}
              <View
                style={{
                  height: 200,
                  width: windowWidth,
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {Object.keys(ddd).length > 0 ? (
                  <View
                    style={{
                      width: windowWidth,
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <View style={{ marginTop: 100, alignItems: 'center', justifyContent:'center' }}>
                      <Text style={{ fontSize: 18, color: "#656565", marginBottom: 10 }}>
                        {"Item Name : " + ddd.item_name}
                      </Text>
                      <Text style={{ fontSize: 18, color: "#656565", marginBottom: 10 }}>
                        {"Price : " + ddd.prices[0].price}
                      </Text>
                      <Image source={{uri:'http://'+currentDomain+'/files/Screenshot from 2023-05-15 12-37-08.png'}} style={{width:100, height: 100, resizeMode: 'contain'}} />
                    </View>

                    <View style={{ width: "100%" }}>
                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title>Warehouses</DataTable.Title>
                          <DataTable.Title numeric>Quantity</DataTable.Title>
                          <DataTable.Title numeric>Price</DataTable.Title>
                        </DataTable.Header>
                        {ddd.bins.map((bin, i) => (
                          <DataTable.Row key={i}>
                            <DataTable.Cell>{bin.warehouse}</DataTable.Cell>
                            <DataTable.Cell numeric>
                              {bin.actual_qty}
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                              {ddd.prices[0].price}
                            </DataTable.Cell>
                          </DataTable.Row>
                        ))}
                      </DataTable>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 25 }}>
                      <View
                        style={{
                          marginRight: windowWidth * 0.05,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ marginBottom: 15 }}>Transfer From</Text>
                        <SelectDropdown
                          buttonStyle={{ width: windowWidth * 0.4 }}
                          data={ddd.bins.map((bin) => bin.warehouse)}
                          onSelect={(selectedItem, index) => {
                            setSource(selectedItem);
                          }}
                          defaultValue={"select"}
                        />
                      </View>

                      <View
                        style={{
                          marginLeft: windowWidth * 0.05,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ marginBottom: 15 }}>Transfer To</Text>
                        <SelectDropdown
                          buttonStyle={{ width: windowWidth * 0.4 }}
                          data={ddd.bins.map((bin) => bin.warehouse)}
                          onSelect={(selectedItem, index) => {
                            setTarget(selectedItem);
                          }}
                          defaultValue={"Select"}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 25,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 25,
                      }}
                    >
                      <View
                        style={{
                          width: windowWidth * 0.4,
                          marginRight: windowWidth * 0.05,
                        }}
                      >
                        <TextInput
                          style={{ width: "100%", height: 50 }}
                          label="Quantity"
                          value={qtyToTransfer}
                          onChangeText={(text) => setQtyToTransfer(text)}
                        />
                      </View>
                      <View
                        style={{
                          width: windowWidth * 0.4,
                          marginLeft: windowWidth * 0.05,
                        }}
                      >
                        <Button
                          style={{ width: "100%", backgroundColor: "#FA9884" }}
                          icon="send"
                          mode="contained"
                          onPress={transferItem}
                        >
                          Transfer
                        </Button>
                      </View>
                    </View>
                  </View>
                ) : (
                  <Text style={{ marginTop: 20, fontSize: 18 }}>
                    Waiting For Scan .
                  </Text>
                )}

                {/* <View style={{ marginTop: 25 }}>
                  <Text style={{ fontSize: 16 }}>Item Info</Text>
                </View>
                <View
                  style={{
                    width: windowWidth,
                    alignItems: "flex-start",
                    justifyContent: "space-evenly",
                    marginLeft: 25,
                    height: 150,
                  }}
                >
                  <Text style={{ fontSize: 14 }}>Name : </Text>
                  <Text style={{ fontSize: 14 }}>Warehouse : </Text>
                  <Text style={{ fontSize: 14 }}>Quantity : </Text>
                </View> */}
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setPlusMenu(!plusMenu)}
              >
                <Text style={styles.textStyle}>X</Text>
              </Pressable>
              
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManufacturingScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
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
    backgroundColor: "darkgray",
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
    marginBottom: 35,
    marginTop: 35,
    textAlign: "center",
    fontSize: 22,
    color: "#505050",
  },
});
