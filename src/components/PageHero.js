import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageHero = ({ title, product }) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>
          <Link to="/">home</Link>
          {product && <Link to="/products">/ Products</Link>}/ {title}
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #dfccfb;
  width: 100%;
  min-height: 15vh;
  display: flex;
  align-items: center;
  margin-top: 20px; /* Adjust the margin-top value to control the gap */

  color: #8789fe;
  a {
    color: #8789fe;
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: #6d70d4;
  }
`;

export default PageHero;
