import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

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
        <Link to="/info">
          <Menu isActive={pathname === "/info"}>정보</Menu>
        </Link>
      </Wrapper>
    </Container>
  );
}

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const Wrapper = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.tablet`
      margin: 0 5px;
    `};
`;

const Menu = styled.div`
  padding: 10px 15px;
  font-size: 20px;
  font-weight: bold;
  color: rgba(241, 144, 102, 1);
  &:hover {
    color: rgba(243, 166, 131, 1);
  }
  border-bottom: ${({ isActive }) =>
    isActive ? "3px solid rgba(241, 144, 102, 1)" : "1px solid transparent"};

  ${({ theme }) => theme.tablet`
      font-size: 15px;
      padding: 10px;
    `};
`;
