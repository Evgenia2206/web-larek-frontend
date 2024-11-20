import './scss/styles.scss';
import { IEvents, EventEmitter } from './components/base/events';
import { ProductData } from './components/model/ProductData';
import { BasketData } from './components/model/BasketData';
import { OrderData } from './components/model/OrderData';
import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';
import { CardUI } from './components/view/CardUI';
import { ModalUI } from './components/view/ModalUI';
import { IProduct, IOrder, TPayment } from './types/index';
import { AppApi } from './components/AppApi';
import { MainPageUI } from './components/view/MainPageUI';
import { BasketUI } from './components/view/BasketUI';
import { OrderContactsUI } from './components/view/OrderContactsUI';
import { OrderDeliveryUI } from './components/view/OrderDeliveryUI';
import { OrderProcessedUI } from './components/view/OrderProcessedUI';

const api = new AppApi(CDN_URL, API_URL);
const events: IEvents = new EventEmitter();

const productData = new ProductData(events);
const basketData = new BasketData(events);
const orderData = new OrderData(events);

const orderSuccessTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const modalContainerTemplate = ensureElement<HTMLTemplateElement>('#modal-container');

const page = new MainPageUI(document.body, events);
const modal = new ModalUI(modalContainerTemplate, events);
const basket = new BasketUI(cloneTemplate(basketTemplate), events);
const contactsForm = new OrderContactsUI(cloneTemplate(contactsTemplate), events);
const deliveryForm = new OrderDeliveryUI(cloneTemplate(orderTemplate), events);

events.on('product:change', () => {
		page.catalogue = productData.products.map((product) => {
		const card = new CardUI(cloneTemplate(cardCatalogTemplate), {
			onClick: () => {
				events.emit('card:select', product);
			},
		});
		return card.render({
			id: product.id,
			image: product.image,
			title: product.title,
			category: product.category,
			price: product.price,
		});
	});
});

events.on('card:select', (product: IProduct) => {
	productData.savePreview(product);
});

events.on('preview:change', (product: IProduct) => {
	const card = new CardUI(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			events.emit('card:basket', product);
			events.emit('preview:change', product);
		},
	});

	modal.render({
		content: card.render({
			id: product.id,
			category: product.category,
			description: product.description,
			image: product.image,
			price: product.price,
			title: product.title,
			button: basketData.getButtonState(product),
		}),
	});
});

events.on('card:basket', (product: IProduct) => {
	basketData.isBasketProduct(product);
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

events.on('basket:change', () => {
	page.counter = basketData.products.length;
	basket.total = basketData.getProductsCost();
	basket.items = basketData.products.map((card, index) => {
		const newBasketCard = new CardUI(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				basketData.removeFromBasket(card);
			},
		});
		newBasketCard.index = index + 1;
		return newBasketCard.render({
			title: card.title,
			price: card.price,
		});
	});
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

events.on('order:open', () => {
	modal.render({
		content: deliveryForm.render({
			payment: orderData.order.payment,
			address: orderData.order.address,
		}),
	});
	orderData.validateOrder();
});

events.on(
	/^order\..*:input/,
	(data: {
		field: keyof Pick<IOrder, 'payment' | 'address' | 'phone' | 'email'>;
		value: string;
	}) => {
		orderData.setOrderField(data.field, data.value);
	}
);

events.on(
	'order:input',
	(data: { payment: TPayment; button: HTMLElement }) => {
		deliveryForm.togglePayment(data.button);
		orderData.setPayment(data.payment);
		orderData.validateOrder();
	}
);

events.on('errors:change', (errors: Partial<IOrder>) => {
	const { email, phone, address, payment } = errors;

	deliveryForm.valid = !payment && !address;
	deliveryForm.errors = Object.values({payment, address}).filter(i => !!i).join('; ');

	contactsForm.valid = !email && !phone;
	contactsForm.errors = Object.values({email, phone}).filter(i => !!i).join('; ');
});

events.on('order:submit', () => {
	modal.render({
		content: contactsForm.render({
			phone: orderData.order.phone,
			email: orderData.order.email,
		}),
	});
	orderData.validateOrder();
});

events.on('order:process', () => {
	basketData.processBasketToOrder(orderData);

	api
		.orderProducts(orderData.order)
		.then((result) => {
			const success = new OrderProcessedUI(cloneTemplate(orderSuccessTemplate), {
				onClick: () => {
					modal.close();
				},
			});
			basketData.clearBasket();
			orderData.clearOrder();
			modal.render({
				content: success.render({
					total: result.total,
				}),
			});
		})

		.catch((error) => {
			console.error(`Произошла ошибка при отправке заказа: ${error}`);
			alert(
				'Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже.'
			);
		});
});

api.getProducts()
	.then((response) => {
		productData.setProducts(response)
	})
	.catch((error) => {
		console.error(error);
	});
