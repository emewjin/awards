import React from "react";
import useShuffledData from "../hooks/useShuffledData";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Section from "../components/Section";
import styled from "styled-components";

export default function Hair() {
  const datas = useShuffledData("pet");
  const { items: pets, loading, observerRef } = useInfiniteScroll(datas);

  return (
    <>
      <Section datas={pets} loading={loading} />
      <Observer ref={observerRef} />
    </>
  );
}
const Observer = styled.div`
  height: 50px;
`;
