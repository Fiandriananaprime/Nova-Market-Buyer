import { useState } from 'react';
import { CreditCard, Plus, Trash2, Wallet, X } from 'lucide-react';
import * as UI from '../../lib/ui';
import { Button, Field, Select, Empty, useShop } from '../../components/shared';
export const PaymentsPage = () => {
  const { notify } = useShop();
  const [methods, setMethods] = useState<
    {
      id: string;
      type: string;
      phone: string;
      label: string;
      isDefault: boolean;
    }[]
  >([]);
  const [adding, setAdding] = useState(false);
  const [type, setType] = useState('mvola');
  const [phone, setPhone] = useState('');
  const [label, setLabel] = useState('');
  return (
    <div className="border border-[var(--color-parchment-200)] bg-white p-7 max-[800px]:p-5">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-parchment-200)] pb-5">
        <div>
          <UI.H2>Moyens de paiement</UI.H2>
          <p>Retrouvez vos moyens de paiement enregistrés.</p>
        </div>
        <Button onClick={() => setAdding(true)}>
          <Plus size={17} /> Ajouter
        </Button>
      </div>
      {methods.length ? (
        methods.map((m) => (
          <div className="flex items-center justify-between gap-4 border-b border-[var(--color-parchment-100)] py-5" key={m.id}>
            <Wallet size={26} />
            <div>
              <strong>{m.label || m.type.toUpperCase()}</strong>
              <span>
                {m.phone} {m.isDefault && '· Par défaut'}
              </span>
            </div>
            <UI.Button
              onClick={() =>
                setMethods((old) => old.filter((x) => x.id !== m.id))
              }
              aria-label="Supprimer"
            >
              <Trash2 size={17} />
            </UI.Button>
          </div>
        ))
      ) : (
        <Empty
          icon={CreditCard}
          title="Aucun moyen enregistré"
          text="Ajoutez un portefeuille mobile pour faciliter vos prochains achats."
        />
      )}
      <p className="text-[11px] leading-[1.7] text-[var(--color-ink-faint)]">
        Les cartes bancaires nécessitent une intégration de paiement sécurisée.
        Aucune donnée de carte brute n'est collectée ici.
      </p>
      {adding && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--color-overlay)] p-5" onClick={() => setAdding(false)}>
          <form
            className="relative w-full max-w-[620px] bg-[var(--color-surface)] p-7"
            role="dialog"
            aria-modal="true"
            aria-label="Nouveau moyen de paiement"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              setMethods((old) => [
                ...old,
                {
                  id: String(Date.now()),
                  type,
                  phone,
                  label,
                  isDefault: !old.length,
                },
              ]);
              setAdding(false);
              setPhone('');
              notify('Moyen de paiement ajouté en mode démo');
            }}
          >
            <UI.Button
              type="button"
              className="absolute top-4 right-4 border-0 bg-transparent"
              onClick={() => setAdding(false)}
              aria-label="Fermer"
            >
              <X />
            </UI.Button>
            <UI.H2>Ajouter un moyen de paiement</UI.H2>
            <Select
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="mvola">MVola</option>
              <option value="orange_money">Orange Money</option>
            </Select>
            <Field
              label="Nom (facultatif)"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Mon portefeuille"
            />
            <Field
              label="Numéro de téléphone"
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+261 34 00 000 00"
            />
            <Button type="submit">Ajouter</Button>
          </form>
        </div>
      )}
    </div>
  );
};
