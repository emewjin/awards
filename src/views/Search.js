import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Section from "../components/Section";

export default function Search() {
  const [datas, setDatas] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getData = async (item) => {
    const { data: hair } = await axios.get(`/datas/hair.json`);
    const { data: pet } = await axios.get(`/datas/pet.json`);
    const { data: eye } = await axios.get(`/datas/eye.json`);
    const { data: cloth } = await axios.get(`/datas/cloth.json`);
    setDatas([...hair, ...pet, ...eye, ...cloth]);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInput = (e) => {
    const { value } = e.target;
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

  const onEnter = (e) => {
    if (e.keyCode === 13) searchItem();
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="작품명 또는 출품자 이름을 검색할 수 있어요"
          onInput={handleInput}
          onKeyDown={onEnter}
        />
        <SearchIcon className="fas fa-search" onClick={searchItem} />
      </SearchContainer>
      <Section datas={searchedData} />
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
  width: 70%;
  position: relative;
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
  border: 1px solid rgba(241, 144, 102, 1);
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
  color: rgba(241, 144, 102, 1);

  ${({ theme }) => theme.tablet`
    font-size: 20px;
    top:33%;
  `};
`;
