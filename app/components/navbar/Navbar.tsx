"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../Logo";
import { getCartsJwt } from "@/app/actions/api_carts/getCarts";
import type { ResponseCart } from "@/app/types";
import IconCart from "../cart/IconCart";
import { CgSearch } from "react-icons/cg";

type NavbarProps = {
	icon: string;
	facebook: string;
	instagram: string;
};
type Props = {
	params: {
		id: string;
	};
};

export default function Navbar({ facebook, instagram }: NavbarProps) {
	const { user, logout, jwt } = useAuth();
	const [search, setSearch] = useState<string>("");
	const [carts, setCarts] = useState<ResponseCart | null>(null);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		if (!jwt) {
			console.log("JWT is undefined. Please log in to make a purchase.");
			return;
		}

		getCartsJwt(jwt)?.then((res) => {
			setCarts(res);
		});
	}, [jwt]);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className="top-0 w-full h-[50] bg-gradient-to-r from-[#f53d2d] to-[#f63] z-100 flex flex-col items-center">
			<div className="2xl:w-[1200px] lg:w-[1000px] sm:w-[500px] md:w-[650px] flex justify-between text-white">
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
			<div className="2xl:w-[1200px] lg:w-[1000px] sm:w-[500px] md:w-[700px] py-[16px] flex justify-around items-center">
				<div className="h-[60px] w-[160px]">
					<Logo fill="white" />
				</div>
				<div className=" 2xl:w-[850px] lg:w-[600px] sm:w-[250px] md:w-[400px]">
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
							<CgSearch className="text-white h-5 w-5" />
						</button>
					</div>
				</div>
				<IconCart />
			</div>
		</div>
	);
}
