import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components/macro";

interface IProps {
  data: {
    author: string;
    category: string;
    categoryId: number;
    id: number;
    img: string;
    title: string;
  };
  saveItem: (event: React.MouseEvent<HTMLButtonElement>) => void;
  deleteItem: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Card({
  data: { title, img, author, category, id, categoryId },
  saveItem,
  deleteItem,
}: IProps) {
  const { pathname } = useLocation();

  return (
    <Container>
      {pathname === "/search" && <Category>{category}</Category>}
      <ImgSection>
        <Img src={img} />
      </ImgSection>
      <Section>
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a
          href={`https://maplestory.nexon.com/Promotion/2021/20210805/AwardsPoll/Out/${categoryId}/${id}/asdf`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Title>작품명 : {title}</Title>
        </a>
        <Author>출품자 : {author}</Author>
      </Section>
      {pathname === "/wish" ? (
        <Wish onClick={deleteItem} data-id={id}>
          삭제
        </Wish>
      ) : (
        <Wish onClick={saveItem} data-id={id}>
          찜
        </Wish>
      )}
    </Container>
  );
}

export default Card;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 30%;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: rgba(243, 166, 131, 0.16) 0px 3px 6px,
    rgba(243, 166, 131, 0.23) 0px 3px 6px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.lightOrange};
    box-shadow: rgba(241, 144, 102, 0.16) 0px 10px 36px 0px,
      rgba(241, 144, 102, 0.06) 0px 0px 0px 1px;
  }

  ${({ theme }) => theme.big`
    width:40%;
  `};

  ${({ theme }) => theme.tablet`
    width:100%;
  `};
`;

const Category = styled.div`
  z-index: 10;
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px 12px;
  background-color: white;
  border-radius: 20px;
  color: ${({ theme }) => theme.orange};
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
  color: ${({ theme }) => theme.orange};
  font-weight: bold;
  font-size: 20px;
  line-height: 1.4;
  text-align: center;
  word-break: keep-all;
`;

const Author = styled.p`
  margin: 10px 0;
  color: ${({ theme }) => theme.orange};
  font-size: 16px;
`;

const Img = styled.img`
  width: 100%;
`;

const Wish = styled.button`
  z-index: 10;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px 12px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.orange};
  border-radius: 15px;
  color: ${({ theme }) => theme.orange};

  &:hover {
    background-color: ${({ theme }) => theme.orange};
    color: white;
  }
`;
