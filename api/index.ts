import axios from 'axios';

export const axiosPrivate = axios.create({
  baseURL: `${process.env.NEXT_BASE_URL}:8080`,
  headers: { 'Content-Type': 'application/json' },
});
