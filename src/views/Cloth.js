import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Section from "../components/Section";
import shuffleRandomly from "../utils";
import styled from "styled-components";

export default function Hair() {
  const observerRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInitData("cloth");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData();
    observer.observe(observerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datas]);

  useEffect(() => {
    if (clothes.length === 0) return;
    if (clothes.length === datas.length) {
      observer.disconnect();
      alert("더 불러올 데이터가 없습니다");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clothes]);

  const setInitData = async (category) => {
    const { data: unshuffled } = await axios.get(`/datas/${category}.json`);
    const shuffledDatas = shuffleRandomly(unshuffled);
    setDatas([...shuffledDatas]);
  };

  const getData = async () => {
    try {
      setClothes((prev) => [
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
      <Section datas={clothes} loading={loading} />
      <Observer ref={observerRef} />
    </>
  );
}
const Observer = styled.div`
  height: 50px;
`;
