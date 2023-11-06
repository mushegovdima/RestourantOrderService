import { NewOrder, NewOrderPosition, Position } from '../models/interfaces';

/** Сервис для работы корзиной */
class CartService {
    constructor(id: string, onChange: any) {
        this.key = 'cart_' + id;
        this._onChange = onChange;
    }

    private _onChange?: any;

    key: string;

    default: NewOrder = {
        totalPrice: 0,
        positions: [],
    }

    get current () {
        return this.getCart();
    }

    positionCount(cart: NewOrder, item: Position) {
        const el = cart.positions.find(x => x.position.id === item.id);
        if (!el) return 0;
        return el.count;
    }

    plusPosition(cart: NewOrder, item: Position) {
        const index = cart.positions.findIndex(x => x.position.id === item.id);
        if (index >= 0) {
            const item = cart.positions[index];
            item.count = item.count + 1;
            cart.positions[index] = item;
        } else {
            const newPosition: NewOrderPosition = {
                position: item,
                count: 1,
            };
            cart.positions.push(newPosition);
        }
        this.setTotal(cart);
        this.setCart(cart);
    }

    minusPosition(cart: NewOrder, item: Position) {
        const index = cart.positions.findIndex(x => x.position.id === item.id);
        if (index === -1) return;

        if (cart.positions[index].count > 1) {
            cart.positions[index].count = cart.positions[index].count - 1;
        } else {
            cart.positions.splice(index, 1);
        }
        this.setTotal(cart);
        this.setCart(cart);
    }

    removePosition(cart: NewOrder, index: number) {
        cart.positions.splice(index, 1);
        this.setCart(cart);
    }

    setTotal(order: NewOrder) {
        order.totalPrice = order.positions.reduce((prev, cur, index) => {
            return prev + cur.count * (cur.position.price - (cur.position.discount || 0));
        }, 0)
    }

    getCart(): NewOrder {
        const str = localStorage.getItem(this.key);
        if (!str) return this.default;

        return JSON.parse(str);
    }

    setCart(cart: NewOrder) {
        localStorage.setItem(this.key, JSON.stringify(cart));
        if (this._onChange) this._onChange(cart);
    }
}
export default CartService;