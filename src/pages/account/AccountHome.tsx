import { Link } from 'react-router-dom';
import { ArrowRight, Heart, MapPin, Package, ShieldCheck } from 'lucide-react';
import * as UI from '../../lib/ui';
export const AccountHome = () => {
  return (
    <>
      <UI.H2>Bonjour, bienvenue !</UI.H2>
      <p className="mt-2 text-[13px] text-[var(--color-ink-muted)]">
        Votre espace personnel pour des achats en toute sérénité.
      </p>
      <div className="mt-7 grid grid-cols-2 gap-4 max-[800px]:grid-cols-1">
        <Link className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1 border border-[var(--color-parchment-200)] bg-white p-5 hover:border-[var(--color-smart-blue-500)]" to="/orders">
          <Package size={25} />
          <strong className="text-[13px]">Mes commandes</strong>
          <span className="col-start-2 text-[11px] text-[var(--color-ink-subtle)]">Retrouvez et suivez vos achats</span>
          <ArrowRight className="row-span-2" size={17} />
        </Link>
        <Link className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1 border border-[var(--color-parchment-200)] bg-white p-5 hover:border-[var(--color-smart-blue-500)]" to="/favorites">
          <Heart size={25} />
          <strong className="text-[13px]">Mes favoris</strong>
          <span className="col-start-2 text-[11px] text-[var(--color-ink-subtle)]">Vos belles trouvailles sauvegardées</span>
          <ArrowRight className="row-span-2" size={17} />
        </Link>
        <Link className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1 border border-[var(--color-parchment-200)] bg-white p-5 hover:border-[var(--color-smart-blue-500)]" to="/account/addresses">
          <MapPin size={25} />
          <strong className="text-[13px]">Mes adresses</strong>
          <span className="col-start-2 text-[11px] text-[var(--color-ink-subtle)]">Gérez vos lieux de livraison</span>
          <ArrowRight className="row-span-2" size={17} />
        </Link>
        <Link className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1 border border-[var(--color-parchment-200)] bg-white p-5 hover:border-[var(--color-smart-blue-500)]" to="/account/security">
          <ShieldCheck size={25} />
          <strong className="text-[13px]">Ma sécurité</strong>
          <span className="col-start-2 text-[11px] text-[var(--color-ink-subtle)]">Protégez votre compte</span>
          <ArrowRight className="row-span-2" size={17} />
        </Link>
      </div>
    </>
  );
};
