import { Link } from 'react-router-dom';
import { ArrowRight, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import * as UI from '../../lib/ui';
import { Button, Field, useShop } from '../../components/shared';
export const SecurityPage = () => {
  const { notify } = useShop();
  return (
    <div className="border border-[var(--color-parchment-200)] bg-white p-7 max-[800px]:p-5">
      <UI.H2>Sécurité du compte</UI.H2>
      <p>Gardez le contrôle de vos accès et de vos informations.</p>
      <div className="flex items-center gap-4 border-y border-[var(--color-parchment-100)] py-4">
        <ShieldCheck size={21} />
        <span>
          <strong>Vérification de l'e-mail</strong>
          <small className="block text-[11px] text-[var(--color-ink-subtle)]">Confirmez votre adresse pour protéger votre compte</small>
        </span>
        <Link to="/auth/verify-email" className="text-[12px] font-bold underline underline-offset-4">
          Vérifier <ArrowRight size={15} />
        </Link>
      </div>
      <div className="flex items-center gap-4 border-b border-[var(--color-parchment-100)] py-4">
        <LockKeyhole size={21} />
        <span>
          <strong>Authentification à deux facteurs</strong>
          <small className="block text-[11px] text-[var(--color-ink-subtle)]">Une protection supplémentaire pour votre compte</small>
        </span>
        <Button
          variant="outline"
          onClick={() =>
            notify('La 2FA sera disponible avec votre compte connecté')
          }
        >
          Configurer
        </Button>
      </div>
      <div className="flex items-center gap-4 border-b border-[var(--color-parchment-100)] py-4">
        <UserRound size={21} />
        <span>
          <strong>Sessions actives</strong>
          <small className="block text-[11px] text-[var(--color-ink-subtle)]">Gérez les appareils connectés à votre compte</small>
        </span>
        <Button
          variant="outline"
          onClick={() =>
            notify('Les sessions seront disponibles avec votre compte connecté')
          }
        >
          Voir les sessions
        </Button>
      </div>
      <UI.H3>Changer de mot de passe</UI.H3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          notify('La mise à jour du mot de passe nécessite un compte connecté');
        }}
      >
        <Field label="Mot de passe actuel" type="password" required />
        <Field
          label="Nouveau mot de passe"
          type="password"
          minLength={8}
          required
        />
        <Button type="submit">Mettre à jour</Button>
      </form>
    </div>
  );
};
