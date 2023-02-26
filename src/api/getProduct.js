async function getProduct(url) {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
    });
  
      let result = await response.json();
      return result;
  };

  export default getProduct;