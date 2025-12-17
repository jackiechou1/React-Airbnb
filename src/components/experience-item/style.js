import styled from "styled-components";

export const ExperienceItemWrapper = styled.div`
  width: 20%;
  padding: 8px;
  box-sizing: border-box;
  .cover {
    position: relative;
    width: 100%;
    padding-top: 66%;
    border-radius: 12px;
    overflow: hidden;
    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.25s ease;
    }
  }
  &:hover .cover img {
    transform: scale(1.03);
  }
  .content {
    padding: 10px 4px 4px;
  }
  .title {
    font-weight: 600;
    color: ${(props) => props.theme.textColor.secondaryColor};
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 38px;
  }
  .meta {
    margin-top: 6px;
    display: flex;
    justify-content: space-between;
    color: ${(props) => props.theme.textColor.primaryColor};
    font-size: 12px;
  }
  .tags {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    .tag {
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 999px;
      background: ${(props) => props.theme.background.muted};
      color: ${(props) => props.theme.textColor.primaryColor};
    }
  }
  .price {
    margin-top: 8px;
    font-weight: 600;
    color: ${(props) => props.theme.textColor.secondaryColor};
  }
`;
