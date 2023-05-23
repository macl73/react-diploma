import { useState, useEffect } from 'react'

export default function useFetchCats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      let response = await fetch("http://localhost:7070/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "http://localhost:7070",
          "Access-Control-Expose-Headers": "*",
          "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS"
        },
      });
      let result = await response.json();

      setData([{id: 11, title: "Все"}, ...result]);
      
    } catch(err) {
      setError(true);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {data, loading, error};
};
