import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWishIdContext } from "../App";
import Section from "../components/Section";
import styled from "styled-components";

export default function Wish() {
  const { wishIds, setWishIds } = useWishIdContext();
  const [datas, setDatas] = useState([]);
  const [wishItems, setWishItems] = useState([]);

  const getData = async () => {
    const { data: hair } = await axios.get(`/datas/hair.json`);
    const { data: pet } = await axios.get(`/datas/pet.json`);
    const { data: eye } = await axios.get(`/datas/eye.json`);
    const { data: cloth } = await axios.get(`/datas/cloth.json`);
    setDatas([...hair, ...pet, ...eye, ...cloth]);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const wishData = datas.filter((data) =>
      wishIds.includes(data.id.toString())
    );
    setWishItems([...wishData]);
  }, [datas, wishIds]);

  const deleteAll = () => {
    localStorage.removeItem("id");
    setWishIds([]);
  };

  const wishSetWishIds = (newData) => {
    setWishIds([...newData]);
  };

  return (
    <Container>
      <Title>찜 리스트</Title>
      <Desription>
        관심있는 작품을 찜해두고 매일 투표할 때 보고 투표하세요!
      </Desription>
      <Delete onClick={deleteAll}>전체 삭제</Delete>
      {wishItems.length === 0 ? (
        <Notice>찜한 작품이 없어요</Notice>
      ) : (
        <Section
          datas={wishItems}
          wishIds={wishIds}
          wishSetWishIds={wishSetWishIds}
        />
      )}
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  padding-top: 100px;
  line-height: 1.4;
`;

const Title = styled.h1`
  margin: 20px 0;
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.orange};
  text-align: center;
  word-break: keep-all;
`;

const Desription = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  text-align: center;
`;

const Delete = styled.button`
  padding: 5px 10px;
  color: ${({ theme }) => theme.orange};
  background-color: white;
  border: 1px solid ${({ theme }) => theme.orange};
  border-radius: 15px;

  &:hover {
    background-color: ${({ theme }) => theme.orange};
    color: white;
  }
`;

const Notice = styled.p`
  margin-top: 20px;
`;
