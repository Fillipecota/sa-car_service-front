import { API } from './api';

export const productionService = {
    async create(data: Production) {
        const response = await API.post('/productions', data);
        return response.data;
    },

    async list() {
        const response = await API.get<Production[]>('/productions');
        return response.data;
    }
};