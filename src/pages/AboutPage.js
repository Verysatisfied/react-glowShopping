import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/aboutPage.jpg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="Cosmetics products" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime esse
            assumenda eius saepe, magnam ad ut voluptatum harum at eaque quasi
            tenetur labore voluptatem sunt doloribus unde impedit! Et,
            perspiciatis? Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Blanditiis, quam perspiciatis quo sed sapiente inventore.
            Suscipit nam aut sequi temporibus, vitae dolorem impedit sunt
            repellat ut, assumenda voluptatum ea reiciendis?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor odio
            libero officia! Laudantium neque optio perspiciatis eaque ipsum
            quasi blanditiis corporis molestiae, id voluptatibus illum? Mollitia
            dignissimos ullam aliquid suscipit.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
