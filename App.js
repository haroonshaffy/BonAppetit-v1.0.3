import React from "react";
import RootNavigation from "./navigation";

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCZlzgNX9sWwUXASOsaMemUuNwy27geY6w",
  authDomain: "delivery-price-4bd45.firebaseapp.com",
  projectId: "delivery-price-4bd45",
  storageBucket: "delivery-price-4bd45.appspot.com",
  messagingSenderId: "489325912056",
  appId: "1:489325912056:web:ab91f798a422fd317dc00d",
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  return <RootNavigation />;
}
