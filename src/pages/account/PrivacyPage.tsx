import * as UI from '../../lib/ui';
import { Button, Select, useShop } from '../../components/shared';
export const PrivacyPage = () => {
  const { notify } = useShop();
  return (
    <div className="border border-[var(--color-parchment-200)] bg-white p-7 max-[800px]:p-5">
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
        <label className="flex items-center justify-between gap-4 border-t border-[var(--color-parchment-100)] py-4" key={title}>
          <span>
            <strong>{title}</strong>
            <small className="block text-[11px] text-[var(--color-ink-subtle)]">{sub}</small>
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
      <div className="mt-7 border-t border-[var(--color-parchment-200)] pt-6">
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
