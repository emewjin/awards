import React from "react";
import useShuffledData from "../hooks/useShuffledData";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Section from "../components/Section";
import styled from "styled-components";

export default function Hair() {
  const datas = useShuffledData("eye");
  const { items: eyes, loading, observerRef } = useInfiniteScroll(datas);

  return (
    <>
      <Section datas={eyes} loading={loading} />
      <Observer ref={observerRef} />
    </>
  );
}
const Observer = styled.div`
  height: 50px;
`;
