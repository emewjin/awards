import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components/macro";

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <Container>
      <Wrapper>
        <Link to="/">
          <Menu isActive={pathname === "/"}>헤어</Menu>
        </Link>
        <Link to="/eye">
          <Menu isActive={pathname === "/eye"}>성형</Menu>
        </Link>
        <Link to="/cloth">
          <Menu isActive={pathname === "/cloth"}>의상</Menu>
        </Link>
        <Link to="/pet">
          <Menu isActive={pathname === "/pet"}>펫</Menu>
        </Link>
      </Wrapper>
      <Wrapper>
        <Link to="/search">
          <Menu isActive={pathname === "/search"}>검색</Menu>
        </Link>
        <Link to="/wish">
          <Menu isActive={pathname === "/wish"}>찜</Menu>
        </Link>
        <Link to="/info">
          <Menu isActive={pathname === "/info"}>정보</Menu>
        </Link>
      </Wrapper>
    </Container>
  );
}

const Container = styled.nav`
  z-index: 999;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  width: 100%;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  ${({ theme }) => theme.tablet`
    justify-content: center;
  `};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;

  ${({ theme }) => theme.tablet`
    margin: 0 5px;
  `};
`;

const Menu = styled.div`
  margin: 0 10px;
  padding: 10px 15px;
  font-size: 20px;
  font-weight: bold;
  color: ${({ isActive, theme }) => (isActive ? "white" : theme.orange)};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.orange : "transparent"};
  border-radius: 30px;

  &:hover {
    color: ${({ isActive, theme }) => (isActive ? "white" : theme.lightOrange)};
  }

  ${({ theme }) => theme.tablet`
    margin: 0 2px;
    padding: 10px;
    font-size: 15px;
  `};
`;
