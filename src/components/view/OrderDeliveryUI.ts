import { TOrderDelivery } from '../../types/index';
import { IEvents } from '../base/events';
import { FormUI } from './FormUI';

export class OrderDeliveryUI extends FormUI<TOrderDelivery> {
	protected _cardBtn: HTMLButtonElement;
	protected _cashBtn: HTMLButtonElement;
	protected _address: HTMLInputElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this._cardBtn = container.querySelector('button[name="card"]') as HTMLButtonElement;
		this._cashBtn = container.querySelector('button[name="cash"]') as HTMLButtonElement;
        this._address = container.querySelector('input[name="address"]') as HTMLInputElement;
		this._button = container.querySelector(`.order__button`) as HTMLButtonElement;

		if (this._cardBtn) {
			this._cardBtn.addEventListener('click', () => {
				events.emit('order:input', {
					payment: this._cardBtn.name,
					button: this._cardBtn,
				});
			});
		}

		if (this._cashBtn) {
			this._cashBtn.addEventListener('click', () => {
				events.emit('order:input', {
					payment: this._cashBtn.name,
					button: this._cashBtn,
				});
			});
		}

		if (this._button) {
			this._button.addEventListener('click', () => {
				this.events.emit('order:submit');
			});
		}
	}

	set address(value: string) {
		this._address.value = value;
	}

	togglePayment(value: HTMLElement) {
		this.resetPayment();
		this.toggleClass(value, 'button_alt-active', true);
	}

	resetPayment() {
		this.toggleClass(this._cardBtn, 'button_alt-active', false);
		this.toggleClass(this._cashBtn, 'button_alt-active', false);
	}
}