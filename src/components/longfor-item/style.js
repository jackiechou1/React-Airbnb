import { styled } from "styled-components";

export const ItemWrapper = styled.div`
  width: 100%;
  --radius: 18px;

  .inner {
    cursor: pointer;
  }

  &:hover .cover {
    transform: translateY(-6px) scale(1.02);
  }

  &:hover .bg-cover {
    height: 70%;
  }

  &:hover .inner {
    filter: drop-shadow(0 14px 28px rgba(0, 0, 0, 0.25));
  }

  &:active .cover {
    transform: translateY(-2px) scale(0.99);
  }

  &:active .inner {
    filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.22));
  }

  .inner {
    position: relative;
    padding: 8px;
    outline: none;
  }

  .cover {
    width: 100%;
    transition: transform 180ms ease;
    border-radius: var(--radius);
  }

  .bg-cover {
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: 0;
    height: 60%;
    transition: height 220ms ease;
    background-image: linear-gradient(
      -180deg,
      rgba(0, 0, 0, 0) 3%,
      rgb(0, 0, 0) 100%
    );
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }

  .info {
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 24px 32px;
    color: #fff;

    .city {
      font-size: 18px;
      font-weight: 600;
    }

    .price {
      font-size: 14px;
      margin-top: 5px;
    }
  }
`;
