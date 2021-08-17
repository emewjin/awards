import React from "react";
import useShuffledData from "../hooks/useShuffledData";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Section from "../components/Section";
import styled from "styled-components";

export default function Hair() {
  const datas = useShuffledData("cloth");
  const { items: clothes, loading, observerRef } = useInfiniteScroll(datas);

  return (
    <>
      <Section datas={clothes} loading={loading} />
      <Observer ref={observerRef} />
    </>
  );
}
const Observer = styled.div`
  height: 50px;
`;
