import axios from 'axios';
import { Position } from '../models/interfaces';
import config from '../config';
import { requestConfig } from './helper';

/** Сервис для работы с позициями меню */
const positionService = {

  getAll(): Promise<Position[]> {
    return axios.get(config.api + '/api/Position/', requestConfig).then(x => x.data).catch(x => console.error(x));
  },

  byFilter(filter: any): Promise<Position[]> {
    return axios.post(config.api + '/api/Position/byFilter', filter, requestConfig).then(x => x.data).catch(x => console.error(x));
  },

  get(id: number): Promise<Position> {
    return axios.get(config.api + '/api/Position/'+id, requestConfig).then(x => x.data).catch(x => console.error(x));
  },

  post(data: Position): Promise<Position> {
    return axios.post(config.api + '/api/Position/', data, requestConfig).then(x => x.data).catch(x => console.error(x));
  },

  update(data: Position): Promise<Position> {
    return axios.put(config.api + '/api/Position/', data, requestConfig).then(x => x.data).catch(x => console.error(x));
  },
}

export default positionService;