import * as UI from '../../lib/ui';
import { Button, Select, useShop } from '../../components/shared';
export const PrivacyPage = () => {
  const { notify } = useShop();
  return (
    <div className="settings-panel">
      <UI.H2>Confidentialité & données</UI.H2>
      <p>Vos données, vos choix.</p>
      <Select label="Visibilité du profil">
        <option value="private">Privé</option>
        <option value="public">Public</option>
      </Select>
      {[
        [
          'Partage de données',
          'Autoriser le partage de données avec nos partenaires',
        ],
        ['Communications marketing', 'Recevoir des nouvelles et offres'],
        ["Analyse d'utilisation", 'Aider à améliorer NovaMarket'],
        ['Personnalisation', 'Adapter les suggestions à vos intérêts'],
      ].map(([title, sub]) => (
        <label className="switch-row" key={title}>
          <span>
            <strong>{title}</strong>
            <small>{sub}</small>
          </span>
          <UI.Input
            type="checkbox"
            defaultChecked={title === 'Personnalisation'}
          />
        </label>
      ))}
      <Button onClick={() => notify('Choix enregistrés en mode démo')}>
        Enregistrer mes choix
      </Button>
      <div className="export-box">
        <UI.H3>Exporter mes données personnelles</UI.H3>
        <p>
          Demandez une copie de vos informations. Disponible une fois votre
          compte connecté.
        </p>
        <Button
          variant="outline"
          onClick={() => notify("L'export nécessite un compte connecté")}
        >
          Demander un export
        </Button>
      </div>
    </div>
  );
};
