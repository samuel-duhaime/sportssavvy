import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { COLORS } from "../constants";
import { useItems } from "../../hooks/useItems";
import { Link, useNavigate } from "react-router-dom";

// SEARCH BAR FUNCTIONALITY
const SearchBar = ({ isExpanded, setIsExpanded }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(""); //Input text on search bar
  // Retrieving items data from hook
  const { items } = useItems({
    searchParamsString: value && "limit=5&search=" + value,
  });
  //Focus for Input
  const inputRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  //Navigation when pressing Enter on search bar
  const handleSelect = () => {
    navigate(`/search?search=${value}`);
  };

  //Filtering of search terms
  const matchedSearch = items
    ? items.filter((suggestion) => {
        return suggestion.name.toLowerCase().includes(value.toLowerCase());
      })
    : [];

  //Toggling expansion
  const handleClick = () => {
    setIsExpanded(true);
  };

  return (
    <Wrapper>
      {/* Expansion of search bar */}
      <InputWrapper isExpanded={isExpanded}>
        <Input
          placeholder="Search"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              handleSelect(ev.target.value);
              setValue("");
            }
          }}
          onBlur={() => {
            setIsExpanded(false);
            setTimeout(() => {
              setValue("");
            }, 400);
          }}
          ref={inputRef}
        />
        {/* Conditions for search query autocomplete */}
        {value.length >= 3 && matchedSearch.length > 0 && (
          <Div>
            <ul>
              {matchedSearch.map((suggestion) => (
                <ListLink
                  to={`/product/${suggestion._id}`}
                  key={suggestion._id}
                >
                  <Li>{suggestion.name}</Li>
                </ListLink>
              ))}
            </ul>
          </Div>
        )}
      </InputWrapper>
      {/* Styling for search results */}
      <SearchIconWrapper>
        <FiSearchStyled onClick={handleClick} />
      </SearchIconWrapper>
    </Wrapper>
  );
};

const Div = styled.div`
  background-color: ${COLORS.lightcharcoal};
  border-radius: 15px;
  color: ${COLORS.vanilla};
  position: absolute;
  top: 62px;
  z-index: 4;

  ul {
    list-style-type: none;
    padding: 0;
  }
`;

const Li = styled.li`
  padding: 10px;
  &:hover {
    color: ${COLORS.green};
  }
`;

const ListLink = styled(Link)`
  text-decoration: none;
  color: ${COLORS.vanilla};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
`;

const InputWrapper = styled.div`
  width: ${({ isExpanded }) => (isExpanded ? "400px" : "50px")};
  transition: opacity 1s ease-in-out, width 1s ease-in-out;
  opacity: ${({ isExpanded }) => (isExpanded ? "1" : "0")};
`;

const Input = styled.input`
  width: 80%;
  height: 40px;
  border: none;
  border-radius: 20px;
  padding: 0 16px;
  font-size: 1rem;
  background-color: ${COLORS.lightGray};
  color: ${COLORS.gray};
  transform: translateY(-40%);
  margin-top: 30px;
`;

const FiSearchStyled = styled(FiSearch)`
  color: ${COLORS.vanilla};
  font-size: 2em;
  margin-top: 6px;
  &:hover {
    color: ${COLORS.green};
  }
`;

const SearchIconWrapper = styled.div`
  cursor: pointer;
`;

export default SearchBar;
