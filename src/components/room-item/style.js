import styled from "styled-components";

export const ItemWrapper = styled.li`
  flex-shrink: 0;
  width: ${(props) => props.itemwidth};
  box-sizing: border-box;
  padding: 8px;
  .inner {
    background: ${(props) => (props.theme.mode === "dark" ? props.theme.background.secondary : props.theme.background.primary)};
    border: 1px solid ${(props) => props.theme.border.primaryColor};
    border-radius: 18px;
    overflow: hidden;
    box-shadow: ${(props) =>
      props.theme.mode === "dark" ? "0 10px 28px rgba(0, 0, 0, 0.35)" : "0 10px 28px rgba(0, 0, 0, 0.10)"};
    transition: transform 180ms ease, box-shadow 180ms ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${(props) =>
        props.theme.mode === "dark" ? "0 14px 34px rgba(0, 0, 0, 0.45)" : "0 14px 34px rgba(0, 0, 0, 0.14)"};
    }

    .cover {
      position: relative;
      box-sizing: border-box;
      padding: 66.66% 0 0;
      overflow: hidden;

      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .swiper {
      position: relative;
      cursor: pointer;
      &:hover {
        .control {
          display: flex;
        }
      }
      .control {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: none;
        justify-content: space-between;
        align-items: center;
        z-index: 1;
        color: #fff;
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 83px;
          height: 100%;
          background: linear-gradient(
            to left,
            transparent 0%,
            rgba(0, 0, 0, 0.25) 100%
          );

          &.right {
            background: linear-gradient(
              to right,
              transparent 0%,
              rgba(0, 0, 0, 0.25) 100%
            );
          }
        }
      }
      .indicator {
        position: absolute;
        bottom: 20px;
        left: 50%;
        width: 30%;
        transform: translateX(-50%);
        .dot_item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20%;
        }
        .dot {
          border-radius: 50%;
          width: 6px;
          height: 6px;
          background-color: rgba(0, 0, 0, 0.8);
          margin: 0 2px;
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
          &.active {
            width: 8px;
            height: 8px;
            background-color: #fff;
          }
        }
      }
    }
    .body {
      padding: 12px 12px 14px;
    }
    .desc {
      margin: 0 0 6px;
      font-size: 12px;
      font-weight: 700;
      color: ${(props) => props.verifycolor};
    }

    .name {
      font-size: 16px;
      font-weight: 700;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      margin: 8px 0;
    }
    .bottom {
      color: ${(props) => props.theme.textColor.primaryColor};
      .MuiRating-root,
      .MuiRating-decimal {
        margin-right: -2px;
      }
      .count {
        margin: 0 2px 0 4px;
      }
    }
  }
`;
