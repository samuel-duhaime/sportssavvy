import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { COLORS } from "../constants";
import { CurrentUserContext } from "../CurrentUserContext";

const PayModal = ({ closeModal }) => {
  const { user, handleRefetch } = useContext(CurrentUserContext);

  const [formData, setFormData] = useState({
    userId: user?._id,
    email: "",
    cardNumber: "1234567890123456",
    cardExpiration: "",
    cvc: "",
    country: "",
    zip: "",
    address: "",
  });
  const [cardNumberFlag, setCardNumberFlag] = useState(false);
  const [cvcNumberFlag, setCvcNumberFlag] = useState(false);

  const navigate = useNavigate();

  // collect input info;
  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  // check card number
  const checkCardNumber = () => {
    if (formData.cardNumber && formData.cardNumber.length !== 16) {
      setCardNumberFlag(true);
    } else {
      setCardNumberFlag(false);
    }
  };

  // check cvc number
  const checkCvcNumber = () => {
    if (formData.cvc && formData.cvc.length !== 3) {
      setCvcNumberFlag(true);
    } else {
      setCvcNumberFlag(false);
    }
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/checkout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.checkoutId) {
          handleRefetch(); // Refetch user
          navigate(`/confirmation/${data.checkoutId}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <PayModalWrapper>
      <CloseIcon onClick={closeModal}>
        <CgClose />
      </CloseIcon>
      <Form onSubmit={handleSubmit}>
        <EmailDiv>
          <EmailLabel htmlFor="email">Email</EmailLabel>
          <Email
            type="text"
            id="email"
            value={formData.email}
            required
            onChange={(e) => handleChange(e.target.id, e.target.value)}
          />
        </EmailDiv>
        <div>
          <CardLabel htmlFor="cardNumber">Card Information</CardLabel>
          <p>
            <CardNumber
              type="text"
              id="cardNumber"
              required
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              value={formData.cardNumber}
              onBlur={checkCardNumber}
            />
          </p>
          {cardNumberFlag && <p>Please enter right card number!</p>}
          <CardSubInfo>
            <CardInfo
              type="text"
              id="cardExpiration"
              value={formData.cardExpiration}
              required
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              placeholder={"MM/YY"}
            />

            <CardInfo
              type="text"
              id="cvc"
              value={formData.cvc}
              required
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              onBlur={checkCvcNumber}
              placeholder={"CVC"}
            />
          </CardSubInfo>
          {cvcNumberFlag && <p>Please enter right CVC number</p>}
        </div>

        <CountryDiv>
          <CountryLabel htmlFor="country">Country</CountryLabel>
          <p>
            <CountryInut
              type="text"
              id="country"
              value={formData.country}
              required
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              placeholder={"Canada"}
            />
          </p>
          <p>
            <CountryInut
              type="text"
              id="zip"
              value={formData.zip}
              required
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              placeholder={"ZIP"}
            />
          </p>
          <p>
            <CountryInut
              type="text"
              id="address"
              value={formData.address}
              required
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              placeholder={"Address"}
            />
          </p>
        </CountryDiv>

        <Btn type="submit">Buy Now</Btn>
      </Form>
    </PayModalWrapper>
  );
};

const PayModalWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  background-color: ${COLORS.lightcharcoal};
  z-index: 10;
`;

const CloseIcon = styled.div`
  float: right;
  font-size: 20px;
  color: ${COLORS.vanilla};
  cursor: pointer;

  &:hover {
    scale: 1.2;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Email = styled.input`
  border-radius: 15px;
  width: 300px;
  height: 40px;
  background: rgba(255, 245, 224, 1);
  padding: 2px 8px;
  border: none;
`;

const EmailLabel = styled.label`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #fff5e0;
  margin-bottom: 5%;
`;

const EmailDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
`;

const CardLabel = styled.label`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #fff5e0;
  margin-top: 10%;
  margin-bottom: 5%;
`;

const CardNumber = styled.input`
  width: 300px;
  height: 40px;
  background: rgba(255, 245, 224, 1);
  border-radius: 15px;
  padding: 2px 8px;
  border: none;
`;

const CardSubInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2%;
`;

const CardInfo = styled.input`
  width: 138px;
  height: 40px;
  background: #fff5e0;
  border-radius: 15px;
  padding: 2px 8px;
  border: none;
`;

const CountryLabel = styled.label`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #fff5e0;
  margin-top: 10%;
  margin-bottom: 5%;
`;

const CountryInut = styled.input`
  width: 300px;
  height: 40px;
  background: #fff5e0;
  border-radius: 15px;
  margin-bottom: 3%;
  padding: 2px 8px;
  border: none;
`;
const CountryDiv = styled.div`
  margin-bottom: 10%;
  margin-top: 5%;
`;

const Btn = styled.button`
  width: 320px;
  height: 40px;
  border-radius: 15px;
  background: #7ee787;
  padding: 2px 8px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export default PayModal;
