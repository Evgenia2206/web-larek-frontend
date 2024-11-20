import { TOrderContacts } from '../../types/index';
import { IEvents } from '../base/events';
import { FormUI } from './FormUI';

export class OrderContactsUI extends FormUI<TOrderContacts> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);

		this._email = container.querySelector('input[name="email"]') as HTMLInputElement;
		this._phone = container.querySelector('input[name="phone"]') as HTMLInputElement;
		this._button = this.container.querySelector(`.button`) as HTMLButtonElement;

		if (this._button) {
			this._button.addEventListener('click', () => {
				this.events.emit('order:process');
			});
		}
	}

	set email(value: string) {
		this._email.value = value;
	}

    set phone(value: string) {
		this._phone.value = value;
	}
}
