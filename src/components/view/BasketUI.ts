import { IBasket } from '../../types/index';
import { createElement, ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { IEvents } from '../base/events';

export class BasketUI extends Component<IBasket> {
	protected _products: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._products = ensureElement<HTMLElement>(`.basket__list`, this.container);
		this._total = this.container.querySelector(`.basket__price`);
		this._button = this.container.querySelector(`.basket__button`);

		this.items = [];

		if (this._button) {
			this._button.addEventListener('click', () => {
				this.events.emit('order:open');
			});
		}
	}

	updateButtonState() {
		const totalPrice = parseFloat(this._total.textContent || '0');
		if (totalPrice > 0) {
			this.setDisabled(this._button, false);
		} else {
			this.setDisabled(this._button, true);
		}
	}

	set total(value: number) {
		this._total.textContent = `${value} синапсов`;
		this.updateButtonState();
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._products.replaceChildren(...items);
		} else {
			this._products.replaceChildren(createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' })
			);
		}
		this.updateButtonState();
	}
}