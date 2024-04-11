"use client";

import { useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Image from 'next/image';
import Link from "next/link";

type NavbarProps = {
  icon: string;
  facebook: string;
  instagram: string;
};

export default function Navbar({ icon, facebook, instagram }: NavbarProps) {

  const [search, setSearch] = useState<string>("");

  return (
    <div className="top-0 w-full h-[50] bg-gradient-to-r from-[#f53d2d] to-[#f63] z-100 flex flex-col items-center">
      <div className="w-[1200px] flex justify-between text-white text-sm">
        <div className="opacity-90 flex gap-2">
          <span>Kênh Người Bán</span>
          <span>Tải ứng dụng</span>
          <span className="flex items-center gap-1">Kết nối
            <div className="flex gap-2.5">
              <Link href={facebook}><FaFacebook /></Link>
              <Link href={instagram}><FaInstagram /></Link>
            </div>
          </span>
        </div>
        <div className="flex gap-2">
          <div>Thông Báo</div>
          <div>Hỗ Trợ</div>
          <div>Ngôn ngữ</div>
          <div>Username</div>
        </div>
      </div>
      <div className="w-[1200px] py-[16px] flex justify-between items-center">
        <div>
          <Image className='dark:invert' src={'logo.svg'} alt="Shopee" width={150} height={40} />
        </div>
        <div className="w-[840px]">
          <div className="px-[0.625rem] bg-white flex py-[7px]">
            <input
              className="w-full outline-none"
              aria-label="Tìm sản phẩm, thương hiệu, và tên shop"
              placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
              aria-autocomplete="list"
              aria-controls="shopee-searchbar-listbox"
              aria-expanded="false"
              role="combobox"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-[#fb5533] px-[20px] h-[32px]">
              <CiSearch className="text-white" />
            </button>
          </div>
        </div>
        <div>
          <CgShoppingCart className="text-3xl text-white" />
        </div>
      </div>
    </div>
  );
}