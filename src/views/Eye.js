import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Section from "../components/Section";
import styled from "styled-components";

export default function Hair() {
  const observerRef = useRef(null);
  const [eyes, setEyes] = useState([]);

  const getData = async (item) => {
    try {
      const { data } = await axios.get(`/datas/${item}.json`);
      if (!data.length) {
        observer.disconnect();
        throw new Error("더 불러올 데이터가 없습니다");
      }
      setEyes((prev) => [...prev, ...data.slice(prev.length, prev.length + 6)]);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getData("eye");
    observer.observe(observerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIntersection = (entries) => {
    if (entries[0].isIntersecting) {
      getData("eye");
    }
  };

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5,
  });

  return (
    <>
      <Section datas={eyes} />
      <Observer ref={observerRef} />
    </>
  );
}
const Observer = styled.div`
  height: 50px;
`;
