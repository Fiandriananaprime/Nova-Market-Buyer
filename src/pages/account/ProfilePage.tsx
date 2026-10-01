import * as UI from "../../lib/ui"
import { Button, Field, useShop } from "../../components/shared"
export const ProfilePage = () => {
  const { notify } = useShop()
  return (
    <div className="settings-panel">
      <UI.H2>Informations personnelles</UI.H2>
      <p>Personnalisez les informations associées à votre compte.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          notify("Profil mis à jour en mode démo")
        }}
      >
        <div className="form-grid">
          <Field label="Prénom" defaultValue="Aina" required />
          <Field label="Nom" defaultValue="Rakoto" required />
          <Field
            label="Adresse e-mail"
            type="email"
            defaultValue="aina@example.mg"
          />
          <Field
            label="Téléphone"
            type="tel"
            defaultValue="+261 34 12 345 67"
          />
        </div>
        <small className="muted">
          Les changements d'e-mail et de téléphone nécessiteront une
          vérification lorsque votre compte sera connecté.
        </small>
        <Button type="submit">Enregistrer les modifications</Button>
      </form>
    </div>
  )
}
