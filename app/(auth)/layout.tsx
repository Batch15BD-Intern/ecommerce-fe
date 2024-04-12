import "../globals.css";
import type { Metadata } from "next";
import Footer from "../components/Footer";
import { poppins } from "../fonts";
import SecondNavbar from "../components/navbar/SecondNavbar";
import React, { type ReactNode } from "react";

export const metadata: Metadata = {
	title: "Login to your account",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.className} bg-gray-100`}>
				<SecondNavbar />
				<div className="bg-[#ee4d2d]">
					<div className="max-w-[1200px] m-auto">{children}</div>
				</div>
				<Footer />
			</body>
		</html>
	);
}
