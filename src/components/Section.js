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
      <Up onClick={goTop}>
        <Icon className="fas fa-arrow-up" />
      </Up>
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
  right: 20px;
  bottom: 20px;
  padding: 20px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Icon = styled.i`
  color: rgba(241, 144, 102, 1);
  pointer-events: none;
`;
