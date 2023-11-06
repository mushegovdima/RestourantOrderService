import { Entity } from "./interfaces";

export interface OrderHandlerSettings extends Entity {
    sellerId: number;
    handlerId: string;
    data: any;
}

export interface OrderHandlerResponse extends Entity {
    title: string;
    fields: string[];
}

export const OrderHandlerIds = {
    'Telegram': '5217ebbd-5c4a-4a5e-9a51-fb208093acc0',
}