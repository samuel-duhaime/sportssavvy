import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";

const Item = ({ item }) => {
  return (
    <ItemSection to={"/product/" + item._id}>
      <ItemImage alt={item.name} src={item.imageSrc} />
      <Name>{item.name}</Name>
      <ItemPrice>${item.price}</ItemPrice>
    </ItemSection>
  );
};

/* Only show 2 lines */
const Name = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 20px; /* fallback */
  max-height: 40px; /* fallback */
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

const ItemSection = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-decoration: none;
  color: ${COLORS.vanilla};
  cursor: pointer;

  &:hover ${Name} {
    text-decoration: underline;
  }
`;

const ItemPrice = styled.div`
  font-weight: 700;
`;

const ItemImage = styled.img`
  width: 100%;
  border-radius: 15px;
  object-fit: cover; // Cover all the image
  aspect-ratio: 1 / 1; // Always a square
`;

export default Item;
