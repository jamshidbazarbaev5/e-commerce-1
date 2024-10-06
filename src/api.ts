import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1';
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export const fetchUsers = async (limit: number): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users?limit=${limit}`);
  return response.data;
};

export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/users/`, user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error adding user:', error.response.data);
      throw new Error(error.response.data.message || 'Failed to add user');
    } else {
      console.error('Error adding user:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
export const fetchProducts = async (offset: number, limit: number) => {
  const response = await axios.get(`${API_URL}/products?offset=${offset}&limit=${limit}`);
  return response.data;
};
export const fetchProductsByPrice = async (price: number) => {
  const response = await axios.get(`${API_URL}/products/?price=${price}`);
  return response.data;
};

export const fetchProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
}