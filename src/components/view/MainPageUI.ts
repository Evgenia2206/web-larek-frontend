import { Component } from "../base/component";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { IMainPage } from "../../types/index";

export class MainPageUI extends Component<IMainPage> {
    protected _counter: HTMLElement;
    protected _catalogue: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _cart: HTMLElement;


    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._counter = ensureElement<HTMLElement>('.header__basket-counter');
        this._catalogue = ensureElement<HTMLElement>('.gallery');
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._cart = ensureElement<HTMLElement>('.header__basket');

        this._cart.addEventListener('click', () => {
            this.events.emit('cart:open');
        });
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set catalogue(items: HTMLElement[]) {
        this._catalogue.replaceChildren(...items);
    }

    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }
}