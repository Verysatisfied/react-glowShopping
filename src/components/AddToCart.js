import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { id, stock } = product;

  const [amount, setAmount] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      return tempAmount;
    });
  };

  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  const handleAddToCart = () => {
    addToCart(id, amount, product);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <Wrapper>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />

        <button className="btn" onClick={handleAddToCart}>
          add to cart
        </button>
        <Link to="/cart" className="btn">
          view cart
        </Link>
      </div>
      {showNotification && (
        <div className="notification">
          <p>Added to cart!</p>
          <Link to="/cart">View Cart</Link>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
    margin-right: 3rem;
  }

  /* Styles for the notification */
  .notification {
    position: fixed;
    top: 50px; /* Adjust the top position as needed */
    right: 20px; /* Adjust the right position as needed */
    background-color: #d0bfff; /* Change the background color as desired */
    color: #fff;
    padding: 10px; /* Adjust padding as needed */
    max-width: 200px; /* Adjust the maximum width as needed */
    border-radius: 5px; /* Add border-radius for rounded corners */
  }

  .notification p {
    margin-bottom: 5px; /* Adjust margin as needed */
  }

  .notification a {
    color: #fff;
    text-decoration: underline;
  }
`;

export default AddToCart;
