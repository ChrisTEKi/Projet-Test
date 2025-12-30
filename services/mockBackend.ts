import { MOCK_PRODUCTS, MOCK_USER } from '../constants';
import { Product, User } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockAPI = {
  getProducts: async (): Promise<Product[]> => {
    await delay(500);
    return MOCK_PRODUCTS;
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    await delay(300);
    return MOCK_PRODUCTS.find(p => p.id === id);
  },

  login: async (email: string): Promise<User> => {
    await delay(800);
    // Simulate getting user data
    return MOCK_USER;
  },

  registerVendor: async (data: any): Promise<boolean> => {
    await delay(1500);
    console.log("Vendor registration data received:", data);
    return true;
  },
  
  processPayment: async (amount: number, method: string): Promise<boolean> => {
    await delay(2000);
    console.log(`Processing payment of ${amount} via ${method}`);
    return true;
  }
};
