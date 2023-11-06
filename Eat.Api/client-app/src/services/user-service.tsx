import axios from "axios";
import { User } from '../models/interfaces';
import config from '../config';
import { requestConfig } from './helper';

/** Сервис для работы с аутентификацией */
const userService = {

  get(id: number | string): Promise<User> {
    return axios.get(config.authService + '/api/User/'+id, requestConfig).then(x => x.data);
  },

  post(data: User): Promise<User> {
    return axios.post(config.authService + '/api/User/', data, requestConfig).then(x => x.data);
  },

  update(data: User): Promise<User> {
    return axios.put(config.authService + '/api/User/', data, requestConfig).then(x => x.data);
  },

}

export default userService;