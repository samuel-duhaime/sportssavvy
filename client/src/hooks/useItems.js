import { useEffect, useState } from "react";
import { fetchApi } from "../helpers/fetchApi";

// Fetch the items with useEffect
export const useItems = ({ searchParamsString }) => {
  const [items, setItems] = useState(null);
  const [totalNumberItems, setTotalNumberItems] = useState(null);

  useEffect(() => {
    fetchApi({
      apiUrl: "/items?" + searchParamsString,
      setData: setItems,
      setTotalNumberItems,
    });
  }, [searchParamsString]);

  return { items, totalNumberItems };
};
