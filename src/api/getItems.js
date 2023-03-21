/*import React, { useState, useEffect } from 'react'

export default function getItems(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      async function fetchData() {
        try {
          setLoading(true);
          let response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
          });
          let result = await response.json();
          setData(result.status);
        } catch(error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, [url]);

    let loadMore = document.querySelector(".load-more")
    if (data.length < 6) {
        loadMore?.classList.add("d-none")
    } else {
        loadMore?.classList.remove("d-none")
    }

    return {data, loading, error};
};
*/
  
async function getItems(url) {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS"
      },
    });
  
    let result = await response.json();

    let loadMore = document.querySelector(".load-more")
    if (result.length < 6) {
        loadMore?.classList.add("d-none")
    } else {
        loadMore?.classList.remove("d-none")
    }

    return result;
  };

  export default getItems;
  