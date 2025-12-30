export enum UserRole {
  GUEST = 'GUEST',
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
  PERSONNEL = 'PERSONNEL'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  vendorId: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isPromo?: boolean;
  promoPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  walletBalance: number;
  loyaltyPoints: number;
  referralCode: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    details?: string;
  };
  isVendorVerified?: boolean; // KYC Status
}

export interface VendorApplication {
  id: string;
  name: string;
  email: string;
  idCardImage: string; // Base64 or URL
  shopName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'PENDING' | 'PREPARING' | 'SHIPPING' | 'DELIVERED' | 'RETURNED';
  date: string;
  paymentMethod: string;
  deliveryAddress: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'DEBIT' | 'CREDIT' | 'REFUND' | 'CONVERSION';
  description: string;
}
