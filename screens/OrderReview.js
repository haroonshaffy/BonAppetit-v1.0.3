import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import MenuItems from "../components/restaurantDetail/MenuItems";
import * as firebase from "firebase";
import AppCategories from "../components/orderReview/AppCategories";

export default function OrderReview({ route }) {
  const { uber, skip, doordash } = route.params;

  console.log("🎈", uber, skip, doordash);
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
        marginTop: 35,
        alignSelf: "center",
      }}
    >
      <View
        style={{
          margin: 15,
          alignItems: "center",
          height: "100%",
        }}
      >
        <LottieView
          style={{ height: 80, alignSelf: "center", marginBottom: 10 }}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Delivery price comparison for your order of ${totalCAD} at{" "}
          {restaurantName}:
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MenuItems foods={lastOrder.items} hideCheckbox={true} />
          <AppCategories
            style={{
              display: "flex",
              alignItems: "center",
            }}
            data={{ UberEats: uber, SkipTheDishes: skip, DoorDash: doordash }}
          />
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
