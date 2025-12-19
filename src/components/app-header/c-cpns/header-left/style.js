import styled from "styled-components";

export const LeftWrapper = styled.div`
  flex: 1;
  .left {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-left: 30px;
  }

  .logo {
    display: inline-flex;
    color: ${(props) => props.theme.color.primaryColor};
    cursor: pointer;
  }

  .all-stays {
    cursor: pointer;
    font-weight: 600;
    color: ${(props) => props.theme.textColor.secondaryColor};
    padding: 6px 10px;
    border-radius: 999px;
    &:hover {
      background: ${(props) => props.theme.background.hover};
    }
  }

  @media (max-width: 768px) {
    .left {
      margin-left: 12px;
      gap: 10px;
    }

    .all-stays {
      display: none;
    }
  }
`;
