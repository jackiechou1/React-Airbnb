import styled from "styled-components";

export const RightWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
  color: ${(props) => props.theme.textColor.primaryColor};
  .btns {
    display: flex;
    align-items: center;
    margin-right: 10px;
    .language,
    .theme-toggle,
    .music-toggle {
      margin-right: 10px;
      padding: 5px 12px;
      cursor: pointer;
      transform: 0.2s all;
      border-radius: 21px;
      &:hover {
        box-shadow: 0 0 2px ${(props) => props.theme.border.primaryColor};
        background-color: ${(props) => props.theme.background.hover};
      }
    }
    .music-toggle {
      display: inline-flex;
      align-items: center;
      padding: 0;
      border-radius: 21px;
      .ant-btn {
        color: inherit;
      }
      &:hover {
        box-shadow: none;
        background-color: transparent;
      }
      .ant-btn:hover {
        background-color: ${(props) => props.theme.background.hover};
      }
    }
    .theme-toggle {
      display: inline-flex;
      align-items: center;
      padding: 0;
      border-radius: 21px;
      .ant-btn {
        color: inherit;
      }
      &:hover {
        box-shadow: none;
        background-color: transparent;
      }
      .ant-btn:hover {
        background-color: ${(props) => props.theme.background.hover};
      }
    }
  }
  .profile {
    cursor: pointer;
    display: flex;
    padding: 5px 5px 5px 12px;
    border-radius: 21px;
    border: 1px solid ${(props) => props.theme.border.primaryColor};
    align-items: center;
    .menu {
      margin-right: 10px;
    }
    ${(props) => props.theme.mixin.boxShadow}
  }
`;
