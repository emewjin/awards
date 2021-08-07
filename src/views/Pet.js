import React, { useEffect, useState, useRef } from "react";
import useShuffledData from "../hooks/useShuffledData";

import Section from "../components/Section";
import styled from "styled-components";

export default function Hair() {
  const datas = useShuffledData("pet");
  const observerRef = useRef(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
    observer.observe(observerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datas]);

  useEffect(() => {
    if (pets.length === 0) return;
    if (pets.length === datas.length) {
      observer.disconnect();
      alert("더 불러올 데이터가 없습니다");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pets]);

  const getData = async () => {
    try {
      setPets((prev) => [
        ...prev,
        ...datas.slice(prev.length, prev.length + 6),
      ]);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIntersection = (entries) => {
    if (entries[0].isIntersecting) {
      getData();
    }
  };

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5,
  });

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
