import React from 'react';
import ProductCard from './product/ProductCard';

const Home = () => {
  const products = [
    {
      name: "Áo thun nam NAKA",
      image: "/shopping.png",
      description: "Áo thun nam NAKA chất liệu cotton co giãn, thoáng mát, phù hợp cho mọi hoạt động.",
      price: 68000,
      originalPrice: 99000,
      sold: 89,
      percent: 10,
      voucher: {
        image: "/1.PNG",
        discount: 20000,
        minOrderValue: 250000,
      },
      details: {
        material: "Cotton",
        type: "Áo thun ngắn tay",
        color: "Xanh Klein",
        brand: "NAKA",
        origin: "Việt Nam",
      },
    },
    {
      name: "Áo thun nam NAKA",
      image: "/shopping.png",
      description: "Áo thun nam NAKA chất liệu cotton co giãn, thoáng mát, phù hợp cho mọi hoạt động.",
      price: 68000,
      originalPrice: 99000,
      sold: 89,
      percent: 10,
      voucher: {
        image: "/1.PNG",
        discount: 20000,
        minOrderValue: 250000,
      },
      details: {
        material: "Cotton",
        type: "Áo thun ngắn tay",
        color: "Xanh Klein",
        brand: "NAKA",
        origin: "Việt Nam",
      },
    },
    // Thêm các sản phẩm khác vào đây...
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default Home;
