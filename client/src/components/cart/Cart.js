import { useContext, useEffect, useState } from "react";
import SingleItem from "./SingleItem";
import styled from "styled-components";
import PayModal from "./PayModal";
import { CurrentUserContext } from "../CurrentUserContext";
import Loading from "../global/Loading";

const Cart = () => {
  const { user, cartItemsSubtotal, status } = useContext(CurrentUserContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taxes, setTaxes] = useState(0); // Summary taxes
  const [total, setTotal] = useState(0);

  // Open the modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Calculate the taxes and total price
  useEffect(() => {
    const newTaxes = Math.round(cartItemsSubtotal * 0.15 * 100) / 100; // Set tax=15%
    setTaxes(newTaxes.toFixed(2));
    setTotal((newTaxes + cartItemsSubtotal).toFixed(2));
  }, [cartItemsSubtotal]);

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        user?.cartItems && (
          <>
            <div style={{ color: "white" }}>{modalIsOpen && modalIsOpen}</div>
            <Wrapper>
              <LeftDiv>
                <H1>Your Shopping Cart</H1>
                {user?.cartItems.map((item) => {
                  return (
                    <SingleItem
                      key={item._id}
                      itemId={item._id}
                      itemQuantity={item.quantity}
                    />
                  );
                })}
              </LeftDiv>
              <div>
                <SummaryH2>Summary</SummaryH2>
                <Subtotal>
                  <span>Subtotal</span>
                  <Span>${cartItemsSubtotal}</Span>
                </Subtotal>
                <Delivery>
                  <span>Delivery fees</span>
                  <span>Free</span>
                </Delivery>
                <Taxes>
                  <span>Taxes</span>
                  <span>${taxes}</span>
                </Taxes>
                <hr />
                <Total>
                  <span>Total</span>
                  <span>${total}</span>
                </Total>
                <CheckoutBtn type="button" onClick={openModal}>
                  Checkout
                </CheckoutBtn>
              </div>
            </Wrapper>
            {modalIsOpen && <PayModal closeModal={closeModal} />}
          </>
        )
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Span = styled.span`
  position: relative;
  right: 0px;
`;

const SummaryH2 = styled.h2`
  font-weight: 400;
  font-size: 30px;
  margin-bottom: 30px;
  text-align: left;
`;

const Delivery = styled.p`
  font-family: "Alice";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 8%;
  display: flex;
  justify-content: space-between;
`;

const Taxes = styled.p`
  font-family: "Alice";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 8%;
  display: flex;
  justify-content: space-between;
`;

const Total = styled.p`
  font-family: "Alice";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  margin-top: 8%;
  margin-bottom: 10%;
  display: flex;
  justify-content: space-between;
`;

const Subtotal = styled.p`
  font-family: "Alice";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 8%;
  display: flex;
  justify-content: space-between;
`;

const CheckoutBtn = styled.button`
  height: 34px;
  width: 280px;
  border-radius: 15px;
  background: #7ee787;
  border: none;
  cursor: pointer;
`;

const H1 = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  margin-bottom: 30px;
`;

export default Cart;
