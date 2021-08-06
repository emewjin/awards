import React from "react";
import Card from "./Card";
import styled from "styled-components/macro";

export default function Section({ datas }) {
  const goTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Container>
      {datas?.map((data) => (
        <Card data={data} key={data.id} />
      ))}
      <Up onClick={goTop}>위로</Up>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 10px;
  padding-top: 30px;
`;

const Up = styled.button`
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 25px;
`;
