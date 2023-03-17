import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Catalog from "./components/Catalog.js";
import Header from "./components/Header";

function App() {
  const [furnitureList, setFurnitureList] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://fh-api-dev.herokuapp.com/api/products-service/products/website/CAD?page=5&limit=6"
      )
      .then(function (response) {
        setFurnitureList(response.data.data.products);
      })
      .catch((error) => console.log(error));
  }, []);

  if (furnitureList == null) {
    return <h1>Loading...</h1>;
  } else {
    var heroImage = "";
    for (let i = 0; i < furnitureList.length; i++) {
      if (furnitureList[i].imageURLs.find((image) => image.includes("VIG"))) {
        heroImage = furnitureList[i].imageURLs.find((image) =>
          image.includes("VIG")
        );
        break;
      }
    }
  }

  const onProductAdd = (furnitureProduct) => {
    const exists = cartItems.find((item) => item._id === furnitureProduct._id);
    if (exists) {
      const newItems = cartItems.map((item) =>
        item._id === furnitureProduct._id
          ? { ...exists, quantity: exists.quantity + 1 }
          : item
      );
      setCartItems(newItems);
    } else {
      const newItems = [...cartItems, { ...furnitureProduct, quantity: 1 }];
      setCartItems(newItems);
    }
  };

  const onProductRemove = (furnitureProduct) => {
    const exists = cartItems.find((item) => item._id === furnitureProduct._id);
    if (exists.quantity === 1) {
      const newItems = cartItems.filter(
        (item) => item._id !== furnitureProduct._id
      );
      setCartItems(newItems);
    } else {
      const newItems = cartItems.map((item) =>
        item._id === furnitureProduct._id
          ? { ...exists, quantity: exists.quantity - 1 }
          : item
      );
      setCartItems(newItems);
    }
  };

  return (
    <div className="">
      <Header
        cartItems={cartItems}
        onProductAdd={onProductAdd}
        onProductRemove={onProductRemove}
      />
      <Catalog
        cartItems={cartItems}
        furnitureList={furnitureList}
        heroImage={heroImage}
        onProductAdd={onProductAdd}
        onProductRemove={onProductRemove}
      />
    </div>
  );
}

export default App;
