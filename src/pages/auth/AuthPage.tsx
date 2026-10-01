import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { imagery } from "../../lib/mock"
import * as UI from "../../lib/ui"
import logo from "../../imports/LargeNova.png"
import { Button, Field, useShop } from "../../components/shared"
export const AuthPage = ({
  mode,
}: {
  mode: "login" | "register" | "forgot" | "verify-email" | "verify-phone"
}) =>{
  const { notify } = useShop()
  const navigate = useNavigate()
  const [contact, setContact] = useState("email")
  const title = {
    login: "Heureux de vous revoir.",
    register: "Bienvenue dans l'aventure.",
    forgot: "Retrouvons votre compte.",
    "verify-email": "Vérifiez votre e-mail.",
    "verify-phone": "Vérifiez votre numéro.",
  }[mode]
  return (
    <div className="auth-layout">
      <div className="auth-art">
        <img src={imagery.hero} alt="Création artisanale" />
        <div>
          <span className="eyebrow">NOVA MARKETPLACE</span>
          <UI.H2>Votre prochaine découverte commence ici.</UI.H2>
          <p>
            Un marché de belles choses, de belles rencontres et de nouvelles
            histoires.
          </p>
        </div>
      </div>
      <div className="auth-content">
        <Link to="/" className="auth-logo">
          <img src={logo} alt="NovaMarket" />
        </Link>
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> Retour à la boutique
        </Link>
        <div className="auth-form">
          <span className="eyebrow">MON ESPACE NOVAMARKET</span>
          <UI.H1>{title}</UI.H1>
          <p>
            {mode === "login"
              ? "Connectez-vous pour retrouver toutes vos découvertes."
              : mode === "register"
                ? "Créez votre espace en quelques instants."
                : "Nous vous accompagnons à chaque étape."}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              notify("Mode démo : l'authentification sera activée avec l'API")
              if (mode === "register") navigate("/auth/verify-email")
            }}
          >
            {mode === "register" && (
              <>
                <div className="form-grid">
                  <Field label="Prénom" required />
                  <Field label="Nom" required />
                </div>
                <div className="contact-choice">
                  <UI.Button
                    type="button"
                    className={contact === "email" ? "active" : ""}
                    onClick={() => setContact("email")}
                  >
                    E-mail
                  </UI.Button>
                  <UI.Button
                    type="button"
                    className={contact === "phone" ? "active" : ""}
                    onClick={() => setContact("phone")}
                  >
                    Téléphone
                  </UI.Button>
                </div>
              </>
            )}
            {mode === "login" && (
              <Field
                label="Adresse e-mail"
                type="email"
                placeholder="vous@exemple.mg"
                required
              />
            )}
            {mode === "register" && (
              <Field
                label={
                  contact === "email" ? "Adresse e-mail" : "Numéro de téléphone"
                }
                type={contact === "email" ? "email" : "tel"}
                required
              />
            )}
            {mode === "forgot" && (
              <Field label="E-mail ou téléphone" required />
            )}
            {mode.startsWith("verify") && (
              <Field
                label="Code de vérification"
                inputMode="numeric"
                minLength={4}
                maxLength={10}
                required
              />
            )}
            {(mode === "login" || mode === "register") && (
              <Field
                label="Mot de passe"
                type="password"
                minLength={8}
                required
              />
            )}
            {mode === "login" && (
              <Link className="forgot-link" to="/auth/forgot">
                Mot de passe oublié ?
              </Link>
            )}
            <Button className="w-full" type="submit">
              {mode === "login"
                ? "Se connecter"
                : mode === "register"
                  ? "Créer mon compte"
                  : mode === "forgot"
                    ? "Envoyer les instructions"
                    : "Vérifier le code"}
              <ArrowRight size={17} />
            </Button>
          </form>
          <div className="auth-alternate">
            {mode === "login" ? (
              <>
                Pas encore de compte ?{" "}
                <Link to="/auth/register">Créer un compte</Link>
              </>
            ) : (
              <>
                Vous avez déjà un compte ?{" "}
                <Link to="/auth/login">Se connecter</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
