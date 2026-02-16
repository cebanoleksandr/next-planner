import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}`,
  // baseURL: 'http://192.168.0.107:8080',
  headers: { 'Content-Type': 'application/json' },
});
