import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import goodeals_img from "../assets/Goodeals.png";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router";
import { useSession } from "../utils/SessionContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { pathname } = useLocation();

  const { isLoggedIn, logout } = useSession();

  const navigation = [
    {
      name: "Home",
      href: "/",
      current: pathname === "/" ? true : false,
      isLoggedIn: isLoggedIn,
    },
    {
      name: "Cart",
      href: "/cart",
      current: pathname === "/cart" ? true : false,
      isLoggedIn: isLoggedIn,
    },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Goodeals logo"
                src={goodeals_img}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-amber-600"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium",
                      item.isLoggedIn || item.name == "Home" ? "" : "hidden"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {isLoggedIn ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="cursor-pointer relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="size-10 text-amber-600" />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <Link
                      to="/profile"
                      className="cursor-pointer block px-4 py-2 text-sm text-amber-700 data-focus:bg-amber-100 data-focus:outline-hidden"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <span
                      onClick={logout}
                      className="cursor-pointer block px-4 py-2 text-sm text-amber-700 data-focus:bg-amber-100 data-focus:outline-hidden"
                    >
                      Sign out
                    </span>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="mr-2 rounded-sm cursor-pointer bg-cyan-800 px-4 py-1 text-base font-medium text-white hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-hidden">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="mr-2 rounded-sm cursor-pointer bg-cyan-800 px-4 py-1 text-base font-medium text-white hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-hidden">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-amber-600"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium",
                item.isLoggedIn || item.name == "Home" ? "" : "hidden"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
