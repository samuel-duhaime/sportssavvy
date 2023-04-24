import { COLORS } from "../constants";
import styled from "styled-components";
import {
  SiFacebook,
  SiInstagram,
  SiTwitter,
  SiPinterest,
  SiTiktok,
  SiSnapchat,
} from "react-icons/si";
import { NavLink } from "react-router-dom";
import { handleScrollToTop } from "../../helpers/handleScrollToTop";

const Footer = () => {
  return (
    
    <Master>
      <Wrapper>
        {/* Fake Address */}
        <AddressDiv>
          <h2>SportsSavvy</h2>
          <p>215a rue Murray</p>
          <p>Montreal, QC</p>
          <p>H3C 2C9</p>
          <p>Canada</p>
        </AddressDiv>
        {/* Fake Social Media Channels */}
        <SocialDiv>
          <h3>FOLLOW US</h3>
          <SocialRow>
            <SiFacebook />
            <SiInstagram />
            <SiTwitter />
            <SiPinterest />
            <SiTiktok />
            <SiSnapchat />
          </SocialRow>
        </SocialDiv>
        {/* Links */}
        <MenuDiv>
          <h3>SHOP</h3>
          <CatLink to="/search?category=Fitness" onClick={handleScrollToTop}>
            <PLink>Fitness</PLink>
          </CatLink>
          <CatLink to="/search?category=Lifestyle" onClick={handleScrollToTop}>
            <PLink>Lifestyle</PLink>
          </CatLink>
          <CatLink to="/search?category=Industrial" onClick={handleScrollToTop}>
            <PLink>Industrial</PLink>
          </CatLink>
          <CatLink
            to="/search?category=Entertainment"
            onClick={handleScrollToTop}
          >
            <PLink>Entertainment</PLink>
          </CatLink>
          <CatLink to="/search?category=Medical" onClick={handleScrollToTop}>
            <PLink>Medical</PLink>
          </CatLink>
        </MenuDiv>
      </Wrapper>
      <SpanDiv>
        <span>© 2023 SportsSavvy, Inc. All Rights Reserved</span>
      </SpanDiv>
      </Master>
    
  );
};

const Master = styled.div`
margin-top: auto;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  border-bottom: 100% ${COLORS.green} solid;
  margin-top: 50px;
  margin-left: 200px;
  margin-right: 200px;
  padding-bottom: 20px;
  border-bottom: 2px ${COLORS.green} solid;
`;

const AddressDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SocialDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialRow = styled.div`
  display: flex;
  justify-content: space-between;

  gap: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
  color: ${COLORS.vanilla};
  font-size: 2em;
  & > *:hover {
    color: ${COLORS.green};
  }
`;

const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const CatLink = styled(NavLink)`
  text-decoration: none;
`;

const PLink = styled.p`
  color: ${COLORS.vanilla};

  &:hover {
    color: ${COLORS.green};
  }
`;

const SpanDiv = styled.div`
  margin-top: 20px;
  margin-left: 200px;
  margin-bottom: 50px;
`;

export default Footer;
