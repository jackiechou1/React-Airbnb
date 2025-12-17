import styled from "styled-components";

export const LoginWrapper = styled.div`
  min-height: calc(100vh - 160px);
  padding: 24px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.theme.mode === "dark"
      ? "radial-gradient(1200px 800px at 20% 20%, rgba(46, 85, 255, 0.18) 0%, rgba(0, 0, 0, 0) 60%), radial-gradient(1000px 700px at 90% 30%, rgba(255, 102, 0, 0.14) 0%, rgba(0, 0, 0, 0) 55%), linear-gradient(180deg, #0f1115 0%, #141824 100%)"
      : "radial-gradient(1200px 800px at 20% 20%, #f0f5ff 0%, rgba(240, 245, 255, 0) 60%), radial-gradient(1000px 700px at 90% 30%, #fff7e6 0%, rgba(255, 247, 230, 0) 55%), linear-gradient(180deg, #fafafa 0%, #ffffff 100%)"};

  .card {
    width: 100%;
    max-width: 420px;
    border-radius: 14px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
  }
`;
