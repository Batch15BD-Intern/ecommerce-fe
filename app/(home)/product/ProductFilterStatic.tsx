import MyButton from "@/app/components/Button";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const sort = [
	{
		id: 1,
		name: "Giá thấp đến cao",
	},
	{
		id: 2,
		name: "Giá cao đến thấp",
	},
];

export const ProductFilterStatic = () => {
	return (
		<div
			className="flex items-center 
				justify-between bg-white 
				bg-opacity-5 leading-4"
		>
			<div className="text-[#555555] line-clamp-1">Sắp xếp theo</div>
			<div className="flex basis-0 items-center justify-start capitalize">
				<MyButton className="bg-[#ee4d2d] text-white" label={"Liên Quan"} />
				<MyButton className="bg-[#fdfdfd]" label={"Mới Nhất"} />
				<MyButton className="bg-[#fdfdfd]" label={"Bán Chạy"} />
				<Dropdown>
					<DropdownTrigger>
						<Button className="bg-[#fdfdfd]">Sắp Xếp Theo</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Static Actions">
						<DropdownItem key={sort[0].id}>{sort[0].name}</DropdownItem>
						<DropdownItem key={sort[1].id}>{sort[1].name}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
			<div className="flex gap-2 items-center">
				<span>1/2</span>
				<div>
					<MyButton isIconOnly icon={<MdNavigateBefore />}></MyButton>
					<MyButton isIconOnly icon={<MdNavigateNext />}></MyButton>
				</div>
			</div>
		</div>
	);
};
