import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import { COLORS } from "../constants";
import Loading from "../global/Loading";

const SingleItem = ({ itemId, itemQuantity }) => {
  const { user, handleRefetch } = useContext(CurrentUserContext);
  const [item, setItem] = useState(null);

  // Fetch the item
  useEffect(() => {
    fetch(`/item/${itemId}`)
      .then((res) => res.json())
      .then((json) => {
        const { data } = json;
        setItem(data);
      })
      .catch((err) => console.log(err));
  }, [itemId]);

  // Click plus, the quantity will increase and send this new quantity to the database
  const handlePlus = () => {
    if (itemQuantity < item?.numInStock) {
      fetch(`/user/${user?._id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ itemId: item._id, quantity: itemQuantity + 1 }),
      })
        .then((res) => res.json())
        .then(() => handleRefetch())
        .catch((err) => console.log(err));
    }
  };

  // Click minus, the quantity will increase and send this new quantity to the database
  const handleMinus = () => {
    if (itemQuantity > 1) {
      fetch(`/user/${user?._id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ itemId: item._id, quantity: itemQuantity - 1 }),
      })
        .then((res) => res.json())
        .then(() => handleRefetch())
        .catch((err) => console.log(err));
    }
  };

  // Delete item, set the quantity to 0;
  const handleDelete = () => {
    fetch(`/user/${user?._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ itemId: item._id, quantity: 0 }),
    })
      .then((res) => res.json())
      .then(() => handleRefetch())
      .catch((err) => console.log(err));
  };

  return item ? (
    <ItemWrapper>
      <ItemImage src={item?.imageSrc} />
      <ItemDetail>
        {/* Item name and price*/}
        <ItemNamePrice>
          <div>{item?.name}</div>
          <div>${item?.price}</div>
        </ItemNamePrice>

        {/* item quantity */}
        <QuantityDiv>
          <label>Quantity</label>
          <ActionButton disabled={itemQuantity <= 1} onClick={handleMinus}>
            <AiOutlineMinusCircle />
          </ActionButton>
          <QuantityValue>{itemQuantity}</QuantityValue>
          <ActionButton
            disabled={itemQuantity >= item?.numInStock}
            onClick={handlePlus}
          >
            <AiOutlinePlusCircle />
          </ActionButton>
        </QuantityDiv>

        {/* Delete icon */}
        <ActionButton onClick={handleDelete}>
          <RiDeleteBin6Line style={{ marginLeft: "-20px" }} />
        </ActionButton>
      </ItemDetail>
    </ItemWrapper>
  ) : (
    <Loading />
  );
};

const ItemWrapper = styled.section`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 800px;
  border-bottom: 1px solid ${COLORS.vanilla};
`;

const ItemImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 15px;
  object-fit: cover; // Cover all the image
`;

const ItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  padding: 10px 0;
  width: 100%;
`;

const ItemNamePrice = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  color: ${COLORS.vanilla};
`;

const QuantityDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${COLORS.vanilla};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-color: transparent;
  width: 40px;
  border: none;
  font-size: 24px;
  ${(props) =>
    props.disabled
      ? `color: ${COLORS.lightcharcoal};`
      : `color: ${COLORS.vanilla};`}
  ${(props) => (props.disabled ? "cursor: not-allowed;" : "cursor: pointer;")}
`;

const QuantityValue = styled.div`
  background-color: white;
  height: 30px;
  line-height: 30px;
  width: 108px;
  border-radius: 15px;
  /* position: relative; */
  bottom: 50%;
  color: black;
  text-align: center;
`;
export default SingleItem;
