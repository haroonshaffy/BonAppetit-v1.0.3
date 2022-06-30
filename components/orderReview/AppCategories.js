import { View, Text, Image, ScrollView } from "react-native";
import React from "react";

const items = [
  {
    image: require("../../assets/images/ubereats.png"),
    text: "UberEats",
  },
  {
    image: require("../../assets/images/skip.jpeg"),
    text: "SkipTheDishes",
  },
  {
    image: require("../../assets/images/doordash.png"),
    text: "DoorDash",
  },
];

export default function AppCategories(props) {
  const { data } = props;
  return (
    <View
      style={{
        marginTop: 0,
        backgroundColor: "#fff",
        paddingVertical: 5,
        paddingLeft: 10,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View
            key={index}
            style={{
              alignItems: "center",
              marginRight: 30,
              paddingBottom: 20,
              marginBottom: 0,
            }}
          >
            <Image
              source={item.image}
              style={{
                width: 50,
                height: 40,
                resizeMode: "contain",
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: "900" }}>{item.text}</Text>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "900" }}>
                ${data[item.text]}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
