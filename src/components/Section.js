import React, { useEffect } from "react";
import { useWishIdContext } from "../App";
import Card from "./Card";
import styled from "styled-components/macro";

export default function Section({ datas, loading }) {
  const { wishIds, setWishIds } = useWishIdContext();

  useEffect(() => {
    const localWishes = JSON.parse(localStorage.getItem("id"));
    if (localWishes.length) setWishIds([...localWishes]);
    if (!localWishes.length) setWishIds([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("id", JSON.stringify(wishIds));
  }, [wishIds]);

  const saveItem = (e) => {
    const id = e.target.dataset.id;
    if (!wishIds.includes(id)) setWishIds((prev) => [...prev, id]);
    if (wishIds.includes(id)) alert("이미 찜한 항목이예요");
  };

  const deleteItem = (e) => {
    const id = e.target.dataset.id;
    const clearedItems = wishIds.filter((wish) => wish !== id);
    setWishIds([...clearedItems]);
  };

  const goTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Container>
      {loading && <p>데이터를 불러오고 있습니다</p>}
      {datas?.map((data) => (
        <Card
          data={data}
          key={data.id}
          saveItem={saveItem}
          deleteItem={deleteItem}
        />
      ))}
      <Up onClick={goTop}>
        <Icon className="fas fa-arrow-up" />
      </Up>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  justify-content: center;
  padding: 10px;
  padding-top: 100px;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;
`;

const Up = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 20px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Icon = styled.i`
  color: ${({ theme }) => theme.orange};
  pointer-events: none;
`;
