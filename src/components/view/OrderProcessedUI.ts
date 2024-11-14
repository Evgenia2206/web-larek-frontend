import { Component } from "../base/component";
import { ensureElement } from "../../utils/utils";
import { IOrderProcessed, IOrderProcessedActions } from '../../types/index';

export class OrderProcessedUI extends Component<IOrderProcessed> {
    protected _totalOrder: HTMLElement;
    protected _continueButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions: IOrderProcessedActions) {
		super(container);

		this._totalOrder = container.querySelector('.order-success__description');
		this._continueButton = ensureElement<HTMLButtonElement>('.order-success__close',this.container);
		if (actions.onClick) {
			this._continueButton.addEventListener('click', actions.onClick);
		}
	}
	set total(total: number) {
		this.setText(this._totalOrder, `Ваш заказ ${total} синапсов`);
	}
}

