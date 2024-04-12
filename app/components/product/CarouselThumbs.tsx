import type { Gallery } from "@/app/types";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

interface CarouselThumbsProps {
	gallery: Gallery[];
	setThumbsSwiper: any;
}

export default function CarouselThumbs({
	gallery,
	setThumbsSwiper,
}: CarouselThumbsProps) {
	return (
		<div className="max-w-md mt-5 lg:mt-8 mx-auto relative lg:pb-2">
			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={20}
				slidesPerView={4}
				watchSlidesProgress={true}
				freeMode={true}
				observer={true}
				observeParents={true}
			>
				{gallery?.map((item: { id: any; imgUrl: string | StaticImport }) => (
					<SwiperSlide
						key={`product-thumb-gallery-${item.id}`}
						className="flex items-center justify-center cursor-pointer rounded overflow-hidden border border-border-200 border-opacity-75 hover:opacity-75"
					>
						<Image
							src={item.imgUrl}
							alt={`Product thumb gallery ${item.id}`}
							width={80}
							height={80}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
