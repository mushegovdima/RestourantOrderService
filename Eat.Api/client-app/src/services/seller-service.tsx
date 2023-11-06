import axios from 'axios';
import { Category, Seller } from '../models/interfaces';
import config from '../config';
import { requestConfig } from './helper';

/** Сервис для работы с позициями меню */
const sellerService = {

  getAll(): Promise<Seller[]> {
    return axios.get(config.api + '/api/Seller', requestConfig).then(x => x.data);
  },

  get(id: number | string): Promise<Seller> {
    return axios.get(config.api + '/api/Seller/'+id, requestConfig).then(x => x.data);
  },

  post(data: Seller): Promise<Seller> {
    return axios.post(config.api + '/api/Seller/', data, requestConfig).then(x => x.data);
  },

  updateCategories(id: number, categories: Category[]): Promise<Seller> {
    return axios.post(config.api + '/api/Seller/UpdateCategories/' + id, categories, requestConfig).then(x => x.data);
  },

  update(data: Seller): Promise<Seller> {
    return axios.put(config.api + '/api/Seller/', data, requestConfig).then(x => x.data);
  },

}

export default sellerService;