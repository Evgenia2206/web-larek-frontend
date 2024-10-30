import { ApiPostMethods } from '../components/base/api'

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



