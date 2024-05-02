"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../Loader";

import Link from "next/link";
// Import Swiper styles
import "swiper/css";

export default function Banners() {
	const [isLoading, setLoading] = useState(true);
	const [banners, setBanners] = useState<any[]>([]);

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<Swiper
					spaceBetween={10}
					slidesPerView={2}
					freeMode={true}
					observer={true}
					observeParents={true}
					watchSlidesProgress={true}
					onSlideChange={() => console.log("slide change")}
					onSwiper={(swiper) => console.log(swiper)}
				>
					<SwiperSlide>
						{banners.map((banner) => (
							<Link key={banner.id} href={banner.link}>
								<Image
									className="rounded-lg"
									src={banner.image.data.attributes.url}
									alt={""}
									width={720}
									height={220}
								/>
							</Link>
						))}
					</SwiperSlide>
				</Swiper>
			)}
		</div>
	);
}
