import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { COLORS } from "../constants";
import Footer from "../header and footer/Footer";
import { CurrentUserContext } from "../CurrentUserContext";
import Loading from "../global/Loading";

const Confirmation = () => {
  const { checkoutId } = useParams();
  const [checkoutData, setCheckoutData] = useState(null);
  const { user } = useContext(CurrentUserContext);
  const [itemsData, setItemsData] = useState([]);

  // GET : Checkout Data
  useEffect(() => {
    if (checkoutId) {
      fetch(`/checkout/${checkoutId}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 400 || response.status === 500) {
            throw new Error(response.message);
          } else {
            setCheckoutData(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [checkoutId]);

  // GET : Items Data with checkoutData.purchasedItemIds
  useEffect(() => {
    if (checkoutData?.purchasedItemIds) {
      Promise.all(
        checkoutData?.purchasedItemIds?.map(async (item) => {
          const res = await fetch(`/item/${item?._id}`);
          return await res.json();
        })
      ).then((responses) => {
        setItemsData(responses);
      });
    }
  }, [checkoutData]);

  // Calculate Subtotal
  let subTotal = checkoutData
    ? checkoutData?.purchasedItemIds.reduce((acc, itemObject) => {
        return acc + itemObject?.price * itemObject?.quantity;
      }, 0)
    : 0;

  // Calculate total Amount
  const taxes = Number(subTotal * 0.15);
  const totalAmount = Number(subTotal * 1.15);

  return (
    <Wrapper>
      <Header>Thank You for Your Order !</Header>
      <OrderContainer>
        <div>
          {itemsData ? (
            itemsData?.map((purchasedItem) => {
              return (
                <ItemsWrapper key={purchasedItem?._id}>
                  <ItemImage src={purchasedItem?.data?.imageSrc} />
                  <ItemDescriptions>
                    <ItemName>{purchasedItem?.data?.name}</ItemName>
                    <Line></Line>
                    <ItemPrice>
                      Price: ${purchasedItem?.data?.price?.toFixed(2)}
                    </ItemPrice>
                    <Quantity>
                      Quantity:
                      {
                        checkoutData.purchasedItemIds.find((itemObject) => {
                          return itemObject?.itemId === purchasedItem?._id;
                        })?.quantity
                      }
                    </Quantity>
                  </ItemDescriptions>
                </ItemsWrapper>
              );
            })
          ) : (
            <Loading />
          )}
        </div>

        <div>
          <Total>Subtotal : ${subTotal?.toFixed(2)}</Total>
          <Total>Taxes : ${taxes?.toFixed(2)}</Total>
          <Total>Total amount : ${totalAmount?.toFixed(2)}</Total>
        </div>

        <Line></Line>
        <ShippingHeader>Shipping Address :</ShippingHeader>
        <Name>{user?.name}</Name>
        <Email>{checkoutData?.email}</Email>
        <Address>{checkoutData?.address}</Address>
        <Country>{checkoutData?.country}</Country>
        <Zip>{checkoutData?.zip}</Zip>
      </OrderContainer>
<OrderId>Your Order Id : {checkoutData?._id}</OrderId>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  max-width: 1200px;
  `;

const Header = styled.h1`
  margin-bottom: 1em;
  text-align: center;
  margin-top: 20px;
  `;

const OrderContainer = styled.div`
  background-color: ${COLORS.lightcharcoal};
  border-radius: 15px;
  margin: auto;
  /* width: 70%; */
  padding: 50px;
  color: ${COLORS.vanilla};
`;

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2em;
`;
const ItemImage = styled.img`
  width: 100px;
  border-radius: 5px;
  margin-right: 2em;
`;

const ItemDescriptions = styled.div`
  max-width: 25vw;
`;

const ItemName = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const ItemPrice = styled.p`
  font-size: 12px;
`;

const Quantity = styled(ItemPrice)``;

const Line = styled.hr`
  border: ${COLORS.vanilla} 0.5px solid;
  margin-top: 1em;
`;
const Total = styled(ItemName)``;

const ShippingHeader = styled(ItemName)``;

const Name = styled.p`
  line-height: 0.5em;
`;

const Email = styled(Name)``;

const Address = styled(Name)``;

const Country = styled(Name)``;

const Zip = styled(Name)``;

const OrderId = styled.p`
  font-weight: bold;
  text-align: center;
  font-size: 1.5em;
  color: ${COLORS.green};
  margin-top: 50px;
  margin-bottom: 20px;
`;

export default Confirmation;
