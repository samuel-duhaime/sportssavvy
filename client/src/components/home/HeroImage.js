import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "../constants";

// HOME PAGE IMAGE
const HeroImage = () => {
  return (
    <Wrapper>
      <ImageText>
        <H1>ELEVATE YOUR GAME</H1>
        <DivLink to="/search">
          <DivButton>
            <Span>View our 2023 collection</Span>
          </DivButton>
        </DivLink>
      </ImageText>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  background-image: url("/stockimages/panel-home09.jpg");
  background-size: cover;
  background-position: center;
  height: 50vh;
  width: 100%;
`;

const ImageText = styled.div`
  position: absolute;
  top: 70%;
  left: 25%;
  transform: translate(-50%, -50%);
`;

const H1 = styled.h1`
  color: ${COLORS.vanilla};
  font-weight: 400;
  font-style: italic;
  font-size: 3.6em;
`;

const DivLink = styled(Link)`
  text-decoration: none;
`;

const DivButton = styled.button`
  margin-top: 10px;
  background-color: ${COLORS.green};
  width: 300px;
  border-radius: 20px;
  padding: 15px;
  text-align: center;
  transition: all 1s;
  border: none;
  cursor: pointer;

  &:hover {
    scale: 1.1;
  }
`;

const Span = styled.span`
  font-size: 1.5em;
  color: black;
  text-align: center;
`;

export default HeroImage;
