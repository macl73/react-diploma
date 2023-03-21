async function getProduct(url) {
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
      return result;
  };

  export default getProduct;