import React, { useState } from "react";

import { useCart } from "../utils/CartContext";
import { Link } from "react-router";

const Cart = () => {
  const { cart, subTotal, calculateSubTotal, removeFromCart } = useCart();

  return (
    <>
      {cart.length === 0 ? (
        <>
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 mb-4">
            Your Cart is currently empty ☹️
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
      ) : (
        <div className="mx-20 px-40 py-10 flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cart.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={product.name}
                        src={product.imageUrl}
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className="ml-4">
                            {(product.price * product.quantity).toFixed(2)}
                            &euro;
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {product.quantity}</p>
                        <div className="flex">
                          <button
                            onClick={() => removeFromCart(product.id)}
                            type="button"
                            className=" px-1 py-1 cursor-pointer  border text-white border-transparent bg-red-600 font-medium text-red-600 hover:bg-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p className="text-2xl">Subtotal</p>
              <p className="text-2xl">{subTotal.toFixed(2)}&euro;</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
              >
                Checkout
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link to="/">
                  <button
                    type="button"
                    className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
