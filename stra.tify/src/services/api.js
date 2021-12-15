import axios from "axios";

const apiStrateegia = axios.create({
    baseURL: 'https://api.strateegia.digital',
    headers: {
        'Content-Type': "application/json",
    },
});

export { apiStrateegia };