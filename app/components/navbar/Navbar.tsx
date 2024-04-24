"use client";

import getAutocomplete from "@/app/actions/getAutocomplete";
import Logo from "@/app/components/Logo";
import { useAuth } from "@/app/hooks/useAuth";
import type { Product } from "@/app/types";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useEffect, useRef, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaFacebook, FaInstagram } from "react-icons/fa";

type NavbarProps = {
	facebook: string;
	instagram: string;
};

export default function Navbar({ facebook, instagram }: NavbarProps) {
	const [isClient, setIsClient] = useState(false);
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const { user, logout } = useAuth();
	const params = useSearchParams();
	const route = useRouter();
	const [search, setSearch] = useState<string>("");
	const [autocomplete, setAutocomplete] = useState<Product[]>([]);

	const handle = (_query?: string) => {
		setAutocomplete([]);
		let current_query = {};

		if (params) {
			current_query = qs.parse(params.toString());
		}

		if (search || _query) {
			current_query = _query
				? {
						query: _query,
					}
				: {
						query: search,
					};
		}

		const url = qs.stringify(current_query, { skipNulls: true });
		route.push(`/product?${url}`);
	};

	const autocompleteTimeoutRef = useRef<any>();
	const handleAutocomplete = (query: string) => {
		setSearch(query);
		if (!query) {
			setAutocomplete([]);
			return;
		}

		if (autocompleteTimeoutRef.current) {
			clearTimeout(autocompleteTimeoutRef.current);
		}

		autocompleteTimeoutRef.current = setTimeout(() => {
			if (!query) {
				setAutocomplete([]);
				return;
			}
			getAutocomplete(query).then((res) => {
				setAutocomplete(res.data);
			});
		}, 650);
	};

	const handleSelectAutocomplete = (product: Product) => {
		setAutocomplete([]);
		setSearch(product.attributes.name);
		handle(product.attributes.name);
	};

	useEffect(() => {
		setIsClient(true);
	}, []);

	function goToProfile() {
		route.push("/profile");
	}

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
							<div onClick={goToProfile}>{user.username}</div>
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
					<div className="relative flex bg-white px-[0.625rem] py-[7px]">
						<input
							className="w-full outline-none"
							aria-label="Tìm sản phẩm, thương hiệu, và tên shop"
							placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
							aria-autocomplete="list"
							aria-controls="shopee-searchbar-listbox"
							aria-expanded="false"
							role="combobox"
							value={search}
							onChange={(e) => handleAutocomplete(e.target.value)}
							onFocus={() => setIsSearchFocused(true)}
							onBlur={() => setIsSearchFocused(false)}
						/>
						<Button
							className="h-[32px] w-10 rounded-none bg-[#fb5533] outline-none"
							onClick={() => handle()}
							isIconOnly
						>
							<CiSearch className="text-white" />
						</Button>
					</div>
					{isSearchFocused && (
						<div className="absolute mt-2 flex flex-col w-[840px] z-50">
							{autocomplete.map((item) => (
								<div
									className="cursor-pointer bg-white p-2"
									key={item.id}
									onClick={() => handleSelectAutocomplete(item)}
								>
									{item.attributes.name}
								</div>
							))}
						</div>
					)}
				</div>
				<div>
					<CgShoppingCart className="text-3xl text-white" />
				</div>
			</div>
		</div>
	);
}
