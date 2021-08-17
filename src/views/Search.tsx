import React, { useState, useEffect } from "react";
import axios from "axios";
import Section from "../components/Section";
import styled from "styled-components/macro";

type Data = {
  author: string;
  category: string;
  categoryId: number;
  id: number;
  img: string;
  title: string;
};

export default function Search() {
  const [datas, setDatas] = useState<Data[]>([]);
  const [isBlured, setIsBlured] = useState(false);
  const [searchedData, setSearchedData] = useState<Data[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchTerm(value);
  };

  const searchItem = () => {
    const result = datas.filter((data) => {
      return (
        data.title.includes(searchTerm) || data.author.includes(searchTerm)
      );
    });
    setSearchedData([...result]);
  };
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") searchItem();
  };

  const onBlurInput = () => {
    setIsBlured(true);
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="작품명 또는 출품자 이름을 검색할 수 있어요"
          onInput={handleInput}
          onKeyDown={onEnter}
          onBlur={onBlurInput}
        />
        <SearchIcon className="fas fa-search" onClick={searchItem} />
      </SearchContainer>
      {isBlured && searchedData.length === 0 && (
        <Notice>검색 결과가 없어요. 검색어를 확인해주세요</Notice>
      )}
      {searchedData.length !== 0 && <Section datas={searchedData} />}
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  padding-top: 100px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 70%;
  ${({ theme }) => theme.tablet`
    width: 90%;
  `};
`;

const SearchInput = styled.input`
  all: unset;
  box-sizing: inherit;
  width: 100%;
  padding: 20px 25px;
  padding-right: 50px;
  border: 1px solid ${({ theme }) => theme.orange};
  border-radius: 30px;
  font-size: 20px;

  ${({ theme }) => theme.tablet`
    font-size: 15px;
    padding: 15px 20px;
    padding-right:50px;
  `};
`;

const SearchIcon = styled.i`
  position: absolute;
  top: 30%;
  right: 20px;
  font-size: 30px;
  color: ${({ theme }) => theme.orange};

  ${({ theme }) => theme.tablet`
    font-size: 20px;
    top:33%;
  `};
`;

const Notice = styled.p`
  margin-top: 100px;
`;
