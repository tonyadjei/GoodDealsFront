import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { products_api } from "../utils/AxiosInstances";

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitles = {
      "/": "Home - Goodeals",
      "/cart": "Your Cart - Goodeals",
    };

    document.title = pageTitles[location.pathname] || "Goodeals eCommerce";
  }, [location.pathname]);

  return null;
};

export default DynamicTitle;
