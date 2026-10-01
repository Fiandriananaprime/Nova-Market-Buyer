import { useState } from 'react';
import * as UI from '../../lib/ui';
import { Button, Select, useShop } from '../../components/shared';
export const PreferencesPage = () => {
  const { notify } = useShop();
  const [lang, setLang] = useState('fr');
  const [theme, setTheme] = useState('light');
  const [recommend, setRecommend] = useState(true);
  const [recent, setRecent] = useState(true);
  return (
    <div className="border border-[var(--color-parchment-200)] bg-white p-7 max-[800px]:p-5">
      <UI.H2>Mes préférences</UI.H2>
      <p>Faites de NovaMarket un espace qui vous ressemble.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          notify('Préférences sauvegardées en mode démo');
        }}
      >
        <div className="grid grid-cols-2 gap-4 max-[800px]:grid-cols-1">
          <Select
            label="Langue préférée"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="fr">Français</option>
            <option value="mg">Malagasy</option>
            <option value="en">English</option>
          </Select>
          <Select
            label="Thème"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
            <option value="system">Système</option>
          </Select>
        </div>
        <small className="my-4 block text-[11px] text-[var(--color-ink-subtle)]">
          Les traductions et le mode sombre seront disponibles avec
          l'intégration complète.
        </small>
        <label className="flex items-center justify-between gap-4 border-t border-[var(--color-parchment-100)] py-4">
          <span>
            <strong>Recommandations personnalisées</strong>
            <small className="block text-[11px] text-[var(--color-ink-subtle)]">Des découvertes adaptées à vos envies</small>
          </span>
          <UI.Input
            type="checkbox"
            checked={recommend}
            onChange={(e) => setRecommend(e.target.checked)}
          />
        </label>
        <label className="flex items-center justify-between gap-4 border-t border-[var(--color-parchment-100)] py-4">
          <span>
            <strong>Produits récemment consultés</strong>
            <small className="block text-[11px] text-[var(--color-ink-subtle)]">Retrouvez facilement vos dernières découvertes</small>
          </span>
          <UI.Input
            type="checkbox"
            checked={recent}
            onChange={(e) => setRecent(e.target.checked)}
          />
        </label>
        <Button type="submit">Enregistrer mes préférences</Button>
      </form>
    </div>
  );
};
