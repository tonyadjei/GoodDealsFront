import React, { useState } from "react";
import goodeals_img from "../assets/Goodeals.png";
import { auth_api } from "../utils/AxiosInstances";
import { useSession } from "../utils/SessionContext";
import { useNavigate } from "react-router";

const Login = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  let { setUserJWT } = useSession();

  const updateFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const login = async (event) => {
    try {
      event.preventDefault();
      const { data, status } = await auth_api.post("/login", {
        userName: formData.userName,
        password: formData.password,
      });
      if (status === 200) {
        setUserJWT(data.accessToken);
        navigateTo("/", { replace: true });
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Goodeals logo"
            src={goodeals_img}
            className="mx-auto size-40 w-auto"
          />
          <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign-in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={login} className="space-y-6">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  onChange={updateFormData}
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={updateFormData}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer rounded-sm flex w-full justify-center bg-cyan-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
