async function getItems(url) {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
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