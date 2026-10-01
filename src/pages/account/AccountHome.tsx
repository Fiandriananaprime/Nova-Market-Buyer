import { Link } from 'react-router-dom';
import { ArrowRight, Heart, MapPin, Package, ShieldCheck } from 'lucide-react';
import * as UI from '../../lib/ui';
export const AccountHome = () => {
  return (
    <>
      <UI.H2>Bonjour, bienvenue !</UI.H2>
      <p className="muted">
        Votre espace personnel pour des achats en toute sérénité.
      </p>
      <div className="account-quick">
        <Link to="/orders">
          <Package size={25} />
          <strong>Mes commandes</strong>
          <span>Retrouvez et suivez vos achats</span>
          <ArrowRight size={17} />
        </Link>
        <Link to="/favorites">
          <Heart size={25} />
          <strong>Mes favoris</strong>
          <span>Vos belles trouvailles sauvegardées</span>
          <ArrowRight size={17} />
        </Link>
        <Link to="/account/addresses">
          <MapPin size={25} />
          <strong>Mes adresses</strong>
          <span>Gérez vos lieux de livraison</span>
          <ArrowRight size={17} />
        </Link>
        <Link to="/account/security">
          <ShieldCheck size={25} />
          <strong>Ma sécurité</strong>
          <span>Protégez votre compte</span>
          <ArrowRight size={17} />
        </Link>
      </div>
    </>
  );
};
