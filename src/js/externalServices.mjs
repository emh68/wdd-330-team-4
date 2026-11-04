function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

const baseURL = import.meta.env.VITE_SERVER_URL;

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function searchProducts(searchTerm) {
  const categories = ["sleeping-bags", "tents", "hammocks", "backpacks"];
  const requests = categories.map((category) => {
    return getProductsByCategory(category);
  });
  const products = await Promise.all(requests);
  console.log(products);
  const allProducts = products.flat();
  console.log(allProducts);
  const results = allProducts.filter((product) => {
    return (
      product.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Brand.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return results;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout", options).then(convertToJson);
}

export async function registerUser(user) {
  //this line connects with the server
  const response = await fetch(`${baseURL}users`, {
    // makes the POST (method to request to create a new user)
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //converts your JavaScript object into JSON to send to the server.
    body: JSON.stringify(user),
  });

  const result = await response.json(); //receives respond with info to check if server accepted the POST request

  if (!response.ok) {
    throw new Error(result.message || "Registration failed.");
  }

  return result;
}
