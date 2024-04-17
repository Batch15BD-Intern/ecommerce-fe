import Footer from "@/app/components/Footer";
import Loader from "@/app/components/Loader";
import Navbar from "@/app/components/navbar/Navbar";
import { roboto } from "@/app/fonts";
import "@/app/globals.css";
import type { Metadata } from "next";
import React, { Suspense, type ReactNode } from "react";

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
			<body className={`${roboto.className} bg-gray-100`}>
				<Navbar
					facebook={"https://www.facebook.com/hoang3409"}
					instagram={"https://www.instagram.com/?hl=en"}
				/>
				<Suspense fallback={<Loader />}>
					<div className="m-auto max-w-[1200px]">{children}</div>
				</Suspense>
				<Footer />
			</body>
		</html>
	);
}
