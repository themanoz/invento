"use client";

import { authService } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function page() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = authService.getToken();

    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        authService.setToken(data.data.token);
        setProducts(data.products || []);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Products</h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>SKU: {product.sku}</p>
              <p>Quantity: {product.quantityOnHand}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
