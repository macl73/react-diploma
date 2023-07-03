async function sendOrder(body = null) {
  await fetch(process.env.REACT_APP_API_URL + "/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "http://localhost:7070",
      "Access-Control-Expose-Headers": "*",
      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS"
    },
    body: JSON.stringify(body)
  });
};

export default sendOrder;
