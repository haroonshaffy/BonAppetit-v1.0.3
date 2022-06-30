import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const iconList = [
  { icon: "home", text: "Home" },
  { icon: "search", text: "Browse" },
  { icon: "shopping-bag", text: "Grocery" },
  { icon: "receipt", text: "Orders" },
  { icon: "user", text: "Account" },
];

export default function BottomTabs() {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      {iconList.map((elem) => {
        return <Icon key={elem.icon} icon={elem.icon} text={elem.text} />;
      })}
    </View>
  );
}

const Icon = (props) => (
  <TouchableOpacity>
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{ marginBottom: 3, alignSelf: "center" }}
      />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);
