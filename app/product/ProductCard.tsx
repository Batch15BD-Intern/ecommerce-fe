"use client";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
      {/* Yellow border */}
      <div className="absolute inset-3 border-2 border-yellow-500 rounded-lg pointer-events-none"></div>

      {/* Product image */}
      <a href="#" className="relative block">
        {/* Discount percentage */}
        <span className="bg-yellow-100 text-blue-800 text-xs font-semibold rounded absolute top-2 left-2 py-0.5 px-2 dark:bg-yellow-200 dark:text-blue-800">
          -{product.percent}%
        </span>
        <img
          className="p-8 rounded-t-lg mx-auto"
          src={product.image || "/shopping.png"}
          alt="product image"
        />
      </a>

      {/* Voucher image */}
      {/* <div className="flex items-center justify-center">
        <img
          className="p-4 rounded-t-lg"
          src={product.voucher.image || "/1.PNG"}
          alt="voucher image"
        />
      </div> */}

      {/* Product name */}
      <div className="px-5 pb-5">
        <a href="#" className="relative block">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white absolute inset-x-8 bottom-0 px-12 py-2">
            {product.name}
          </h5>
        </a>
        
        {/* Discount */}
        <div className="flex items-center mt-2.5 mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            -${product.voucher.discount}
          </span>
        </div>

        {/* Price and sold count */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Sold {product.sold}
          </span>
          
          {/* Buy button */}
          {/* <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Buy Now</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
