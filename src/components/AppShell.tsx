import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  CircleCheck,
  Heart,
  Home,
  MapPin,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
} from 'lucide-react';
import * as UI from '../lib/ui';
import logo from '../imports/LargeNova.png';
import signature from '../imports/NovaSign.png';
import { useShop } from './shared';
import type { LucideIcon } from 'lucide-react';
export const AppShell = () => {
  const { cart, favorites, notifications, toast } = useShop();
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const unread = notifications.filter((n) => !n.read).length;
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <div className="overflow-clip">
      <div className="flex h-[35px] items-center justify-between bg-[var(--color-smart-blue-950)] px-[4%] text-[10px] font-bold tracking-[0.08em] text-[var(--color-parchment-100)] uppercase max-[800px]:justify-center [&>span:first-child]:max-[800px]:hidden [&>span:last-child]:max-[800px]:hidden">
        <span>Livraison dans tout Madagascar</span>
        <span className="flex items-center gap-2 text-[var(--color-black-300)]">
          Des trouvailles qui ont une histoire. <Sparkles size={13} />
        </span>
        <span>Fait avec amour à Madagascar</span>
      </div>
      <header className="relative z-20 h-[86px] border-b border-[var(--color-parchment-100)] bg-[var(--color-surface)] shadow-[0_1px_0_var(--color-shadow-faint)] max-[800px]:h-[68px]">
        <div className="mx-auto flex h-full w-[calc(100%-64px)] max-w-[1360px] items-center gap-[54px] max-[1100px]:gap-[25px] max-[800px]:w-[calc(100%-40px)]">
          <Link
            to="/"
            className="flex h-[60px] w-[172px] flex-none items-center overflow-hidden max-[800px]:w-[145px]"
            aria-label="NovaMarket accueil"
          >
            <img src={logo} alt="NovaMarket" />
          </Link>
          <nav
            className="flex h-full items-center gap-[33px] max-[800px]:hidden"
            aria-label="Navigation principale"
          >
            <NavLink className="relative flex h-full items-center whitespace-nowrap text-[13px] font-bold text-[var(--color-ink-navigation)] transition-colors hover:text-[var(--color-smart-blue-950)] [&.active]:text-[var(--color-smart-blue-950)] [&.active]:after:absolute [&.active]:after:right-0 [&.active]:after:bottom-0 [&.active]:after:left-0 [&.active]:after:h-0.5 [&.active]:after:bg-[var(--color-black-700)]" to="/" end>
              Accueil
            </NavLink>
            <NavLink className="relative flex h-full items-center whitespace-nowrap text-[13px] font-bold text-[var(--color-ink-navigation)] transition-colors hover:text-[var(--color-smart-blue-950)] [&.active]:text-[var(--color-smart-blue-950)] [&.active]:after:absolute [&.active]:after:right-0 [&.active]:after:bottom-0 [&.active]:after:left-0 [&.active]:after:h-0.5 [&.active]:after:bg-[var(--color-black-700)]" to="/explore">Explorer</NavLink>
            <NavLink className="relative flex h-full items-center whitespace-nowrap text-[13px] font-bold text-[var(--color-ink-navigation)] transition-colors hover:text-[var(--color-smart-blue-950)] [&.active]:text-[var(--color-smart-blue-950)] [&.active]:after:absolute [&.active]:after:right-0 [&.active]:after:bottom-0 [&.active]:after:left-0 [&.active]:after:h-0.5 [&.active]:after:bg-[var(--color-black-700)]" to="/categories">Catégories</NavLink>
            <NavLink className="relative flex h-full items-center whitespace-nowrap text-[13px] font-bold text-[var(--color-ink-navigation)] transition-colors hover:text-[var(--color-smart-blue-950)] [&.active]:text-[var(--color-smart-blue-950)] [&.active]:after:absolute [&.active]:after:right-0 [&.active]:after:bottom-0 [&.active]:after:left-0 [&.active]:after:h-0.5 [&.active]:after:bg-[var(--color-black-700)]" to="/stores">Boutiques</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Link className="flex items-center gap-2.5 border-r border-[var(--color-parchment-200)] pr-[22px] text-[12px] text-[var(--color-ink-subtle)] max-[800px]:[&>span]:hidden" to="/explore">
              <Search size={19} />
              <span>Rechercher</span>
            </Link>
            <Link
              className="relative grid size-[34px] place-items-center text-[var(--color-smart-blue-950)] hover:text-[var(--color-black-700)] max-[800px]:hidden"
              to="/favorites"
              aria-label="Favoris"
            >
              <Heart
                size={21}
                fill={favorites.length ? 'currentColor' : 'none'}
              />
            </Link>
            <Link
              className="relative grid size-[34px] place-items-center text-[var(--color-smart-blue-950)] hover:text-[var(--color-black-700)] max-[800px]:hidden"
              to="/notifications"
              aria-label="Notifications"
            >
              <Bell size={21} />
              {unread > 0 && (
                <span className="absolute top-px right-0 size-2 rounded-full bg-[var(--color-black-700)]" />
              )}
            </Link>
            <Link
              className="relative grid size-[34px] place-items-center text-[var(--color-smart-blue-950)] hover:text-[var(--color-black-700)]"
              to="/cart"
              aria-label={`Panier, ${count} articles`}
            >
              <ShoppingBag size={21} />
              {count > 0 && <span className="absolute -top-1 -right-2 grid size-[17px] place-items-center rounded-full bg-[var(--color-smart-blue-950)] text-[10px] text-white">{count}</span>}
            </Link>
            <Link className="flex items-center gap-2.5 rounded-[30px] border border-[var(--color-parchment-200)] px-[15px] py-2.5 text-[12px] font-bold whitespace-nowrap hover:border-[var(--color-smart-blue-950)] max-[800px]:hidden" to="/account">
              <UserRound size={18} />
              <span>Mon compte</span>
            </Link>
            <UI.Button
              className="relative hidden size-[34px] place-items-center text-[var(--color-smart-blue-950)] hover:text-[var(--color-black-700)] max-[800px]:grid"
              aria-label="Ouvrir le menu"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <Menu size={22} />
            </UI.Button>
          </div>
        </div>
      </header>
      {mobileMenu && (
        <nav className="absolute right-0 left-0 z-30 mx-auto grid w-[calc(100%-40px)] max-w-[720px] bg-white px-6 py-[15px] shadow-[0_15px_20px_var(--color-shadow-faint)] max-[800px]:grid min-[801px]:hidden">
          {[
            ['Accueil', '/'],
            ['Explorer', '/explore'],
            ['Catégories', '/categories'],
            ['Boutiques', '/stores'],
            ['Commandes', '/orders'],
            ['Notifications', '/notifications'],
          ].map(([label, path]) => (
            <Link className="flex justify-between border-b border-[var(--color-parchment-100)] py-3.5 text-[13px]" onClick={() => setMobileMenu(false)} key={path} to={path}>
              {label}
              <ArrowRight size={16} />
            </Link>
          ))}
        </nav>
      )}
      <main>
        <Outlet />
      </main>
      <footer className="bg-[var(--color-smart-blue-950)] pt-[68px] pb-0 text-[var(--color-ink-footer)] max-[800px]:pb-[70px]">
        <div className="mx-auto grid w-[calc(100%-64px)] max-w-[1360px] grid-cols-[2.2fr_1fr_1fr_1.2fr] gap-[60px] pb-[60px] max-[800px]:w-[calc(100%-40px)] max-[800px]:grid-cols-1 max-[800px]:gap-8">
          <div>
            <img className="w-[180px] rounded-[2px] bg-[var(--color-surface)] p-1" src={logo} alt="NovaMarket" />
            <p className="max-w-[290px]">
              Un marché d'idées, de découvertes et de belles histoires. Le
              meilleur de Madagascar, à portée de clic.
            </p>
            <img
              className="mt-[22px] w-[98px] rounded-[2px] bg-white"
              src={signature}
              alt="Signature Nova"
            />
          </div>
          <div>
            <UI.H3 className="mt-[3px] mb-6 text-[13px] text-white">Découvrir</UI.H3>
            <Link className="mb-[9px] block text-[12px] leading-[1.85] text-[var(--color-ink-footer-muted)] hover:text-[var(--color-black-300)]" to="/explore">Tous les produits</Link>
            <Link className="mb-[9px] block text-[12px] leading-[1.85] text-[var(--color-ink-footer-muted)] hover:text-[var(--color-black-300)]" to="/categories">Catégories</Link>
            <Link className="mb-[9px] block text-[12px] leading-[1.85] text-[var(--color-ink-footer-muted)] hover:text-[var(--color-black-300)]" to="/stores">Boutiques</Link>
            <Link className="mb-[9px] block text-[12px] leading-[1.85] text-[var(--color-ink-footer-muted)] hover:text-[var(--color-black-300)]" to="/favorites">Mes favoris</Link>
          </div>
          <div>
            <UI.H3 className="mt-[3px] mb-6 text-[13px] text-white">Mon espace</UI.H3>
            <Link className="mb-[9px] block text-[12px] leading-[1.85] text-[var(--color-ink-footer-muted)] hover:text-[var(--color-black-300)]" to="/account">Mon compte</Link>
            <Link className="mb-[9px] block text-[12px] leading-[1.85] text-[var(--color-ink-footer-muted)] hover:text-[var(--color-black-300)]" to="/orders">Mes commandes</Link>
            <Link className="mb-[9px] block text-[12px] leading-[1.85] text-[var(--color-ink-footer-muted)] hover:text-[var(--color-black-300)]" to="/cart">Mon panier</Link>
            <Link className="mb-[9px] block text-[12px] leading-[1.85] text-[var(--color-ink-footer-muted)] hover:text-[var(--color-black-300)]" to="/notifications">Notifications</Link>
          </div>
          <div>
            <UI.H3 className="mt-[3px] mb-6 text-[13px] text-white">NovaMarket</UI.H3>
            <p className="text-[12px] leading-[1.85] text-[var(--color-ink-footer-muted)]">Des rencontres, des savoir-faire et des objets qui comptent.</p>
            <span className="flex items-center gap-[7px] text-[11px]">
              <MapPin size={16} /> Antananarivo, Madagascar
            </span>
          </div>
        </div>
        <div className="mx-auto flex w-[calc(100%-64px)] max-w-[1360px] justify-between border-t border-[var(--color-overlay-soft)] py-[22px] text-[10px] text-[var(--color-ink-footer-soft)] max-[800px]:w-[calc(100%-40px)]">
          <span>© 2026 NovaMarket. Pensé pour Madagascar.</span>
          <span>Shop · Compare · Trust</span>
        </div>
      </footer>
      <nav className="fixed right-0 bottom-0 left-0 z-40 hidden h-[70px] items-center justify-around border-t border-[var(--color-parchment-100)] bg-white pb-[env(safe-area-inset-bottom)] max-[800px]:flex" aria-label="Navigation mobile">
        {[
          [Home, 'Accueil', '/'],
          [Search, 'Explorer', '/explore'],
          [Heart, 'Favoris', '/favorites'],
          [ShoppingBag, 'Panier', '/cart'],
          [UserRound, 'Compte', '/account'],
        ].map(([Icon, label, path]) => {
          const I = Icon as LucideIcon;
          return (
            <NavLink
              className="relative flex flex-col items-center gap-1 text-[9px] text-[var(--color-ink-mobile)] [&.active]:font-bold [&.active]:text-[var(--color-smart-blue-950)]"
              key={path as string}
              to={path as string}
              end={path === '/'}
            >
              <I size={21} />
              <span>{label as string}</span>
              {path === '/cart' && count > 0 && <i className="absolute -top-1 -right-2 grid size-[17px] place-items-center rounded-full bg-[var(--color-smart-blue-950)] text-[10px] text-white not-italic">{count}</i>}
            </NavLink>
          );
        })}
      </nav>
      {toast && (
        <div className="fixed right-[25px] bottom-[27px] z-[100] flex items-center gap-2.5 bg-[var(--color-smart-blue-950)] px-[19px] py-[15px] text-[12px] text-white shadow-[0_12px_35px_var(--color-shadow-strong)] max-[800px]:right-[15px] max-[800px]:bottom-[83px]" role="status">
          <CircleCheck size={18} />
          {toast}
        </div>
      )}
    </div>
  );
};
