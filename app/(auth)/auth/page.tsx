"use client";

import { type FormEvent, useEffect, useState } from "react";
import Button from "../../components/Button";
import { URL_API } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function AuthPage() {
	const { user } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { save_token } = useAuth();
	const route = useRouter();

	useEffect(() => {
		if (user) {
			route.push("/");
		}
	});

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		await fetch(`${URL_API}/api/auth/local`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				identifier: email,
				password: password,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					alert(res.error.message);
					return;
				}
				save_token(res.jwt, res.user);
			});
	};

	const handleLoginWithSocial = (provider: string) => {
		window.open(`${URL_API}/api/connect/${provider}`, "_self");
	};

	return (
		<div className="h-[600px] flex justify-around items-center">
			<div></div>
			<div>
				<div className="bg-white w-[400px] rounded-lg shadow-md">
					<div className="w-full text-2xl font-light px-[30px] pt-[30px]">
						Đăng nhập
					</div>
					<form
						className="flex flex-col gap-[20px] px-[30px] py-[1.375rem]"
						onSubmit={handleLogin}
					>
						<input
							className="p-[12px]"
							placeholder="Email/Số điện thoại/Tên đăng nhập"
							id="email"
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							className="p-[12px]"
							placeholder="Mật khẩu"
							id="password"
							name="password"
							type="password"
							maxLength={16}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className="text-sm font-light">
							<Button
								type="submit"
								label={"ĐĂNG NHẬP"}
								onClick={() => {}}
							></Button>
						</div>
					</form>
					<div className="text-sm font-light px-[30px] text-blue-700">
						<Link href={"/"}>Quên mật khẩu</Link>
					</div>
					<div className="flex py-[1.375rem] px-[30px] gap-3">
						<Button
							icon={FcGoogle}
							label={"Google"}
							onClick={() => handleLoginWithSocial("google")}
							outline
						/>
						<Button
							icon={FaGithub}
							label={"Github"}
							onClick={() => handleLoginWithSocial("github")}
							outline
						/>
					</div>
					<div className="m-auto pb-[1.375rem] px-[30px] flex gap-1">
						<div className="opacity-30">Bạn mới biết đến Ecommerce? </div>
						<Link className="text-[#ee4d2d]" href={"/"}>
							Đăng ký
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
