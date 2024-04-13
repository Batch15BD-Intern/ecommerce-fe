"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import MyButton from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { URL_API } from "../../types";

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
		<div className="flex h-[600px] items-center justify-around">
			<div></div>
			<div>
				<div className="w-[400px] rounded-lg bg-white shadow-md">
					<div className="w-full px-[30px] pt-[30px] text-2xl font-light">
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
							<MyButton
								className={`w-full bg-[#ee4d2d] text-white`}
								label={"ĐĂNG NHẬP"}
								onClick={() => {}}
								type="submit"
							></MyButton>
						</div>
					</form>
					<div className="px-[30px] text-sm font-light text-blue-700">
						<Link href={"/"}>Quên mật khẩu</Link>
					</div>
					<div className="flex items-center justify-center gap-3 px-[30px] py-[1.375rem]">
						<MyButton
							className="w-full"
							icon={<FcGoogle />}
							label={"Google"}
							onClick={() => handleLoginWithSocial("google")}
							outline
						/>
						<MyButton
							className="w-full"
							icon={<FaGithub />}
							label={"Github"}
							onClick={() => handleLoginWithSocial("github")}
							outline
						/>
					</div>
					<div className="m-auto flex gap-1 px-[30px] pb-[1.375rem] text-sm">
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
