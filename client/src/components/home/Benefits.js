import { COLORS } from "../constants";
import styled from "styled-components";
import { CiClock1 } from "react-icons/ci";
import { BsPatchCheck, BsClipboard2Heart, BsStar } from "react-icons/bs";

const Benefits = () => {
  return (
    <>
      <Header>
        <h2>OUR BENEFITS</h2>
      </Header>

      <Wrapper>
        <IndivBenefit>
          <IconDiv>
            <CiClock1 />
          </IconDiv>
          <TextDiv>Free and Fast Delivery</TextDiv>
        </IndivBenefit>

        <IndivBenefit>
          <IconDiv>
            <BsPatchCheck />
          </IconDiv>
          <TextDiv>Quality Guaranteed</TextDiv>
        </IndivBenefit>

        <IndivBenefit>
          <IconDiv>
            <BsClipboard2Heart />
          </IconDiv>
          <TextDiv>Manufacturer Warranty</TextDiv>
        </IndivBenefit>

        <IndivBenefit>
          <IconDiv>
            <BsStar />
          </IconDiv>
          <TextDiv>Artisan Designs</TextDiv>
        </IndivBenefit>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 200px;
  margin-right: 200px;
  align-items: center;
`;

const Header = styled.div`
  align-items: center;
  text-align: center;
  margin-top: 100px;
`;

const IndivBenefit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const IconDiv = styled.div`
  font-size: 6em;
  color: ${COLORS.vanilla};
`;

const TextDiv = styled.div`
  color: ${COLORS.green};
`;

export default Benefits;
