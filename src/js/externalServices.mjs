async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
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
