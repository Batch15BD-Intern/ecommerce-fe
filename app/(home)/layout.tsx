import type { Metadata } from "next";
import React, { type ReactNode } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";
import { poppins } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
	title: "Home",
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
				<Navbar
					icon={""}
					facebook={"https://www.facebook.com/hoang3409"}
					instagram={"https://www.instagram.com/?hl=en"}
				/>
				<div className="m-auto max-w-[1200px]">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
