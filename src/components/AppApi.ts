import { IOrder, IProduct, IApi } from '../types/index';
import { ApiListResponse, Api } from './base/api';

export class AppApi extends Api implements IApi {
	readonly cdn: string;
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProducts(): Promise<IProduct[]> {
		return this.get(`/product`)
			.then((data: ApiListResponse<IProduct>) =>
				data.items.map((item) => ({
					...item,
					image: this.cdn + item.image,
				}))
			);
	}

	getProduct(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`)
			.then((item: IProduct) => ({
				...item,
				image: this.cdn + item.image,
			}));
	}

	orderProducts(order: IOrder): Promise<IOrder> {
		return this.post('/order', order)
			.then((data: IOrder) => data);
	}
}