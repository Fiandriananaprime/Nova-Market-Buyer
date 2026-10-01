export type Address = {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  street: string;
  district: string;
  city: string;
  region: string;
  postalCode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  instructions?: string | null;
  isDefault: boolean;
};
export type BuyerProfile = import('./account').User & BuyerPreferences;
export type PaymentMethod = {
  id: string;
  type: string;
  label: string;
  last4?: string;
  isDefault: boolean;
};
export type BuyerPreferences = {
  language?: 'mg' | 'fr' | 'en';
  theme?: 'light' | 'dark' | 'system';
  notifications?: Record<string, boolean>;
};
export type FavoriteToggleResponse = {
  productId: string;
  isFavorite: boolean;
};
export type CartItem = {
  id?: string;
  productId: string;
  productName: string;
  image: string;
  price: number;
  qty: number;
  sellerName: string;
  stock?: number;
};
export type Cart = {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};
export type Notification = {
  id: string;
  type:
    | 'order'
    | 'payment'
    | 'promotion'
    | 'review'
    | 'seller'
    | 'system'
    | 'security';
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: string;
};
