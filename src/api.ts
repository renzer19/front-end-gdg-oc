import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authAPI = {
    login: async (email: string, password: string) => {
        return api.post('/users/login', { email, password });
    },

    register: async (userData: { name: string; email: string; role: string; age?: number; password: string }) => {
        return api.post('/users', userData);
    }
};
export const userAPI = {
    getAllUsers: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        success: true,
                        data: [
                            { id: '1', name: 'Renaldi', email: 'renaldi@email.com', role: 'super admin', age: 25 },
                            { id: '2', name: 'Rizky', email: 'rizky@email.com', role: 'user', age: 30 },
                            { id: '3', name: 'Dewi', email: 'dewi@email.com', role: 'user', age: 28 },
                            { id: '4', name: 'Budi', email: 'budi@email.com', role: 'user', age: 22 },
                        ]
                    }
                });
            }, 800);
        });
    },

    updateProfile: async (id: string, updateData: any) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        success: true,
                        message: "Profile berhasil diupdate!",
                        data: updateData
                    }
                });
            }, 800);
        });
    }
};
export default api;