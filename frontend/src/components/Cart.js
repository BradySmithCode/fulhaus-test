import React, { useState } from "react";
import "../cart.css";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

export default function Cart(props) {
  const cartTotal = props.cartItems.reduce(
    (a, c) => a + c.quantity * c.retailPrice,
    0
  );

  return (
    <div className={`cartDrawer ${props.isOpen ? "slide-in" : "slide-out"}`}>
      <div className="cartFlex">
        <div className="">
          <AiOutlineClose size="2rem" onClick={() => props.toggleCart()} />
        </div>
        <h1 className="myOrderTitle">My Order</h1>
        {props.cartItems.map((item) => (
          <div className="productFlex" key={item._id}>
            <div className="imageDiv">
              <img src={item.imageURLs[0]} alt="" className="image" />
            </div>

            <div className="productInfo">
              <div className="productCartName">
                <h1>{item.fulhausProductName}</h1>
              </div>

              <div className="productPriceAndQuantity">
                <div className="productCartPrice">
                  <h1>${item.retailPrice}</h1>
                </div>
                <div className="productCartQuantity">
                  <h1>{item.quantity}x</h1>

                  <BiPlusCircle
                    size="1.5rem"
                    className="addButton"
                    onClick={() => props.onProductAdd(item)}
                  />
                  <BiMinusCircle
                    size="1.5rem"
                    className="removeButton"
                    onClick={() => props.onProductRemove(item)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="checkOut">
          <div className="cartTotal">
            <h1>Total</h1>
            <h1>${cartTotal}</h1>
          </div>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
}
