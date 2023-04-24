// import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./home/Home";
import Header from "./header and footer/Header";
import Footer from "./header and footer/Footer";
import Product from "./product page/Product";
import Search from "./search/Search";
import Cart from "./cart/Cart";
import Confirmation from "./confirmation/Confirmation";
import GlobalStyles from "./GlobalStyles";

function App() {
  // const [bacon, setBacon] = useState(null);

  // useEffect(() => {
  //   fetch("/bacon")
  //     .then((res) => res.json())
  //     .then((data) => setBacon(data));
  // }, []);

  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Wrapper>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:itemId" element={<Product />} />
              <Route path="/search" element={<Search />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/confirmation/:checkoutId"
                element={<Confirmation />}
              />
            </Routes>
          </div>
          <Footer />
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  
`;

export default App;
