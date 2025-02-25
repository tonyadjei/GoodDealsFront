import React, { useEffect, useState } from "react";
import { products_api } from "../utils/AxiosInstances";
import { Link } from "react-router";

import goodeals_img from "../assets/Goodeals.png";
import { useSession } from "../utils/SessionContext";

const Homepage = () => {
  const { isLoggedIn } = useSession();
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const { data, status } = await products_api("");
      if (status === 200) {
        setProducts(data);
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
        <div className="mt-0 flex justify-self-center">
          <h1 className="self-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome to{" "}
          </h1>
          <img className="size-80" src={goodeals_img} alt="Goodeals logo" />
        </div>
        {products.length === 0 ? (
          <>
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 mb-4">
              We have no products at the moment, please try again later ☹️
            </h2>
          </>
        ) : (
          <div>
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                All Products
                <p className="mt-0.5 text-lg text-gray-500">
                  Browse through our product catalog.
                </p>
              </h2>
              {isLoggedIn ? (
                <Link to="/cart">
                  <button
                    type="button"
                    className="mb-4 rounded-sm cursor-pointer flex items-center justify-center bg-cyan-800 px-4 py-1 text-base font-medium text-white hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-hidden"
                  >
                    Go to Cart
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id}>
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
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {product.price}&euro;
                    </p>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      Left in Stock: {product.quantity}
                    </p>
                    <button className="mt-2 rounded-sm cursor-pointer justify-center bg-cyan-800 px-4 py-1 text-base font-medium text-white hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-hidden">
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
