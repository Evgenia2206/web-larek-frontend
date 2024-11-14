import { IEvents } from '../base/events';
import { IBasketData, TBasketProduct } from '../../types/index';

export class BasketData implements IBasketData {
	protected _products: TBasketProduct[] = [];

	constructor(protected events: IEvents) {
		this.events = events;
	}
	get products(): TBasketProduct[] {
		return this._products;
	}
	addToBasket(product: TBasketProduct) {
		this._products.push(product);
		this.events.emit('basket:count');
	}
	removeFromBasket(product: TBasketProduct) {
		this._products = this._products.filter(
			(_product) => _product.id !== product.id
		);
		this.events.emit('basket:count');
	}
	isBasketProduct(product: TBasketProduct) {
		return !this.products.some((card) => card.id === product.id)
			? this.addToBasket(product)
			: this.removeFromBasket(product);
	}
	getButtonState(product: TBasketProduct) {
		if (
			product.price === null ||
			product.price === undefined ||
			String(product.price) === 'Бесценно'
		) {
			return 'Нельзя купить';
		}
		return !this._products.some((card) => card.id === product.id)
			? 'Купить'
			: 'Удалить';
	}
	getProductsCost() {
		let total = 0;
		this._products.map((elem) => {
			total += elem.price;
		});
		return total;
	}
	clearBasket() {
		this._products = [];
		this.events.emit('basket:count');
	}
	/*processBasketToOrder(orderData: IOrder) {
		const orderProducts = this._products.map((product) => product.id);
		order = orderProducts;
	}*/
}
