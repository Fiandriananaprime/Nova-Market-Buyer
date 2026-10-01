import { Route, Routes } from "react-router-dom"
import { AppShell } from "./components/AppShell"
import { HomePage } from "./pages/home/HomePage"
import { CategoriesPage } from "./pages/catalog/CategoriesPage"
import { ExplorePage } from "./pages/catalog/ExplorePage"
import { FavoritesPage } from "./pages/catalog/FavoritesPage"
import { ProductPage } from "./pages/product/ProductPage"
import { StoresPage } from "./pages/store/StoresPage"
import { StorePage } from "./pages/store/StorePage"
import { CartPage } from "./pages/cart/CartPage"
import { CheckoutPage } from "./pages/cart/CheckoutPage"
import { OrdersPage } from "./pages/order/OrdersPage"
import { OrderPage } from "./pages/order/OrderPage"
import { TrackingPage } from "./pages/order/TrackingPage"
import { NotificationsPage } from "./pages/system/NotificationsPage"
import { AccountShell } from "./pages/account/AccountShell"
import { AccountHome } from "./pages/account/AccountHome"
import { ProfilePage } from "./pages/account/ProfilePage"
import { AddressesPage } from "./pages/account/AddressesPage"
import { PaymentsPage } from "./pages/account/PaymentsPage"
import { PreferencesPage } from "./pages/account/PreferencesPage"
import { SecurityPage } from "./pages/account/SecurityPage"
import { PrivacyPage } from "./pages/account/PrivacyPage"
import { AuthPage } from "./pages/auth/AuthPage"
import { NotFound } from "./pages/system/NotFound"

export const Router = () => (
  <Routes>
    <Route element={<AppShell />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/stores" element={<StoresPage />} />
      <Route path="/stores/:id" element={<StorePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:id" element={<OrderPage />} />
      <Route path="/orders/:id/tracking" element={<TrackingPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/account" element={<AccountShell />}>
        <Route index element={<AccountHome />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="addresses" element={<AddressesPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="preferences" element={<PreferencesPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="/auth/login" element={<AuthPage mode="login" />} />
    <Route path="/auth/register" element={<AuthPage mode="register" />} />
    <Route path="/auth/forgot" element={<AuthPage mode="forgot" />} />
    <Route path="/auth/verify-email" element={<AuthPage mode="verify-email" />} />
    <Route path="/auth/verify-phone" element={<AuthPage mode="verify-phone" />} />
  </Routes>
)
