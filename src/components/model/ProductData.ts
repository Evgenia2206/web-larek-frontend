import { IProduct, IProductData } from '../../types/index';
import { IEvents } from '../base/events';

export class ProductData implements IProductData {
	protected _products: IProduct[];
	protected _preview: string | null;

	constructor(protected events: IEvents) {
		this.events = events;
	}
	get products(): IProduct[] {
		return this._products;
	}
	setProducts(products: IProduct[]) {
		this._products = products;
		this.events.emit('card:change');
	}
	getProducts(): IProduct[] {
		return this._products;
	}
	getProduct(id: string) {
		return this.products.find((product) => product.id === id) || null;
	}
	savePreview(product: IProduct): void {
		this._preview = product.id;
		this.events.emit('preview:change', product);
	}
	get preview(): string | null {
		return this._preview;
	}
}