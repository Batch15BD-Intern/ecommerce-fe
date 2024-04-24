// export const URL_API = "https://ecommerce.zeabur.app";
export const URL_API = "http://localhost:1337";
export type ResponseAuth = {
	jwt: string;
	user: User;
};

export type ResponseError = {
	data: string;
	error: {
		status: number;
		name: string;
		message: string;
		details: {};
	};
};

export type ResponseCart = {
	data: [
		{
			id: number;
			quantity: number;
			product_item: ProductItemsCart;
		},
	];
	error: {
		status: number;
		name: string;
		message: string;
		details: {};
	};
};
export type ResponseDiscount = {
	data: [
		{
			id: number;
			attributes: {
				discount_code: string;
				discount_amount: number;
				expiration_date: Date;
				type: string;
			};
		},
	];
};

export type GetAccessTokenResponse = {
	jwt: string;
	user: User;
};

export type User = {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
	phone: string | null;
};

export type ResponseListingProduct = {
	data: Product[];
	meta: Meta;
};

export type ResponseProductDetails = {
	data: ProductDetails;
	meta: Meta;
};

export type ProductDetails = {
	id: number;
	attributes: {
		name: string;
		description: string;
		attributes: object;
		brand: Brand;
		category: Category;
		image: {
			data: Image;
		};
		product_items: {
			id(jwt: string, quantity: number, id: any): unknown;
			data: ProductItems[];
		};
	};
};

export type ProductItems = {
	id: number;
	attributes: {
		name: string;
		price: number;
		quantity: number;
		image: {
			data: Image[];
		};
		product_config: {
			data: ProductConfig[];
		};
	};
};
export type ProductItemsCart = {
	id: number;
	price: number;
	name: string;
	image: [
		{
			formats: {
				small: ImageFormats;
				medium: ImageFormats;
				thumbnail: ImageFormats;
			};
		},
	];
};

export type ProductConfig = {
	id: number;
	attributes: {
		value: string;
		variation: {
			data: {
				id: number;
				attributes: {
					name: string;
				};
			};
		};
	};
};

export type Product = {
	id: number;
	attributes: {
		name: string;
		physical_product: boolean;
		category: Category;
		brand: Brand;
		product_items: {
			data: ProductItems[];
		};
		image: {
			data: Image;
		};
	};
};

export type Category = {
	data: {
		id: number;
		attributes: {
			name: string;
			locale: string;
			parent_category: Category;
		};
	};
};

export type Brand = {
	data: {
		id: number;
		attributes: {
			name: string;
		};
	};
};

export type Image = {
	id: number;
	attributes: {
		name: string;
		url: string;
		formats: {
			small: ImageFormats;
			medium: ImageFormats;
			thumbnail: ImageFormats;
		};
	};
};

export type ImageFormats = {
	url: string;
	name: string;
	width: number;
	height: number;
};

export type Meta = {
	pagination: Pagination;
};

export type Pagination = {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
};

export type Gallery = {
	id: number;
	imgUrl: string;
};
