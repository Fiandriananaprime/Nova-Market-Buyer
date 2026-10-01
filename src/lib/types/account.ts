export type UserRole = 'buyer' | 'seller' | 'admin';
export type UserStatus = 'active' | 'suspended';
export type AuthMe = {
  userId: string;
  email: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  adminRole: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
};
export type AuthRefreshResponse = {
  user: User;
  expiresAt: string;
};
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  avatarUrl: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  addresses: import('./buyer').Address[];
};
export type SecuritySettings = {
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  passwordLastChangedAt: string | null;
  lastLoginAt: string | null;
};
export type Session = {
  id: string;
  device: string;
  browser: string;
  operatingSystem: string;
  ipAddress: string;
  location: string | null;
  lastActiveAt: string;
  createdAt: string;
  current: boolean;
};
export type NotificationPage = {
  data: import('./buyer').Notification[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
};
