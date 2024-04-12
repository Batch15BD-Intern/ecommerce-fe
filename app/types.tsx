export const URL_API = "https://ecommerce-be-gqhu.onrender.com";

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
		description: string;
		brand: Brand;
		category: Category;
		product_items: ProductItems;
	};
};

export type ProductItems = {
	data: [
		{
			id: number;
			attributes: {
				price: number;
				quantity: number;
				product_config: ProductConfig;
			};
		},
	];
};

export type ProductConfig = {
	data: [
		{
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
		},
	];
};

export type Product = {
	id: number;
	attributes: {
		name: string;
		physical_product: boolean;
		category: Category;
		brand: Brand;
		product_items: ProductsItemsPrice;
		image: Image;
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

export type ProductsItemsPrice = {
	data: [
		{
			id: number;
			attributes: {
				price: number;
			};
		},
	];
};

export type Image = {
	data: {
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
};

export type ImageFormats = {
	url: string;
	name: string;
	width: number;
	height: number;
};

export type Meta = {
	pagination: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
};
