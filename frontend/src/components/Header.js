import React, { useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import Cart from "./Cart";

export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="header">
      <div className="cart">
        <BsFillBagFill size="2rem" onClick={() => toggleCart()} />
        <Cart
          cartItems={props.cartItems}
          onProductAdd={props.onProductAdd}
          onProductRemove={props.onProductRemove}
          toggleCart={toggleCart}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
}
