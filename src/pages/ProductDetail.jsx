"use client";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { products_api } from "../axios_instances";

import { useCart } from "../utils/CartContext";

const ProductDetail = () => {
  const { addToCart } = useCart();

  let { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [amountInStock, setAmountInStock] = useState(null);

  const setQuantityToOrder = () => {
    if (quantity < amountInStock) {
      setQuantity(quantity + 1);
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await products_api(`/${productID}`);
      setProduct(data);
      setAmountInStock(data.quantity);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {product ? (
        <div className="bg-white">
          <div className="pt-6">
            <div className="ml-5 mb-10">
              <Link to="/">
                <button
                  type="button"
                  className="mb-4 cursor-pointer flex items-center justify-center bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-hidden"
                >
                  <span aria-hidden="true"> &larr;</span>
                  Back To Products
                </button>
              </Link>
            </div>

            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <img
                alt={product.name}
                src={product.imageUrl}
                className="size-80 rounded-lg object-cover lg:block"
              />
            </div>
            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>
                <p className="mb-2 text-3xl tracking-tight text-gray-900">
                  <span className="text-red-800">Quantity:</span> {quantity}
                </p>
                <p className="text-3xl tracking-tight text-gray-900">
                  <span className="text-red-800">Price:</span> {product.price}
                  &euro;
                </p>
                <div className="flex">
                  <button
                    onClick={() => setQuantityToOrder()}
                    type="submit"
                    className="mr-2 cursor-pointer mt-4 flex items-center justify-center bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                  >
                    Add Quantity
                  </button>

                  <button
                    onClick={() => setQuantity(1)}
                    type="submit"
                    className="mr-2 cursor-pointer mt-4 flex items-center justify-center bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-500 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-hidden"
                  >
                    Reset Quantity
                  </button>
                </div>
                <Link to="/cart">
                  <button
                    onClick={() => {
                      addToCart(
                        product.id,
                        quantity,
                        product.price,
                        product.name,
                        product.imageUrl
                      );
                    }}
                    type="button"
                    className=" cursor-pointer mt-4 flex items-center justify-center bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-hidden"
                  >
                    Add to cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 mb-4">
            Product does not exist ❌
          </h2>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p className="text-lg">
              <Link to="/">
                <button
                  type="button"
                  className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Browse Products
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
