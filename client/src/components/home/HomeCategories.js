import styled from "styled-components";
import { COLORS } from "../constants";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { handleScrollToTop } from "../../helpers/handleScrollToTop";

const HomeCategories = () => {
  return (
    <CategoriesWrapper>
      {/* Fitness */}
      <CategoryXSectionRight
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/stockimages/category-banner-fitness.jpg')`,
        }}
      >
        <TextDivRight
          to={"/search?category=Fitness"}
          onClick={handleScrollToTop}
        >
          <CategoryNameRight>Fitness products</CategoryNameRight>
          <DiscoverDivRight>
            Discover <ArrowIcon />
          </DiscoverDivRight>
        </TextDivRight>
      </CategoryXSectionRight>

      {/* Lifestyle */}
      <CategoryXSectionLeft
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/stockimages/category-banner-lifestyle.jpg')`,
        }}
      >
        <TextDivLeft
          to={"/search?category=Lifestyle"}
          onClick={handleScrollToTop}
        >
          <CategoryNameLeft>Lifestyle products</CategoryNameLeft>
          <DiscoverDivLeft>
            Discover <ArrowIcon />
          </DiscoverDivLeft>
        </TextDivLeft>
      </CategoryXSectionLeft>

      {/* Industrial */}
      <CategoryXSectionRight
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/stockimages/category-banner-industrial.jpg')`,
        }}
      >
        <TextDivRight
          to={"/search?category=Industrial"}
          onClick={handleScrollToTop}
        >
          <CategoryNameRight>Industrial products</CategoryNameRight>
          <DiscoverDivRight>
            Discover <ArrowIcon />
          </DiscoverDivRight>
        </TextDivRight>
      </CategoryXSectionRight>

      {/* Entertainment */}
      <CategoryXSectionLeft
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/stockimages/category-banner-entertainment.jpg')`,
        }}
      >
        <TextDivLeft
          to={"/search?category=Entertainment"}
          onClick={handleScrollToTop}
        >
          <CategoryNameLeft>Entertainment products</CategoryNameLeft>
          <DiscoverDivLeft>
            Discover <ArrowIcon />
          </DiscoverDivLeft>
        </TextDivLeft>
      </CategoryXSectionLeft>

      {/* Medical */}
      <CategoryXSectionRight
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/stockimages/category-banner-medical.jpg')`,
        }}
      >
        <TextDivRight
          to={"/search?category=Medical"}
          onClick={handleScrollToTop}
        >
          <CategoryNameRight>Medical products</CategoryNameRight>
          <DiscoverDivRight>
            Discover <ArrowIcon />
          </DiscoverDivRight>
        </TextDivRight>
      </CategoryXSectionRight>
    </CategoriesWrapper>
  );
};

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw;
`;

const CategoryXSectionRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 40vh;
  margin-top: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 0.5s;
`;

const CategoryXSectionLeft = styled.div`
  display: flex;
  flex-direction: row;
  height: 40vh;
  margin-top: 80px;
  background-size: cover;
  background-repeat: no-repeat;
`;

const TextDivRight = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40vw;
  justify-content: center;
  text-align: center;
  background-color: rgb(51, 51, 51, 0.8);
  color: ${COLORS.green};
  text-decoration: none;
  transition: all 0.5s;

  &:hover {
    background-color: rgb(51, 51, 51, 0.9);
    scale: 1.1;
    border-radius: 15px;
  }
`;

const TextDivLeft = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40vw;
  justify-content: center;
  text-align: center;
  background-color: rgb(126, 231, 135, 0.7);
  text-decoration: none;
  transition: all 0.5s;

  &:hover {
    background-color: rgb(126, 231, 135, 0.7);
    scale: 1.1;
    border-radius: 15px;
  }
`;

const CategoryNameRight = styled.h2`
  font-size: 40px;
  background-color: transparent;
`;

const CategoryNameLeft = styled.h2`
  font-size: 40px;
  background-color: transparent;
  color: ${COLORS.charcoal};
`;

const DiscoverDivRight = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin-top: 30px;
  color: ${COLORS.green};
  cursor: pointer;
`;

const DiscoverDivLeft = styled.div`
  background-color: transparent;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  color: ${COLORS.charcoal};
  cursor: pointer;
`;

const ArrowIcon = styled(IoIosArrowForward)`
  background-color: transparent;
  margin-left: 4px;
`;

export default HomeCategories;
