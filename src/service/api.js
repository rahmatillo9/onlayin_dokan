export const getProducts = async () => {
  const data = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  );
  return data;
};
export const getProduct = async (id) => {
  const data = await fetch(`https://fakestoreapi.com/products/${id}`).then(
    (res) => res.json()
  );
  return data;
};
export const LoginAPI = async (username, password) => {
  const data = await fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "none"
    }
  }).then(res => res.json());
  return data;
};
