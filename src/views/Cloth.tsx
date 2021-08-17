import React from "react";
import useShuffledData from "../hooks/useShuffledData";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Section from "../components/Section";
import styled from "styled-components";

function Cloth() {
  const datas = useShuffledData("cloth");
  const { items: clothes, loading, observerRef } = useInfiniteScroll(datas);

  return (
    <>
      <Section datas={clothes} loading={loading} />
      <Observer ref={observerRef} />
    </>
  );
}

export default Cloth;

const Observer = styled.div`
  height: 50px;
`;
