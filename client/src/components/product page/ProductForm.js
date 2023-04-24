import { useState, useContext } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import Loading from "../global/Loading";

const ProductForm = ({ setError, item, fetchStatus, setFetchStatus }) => {
  //ORDER FORM INFORMATION
  const [formData, setFormData] = useState(null);
  //PRODUCT QUANTITY
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  //IMPORT USER
  const { user, handleRefetch } = useContext(CurrentUserContext);
  //REDEFINING PARAMS
  const _id = "user1";

  //HANDLECHANGE TO DISABLE MAX QUANTITY
  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/user/${_id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: item._id, quantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error.");
        }
        setFetchStatus("idle");
        handleRefetch();
        navigate(`/cart`);
      })
      .catch((error) => {
        console.log(error);
        setError(
          "An error has occured. Please refresh the page and try again."
        );
      });
  };

  return (
    <>
      {fetchStatus === "loading" ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <form onSubmit={(e) => handleSubmit(e, formData)}>
            <ProductText>
              <H2Div>
                <H2>{item.name}</H2>
              </H2Div>

              <p>Price: ${item.price}</p>
              <p>Style: {item.body_location}</p>

              <p>{item.numInStock} left in stock</p>
            </ProductText>
            <StockDiv>
              {/* Sold out conditions */}
              {item.numInStock === 0 ? (
                <>
                  <SoldOut disabled>Sold Out</SoldOut>
                </>
              ) : (
                <>
                  <span>Quantity</span>
                  <Input placeholder="1" onChange={handleChange} />
                  {/* Disables button depending on stock */}
                  <AddToCart
                    type="submit"
                    disabled={
                      quantity > item.numInStock ||
                      item.numInStock === 0 ||
                      quantity <= 0
                    }
                  >
                    {/* Add to Cart button will turn grey of quantity exceeds stock */}
                    {quantity > item.numInStock
                      ? "Exceeded stock"
                      : "Add to Cart"}
                  </AddToCart>
                </>
              )}
            </StockDiv>
          </form>
        </>
      )}
    </>
  );
};

const ProductText = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.lightcharcoal};
`;

const StockDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const Input = styled.input`
  background-color: ${COLORS.vanilla};
  text-align: center;
  font-size: 1em;
  padding: 8px;
  border-radius: 30px;
  outline: none;
  width: 80px;
  margin: 0 20px;
  border: none;
`;

const AddToCart = styled.button`
  padding: 8px;
  width: 150px;
  border-radius: 30px;
  font-size: 1em;
  margin: 0 20px;
  border: none;

  background-color: ${(props) => (props.disabled ? "#b4b4b4" : COLORS.green)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const SoldOut = styled.button`
  padding: 8px;
  width: 150px;
  border-radius: 30px;
  font-size: 1em;
  margin: 0 0px;
  border: none;
  color: red;
  background-color: ${COLORS.charcoal};
  cursor: not-allowed;
`;

const H2Div = styled.div`
  padding-bottom: 3px;
  border-bottom: 1px ${COLORS.vanilla} solid;
  margin-bottom: 40px;
  width: 300px;
`;

const H2 = styled.h2`
  color: ${COLORS.vanilla};
`;

export default ProductForm;
