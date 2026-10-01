import { useState } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import { ArrowRight, Bell, CircleCheck, Heart, Home, MapPin, Menu, Search, ShoppingBag, Sparkles, UserRound } from "lucide-react"
import * as UI from "../lib/ui"
import logo from "../imports/LargeNova.png"
import signature from "../imports/NovaSign.png"
import { useShop } from "./shared"
import type { LucideIcon } from "lucide-react"
export const AppShell = () => {
  const { cart, favorites, notifications, toast } = useShop()
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const unread = notifications.filter((n) => !n.read).length
  const [mobileMenu, setMobileMenu] = useState(false)
  return (
    <div className="app-shell">
      <div className="announcement">
        <span>Livraison dans tout Madagascar</span>
        <span className="announcement-center">
          Des trouvailles qui ont une histoire. <Sparkles size={13} />
        </span>
        <span>Fait avec amour à Madagascar</span>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="NovaMarket accueil">
            <img src={logo} alt="NovaMarket" />
          </Link>
          <nav className="desktop-nav" aria-label="Navigation principale">
            <NavLink to="/" end>
              Accueil
            </NavLink>
            <NavLink to="/explore">Explorer</NavLink>
            <NavLink to="/categories">Catégories</NavLink>
            <NavLink to="/stores">Boutiques</NavLink>
          </nav>
          <div className="header-actions">
            <Link className="header-search" to="/explore">
              <Search size={19} />
              <span>Rechercher</span>
            </Link>
            <Link
              className="icon-link hide-mobile"
              to="/favorites"
              aria-label="Favoris"
            >
              <Heart
                size={21}
                fill={favorites.length ? "currentColor" : "none"}
              />
            </Link>
            <Link
              className="icon-link hide-mobile"
              to="/notifications"
              aria-label="Notifications"
            >
              <Bell size={21} />
              {unread > 0 && <span className="notification-dot" />}
            </Link>
            <Link
              className="icon-link"
              to="/cart"
              aria-label={`Panier, ${count} articles`}
            >
              <ShoppingBag size={21} />
              {count > 0 && <span className="count-badge">{count}</span>}
            </Link>
            <Link className="account-link hide-mobile" to="/account">
              <UserRound size={18} />
              <span>Mon compte</span>
            </Link>
            <UI.Button
              className="icon-link menu-toggle"
              aria-label="Ouvrir le menu"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <Menu size={22} />
            </UI.Button>
          </div>
        </div>
      </header>
      {mobileMenu && (
        <nav className="mobile-menu container">
          {[
            ["Accueil", "/"],
            ["Explorer", "/explore"],
            ["Catégories", "/categories"],
            ["Boutiques", "/stores"],
            ["Commandes", "/orders"],
            ["Notifications", "/notifications"],
          ].map(([label, path]) => (
            <Link onClick={() => setMobileMenu(false)} key={path} to={path}>
              {label}
              <ArrowRight size={16} />
            </Link>
          ))}
        </nav>
      )}
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-about">
            <img src={logo} alt="NovaMarket" />
            <p>
              Un marché d'idées, de découvertes et de belles histoires. Le
              meilleur de Madagascar, à portée de clic.
            </p>
            <img
              className="footer-signature"
              src={signature}
              alt="Signature Nova"
            />
          </div>
          <div>
            <UI.H3>Découvrir</UI.H3>
            <Link to="/explore">Tous les produits</Link>
            <Link to="/categories">Catégories</Link>
            <Link to="/stores">Boutiques</Link>
            <Link to="/favorites">Mes favoris</Link>
          </div>
          <div>
            <UI.H3>Mon espace</UI.H3>
            <Link to="/account">Mon compte</Link>
            <Link to="/orders">Mes commandes</Link>
            <Link to="/cart">Mon panier</Link>
            <Link to="/notifications">Notifications</Link>
          </div>
          <div>
            <UI.H3>NovaMarket</UI.H3>
            <p>Des rencontres, des savoir-faire et des objets qui comptent.</p>
            <span className="footer-location">
              <MapPin size={16} /> Antananarivo, Madagascar
            </span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 NovaMarket. Pensé pour Madagascar.</span>
          <span>Shop · Compare · Trust</span>
        </div>
      </footer>
      <nav className="bottom-nav" aria-label="Navigation mobile">
        {[
          [Home, "Accueil", "/"],
          [Search, "Explorer", "/explore"],
          [Heart, "Favoris", "/favorites"],
          [ShoppingBag, "Panier", "/cart"],
          [UserRound, "Compte", "/account"],
        ].map(([Icon, label, path]) => {
          const I = Icon as LucideIcon
          return (
            <NavLink
              key={path as string}
              to={path as string}
              end={path === "/"}
            >
              <I size={21} />
              <span>{label as string}</span>
              {path === "/cart" && count > 0 && <i>{count}</i>}
            </NavLink>
          )
        })}
      </nav>
      {toast && (
        <div className="toast" role="status">
          <CircleCheck size={18} />
          {toast}
        </div>
      )}
    </div>
  )
}
