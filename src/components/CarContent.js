import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";

const CartContent = () => {
  const { cart, clearCart } = useCartContext();

  return (
    <Wrapper className="section section-center">
      <CartColumns />

      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          Continue Shopping
        </Link>
        <button
          type="button"
          className="link-btn clear-btn"
          onClick={clearCart}
        >
          Clear Shopping Cart
        </button>
      </div>
      <CartTotals />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }

  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: #8789fe;
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out; /* Add transition effect */
  }

  .clear-btn {
    background: #a5a7ff;
    transition: background-color 0.3s ease-in-out; /* Add transition effect */
  }

  /* Add hover styles */
  .link-btn:hover {
    background: #6b6cfc;
  }

  .clear-btn:hover {
    background: #8486ff;
  }
`;

export default CartContent;
