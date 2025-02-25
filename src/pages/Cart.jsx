import React, { useState } from "react";

import { useCart } from "../utils/CartContext";
import { Link } from "react-router";

const Cart = () => {
  const { cart, subTotal, emptyCart, removeFromCart } = useCart();

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
              <button
                onClick={() => emptyCart()}
                type="button"
                className="mb-10 rounded-sm px-2 py-1 border border-2 cursor-pointer flex items-center justify-center bg-amber-600 text-base font-medium text-white hover:bg-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-hidden"
              >
                Empty Cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 ml-1 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
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
                            className="rounded-sm px-1 py-1 cursor-pointer  border text-white border-transparent bg-amber-600 font-medium text-amber-600 hover:bg-amber-500"
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
            <p className="mt-0.5 text-lg text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-5 justify-self-center">
              <Link to="#">
                <button
                  type="button"
                  className="mb-4 rounded-sm cursor-pointer flex items-center justify-center bg-cyan-800 px-8 py-3 text-base font-medium text-white hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:outline-hidden"
                >
                  Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-1 size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                </button>
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link to="/">
                  <button
                    type="button"
                    className="cursor-pointer font-medium text-amber-700 hover:text-amber-500"
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
