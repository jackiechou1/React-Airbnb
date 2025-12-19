import { styled } from "styled-components";

export const FilterWrapper = styled.div`
  padding: 16px 20px 0;

  .bar {
    padding: 14px 14px;
    border-radius: 14px;
    border: 1px solid ${(props) => props.theme.border.primaryColor};
    background: ${(props) => props.theme.background.primary};
    box-shadow: ${(props) =>
      props.theme.mode === "dark" ? "0 8px 24px rgba(0, 0, 0, 0.35)" : "0 8px 24px rgba(0, 0, 0, 0.08)"};
  }

  .item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    .label {
      font-weight: 600;
      color: ${(props) => props.theme.textColor.secondaryColor};
      white-space: nowrap;
    }
  }

  .price .control {
    width: min(220px, 70vw);
    padding: 0 6px;
  }

  @media (max-width: 600px) {
    padding: 12px 12px 0;

    .bar {
      padding: 12px 12px;
    }

    .item.price {
      width: 100%;
    }

    .price .control {
      width: 100%;
      padding: 0;
    }
  }
`;
