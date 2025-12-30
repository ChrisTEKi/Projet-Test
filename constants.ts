import { Product, User, UserRole } from './types';

export const APP_NAME = "Domygo Market";
export const CURRENCY = "Ar";

// Math: 1 Point = 500 Ar
export const POINT_CONVERSION_RATE = 500;
export const REFERRAL_BONUS_REFERRER = 5000; // Ar
export const REFERRAL_BONUS_REFEREE = 10000; // Ar

export const CATEGORIES = [
  { id: 'groceries', name: 'Alimentation', icon: 'Apple' },
  { id: 'tech', name: 'High Tech', icon: 'Smartphone' },
  { id: 'fashion', name: 'Mode', icon: 'Shirt' },
  { id: 'home', name: 'Maison & Meubles', icon: 'Armchair' },
  { id: 'beauty', name: 'Beauté & Santé', icon: 'Sparkles' },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2' },
  { id: 'toys', name: 'Jouets', icon: 'Baby' },
  { id: 'food', name: 'Fast Food', icon: 'Pizza' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Le dernier smartphone Samsung avec IA intégrée. 256Go, Titane.',
    price: 5200000,
    category: 'tech',
    images: ['https://picsum.photos/400/400?random=1', 'https://picsum.photos/400/400?random=11'],
    vendorId: 'v1',
    rating: 4.8,
    reviewCount: 120,
    stock: 15,
    isPromo: true,
    promoPrice: 4900000
  },
  {
    id: '2',
    name: 'Riz de Luxe Makalioka (25kg)',
    description: 'Riz parfumé de première qualité, récolte locale.',
    price: 95000,
    category: 'groceries',
    images: ['https://picsum.photos/400/400?random=2'],
    vendorId: 'v2',
    rating: 4.5,
    reviewCount: 340,
    stock: 500
  },
  {
    id: '3',
    name: 'Canapé d\'angle moderne',
    description: 'Confortable, gris anthracite, idéal pour grand salon.',
    price: 1500000,
    category: 'home',
    images: ['https://picsum.photos/400/400?random=3'],
    vendorId: 'v3',
    rating: 4.2,
    reviewCount: 45,
    stock: 5
  },
  {
    id: '4',
    name: 'Pizza Reine XL',
    description: 'Jambon, Champignons, Fromage, Olives. Livraison chaude.',
    price: 35000,
    category: 'food',
    images: ['https://picsum.photos/400/400?random=4'],
    vendorId: 'v4',
    rating: 4.9,
    reviewCount: 890,
    stock: 100
  },
  {
    id: '5',
    name: 'Nike Air Force 1',
    description: 'Classique indémodable. Blanc pur. Taille 42.',
    price: 300000,
    category: 'fashion',
    images: ['https://picsum.photos/400/400?random=5'],
    vendorId: 'v1',
    rating: 4.7,
    reviewCount: 210,
    stock: 30
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Andry R.',
  email: 'andry@example.com',
  role: UserRole.CUSTOMER,
  walletBalance: 150000,
  loyaltyPoints: 12, // 12 * 500 = 6000 Ar value
  referralCode: 'DOMYGO-ANDRY-22',
  address: {
    street: 'Lot IVK 23 Bis',
    city: 'Antananarivo',
    postalCode: '101'
  }
};
