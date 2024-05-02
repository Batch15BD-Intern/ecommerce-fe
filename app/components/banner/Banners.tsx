"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import Loader from "../Loader";
import Link from "next/link";
import "swiper/css";
import getBanners from "@/app/actions/getBanners";

export default function Banners() {
	const [isLoading, setLoading] = useState(true);
	const [banners, setBanners] = useState<any[]>([]);

	useEffect(() => {
		getBanners().then((res) => {
			setBanners(res.data.attributes.BannerItem);
			setLoading(false);
		});
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
					{banners.map((banner) => (
						<SwiperSlide key={banner.id}>
							<Link href={banner.link}>
								<Image
									className="rounded-lg"
									src={banner.image.data.attributes.url}
									alt={banner.title}
									width={720}
									height={220}
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	);
}
