import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  BackHandler,
} from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
});

export default function MenuItems({
  restaurantName,
  foods,
  hideCheckbox,
  marginLeft,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cartReducer.selectedItems);
  const [itemsList, updateItemsList] = React.useState(items);
  const itemsRef = React.useRef(itemsList);

  const removeItemsFromCart = () => {
    let index = navigation.getState().index - 1;
    let routeName = navigation.getState().routeNames[index];
    console.log("SELECTITEM  ==>", routeName);
    navigation.goBack();
    if (routeName === "Home") {
      dispatch({
        type: "EMPTY_CART",
        payload: {
          ...itemsRef.current,
          restaurantName: "",
          checkboxValue: false,
        },
      });
    }

    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", removeItemsFromCart);
  }, []);

  React.useEffect(() => {
    itemsRef.current = itemsList;
  }, [itemsList]);

  const selectItem = (item, checkboxValue) => {
    console.log("SELECTITEM  ==>", item, checkboxValue);
    return dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });
  };

  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title === food.title));

  return (
    <ScrollView style={{ height: 450 }} showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            {hideCheckbox ? (
              <></>
            ) : (
              <BouncyCheckbox
                iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
                fillColor="green"
                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                isChecked={isFoodInCart(food, cartItems)}
              />
            )}
            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
          </View>
          <Divider
            width={0.5}
            orientation="vertical"
            style={{ marginHorizontal: 20 }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const FoodInfo = (props) => (
  <View style={{ width: 200, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage = ({ marginLeft, ...props }) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: marginLeft,
      }}
    />
  </View>
);
