import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as UI from '../../lib/ui';
import logo from '../../imports/LargeNova.png';
import { Button, Field, useShop } from '../../components/shared';
import { authApi, NovaApiError } from '../../lib/api';
export const AuthPage = ({
  mode,
}: {
  mode: 'login' | 'register' | 'forgot' | 'verify-email' | 'verify-phone';
}) => {
  const { notify } = useShop();
  const navigate = useNavigate();
  const [contact, setContact] = useState('email');
  const title = {
    login: 'Heureux de vous revoir.',
    register: "Bienvenue dans l'aventure.",
    forgot: 'Retrouvons votre compte.',
    'verify-email': 'Vérifiez votre e-mail.',
    'verify-phone': 'Vérifiez votre numéro.',
  }[mode];
  return (
    <div className="grid min-h-screen grid-cols-[0.9fr_1.1fr] max-[800px]:block">
      <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[var(--color-smart-blue-950)] p-[clamp(25px,5vw,80px)] text-white max-[800px]:hidden">
        <img className="relative z-10 w-[155px]" src={logo} alt="NovaMarket" />
        <div className="relative z-10 max-w-[420px]">
          <span className="mb-3 block font-[Manrope] text-[10px] font-extrabold tracking-[0.19em] text-[var(--color-black-800)] uppercase">NOVA MARKETPLACE</span>
          <UI.H2 className="mt-4 font-['Playfair_Display'] text-[clamp(30px,3.5vw,52px)] font-normal leading-[1.08]">Votre prochaine découverte commence ici.</UI.H2>
          <p className="mt-5 max-w-[350px] text-[13px] leading-[1.8] text-[var(--color-surface-soft)]">
            Un marché de belles choses, de belles rencontres et de nouvelles
            histoires.
          </p>
        </div>
      </div>
      <div className="flex min-h-screen flex-col px-[clamp(25px,8vw,130px)] py-8">
        <Link to="/" className="mb-8">
          <img className="w-[125px]" src={logo} alt="NovaMarket" />
        </Link>
        <Link to="/" className="mb-10 inline-flex items-center gap-2 text-[11px] text-[var(--color-ink-muted)] hover:text-[var(--color-smart-blue-950)]">
          <ArrowLeft size={16} /> Retour à la boutique
        </Link>
        <div className="m-auto w-full max-w-[470px]">
          <span className="mb-3 block font-[Manrope] text-[10px] font-extrabold tracking-[0.19em] text-[var(--color-black-800)] uppercase">MON ESPACE NOVAMARKET</span>
          <UI.H1 className="mt-4 font-['Playfair_Display'] text-[clamp(34px,4vw,55px)] font-normal leading-[1.08]">{title}</UI.H1>
          <p className="mt-4 text-[13px] text-[var(--color-ink-muted)]">
            {mode === 'login'
              ? 'Connectez-vous pour retrouver toutes vos découvertes.'
              : mode === 'register'
                ? 'Créez votre espace en quelques instants.'
                : 'Nous vous accompagnons à chaque étape.'}
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              try {
                if (mode === 'login') {
                  await authApi.login({
                    email: String(form.get('email')),
                    password: String(form.get('password')),
                  });
                  notify('Connexion réussie');
                  navigate('/');
                } else if (mode === 'register') {
                  const contactValue = String(form.get('contact'));
                  await authApi.register({
                    firstName: String(form.get('firstName')),
                    lastName: String(form.get('lastName')),
                    password: String(form.get('password')),
                    ...(contact === 'email'
                      ? { email: contactValue }
                      : { phone: contactValue }),
                  });
                  notify('Compte créé. Vérifiez votre contact.');
                  navigate(
                    contact === 'email'
                      ? '/auth/verify-email'
                      : '/auth/verify-phone',
                  );
                } else if (mode === 'forgot') {
                  await authApi.forgotPassword(String(form.get('identifier')));
                  notify('Instructions envoyées si le compte existe');
                } else {
                  await (
                    mode === 'verify-email'
                      ? authApi.verifyEmail
                      : authApi.verifyPhone
                  )(String(form.get('code')));
                  notify('Vérification réussie');
                  navigate('/auth/login');
                }
              } catch (error) {
                notify(
                  error instanceof NovaApiError
                    ? error.message
                    : 'Impossible de contacter le serveur',
                );
              }
            }}
          >
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-4 max-[500px]:grid-cols-1">
                  <Field label="Prénom" name="firstName" required />
                  <Field label="Nom" name="lastName" required />
                </div>
                <div className="my-4 flex border-b border-[var(--color-parchment-200)]">
                  <UI.Button
                    type="button"
                    className={`border-0 border-b-2 bg-transparent px-0 py-3 mr-6 text-[12px] font-bold ${contact === 'email' ? 'border-[var(--color-smart-blue-950)] text-[var(--color-smart-blue-950)]' : 'border-transparent text-[var(--color-ink-subtle)]'}`}
                    onClick={() => setContact('email')}
                  >
                    E-mail
                  </UI.Button>
                  <UI.Button
                    type="button"
                    className={`border-0 border-b-2 bg-transparent px-0 py-3 text-[12px] font-bold ${contact === 'phone' ? 'border-[var(--color-smart-blue-950)] text-[var(--color-smart-blue-950)]' : 'border-transparent text-[var(--color-ink-subtle)]'}`}
                    onClick={() => setContact('phone')}
                  >
                    Téléphone
                  </UI.Button>
                </div>
              </>
            )}
            {mode === 'login' && (
              <Field
                label="Adresse e-mail"
                type="email"
                name="email"
                placeholder="vous@exemple.mg"
                required
              />
            )}
            {mode === 'register' && (
              <Field
                label={
                  contact === 'email' ? 'Adresse e-mail' : 'Numéro de téléphone'
                }
                name="contact"
                type={contact === 'email' ? 'email' : 'tel'}
                required
              />
            )}
            {mode === 'forgot' && (
              <Field label="E-mail ou téléphone" name="identifier" required />
            )}
            {mode.startsWith('verify') && (
              <Field
                label="Code de vérification"
                name="code"
                inputMode="numeric"
                minLength={4}
                maxLength={10}
                required
              />
            )}
            {(mode === 'login' || mode === 'register') && (
              <Field
                label="Mot de passe"
                name="password"
                type="password"
                minLength={8}
                required
              />
            )}
            {mode === 'login' && (
              <Link className="my-3 block text-right text-[11px] font-bold text-[var(--color-smart-blue-800)]" to="/auth/forgot">
                Mot de passe oublié ?
              </Link>
            )}
            <Button className="w-full" type="submit">
              {mode === 'login'
                ? 'Se connecter'
                : mode === 'register'
                  ? 'Créer mon compte'
                  : mode === 'forgot'
                    ? 'Envoyer les instructions'
                    : 'Vérifier le code'}
              <ArrowRight size={17} />
            </Button>
          </form>
          <div className="mt-7 text-center text-[12px] text-[var(--color-ink-muted)]">
            {mode === 'login' ? (
              <>
                Pas encore de compte ?{' '}
                <Link to="/auth/register">Créer un compte</Link>
              </>
            ) : (
              <>
                Vous avez déjà un compte ?{' '}
                <Link to="/auth/login">Se connecter</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
