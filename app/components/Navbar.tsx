import React from 'react';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-orange-800 text-white py-4 px-6">
      <div className="logo text-white">
        <Image className='dark:invert' src={'logo.svg'} alt="Shopee" width={100} height={50} />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="bg-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-6">
        <a href="#" className="hover:text-blue-500">Trang chủ</a>
        <a href="#" className="hover:text-blue-500">Sản phẩm</a>
        <a href="#" className="hover:text-blue-500">Tin tức</a>
        <a href="#" className="hover:text-blue-500">Liên hệ</a>
      </div>
      <div className="flex items-center space-x-6">
        <a href="#" className="hover:text-blue-500">Đăng nhập</a>
        <a href="#" className="hover:text-blue-500">Đăng ký</a>
        <a href="#" className="hover:text-blue-500">Giỏ hàng</a>
      </div>
    </div>
  );
};

export default Navbar;
