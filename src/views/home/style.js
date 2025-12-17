import styled from "styled-components";

export const HomeWrapper = styled.div`
  > .content {
    width: 1032px;
    margin: 0 auto;
    padding: 28px 0 10px;
  }

  .section {
    margin-top: 18px;
    padding: 18px 18px 14px;
    border-radius: 18px;
    border: 1px solid ${(props) => props.theme.border.primaryColor};
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    color: ${(props) => (props.theme.mode === "dark" ? props.theme.textColor.secondaryColor : "#2f3d2f")};
    background: ${(props) =>
      props.theme.mode === "dark"
        ? "linear-gradient(180deg, rgba(20, 24, 36, 0.72) 0%, rgba(15, 17, 21, 0.72) 100%)"
        : "linear-gradient(180deg, rgba(230, 240, 234, 0.78) 0%, rgba(255, 255, 255, 0.82) 100%)"};
    box-shadow: ${(props) =>
      props.theme.mode === "dark" ? "0 10px 26px rgba(0, 0, 0, 0.35)" : "0 10px 26px rgba(0, 0, 0, 0.08)"};
  }

  /* 2) 山系自然轻户外森林感（低饱和自然绿） */
  .section--forest {
    border-radius: 22px;
    background: ${(props) =>
      props.theme.mode === "dark"
        ? "radial-gradient(980px 560px at 18% 12%, rgba(90, 160, 120, 0.18) 0%, rgba(90, 160, 120, 0) 66%), radial-gradient(900px 560px at 90% 18%, rgba(110, 170, 140, 0.14) 0%, rgba(110, 170, 140, 0) 66%), linear-gradient(180deg, rgba(20, 24, 36, 0.72) 0%, rgba(15, 17, 21, 0.72) 100%)"
        : "radial-gradient(980px 560px at 18% 12%, rgba(120, 175, 140, 0.18) 0%, rgba(120, 175, 140, 0) 66%), radial-gradient(900px 560px at 90% 18%, rgba(165, 200, 175, 0.14) 0%, rgba(165, 200, 175, 0) 66%), linear-gradient(180deg, rgba(228, 240, 233, 0.82) 0%, rgba(255, 255, 255, 0.84) 100%)"};
  }

  /* Coastal calm (cool, low-saturation) */
  .section--coastal {
    border-radius: 22px;
    background: ${(props) =>
      props.theme.mode === "dark"
        ? "radial-gradient(980px 560px at 16% 12%, rgba(90, 170, 190, 0.18) 0%, rgba(90, 170, 190, 0) 66%), radial-gradient(900px 560px at 88% 18%, rgba(120, 170, 140, 0.10) 0%, rgba(120, 170, 140, 0) 66%), linear-gradient(180deg, rgba(20, 24, 36, 0.72) 0%, rgba(15, 17, 21, 0.72) 100%)"
        : "radial-gradient(980px 560px at 16% 12%, rgba(150, 205, 220, 0.18) 0%, rgba(150, 205, 220, 0) 66%), radial-gradient(900px 560px at 88% 18%, rgba(210, 225, 215, 0.12) 0%, rgba(210, 225, 215, 0) 66%), linear-gradient(180deg, rgba(228, 240, 233, 0.78) 0%, rgba(255, 255, 255, 0.84) 100%)"};
  }

  /* Rose mist (warm gentle) */
  .section--rose {
    border-radius: 22px;
    background: ${(props) =>
      props.theme.mode === "dark"
        ? "radial-gradient(980px 560px at 14% 12%, rgba(255, 56, 92, 0.14) 0%, rgba(255, 56, 92, 0) 66%), radial-gradient(900px 560px at 90% 16%, rgba(255, 180, 130, 0.12) 0%, rgba(255, 180, 130, 0) 66%), linear-gradient(180deg, rgba(20, 24, 36, 0.72) 0%, rgba(15, 17, 21, 0.72) 100%)"
        : "radial-gradient(980px 560px at 14% 12%, rgba(255, 56, 92, 0.10) 0%, rgba(255, 56, 92, 0) 66%), radial-gradient(900px 560px at 90% 16%, rgba(255, 180, 130, 0.14) 0%, rgba(255, 180, 130, 0) 66%), linear-gradient(180deg, rgba(232, 242, 236, 0.78) 0%, rgba(255, 255, 255, 0.84) 100%)"};
  }

  /* Warm orange/gold translucent block for inspiration section */
  .section--warm {
    border-radius: 26px;
    background: ${(props) =>
      props.theme.mode === "dark"
        ? "radial-gradient(980px 560px at 18% 12%, rgba(255, 170, 90, 0.22) 0%, rgba(255, 170, 90, 0) 64%), radial-gradient(900px 560px at 88% 16%, rgba(255, 214, 120, 0.16) 0%, rgba(255, 214, 120, 0) 66%), linear-gradient(180deg, rgba(20, 24, 36, 0.72) 0%, rgba(15, 17, 21, 0.72) 100%)"
        : "radial-gradient(980px 560px at 18% 12%, rgba(255, 170, 90, 0.22) 0%, rgba(255, 170, 90, 0) 64%), radial-gradient(900px 560px at 88% 16%, rgba(255, 214, 120, 0.18) 0%, rgba(255, 214, 120, 0) 66%), linear-gradient(180deg, rgba(232, 242, 236, 0.78) 0%, rgba(255, 255, 255, 0.84) 100%)"};
  }

  /* Dusk (deeper, premium) */
  .section--dusk {
    border-radius: 22px;
    background: ${(props) =>
      props.theme.mode === "dark"
        ? "radial-gradient(980px 560px at 16% 10%, rgba(140, 120, 220, 0.14) 0%, rgba(140, 120, 220, 0) 68%), radial-gradient(900px 560px at 88% 18%, rgba(0, 132, 138, 0.12) 0%, rgba(0, 132, 138, 0) 66%), linear-gradient(180deg, rgba(20, 24, 36, 0.72) 0%, rgba(15, 17, 21, 0.72) 100%)"
        : "radial-gradient(980px 560px at 16% 10%, rgba(160, 145, 230, 0.14) 0%, rgba(160, 145, 230, 0) 68%), radial-gradient(900px 560px at 88% 18%, rgba(140, 200, 205, 0.12) 0%, rgba(140, 200, 205, 0) 66%), linear-gradient(180deg, rgba(230, 240, 234, 0.78) 0%, rgba(255, 255, 255, 0.84) 100%)"};
  }
`;
