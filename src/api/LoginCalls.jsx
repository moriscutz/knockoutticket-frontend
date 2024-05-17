import axios from 'axios';

const BASE_URL = 'http://localhost:8080/tokens';

const loginApi = async (data) => {
    try{
        const response = await axios.post(BASE_URL, data);
        return response.data;
    }
    catch (error){
        console.error('Error during login: ', error.response);
        throw error;
    }
};

export const authService = {
    loginApi
};