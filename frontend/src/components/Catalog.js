import React from "react";
import "../index.css";
import Product from "./Product";

export default function Catalog(props) {
  const { onProductAdd, heroImage, furnitureList, onProductRemove } = props;
  return (
    <div className="container">
      <div className="catalogGrid">
        <div className="heroImageDiv">
          <img src={heroImage} alt="heroImg" className="heroImage" />
        </div>

        <div className="productMain">
          {furnitureList.map((furniture) => (
            <Product
              key={furniture._id}
              furniture={furniture}
              onProductAdd={onProductAdd}
              onProductRemove={onProductRemove}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
