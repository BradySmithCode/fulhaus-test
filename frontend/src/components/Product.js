import React from "react";
import { BiCartAdd } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { BsFillStarFill } from "react-icons/bs";

export default function Product(props) {
  const { onProductAdd, furniture } = props;
  return (
    <div className="">
      <div className="productCard" key={furniture._id}>
        <div className="productImageDiv">
          <img src={furniture.imageURLs[0]} alt="" className="productImage" />
        </div>

        <div className="productName">
          <h1 className="">{furniture.fulhausProductName}</h1>
        </div>

        <div className="productStars">
          <IconContext.Provider value={{ color: "orange" }}>
            <BsFillStarFill size="1rem" />
            <BsFillStarFill size="1rem" />
            <BsFillStarFill size="1rem" />
            <BsFillStarFill size="1rem" />
            <BsFillStarFill size="1rem" />
          </IconContext.Provider>
        </div>

        <div className="productRetail">
          <h1 className="">${furniture.retailPrice}</h1>
          <IconContext.Provider value={{ color: "lightcoral" }}>
            <BiCartAdd
              size="2rem"
              className="productButton"
              onClick={() => onProductAdd(furniture)}
            />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}
