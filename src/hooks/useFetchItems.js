import { useState, useEffect } from 'react'

export default function useFetchItems(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      async function fetchData() {
        try {
          setLoading(true);
          let response = await fetch(url, {
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
          setData(result);
        } catch(err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, [url]);
    
    let loadMore = document.querySelector(".load-more")
    if (data?.length < 6) {
        loadMore?.classList.add("d-none")
    } else {
        loadMore?.classList.remove("d-none")
    }

    return {data, loading, error};
};