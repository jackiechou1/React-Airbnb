import styled from "styled-components";

export const ProfileWrapper = styled.div`
  min-height: calc(100vh - 160px);
  padding: 24px 16px;
  display: flex;
  justify-content: center;

  .center {
    margin-top: 40px;
  }

  .card {
    width: 100%;
    max-width: 720px;
    border-radius: 14px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }

  .title {
    font-size: 18px;
    font-weight: 700;
  }
`;

