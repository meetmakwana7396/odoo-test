"use client";
import React, { useEffect, useState } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState<any>(null);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<any>([]);

  const removeCartItem = (id: number) => {
    setCart((prev: any) => prev.filter((item: any) => item.id !== id));
  };

  const addToCart = (id: number, product: any) => {
    const foundedInCart = cart.find((product: any) => product.id === id);
    if (foundedInCart) {
      const updatedCart = cart.map((cartItem: any) => {
        if (cartItem.id === id) {
          return {
            ...cartItem,
            qty: (cartItem?.qty && cartItem?.qty + 1) || 2,
          };
        } else {
          return cartItem;
        }
      });
      setCart(updatedCart);
    } else {
      setCart((prev: any) => [...prev, product]);
    }
  };

  useEffect(() => {
    (() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          setProducts(json);
        });
    })();
  }, []);

  return (
    <div className="flex flex-col h-screen max-w-[1400px] mx-auto">
      <input
        type="text"
        className="text-black rounded-full bg-neutral-500/10 border-0 p-4 my-10"
        placeholder="Search products"
        onChange={(e) => setQuery(e.target.value)}
      />

      <h1 className="text-4xl font-bold">Products</h1>
      <div className="flex mt-10 gap-4 flex-row">
        <div className="grid grid-cols-4 gap-10 py-4">
          {products?.length > 0 &&
            (query
              ? products.filter((product: any) =>
                  product.title.startsWith(query)
                )
              : products
            )?.map((product: any) => (
              <div
                className=" bg-neutral-400/10 rounded-lg p-4 flex flex-col"
                key={product.id}
              >
                {product.title}
                <button
                  className="bg-blue-500 p-2 mt-2"
                  onClick={() => addToCart(product.id, product)}
                >
                  Add to cart
                </button>
              </div>
            ))}
        </div>
        <div className="bg-white/10 rounded min-w-[200px] shrink-0 p-2 h-fit">
          <h1 className="text-4xl font-bold">Cart</h1>
          <div className="flex flex-col gap-4 mt-6">
            {cart.length === 0 && (
              <div className="text-center">Your cart is empty</div>
            )}
            {cart.map((carItem: any, index: number) => (
              <div key={index} className="bg-neutral-400/10 rounded-lg p-4">
                <div className="flex gap-2 justify-between">
                  <p className="max-w-[200px]">{carItem?.title}</p>
                  <button
                    className="bg-red-500 rounded p-1 h-fit"
                    onClick={() => removeCartItem(carItem.id)}
                  >
                    DELETE
                  </button>
                </div>
                <span>qty:{carItem?.qty || 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
