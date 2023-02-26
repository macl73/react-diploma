async function sendOrder(body = null) {
    /*let response = */await fetch("http://localhost:7070/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(body)
    });
  };

  export default sendOrder;