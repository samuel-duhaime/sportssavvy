import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
import Filter from "./Filter";
import ItemsGrid from "./ItemsGrid";
import { useItems } from "../../hooks/useItems";
import Loading from "../global/Loading";

// Search page for items
const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // Get all the search params query
  const [filterObject, setFilterObject] = useState(null); // Get the filterObject
  const page = searchParams.get("page");
  const { items, totalNumberItems } = useItems({
    searchParamsString: searchParams.toString(),
  }); // Fetch the items with useEffect

  /* Set the filterObject when searchParams change */
  useEffect(() => {
    const category = searchParams.getAll("category");
    const price = searchParams.getAll("price");
    const body = searchParams.getAll("body");
    const companyId = searchParams.getAll("companyId");
    const page = searchParams.get("page") || 1;
    const search = searchParams.get("search");
    setFilterObject({ category, price, body, companyId, page, search });
  }, [searchParams]);

  // Change params when click
  const handleSearchParams = ({ key, value }) => {
    setSearchParams((params) => {
      const getAllParamsValue = params.getAll(key); // Get all params values
      const isParamsExist = getAllParamsValue.includes(value); // Check if params already exist

      if (isParamsExist) {
        // If paramsExist, only append the params that we need
        params.delete(key); // Delete all for the key
        getAllParamsValue.forEach((getParams) => {
          if (getParams !== value) params.append(key, getParams); // Only append if it's not the value
        });
      } else {
        params.append(key, value); // Add the params to the array
      }
      return params;
    });
  };

  // Handle previous page
  const handlePreviousPage = () => {
    setSearchParams((params) => {
      const pageNumber = page ? page : 1;
      params.set("page", Math.max(1, Number(pageNumber) - 1));
      return params;
    });
  };

  // Handle next page
  const handleNextPage = () => {
    setSearchParams((params) => {
      const pageNumber = page ? page : 1;
      params.set("page", Number(pageNumber) + 1);
      return params;
    });
  };

  // Handle sort price
  const handleSortPrice = (event) => {
    setSearchParams((params) => {
      params.set("sortPrice", event.target.value);
      return params;
    });
  };

  return items ? (
    <SearchWrapper>
      <Filter
        filterObject={filterObject}
        handleSearchParams={handleSearchParams}
      />
      <ItemsWrapper>
        {/* Remove that after testing */}
        <ResultsWrapper>
          <h1>
            Search results for
            {filterObject?.search
              ? ` ${filterObject?.search}`
              : " everything"}{" "}
            ({totalNumberItems})
          </h1>
          <Select name="sortPrice" id="cars" onChange={handleSortPrice}>
            <option value={-1}>Sort: Price high to low</option>
            <option value={1}>Sort: Price low to high</option>
          </Select>
        </ResultsWrapper>

        {totalNumberItems > 0 ? (
          <>
            <ItemsGrid items={items} />
            <Buttons>
              <Button disabled={page < 2} onClick={handlePreviousPage}>
                Previous
              </Button>
              <Button
                disabled={totalNumberItems < 24 * page}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </Buttons>
          </>
        ) : (
          <EmptyResult>
            Sorry, no items for this search... Try again.
          </EmptyResult>
        )}
      </ItemsWrapper>
    </SearchWrapper>
  ) : (
    <Loading />
  );
};

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  color: ${COLORS.vanilla};
`;

const ItemsWrapper = styled.div`
  width: 100%;
`;

const ResultsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Select = styled.select`
  min-height: 30px;
  border-radius: 30px;
  padding: 10px;
  background-color: ${COLORS.vanilla};
  border: none;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 8px;
  width: 150px;
  border-radius: 30px;
  font-size: 1em;
  border: none;

  background-color: ${(props) => (props.disabled ? "#b4b4b4" : COLORS.green)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const EmptyResult = styled.div`
  margin: 20px 0;
`;

export default Search;
