import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWishIdContext } from "../App";
import Section from "../components/Section";
import styled from "styled-components";

type Data = {
  author: string;
  category: string;
  categoryId: number;
  id: number;
  img: string;
  title: string;
};

export default function Wish() {
  const { wishIds, setWishIds } = useWishIdContext();
  const [datas, setDatas] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishItems, setWishItems] = useState<Data[]>([]);

  const getData = async () => {
    try {
      const { data: hair } = await axios.get(`/datas/hair.json`);
      const { data: pet } = await axios.get(`/datas/pet.json`);
      const { data: eye } = await axios.get(`/datas/eye.json`);
      const { data: cloth } = await axios.get(`/datas/cloth.json`);
      setDatas([...hair, ...pet, ...eye, ...cloth]);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
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

  return (
    <Container>
      <Title>찜 리스트</Title>
      <Desription>
        관심있는 작품을 찜해두고 매일 투표할 때 보고 투표하세요!
      </Desription>
      <Delete onClick={deleteAll}>전체 삭제</Delete>
      {loading && <Notice>로딩 중...</Notice>}
      {!loading && wishItems.length === 0 ? (
        <Notice>찜한 작품이 없어요</Notice>
      ) : (
        <Section datas={wishItems} />
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
