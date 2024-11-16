import { IOrder, IOrderData, TPayment, TFormErrors, TOrderInput } from '../../types/index';
import { IEvents } from '../base/events';

export class OrderData implements IOrderData {
	protected _formErrors: TFormErrors;
	protected _order: IOrder = {
		items: [],
		total: 0,
		address: '',
		payment: '',
        email: '',
		phone: '',
	};
	constructor(protected events: IEvents) {
		this.events = events;
	}
	get formErrors(): TFormErrors {
		return this._formErrors;
	}
	get order(): IOrder {
		return this._order;
	}
	setPayment(value: TPayment) {
		this._order.payment = value;
	}
    setDeliveryAddress(value: string) {
		this._order.address = value;
	}
	setEmail(value: string) {
		this._order.email = value;
	}
    setPhone(value: string) {
		this._order.phone = value;
	}
	setOrderField(field: keyof TOrderInput, value: string) {
		this._order[field] = value;
		this.validateOrder();
	}
	validateOrder() {
		const errors: typeof this._formErrors = {};
		if (!this._order.payment) {
			errors.payment = 'Укажите способ оплаты';
		}
		if (!this._order.email) {
			errors.email = 'Укажите ваш e-mail';
		}
		if (!this._order.address) {
			errors.address = 'Укажите адрес доставки';
		}
		if (!this._order.phone) {
			errors.phone = 'Укажите номер телефона';
		}
		this._formErrors = errors;
		this.events.emit('errors:change', this._formErrors);
		return Object.keys(errors).length === 0;
	}
	clearOrder() {
		this._order = {
			items: [],
			total: 0,
			email: '',
			phone: '',	
			address: '',
			payment: '',
		};
	}
}