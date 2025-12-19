import styled from "styled-components";

export const BannerWrapper = styled.div`
  height: 529px;
  overflow: hidden;
  position: relative;

  .slick-slider,
  .slick-list,
  .slick-track {
    height: 100%;
  }

  .slide {
    height: 529px;
  }

  img {
    width: 100%;
    height: 529px;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 768px) {
    height: 280px;

    .slide {
      height: 280px;
    }

    img {
      height: 280px;
    }
  }

  /* Sunrise glow overlay */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: radial-gradient(1200px 600px at 18% 10%, rgba(255, 170, 90, 0.30) 0%, rgba(255, 170, 90, 0) 60%),
      radial-gradient(900px 520px at 75% 0%, rgba(255, 56, 92, 0.18) 0%, rgba(255, 56, 92, 0) 60%),
      linear-gradient(180deg, rgba(255, 250, 243, 0.18) 0%, rgba(0, 0, 0, 0) 55%);
  }

  :global(.slick-slider) {
    position: relative;
    z-index: 0;
  }

  .slick-dots {
    bottom: 16px;
    z-index: 2;
  }
  .slick-dots li button:before {
    color: #fff;
    opacity: 0.6;
    font-size: 10px;
  }
  .slick-dots li.slick-active button:before {
    opacity: 1;
    color: #fff;
  }
`;
