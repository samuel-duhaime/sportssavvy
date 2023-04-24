import { useState, useContext } from "react";
import { COLORS } from "../constants";
import styled, { keyframes } from "styled-components";
import { FiMenu, FiUser, FiUserCheck } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import { RiShoppingCart2Line, RiShoppingCart2Fill } from "react-icons/ri";
import SearchBar from "./SearchBar";

// NAVIGATION HEADER TO APPEAR AT THE TOP OF THE PAGE
const Header = () => {
  //HamburgerMenu state
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  //For visual expansion
  const [isExpanded, setIsExpanded] = useState(false);
  //Imported user info
  const { user } = useContext(CurrentUserContext);
  //Number in the cart icon
  let cartIconNum = 0;

  // GET : Number of items in cart
  if (user) {
    user?.cartItems.forEach((item) => {
      cartIconNum += Number(item.quantity);
    });
  }

  return (
    <>
      <TopWrapperMenu>
        {/* Hamburger */}
        {isHamburgerMenuOpen ? (
          <FiIconDiv>
            <CgClose
              onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)}
            />
          </FiIconDiv>
        ) : (
          <FiIconDiv>
            <FiMenu
              onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)}
            />
          </FiIconDiv>
        )}

        {/* Title menu */}

        <TitleMenu isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
          <H1>
            <HomeLink to={"/"}>
              <img
                src={
                  process.env.PUBLIC_URL + "/favicon/android-chrome-192x192.png"
                }
                width={40}
                alt="Logo SportsSavvy"
              />
              SportsSavvy
            </HomeLink>
          </H1>
        </TitleMenu>

        {/* Icons */}
        <HeaderIcons>
          <SearchBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          <CatLink to={"/cart"}>
            <FiIconDiv>
              {cartIconNum > 0 ? (
                <>
                  <RiShoppingCart2Fill />
                  <NumItems>{cartIconNum}</NumItems>
                </>
              ) : (
                <RiShoppingCart2Line />
              )}
            </FiIconDiv>
          </CatLink>
          <CatLink to={"#"}>
            <FiIconDiv>{user ? <FiUserCheck /> : <FiUser />}</FiIconDiv>
          </CatLink>
        </HeaderIcons>
      </TopWrapperMenu>

      <LeftSideMenu isOpen={isHamburgerMenuOpen}>
        <Category>
          <CatLink
            to={"/search?category=Fitness"}
            onClick={() => setIsHamburgerMenuOpen(false)}
          >
            Fitness
          </CatLink>
        </Category>
        <Category>
          <CatLink
            to={"/search?category=Lifestyle"}
            onClick={() => setIsHamburgerMenuOpen(false)}
          >
            Lifestyle
          </CatLink>
        </Category>
        <Category>
          <CatLink
            to={"/search?category=Industrial"}
            onClick={() => setIsHamburgerMenuOpen(false)}
          >
            Industrial
          </CatLink>
        </Category>
        <Category>
          <CatLink
            to={"/search?category=Entertainment"}
            onClick={() => setIsHamburgerMenuOpen(false)}
          >
            Entertainment
          </CatLink>
        </Category>
        <Category>
          <CatLink
            to={"/search?category=Medical"}
            onClick={() => setIsHamburgerMenuOpen(false)}
          >
            Medical
          </CatLink>
        </Category>
      </LeftSideMenu>
    </>
  );
};

const TopWrapperMenu = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 80px;
  background-color: ${COLORS.charcoal};
  z-index: 1;
`;

const TitleMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 10px;
  opacity: ${({ isExpanded }) => (!isExpanded ? "1" : "0")};
  transition: opacity 1s ease-in-out;
  margin-left: 180px;
`;

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: ${COLORS.green};

  &:hover {
    color: ${COLORS.vanilla};
  }
`;

const CatLink = styled(Link)`
  text-decoration: none;
  color: ${COLORS.vanilla};

  &:hover {
    color: ${COLORS.green};
  }
`;

const H1 = styled.h1`
  color: ${COLORS.green};

  &:hover {
    color: ${COLORS.vanilla};
  }
`;

const HeaderIcons = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;
`;

const FiIconDiv = styled.div`
  display: flex;
  align-items: center;
  color: ${COLORS.vanilla};
  font-size: 2em;
  cursor: pointer;

  &:hover {
    color: ${COLORS.green};
  }
`;

const NumItems = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.charcoal};
  position: relative;
  width: 10px;
  top: -10px;
  left: -10px;
  padding: 5px;
  border-radius: 50%;
  font-size: 10px;
  font-weight: bold;
  background-color: skyblue;
`;

// Create an animation for the hamburger
const hamburgerAnimation = keyframes`
  from {
      width: 0;
      opacity: 0;
    }

    to {
      width: auto;
      opacity: 1;
    }

`;

const LeftSideMenu = styled.nav`
  ${(props) => (props.isOpen ? "display: flex" : "display: none")};
  position: fixed;
  top: 80px;
  flex-direction: column;
  gap: 20px;
  padding: 20px 30px;
  overflow: hidden;
  height: calc(100vh - 80px);
  background-color: ${COLORS.charcoal};
  animation: ${hamburgerAnimation} 0.5s;
  z-index: 1;
`;

const Category = styled.div`
  font-size: 1.33em;
  color: ${COLORS.vanilla};

  &:hover {
    color: ${COLORS.green};
  }
`;

export default Header;
