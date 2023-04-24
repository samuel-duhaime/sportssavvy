import styled from "styled-components";
import { Link } from "react-router-dom";

// Loads product image panel based on the product category type

const ProductPanel = ({ item }) => {
  return (
    <>
      {item.category === "Fitness" ? (
        <>
          <Link to={"/search?category=Fitness"}>
            <Img src="\productpanels\item-fitness01.jpg" />
          </Link>
        </>
      ) : item.category === "Medical" ? (
        <>
          <Link to={"/search?category=Medical"}>
            <Img src="\productpanels\item-medical02.jpg" />
          </Link>
        </>
      ) : item.category === "Industrial" ? (
        <>
          <Link to={"/search?category=Industrial"}>
            <Img src="\productpanels\item-industrial01.jpg" />
          </Link>
        </>
      ) : item.category === "Entertainment" ? (
        <>
          <Link to={"/search?category=Entertainment"}>
            <Img src="\productpanels\item-entertainment01.jpg" />
          </Link>
        </>
      ) : item.category === "Lifestyle" ? (
        <>
          <Link to={"/search?category=Lifestyle"}>
            <Img src="\productpanels\item-lifestyle01.jpg" />
          </Link>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const Img = styled.img`
  margin: 30px 0 60px 0;
  width: 100%;
`;

export default ProductPanel;
