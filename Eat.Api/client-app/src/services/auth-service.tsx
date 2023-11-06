import axios from "axios";
import { User } from '../models/interfaces';
import config from '../config';
import { requestConfig } from './helper';

/** Сервис для работы с аутентификацией */
const authService = {

  get(id: number | string): Promise<User> {
    return axios.get(config.authService + '/api/Auth/'+id, requestConfig).then(x => x.data);
  },

  post(data: User): Promise<User> {
    return axios.post(config.authService + '/api/Auth/', data, requestConfig).then(x => x.data);
  },

  update(data: User): Promise<User> {
    return axios.put(config.authService + '/api/Auth/', data, requestConfig).then(x => x.data);
  },

  authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  },
}

export default authService;