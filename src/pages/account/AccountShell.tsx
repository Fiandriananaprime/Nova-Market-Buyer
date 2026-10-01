import { NavLink, Outlet } from "react-router-dom"
import {
  ChevronRight,
  CreditCard,
  LayoutGrid,
  LockKeyhole,
  MapPin,
  Settings2,
  ShieldCheck,
  UserRound,
} from "lucide-react"
import { PageTitle } from "../../components/shared"

const accountNav = [
  { title: "Vue d'ensemble", path: "/account", icon: LayoutGrid },
  { title: "Mon profil", path: "/account/profile", icon: UserRound },
  { title: "Mes adresses", path: "/account/addresses", icon: MapPin },
  { title: "Moyens de paiement", path: "/account/payments", icon: CreditCard },
  { title: "Préférences", path: "/account/preferences", icon: Settings2 },
  { title: "Sécurité", path: "/account/security", icon: LockKeyhole },
  { title: "Confidentialité", path: "/account/privacy", icon: ShieldCheck },
]

export const AccountShell = () => {
  return (
    <div className="container page">
      <PageTitle
        eyebrow="VOTRE ESPACE"
        title="Mon compte"
        description="Toutes vos informations, à votre façon."
      />
      <div className="account-layout">
        <aside className="account-sidebar">
          <div className="account-person">
            <div>AR</div>
            <span>
              <strong>Bienvenue chez Nova</strong>
              <small>Compte de démonstration</small>
            </span>
          </div>
          <nav>
            {accountNav.map(({ title, path, icon: Icon }) => (
              <NavLink key={path} to={path} end={path === "/account"}>
                <Icon size={18} />
                {title}
                <ChevronRight size={16} />
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="account-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
