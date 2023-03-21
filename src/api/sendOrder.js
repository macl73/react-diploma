async function sendOrder(body = null) {
    /*let response = */await fetch("http://localhost:7070/api/order", {
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