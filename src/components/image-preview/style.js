import styled from "styled-components";

export const PreviewWrapper = styled.div`
  position: relative;
  width: 100%;

  .close {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 2;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.35);
    color: rgba(255, 255, 255, 0.92);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 180ms ease, transform 180ms ease;
    backdrop-filter: blur(8px);
  }
  .close:hover {
    background: rgba(0, 0, 0, 0.55);
    transform: scale(1.02);
  }

  .panel {
    overflow: hidden;
    border-radius: 18px;
    background: transparent;
  }

  /* Keep original image colors; avoid any slide background tint */
  :global(.ant-carousel) {
    background: transparent;
  }
  :global(.ant-carousel .slick-slide),
  :global(.ant-carousel .slick-slide > div) {
    background: transparent;
  }

  .slide {
    outline: none;
  }

  .img {
    display: block;
    width: 100%;
    height: min(72vh, 620px);
    object-fit: contain;
    background: transparent;
    border-radius: 18px;
  }
`;
