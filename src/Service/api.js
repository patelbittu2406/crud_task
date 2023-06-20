import axios from "axios";

const token=localStorage.getItem('accessToken');

const api = axios.create({
    baseURL: 'https://aws-task-pfxn.onrender.com',
    headers: {
        authorization: token
    },
});


export default api;