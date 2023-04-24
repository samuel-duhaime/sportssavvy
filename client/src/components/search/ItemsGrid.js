import styled from "styled-components";
import Item from "../global/Item";
import Loading from "../global/Loading";

// Items inside a grid
const ItemsGrid = ({ items }) => {
  return (
    <ItemsSection>
      {items ? (
        items?.map((item) => {
          return <Item item={item} key={item._id} />;
        })
      ) : (
        <Loading />
      )}
    </ItemsSection>
  );
};

const ItemsSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 40px;
  margin: 20px 0;
  width: 100%;
`;

export default ItemsGrid;
