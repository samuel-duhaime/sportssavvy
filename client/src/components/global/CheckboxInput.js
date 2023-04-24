import styled from "styled-components";
import { COLORS } from "../constants";

const CheckboxInput = ({
  name,
  query,
  inputName,
  handleSearchParams,
  checked,
}) => {
  return (
    <CheckboxWrapper>
      <Checkbox
        type="checkbox"
        id={name}
        name={inputName}
        value={query}
        checked={checked}
        onClick={() => handleSearchParams({ key: inputName, value: query })}
      />
      <label htmlFor={name}>{name}</label>
    </CheckboxWrapper>
  );
};

const CheckboxWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Checkbox = styled.input`
  accent-color: ${COLORS.green}; // Color of the checkbox
  cursor: pointer;
`;

export default CheckboxInput;
