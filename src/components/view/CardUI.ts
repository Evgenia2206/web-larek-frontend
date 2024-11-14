import { ICardActions, ICard } from '../../types/index';
import { categories } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';

export class CardUI extends Component<ICard> {
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _description: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
    protected _index: HTMLElement;
    protected _deleteButton: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);
		this._title = ensureElement<HTMLElement>(`.card__title`, container);
        this._category = container.querySelector(`.card__category`);
        this._description = container.querySelector(`.card__text`);
        this._image = container.querySelector(`.card__image`);
		this._price = ensureElement<HTMLElement>(`.card__price`, container);
		this._button = container.querySelector(`.card__button`);
        this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
        this._deleteButton = ensureElement<HTMLButtonElement>(`.basket__item-delete`, container);

        if (actions && actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
            this._deleteButton.addEventListener('click', actions.onClick);
		}
	}

    set id(value: string) {
		this.container.dataset.id = value;
	}
	get id(): string {
		return this.container.dataset.id || '';
	}
	set title(value: string) {
		this.setText(this._title, value);
	}
	get title() {
		return this._title.textContent || '';
	}
    set category(value: string) {
		this.setText(this._category, value);
		this.toggleClass(this._category, categories.get(value), true);
	}
	get category() {
		return this._category.textContent || '';
	}
    set description(value: string) {
		this.setText(this._description, value);
	}
	get description() {
		return this._description.textContent || '';
	}
    set image(value: string) {
		this.setImage(this._image, value, this.title);
	}
	set price(value: string | null) {
		if (this._price) {
			if (value == null) {
				this.setDisabled(this._button, true);
				this.setText(this._price, 'Бесценно');
				this.setText(this._button, 'Нельзя купить');
			} else {
				this.setDisabled(this._button, false);
				this.setText(this._price, `${value} синапсов`);
			}
		}
	}
	set buttonText(value: string) {
		this._button.textContent = value;
	}
    set index(value: number) {
		this.setText(this._index, value);
	}
}
