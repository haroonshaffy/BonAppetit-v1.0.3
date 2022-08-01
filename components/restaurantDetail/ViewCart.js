import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import * as firebase from "firebase";

export default function ViewCart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

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

  const uberServiceFee = 10 % total;
  const skipServiceFee = 8 % total;
  const doordashServiceFee = 11 % total;

  const uberServiceTax = 16 % total;
  const skipServiceTax = 17 % total;
  const doordashServiceTax = 15 % total;

  const uberDeliveryFee = 1;
  const skipDeliveryFee = 4;
  const doordashDeliveryFee = 5;

  const totalUber = total + uberServiceFee + uberServiceTax + uberDeliveryFee;
  const totalSkip = total + skipServiceFee + skipServiceTax + skipDeliveryFee;
  const totalDoordash =
    total + doordashServiceFee + doordashServiceTax + doordashDeliveryFee;

  console.log(totalUber);
  console.log(totalSkip);
  console.log(totalDoordash);

  const addOrderToFireBase = () => {
    const db = firebase.firestore();
    db.collection("orders").add({
      items: items,
      restaurantName: restaurantName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setModalVisible(false);
    navigation.navigate("OrderReview", {
      uber: totalUber,
      skip: totalSkip,
      doordash: totalDoordash,
      uberservicefee: uberServiceFee,
      uberservicetax: uberServiceTax,
      skipservicefee: skipServiceFee,
      skipservicetax: skipServiceTax,
      doordashservicefee: doordashServiceFee,
      doordashservicetax: doordashServiceTax,
      uberdeliveryfee: uberDeliveryFee,
      skipdeliveryfee: skipDeliveryFee,
      doordashdeliveryfee: doordashDeliveryFee,
    });
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },

    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: 16,
      height: 500,
      borderWidth: 1,
    },

    restaurantName: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 10,
    },

    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },

    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
    },
  });

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>${totalCAD}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "#d2e7df",
                  alignItems: "center",
                  padding: 13,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 300,
                  position: "relative",
                }}
                onPress={() => {
                  addOrderToFireBase();
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  Compare Delivery Prices
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>

      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 25,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "#d2e7df",
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: 15,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 30,
                width: 300,
                position: "relative",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  marginRight: 45,
                  fontWeight: "600",
                }}
              >
                View Cart
              </Text>
              <Text style={{ color: "black", fontSize: 20, fontWeight: "600" }}>
                ${totalCAD}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
