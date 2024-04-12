import "../globals.css";
import type { Metadata } from "next";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { poppins } from "../fonts";
import React, { type ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";

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
				<div className="max-w-[1200px] m-auto">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
