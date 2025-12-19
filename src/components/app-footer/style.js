import styled from "styled-components";

export const FooterWrapper = styled.div`
  margin-top: 100px;
  border-top: 1px solid ${(props) => props.theme.border.secondaryColor};
  background: ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.textColor.primaryColor};

  .wrapper {
    width: 100%;
    max-width: 1080px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 48px 24px;
  }

  .service {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;

    .item {
      flex: 1;
      min-width: 160px;

      .name {
        margin-bottom: 16px;
        font-weight: 700;
      }

      .list {
        display: flex;
        flex-direction: column;
        .iten {
          display: block;
          margin-top: 6px;
          color: ${(props) => props.theme.textColor.primaryColor};
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .statement {
    margin-top: 30px;
    border-top: 1px solid ${(props) => props.theme.border.secondaryColor};
    padding: 20px;
    color: ${(props) => props.theme.textColor.primaryColor};
    text-align: center;
  }

  @media (max-width: 768px) {
    .wrapper {
      padding: 32px 16px;
    }

    .service {
      flex-direction: column;
    }
  }
`;
