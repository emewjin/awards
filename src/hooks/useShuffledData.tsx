import { useEffect, useState } from "react";
import axios from "axios";
import shuffleRandomly from "../utils";

type Data = {
  author: string;
  category: string;
  categoryId: number;
  id: number;
  img: string;
  title: string;
};

export default function useShuffledData(category: string) {
  const [datas, setDatas] = useState<Data[]>([]);
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
