import styled from "styled-components";
export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  background: ${(props) => (props.theme.mode === "dark" ? "#1A1A1A" : props.theme.background.primary)};
  border-bottom: 1px solid
    ${(props) => (props.theme.mode === "dark" ? "rgba(255, 255, 255, 0.08)" : props.theme.border.secondaryColor)};
`;
