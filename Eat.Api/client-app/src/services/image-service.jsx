import axios from 'axios';
import { notification } from 'antd';

/** Сервис для работы с позициями меню */
export const ImageService = {
    async uploadImage(file: any): Promise<String| null> {
        const apiKey = '00043fc485e8b6ce37a55915da547c42';
        const url = 'https://thumbsnap.com/api/upload';

        const form = new FormData();
        form.append('media', file);
        form.append('key', apiKey);
        return axios.post(url, form, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(x => x.data.data.media)
        .catch(x => notification.error({ message: x.error.message }));
    }
}
export default ImageService;