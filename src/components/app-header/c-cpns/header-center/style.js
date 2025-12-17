import styled from "styled-components";

export const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;

  .keyword {
    width: 320px;
    border-radius: 999px;
  }

  .search-btn {
    border-radius: 999px;
    background: ${(props) => props.theme.color.primaryColor};
    border-color: ${(props) => props.theme.color.primaryColor};
    color: #fff;
    &:hover,
    &:focus-visible {
      background: ${(props) => (props.theme.mode === "dark" ? "#ff4d6d" : "#e31c5f")};
      border-color: ${(props) => (props.theme.mode === "dark" ? "#ff4d6d" : "#e31c5f")};
      color: #fff;
    }
  }
`;
