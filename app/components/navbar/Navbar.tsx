"use client";

import Logo from "@/app/components/Logo";
import { useAuth } from "@/app/hooks/useAuth";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useEffect, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaFacebook, FaInstagram } from "react-icons/fa";

type NavbarProps = {
	facebook: string;
	instagram: string;
};

export default function Navbar({ facebook, instagram }: NavbarProps) {
	const { user, logout } = useAuth();
	const params = useSearchParams();
	const route = useRouter();
	const [search, setSearch] = useState<string>("");
	const [isClient, setIsClient] = useState(false);

	const handle = () => {
		let current_query = {};

		if (params) {
			current_query = qs.parse(params.toString());
		}

		if (search) {
			current_query = {
				query: search,
			};
		}

		const url = qs.stringify(current_query, { skipNulls: true });
		route.push(`/product?${url}`);
	};

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className="top-0 w-full bg-gradient-to-r from-[#f53d2d] to-[#f63] z-100 flex flex-col items-center">
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
					<div className="flex bg-white px-[0.625rem] py-[7px]">
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
						<Button
							className="h-[32px] w-10 rounded-none bg-[#fb5533] outline-none"
							onClick={handle}
							isIconOnly
						>
							<CiSearch className="text-white" />
						</Button>
					</div>
				</div>
				<div>
					<CgShoppingCart className="text-3xl text-white" />
				</div>
			</div>
		</div>
	);
}
