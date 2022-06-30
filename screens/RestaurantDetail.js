import { View, Text } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import About from "../components/restaurantDetail/About";
import MenuItems from "../components/restaurantDetail/MenuItems";
import ViewCart from "../components/restaurantDetail/ViewCart";

const foods = [
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and bechamel sauce",
    price: "$13.50",
    image:
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2021%2F04%2F13%2Fuse.png",
  },
  {
    title: "Chicken Biryani",
    description:
      "A famous recipe of South Asian countries full of healthy ingredients!",
    price: "$18.50",
    image:
      "https://images.food52.com/McqpjxUiMekhfX6Rsq7wuuSoz0g=/2016x1344/filters:format(webp)/d815e816-4664-472e-990b-d880be41499f--chicken-biryani-recipe.jpg",
  },
  {
    title: "Mutton Biryani",
    description:
      "From the kitchen of Nawabs and Nizams that needs no introduction or special mentions",
    price: "$21.50",
    image:
      "https://www.cubesnjuliennes.com/wp-content/uploads/2021/03/Best-Mutton-Biryani-Recipe.jpg",
  },
  {
    title: "Pasta",
    description:
      "Tossed with fetta cheese, garlic, basil and cooked noodles for a beautifully cheesy dish",
    price: "$16.50",
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/02/05/Baked-Feta-Pasta-4_s4x3.jpg.rend.hgtvcom.406.325.suffix/1615916524567.jpeg",
  },
  {
    title: "Chicken Stroganoff",
    description:
      "This chicken stroganoff is simple and loved by the whole family",
    price: "$17.50",
    image:
      "https://i2.wp.com/lifemadesimplebakes.com/wp-content/uploads/2017/09/chicken-stroganoff-resize-3.jpg",
  },
  {
    title: "Nachos",
    description: "One of the creamiest, cheesiest nachos you will ever taste",
    price: "$10.50",
    image:
      "https://www.sargento.com/assets/Uploads/Recipe/Image/Nachos_0__FillWzgwMCw4MDBd.jpg",
  },
];

export default function RestaurantDetail({ route, navigation }) {
  return (
    <View>
      <About route={route} />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <MenuItems restaurantName={route.params.name} foods={foods} />
      <ViewCart navigation={navigation} />
    </View>
  );
}
