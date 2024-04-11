"use client";
import React from "react";

type ProductCardProps = {
  product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="w-[190px] bg-white cursor-pointer text-sm">
      <div>
        <div className="w-full h-full">
          <img className="object-cover" src="/shopping.png" alt="" />
        </div>

        <div className="p-2">
          <span className="line-clamp-2">
            {product.name}
          </span>
          <div>
            Voucher
          </div>
          <div className="flex justify-between">
            <span className="text-base align-baseline text-[#EE4D2D]">
              Money
            </span>
            <span>
              Sold
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
