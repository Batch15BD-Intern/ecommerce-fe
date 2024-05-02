import { create } from "zustand";

type VoucherStore = {
	voucher?: {
		id: number;
		voucherCode: string;
		amount: number;
		type: string;
		products: {}[];
	} | null;
	saveVoucher: (
		id: number,
		voucherCode: string,
		amount: number,
		type: string,
		products: {}[],
	) => void;
	clearVoucher: () => void;
};

export const useVoucher = create<VoucherStore>((set) => ({
	voucher: JSON.parse(localStorage.getItem("voucher") || "null"),
	saveVoucher: (
		id: number,
		voucherCode: string,
		amount: number,
		type: string,
		products: {}[], // Array of objects with an id property
	) => {
		const formattedProducts = products.map((item) => ({ id: item }));
		const voucher = {
			id,
			voucherCode,
			amount,
			type,
			products: formattedProducts,
		};
		localStorage.setItem("voucher", JSON.stringify(voucher));
		set({ voucher });
	},
	clearVoucher: () => {
		localStorage.removeItem("voucher");
		set({ voucher: null });
	},
}));
