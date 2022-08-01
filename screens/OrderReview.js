import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import MenuItems from "../components/restaurantDetail/MenuItems";
import * as firebase from "firebase";
import AppCategories from "../components/orderReview/AppCategories";

export default function OrderReview({ route }) {
  const {
    uber,
    skip,
    doordash,
    uberservicefee,
    uberservicetax,
    skipservicefee,
    skipservicetax,
    doordashservicefee,
    doordashservicetax,
    uberdeliveryfee,
    skipdeliveryfee,
    doordashdeliveryfee,
  } = route.params;

  console.log(
    "🎈",
    uber,
    skip,
    doordash,
    uberservicefee,
    uberservicetax,
    skipservicefee,
    skipservicetax,
    doordashservicefee,
    doordashservicetax,
    uberdeliveryfee,
    skipdeliveryfee,
    doordashdeliveryfee
  );
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Chicken Biryani",
        description: "With butter lettuce, tomato and bechamel sauce",
        price: "$18.50",
        image:
          "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2021%2F04%2F13%2Fuse.png",
      },
    ],
  });

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalCAD = total.toLocaleString("en", {
    style: "currency",
    currency: "CAD",
  });

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data());
        });
      });

    return () => unsubscribe();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 0,
        paddingTop: 50,
        paddingLeft: 10,
        paddingRight: 5,
        alignSelf: "center",
        marginBottom: 0,
        backgroundColor: "#d2e7df",
      }}
    >
      <View
        style={{
          margin: 0,
          padding: 0,
          alignItems: "center",
          height: "100%",
          marginBottom: 150,
        }}
      >
        <LottieView
          style={{ height: 90, alignSelf: "center", marginBottom: 0 }}
          source={require("../assets/animations/113812-calculator.json")}
          autoPlay
          speed={0.8}
          loop={false}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 20,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Delivery price comparison for your order of ${totalCAD} at{" "}
          {restaurantName}:
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ display: "flex", alignSelf: "center" }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
          >
            Uber Eats
          </Text>
          <Text
            style={{ fontWeight: "400", fontSize: 18, textAlign: "center" }}
          >
            Subtotal: ${totalCAD}
          </Text>
          <Text
            style={{ fontWeight: "400", fontSize: 18, textAlign: "center" }}
          >
            Service Fee: ${uberservicefee}
          </Text>
          <Text
            style={{ fontWeight: "400", fontSize: 18, textAlign: "center" }}
          >
            Service Tax: ${uberservicetax}
          </Text>
          <Text
            style={{ fontWeight: "400", fontSize: 18, textAlign: "center" }}
          >
            Delivery Fee: ${uberdeliveryfee}
          </Text>
          <Text
            style={{
              fontWeight: "900",
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            UberEats Total: ${uber}
          </Text>
          <Text
            style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
          >
            DoorDash
          </Text>
          <Text
            style={{ fontWeight: "400", fontSize: 18, textAlign: "center" }}
          >
            Subtotal: ${totalCAD}
          </Text>
          <Text
            style={{ fontWeight: "400", fontSize: 18, textAlign: "center" }}
          >
            Service Fee: ${doordashservicefee}
          </Text>
          <Text
            style={{ fontWeight: "400", fontSize: 18, textAlign: "center" }}
          >
            Service Tax: ${doordashservicetax}
          </Text>
          <Text
            style={{ fontWeight: "400", fontSize: 18, textAlign: "center" }}
          >
            Delivery Fee: ${doordashdeliveryfee}
          </Text>
          <Text
            style={{
              fontWeight: "900",
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            DoorDash Total: ${doordash}
          </Text>
          <Text
            style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
          >
            SkipTheDishes
          </Text>
          <Text
            style={{ fontWeight: "400", fontSize: 18, textAlign: "center" }}
          >
            Subtotal: ${totalCAD}
          </Text>
          <Text
            style={{ fontWeight: "400", fontSize: 18, textAlign: "center" }}
          >
            Service Fee: ${skipservicefee}
          </Text>
          <Text
            style={{ fontWeight: "400", fontSize: 18, textAlign: "center" }}
          >
            Service Tax: ${skipservicetax}
          </Text>
          <Text
            style={{ fontWeight: "400", fontSize: 18, textAlign: "center" }}
          >
            Delivery Fee: ${skipdeliveryfee}
          </Text>
          <Text
            style={{
              fontWeight: "900",
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            SkipTheDishes Total: ${skip}
          </Text>
          {/*<MenuItems foods={lastOrder.items} hideCheckbox={true} />*/}
          {/*<AppCategories
            style={{
              display: "flex",
              alignItems: "center",
            }}
            data={{ UberEats: uber, SkipTheDishes: skip, DoorDash: doordash }}
          />*/}
          {/*<LottieView
            style={{
              height: 200,
              alignSelf: "center",
            }}
            source={require("../assets/animations/cooking.json")}
            autoPlay
            speed={0.5}
          />*/}
        </ScrollView>
      </View>
    </View>
  );
}
