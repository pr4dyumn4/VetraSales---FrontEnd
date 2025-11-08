import { useEffect, useState } from "react";
import axios from "axios";

function FindProduct({ productId }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (!productId) return;
    axios
      .get("http://localhost:8080/searchProductById", {
        params: { productId }
      })
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch product:", error);
      });
  }, [productId]); // Runs only when productId changes

  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Added By</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {product.image ? (
              <img src={product.image} alt="product" width="80" />
            ) : (
              "N/A"
            )}
          </td>
          <td>{product.name || "N/A"}</td>
          <td>{product.description || "N/A"}</td>
          <td>{product.price || "N/A"}</td>
          <td>{product.adminUsername || "N/A"}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default FindProduct;
