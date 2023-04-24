import styled from "styled-components";
import { COLORS, CATEGORIES, PRICE, BRANDS, BODY } from "../constants";
import FilterDiv from "./FilterDiv";

const Filter = ({ filterObject, handleSearchParams }) => {
  return (
    <FilterSection>
      {/* Categories */}
      <FilterDiv
        title="Categories"
        listInput={CATEGORIES}
        inputName="category"
        defaultIsOpen={true}
        handleSearchParams={handleSearchParams}
        filterObjectSelected={filterObject?.category}
      />

      {/* Price */}
      <FilterDiv
        title="Price"
        listInput={PRICE}
        inputName="price"
        defaultIsOpen={true}
        handleSearchParams={handleSearchParams}
        filterObjectSelected={filterObject?.price}
      />

      {/* Brands */}
      <FilterDiv
        title="Brands"
        listInput={BRANDS}
        inputName="companyId"
        defaultIsOpen={false}
        handleSearchParams={handleSearchParams}
        filterObjectSelected={filterObject?.companyId}
      />

      {/* Body */}
      <FilterDiv
        title="Body"
        listInput={BODY}
        inputName="body"
        defaultIsOpen={false}
        handleSearchParams={handleSearchParams}
        filterObjectSelected={filterObject?.body}
      />
    </FilterSection>
  );
};

const FilterSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 220px;
  border-right: 1px solid ${COLORS.vanilla};
  padding: 0 15px;
`;

export default Filter;
