import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components/macro";

export default function Card({ data: { title, img, author, category } }) {
  const { pathname } = useLocation();

  return (
    <Container>
      {pathname === "/search" && <Category>{category}</Category>}
      <ImgSection>
        <Img src={img} />
      </ImgSection>
      <Section>
        <Title>작품명 : {title}</Title>
        <Author>출품자 : {author}</Author>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: rgba(243, 166, 131, 0.16) 0px 3px 6px,
    rgba(243, 166, 131, 0.23) 0px 3px 6px;
  &:hover {
    border: 1px solid #f3a683;
    box-shadow: rgba(241, 144, 102, 0.16) 0px 10px 36px 0px,
      rgba(241, 144, 102, 0.06) 0px 0px 0px 1px;
  }
`;

const Category = styled.div`
  z-index: 10;
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px 12px;
  background-color: white;
  border-radius: 20px;
  color: rgba(241, 144, 102, 1);
  font-weight: bold;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const ImgSection = styled(Section)`
  flex: 1;
  padding: 0;
`;

const Title = styled.p`
  margin: 10px 0;
  color: rgba(241, 144, 102, 1);
  font-weight: bold;
  font-size: 20px;
  line-height: 1.4;
  text-align: center;
  word-break: keep-all;
`;

const Author = styled.p`
  margin: 10px 0;
  color: rgba(241, 144, 102, 1);
  font-size: 16px;
`;

const Img = styled.img`
  width: 100%;
`;
