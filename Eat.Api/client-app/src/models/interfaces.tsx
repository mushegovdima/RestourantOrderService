
export interface Entity {
    id: number;
}

export interface Position extends Entity{
    description: string | null,
    price: number,
    discount?: number,
    title: string | null,
    totalOrderCount?: number,
    sellerId: number,
    seller?: Seller,
    categoryIds: number[],
    image: string | null;
    weight?: number;
    ribbonColor: string | null,
    ribbonTitle: string | null,
}

export interface User extends Entity {
    name: string;
    email: string;
    phone: string;
    emailConfirmed: boolean;
    phoneConfirmed: boolean;
    isBlocked: boolean;
}

export interface Seller extends Entity {
    isBlocked: boolean,
    title: string,
    status: SellerStatus,
    positions: Position[],
    categories: Category[],
    image: string | null;
}

export interface Category {
    id: string,
    sortOrder: number,
    title: string,
    hide: boolean,
    ribbonColor: string | null,
    ribbonTitle: string | null,
}

export interface Order {
    totalPrice: number;
    title: string;
    createdAt: Date;
    status: OrderStatus;
    lastStatusDate: Date;
    customerId: number;
    sellerId: number;
    tableNumber?: number;
    positions: OrderPosition[];
}

export interface OrderPosition extends Entity {
    title: string | null,
    count: number;
    price: number;
    discount?: number;
    sellerId: number;
    positionId: number;
}

export interface NewOrder {
    totalPrice: number;
    customerId?: number;
    sellerId: number;
    tableNumber: number | null;
    positions: NewOrderPosition[];
}

export interface NewOrderPosition {
    position: Position,
    count: number;
}

export enum OrderStatus
{
    New, //Новый
    AwaitingApproval, //Ожидает подтверждения
    InProgress, //В процессе
    Completed, //Завершен
}

export enum SellerStatus {
    New,
    Active,
    Expired,
    Blocked,
}
