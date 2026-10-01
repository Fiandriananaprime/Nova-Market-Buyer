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
    <div className="settings-panel">
      <UI.H2>Mes préférences</UI.H2>
      <p>Faites de NovaMarket un espace qui vous ressemble.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          notify('Préférences sauvegardées en mode démo');
        }}
      >
        <div className="form-grid">
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
        <small className="muted">
          Les traductions et le mode sombre seront disponibles avec
          l'intégration complète.
        </small>
        <label className="switch-row">
          <span>
            <strong>Recommandations personnalisées</strong>
            <small>Des découvertes adaptées à vos envies</small>
          </span>
          <UI.Input
            type="checkbox"
            checked={recommend}
            onChange={(e) => setRecommend(e.target.checked)}
          />
        </label>
        <label className="switch-row">
          <span>
            <strong>Produits récemment consultés</strong>
            <small>Retrouvez facilement vos dernières découvertes</small>
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
