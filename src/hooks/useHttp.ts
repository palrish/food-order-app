import { send } from "process";
import { useCallback, useEffect, useState } from "react";

async function sendHttpReq(url: any, config: any) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong!");
  }
  return resData;
}

export default function useHttp(url: any, config: any, initialData: any) {
  const [data, setData] = useState(initialData);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendReq = useCallback(
    async function sendReq(data: any) {
      setIsFetching(true);
      try {
        const resData = await sendHttpReq(url, { ...config, body: data });
        setData(resData);
      } catch (error: any) {
        setError(error.message);
      }
      setIsFetching(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (!config || !config.method || config.method === "GET") {
      sendReq(null);
    }
  }, [sendReq, config]);

  return { data, isFetching, error, sendReq, clearData };
}
