"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../Logo";

type NavbarProps = {
	icon: string;
	facebook: string;
	instagram: string;
};

export default function Navbar({ icon, facebook, instagram }: NavbarProps) {
	const { user, logout } = useAuth();
	const [search, setSearch] = useState<string>("");
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className="top-0 w-full h-[50] bg-gradient-to-r from-[#f53d2d] to-[#f63] z-100 flex flex-col items-center">
			<div className="w-[1200px] flex justify-between text-white text-sm">
				<div className="opacity-90 flex gap-2">
					<span>Kênh Người Bán</span>
					<span>Tải ứng dụng</span>
					<span className="flex items-center gap-1">
						Kết nối
						<div className="flex gap-2.5">
							<Link href={facebook}>
								<FaFacebook />
							</Link>
							<Link href={instagram}>
								<FaInstagram />
							</Link>
						</div>
					</span>
				</div>
				<div className="flex gap-2">
					<div>Thông Báo</div>
					<div>Hỗ Trợ</div>
					<div>Ngôn ngữ</div>
					<div>
						{isClient && user ? (
							<div onClick={logout}>{user.username}</div>
						) : (
							<div className="flex gap-2">
								<Link href={"/auth"}>Đăng ký</Link>
								<div>|</div>
								<Link href={"/auth"}>Đăng nhập</Link>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="w-[1200px] py-[16px] flex justify-around items-center">
				<div className="h-[65px] w-[192px]">
					<Logo fill="white" />
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
					<Link href={"/cart"}>
						<CgShoppingCart className="text-3xl text-white" />
					</Link>
				</div>
			</div>
		</div>
	);
}
