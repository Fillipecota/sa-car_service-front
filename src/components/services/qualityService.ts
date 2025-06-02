import { API } from './api';

export const qualityService = {
    async list() {
        const response = await API.get<Quality[]>('/qualities');
        return response.data;
    },

    async updateStatus(id: string, status: Quality['status']) {
        const response = await API.patch(`/qualities/${id}`, { status });
        return response.data;
    }
};