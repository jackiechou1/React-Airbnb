import { styled } from "styled-components";

export const RoomsWrapper = styled.div`
  position: relative;
  margin: 40px 20px;
  .title {
    font-size: 20px;
    color: ${(props) => props.theme.textColor.secondaryColor};
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
  .empty {
    margin: 32px 0;
  }
  > .cover {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
