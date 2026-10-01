import { NavLink, Outlet } from 'react-router-dom';
import {
  ChevronRight,
  CreditCard,
  LayoutGrid,
  LockKeyhole,
  MapPin,
  Settings2,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { PageTitle } from '../../components/shared';

const accountNav = [
  { title: "Vue d'ensemble", path: '/account', icon: LayoutGrid },
  { title: 'Mon profil', path: '/account/profile', icon: UserRound },
  { title: 'Mes adresses', path: '/account/addresses', icon: MapPin },
  { title: 'Moyens de paiement', path: '/account/payments', icon: CreditCard },
  { title: 'Préférences', path: '/account/preferences', icon: Settings2 },
  { title: 'Sécurité', path: '/account/security', icon: LockKeyhole },
  { title: 'Confidentialité', path: '/account/privacy', icon: ShieldCheck },
];

export const AccountShell = () => {
  return (
    <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
      <PageTitle
        eyebrow="VOTRE ESPACE"
        title="Mon compte"
        description="Toutes vos informations, à votre façon."
      />
      <div className="grid grid-cols-[250px_minmax(0,1fr)] items-start gap-10 max-[800px]:block">
        <aside className="border border-[var(--color-parchment-200)] bg-white p-5 max-[800px]:mb-6">
          <div className="mb-5 flex items-center gap-3 border-b border-[var(--color-parchment-200)] pb-5">
            <div className="grid size-11 place-items-center rounded-full bg-[var(--color-tropical-teal-100)] font-bold text-[var(--color-smart-blue-950)]">AR</div>
            <span className="min-w-0">
              <strong className="block text-[12px]">Bienvenue chez Nova</strong>
              <small className="text-[10px] text-[var(--color-ink-subtle)]">Compte de démonstration</small>
            </span>
          </div>
          <nav className="space-y-1">
            {accountNav.map(({ title, path, icon: Icon }) => (
              <NavLink key={path} to={path} end={path === '/account'}>
                <Icon size={18} />
                {title}
                <ChevronRight className="ml-auto" size={16} />
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
