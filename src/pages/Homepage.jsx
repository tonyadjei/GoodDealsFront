import React, { useEffect, useState } from "react";
import { products_api } from "../axios_instances";
import { Link } from "react-router";
import ProductDetail from "./ProductDetail";

const Homepage = () => {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const { data } = await products_api("");
      setProducts(data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
            All Products
          </h2>
          <Link to="/cart">
            <button
              type="button"
              className="mb-4 cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-500 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-hidden"
            >
              Go to Cart
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <>
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="group"
              >
                <img
                  alt={product.name}
                  src={product.imageUrl}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                />
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}&euro;
                </p>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  Left in Stock: {product.quantity}
                </p>
                <button className="mt-2 cursor-pointer justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-500 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-hidden">
                  View Details
                </button>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
