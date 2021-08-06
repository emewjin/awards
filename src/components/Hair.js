import React, { useEffect, useState } from "react";
import axios from "axios";
import Section from "./Section";

export default function Hair() {
  const [hairs, setHairs] = useState([]);

  const getData = async (item) => {
    const { data } = await axios.get(`/datas/${item}.json`);
    setHairs([...data]);
  };

  useEffect(() => {
    getData("hair");
  }, []);

  return <Section datas={hairs} />;
}
