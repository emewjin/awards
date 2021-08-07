import { useEffect, useState } from "react";
import axios from "axios";
import shuffleRandomly from "../utils";

export default function useShuffledData(category) {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    async function setInitData() {
      const { data: unshuffled } = await axios.get(`/datas/${category}.json`);
      const shuffledDatas = shuffleRandomly(unshuffled);
      setDatas([...shuffledDatas]);
    }
    setInitData();
  }, [category]);

  return datas;
}
