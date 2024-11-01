import { ApiPostMethods } from '../components/base/api'

// Тип способа оплаты
type TPayment = 'online' | 'receipt';

// Тип категории товара
type TCategory = 'другое' | 'софт-скил'	| 'дополнительное'	| 'кнопка'	| 'хард-скил';

// Тип ошибки в форме
type TFormErrors = Partial<Record<keyof IOrder, string>>;

// Интерфейс API-клиента
interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Интерфейс для работы с карточкой товара
interface IProduct {
	id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number | null;
    selected: boolean;
}

// Интерфейс для работы с корзиной
interface ICart {
    cartProducts: IProduct[];
    productsCost: number;
}

// Интерфейс для работы с заказом
interface IOrder {
    order: ICart;
    payment: string;
    address: string;
	email: string; 
	phone: string; 
}

// Интерфейс главной страницы товаров
interface IMainPage {
    cartCounter: number;
    products: HTMLElement[];
    locked: boolean;
}

// Интерфейс модального окна
interface IModal {
    content: HTMLElement;
}

// Интерфейс проверки заполнения формы
interface IFormState {
    valid: boolean;
    errors: string[];
}

// Интерфейс подтверждения заказа
interface IOrderProcessed {
	orderCost: number;
}

// Интерфейс продолжения работы с приложением
interface IOrderProcessedActions {
    onClick: () => void;
}