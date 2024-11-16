import { ApiPostMethods } from '../components/base/api'

// Тип способа оплаты
export type TPayment = 'card' | 'cash';

// Тип категории товара
//type TCategory = 'другое' | 'софт-скил'	| 'дополнительное'	| 'кнопка'	| 'хард-скил';

// Тип товара в корзине
export type TBasketProduct = Pick<IProduct, 'id' | 'title' | 'price'>;

// Тип формы заказа с оплатой и адресом доставки
export type TOrderDelivery = Pick<IOrder, 'payment' | 'address'>;

// Тип формы заказа с контактными данными
export type TOrderContacts = Pick<IOrder, 'email' | 'phone'>;

// Тип поля ввода формы заказа
export type TOrderInput = Pick<IOrder,	'payment' | 'address' | 'email' | 'phone'>;

// Тип ошибки в форме
export type TFormErrors = Partial<Record<keyof IOrder, string>>;

// Интерфейс для работы с карточкой товара
export interface IProduct {
	id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number | null;
    selected: boolean;
}

// Интерфейс для работы со списком товаров
export interface IProductData {
	products: IProduct[];
	preview: string | null;
	setProducts(products: IProduct[]): void;
	getProducts(): IProduct[];
	getProduct(id: string): IProduct;
	savePreview(product: IProduct): void;
}

// Интерфейс корзины
export interface IBasket {
    items: TBasketProduct[];
    total: number | null;
}

// Интерфейс для работы с корзиной
export interface IBasketData {
	products: TBasketProduct[];
	addToBasket(product: IProduct): void;
	removeFromBasket(product: IProduct): void;
    getButtonState(product: TBasketProduct): string;
	getProductsCost(): number;
	clearBasket(): void;
	//processBasketToOrder(orderData: IOrderData): void;
}

// Интерфейс заказа
export interface IOrder {
    items: string[];
	total: number;
    payment: string;
    address: string;
	email: string; 
	phone: string; 
}

// Интерфейс для работы с заказом
export interface IOrderData {
	formErrors: TFormErrors;
	order: IOrder;
	setPayment(value: string): void;
    setDeliveryAddress(value: string): void;
	setEmail(value: string): void;
    setPhone(value: string): void;
	setOrderField(field: keyof TOrderInput, value: string): void;
	validateOrder(): boolean;
	clearOrder(): void;
}

// Интерфейс главной страницы товаров
export interface IMainPage {
    counter: number;
    catalogue: HTMLElement[];
    locked: boolean;
}

// Интерфейс модального окна
export interface IModal {
    content: HTMLElement;
}

// Интерфейс карточки товара
export interface ICard {
	id: string;
	title: string;
	category: string;
	description: string;
	image: string;
	price: number | null;
	button: string;
	index: string;
}

// Интерфейс работы с карточкой
export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

// Интерфейс проверки заполнения формы
export interface IFormState {
    valid: boolean;
    errors: string[];
}

// Интерфейс подтверждения заказа
export interface IOrderProcessed {
	total: number;
}

// Интерфейс продолжения работы с приложением
export interface IOrderProcessedActions {
    onClick: () => void;
}

//
export interface IApi {
	getProducts: () => Promise<IProduct[]>;
	getProduct: (id: string) => Promise<IProduct>;
	orderProducts: (order: IOrder) =>  Promise<IOrderProcessed>
  }