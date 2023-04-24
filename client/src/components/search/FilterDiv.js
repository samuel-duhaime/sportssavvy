import { useState } from "react";
import styled from "styled-components";
import CheckboxInput from "../global/CheckboxInput";
import { FiPlus, FiMinus } from "react-icons/fi";

const FilterDiv = ({
  title,
  listInput,
  inputName,
  defaultIsOpen,
  filterObjectSelected,
  handleSearchParams,
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen); // Check if Inputs div is open

  return (
    <FilterDivWrapper>
      <TitleWrapper onClick={() => setIsOpen(!isOpen)}>
        <div>
          {/* Get the number of filter selected */}
          {title}{" "}
          {filterObjectSelected?.length > 0 &&
            `(${filterObjectSelected?.length})`}
        </div>
        <div>{isOpen ? <FiMinus /> : <FiPlus />}</div>
      </TitleWrapper>
      <Inputs isOpen={isOpen}>
        {listInput?.map((input) => {
          return (
            <CheckboxInput
              key={input.name}
              name={input.name}
              query={input.query}
              inputName={inputName}
              handleSearchParams={handleSearchParams}
              checked={filterObjectSelected?.includes(input.query)}
            />
          );
        })}
      </Inputs>
    </FilterDivWrapper>
  );
};

const FilterDivWrapper = styled.div`
  border-bottom: 1px solid white;
  padding: 0 0 10px 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
`;

const Inputs = styled.div`
  ${({ isOpen }) => (isOpen ? "display: flex;" : "display: none;")};
  flex-direction: column;
  gap: 10px;
  margin: 15px 0;
`;

export default FilterDiv;
