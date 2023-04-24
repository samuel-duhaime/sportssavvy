import styled from "styled-components";
import { COLORS } from "../constants";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductPanel from "./ProductPanel";
import ProductForm from "./ProductForm";
import Loading from "../global/Loading";

const Product = () => {
  //URL params
  const { itemId } = useParams();
  //Product data state
  const [item, setItem] = useState(null);
  //Page status
  const [fetchStatus, setFetchStatus] = useState("loading");
  //Error message
  const [error, setError] = useState(null);

  // Fetch item information

  useEffect(() => {
    fetch(`/item/${itemId}`)
      .then((res) => res.json())
      .then((json) => {
        const { status, message, data } = json;

        if (status === 400 || status === 500) {
          throw new Error("Error.");
        }
        setItem(data);
        setFetchStatus("idle");
      })
      .catch((error) => {
        console.log(error);
        setError(
          "An error has occured. Please refresh the page and try again."
        );
      });
  }, [itemId]);

  return (
    <>
      {fetchStatus === "loading" ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <ProductPanel key={item._id} item={item} />
          <Wrapper>
            <LightCharcoal>
              <ProductWrapper>
                <ImgDiv>
                  <Img src={item.imageSrc} />
                </ImgDiv>
                <ProductDetails>
                  {/* Product details */}
                  <ProductForm
                    key={item._id}
                    setError={setError}
                    item={item}
                    fetchStatus={fetchStatus}
                    setFetchStatus={setFetchStatus}
                  />
                </ProductDetails>
              </ProductWrapper>
            </LightCharcoal>

            {/* Back button */}
            <BackWrapper>
              <HomeLink to="#" onClick={() => window.history.back()}>
                <BackSpan>← Back</BackSpan>
              </HomeLink>
            </BackWrapper>
          </Wrapper>
        </>
      )}
    </>
  );
};

const LightCharcoal = styled.div`
  background-color: ${COLORS.lightcharcoal};

  margin: auto;
  padding: 50px;
  border-radius: 15px;
  width: 70%;
`;

const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ImgDiv = styled.div``;

const Img = styled.img`
  display: flex;
  border-radius: 15px;
  height: 100%;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackWrapper = styled.div`
  margin: 20px 0 20px 15%;
`;

const BackSpan = styled.span`
  color: ${COLORS.green};
  font-size: 2em;
`;

const HomeLink = styled(Link)`
  text-decoration: none;

  &:visited {
    color: ${COLORS.green};
  }
`;

export default Product;
