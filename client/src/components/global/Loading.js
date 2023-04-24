import styled from "styled-components";
import { COLORS } from "../constants";

const Loading = () => {
  return (
    <CenterDiv>
      <div>
        <span>Please wait...</span>
      </div>
      <Spinner />
    </CenterDiv>
  );
};

const CenterDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

// Create a CSS spinner
const Spinner = styled.div`
  position: relative;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  &:before {
    content: "";
    box-sizing: border-box; // Include padding and border in element total width and height
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border-top: 2px solid ${COLORS.vanilla};
    border-right: 2px solid transparent;
    animation: spinner 0.6s linear infinite; // Infinite spinner animation
  }
`;

export default Loading;
