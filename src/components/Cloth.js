import React, { useEffect, useState } from "react";
import axios from "axios";
import Section from "./Section";

const COUNT = 6;
export default function Hair() {
  const [hairs, setHairs] = useState([]);

  const getData = async (item) => {
    const { data } = await axios.get(`/datas/${item}.json`);
    setHairs([...data.slice(0, COUNT)]);
  };

  useEffect(() => {
    getData("cloth");
  }, []);

  return <Section datas={hairs} />;
}
