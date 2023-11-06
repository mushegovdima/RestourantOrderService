import axios from "axios";
import { NewOrder, Order, User } from '../models/interfaces';
import config from '../config';
import { requestConfig } from './helper';
import { OrderHandlerResponse, OrderHandlerSettings } from "../models/order-service";

/** Сервис для работы заказами */
const orderService = {

  get(id: number | string): Promise<Order> {
    return axios.get(config.orderService + '/api/Order/'+id, requestConfig).then(x => x.data);
  },

  post(data: NewOrder): Promise<NewOrder> {
    return axios.post(config.orderService + '/api/Order/', data, requestConfig).then(x => x.data);
  },

  getOrderHandlers(country?: string): Promise<OrderHandlerResponse[]> {
    return axios.get(config.orderService + `/api/Settings/GetHandlers?country=${country || ''}`, requestConfig).then(x => x.data);
  },

  getOrderSettings(sellerId: number | string): Promise<any> {
    return axios.get(config.orderService + '/api/Settings/'+sellerId, requestConfig).then(x => x.data);
  },

  postOrderSettings(data: OrderHandlerSettings): Promise<any> {
    return axios.post(config.orderService + '/api/Settings/', data, requestConfig).then(x => x.data);
  },

}

export default orderService;