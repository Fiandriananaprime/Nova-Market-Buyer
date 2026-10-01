import { useState } from 'react';
import type { FormEvent } from 'react';
import { MapPin, Plus, X } from 'lucide-react';
import type { Address } from '../../lib/types';
import * as UI from '../../lib/ui';
import { Button, Field, useShop } from '../../components/shared';
export const AddressesPage = () => {
  const { addresses, setAddresses, notify } = useShop();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [form, setForm] = useState<Partial<Address>>({});
  const start = (a?: Address) => {
    setEditing(a || null);
    setForm(a || {});
    setAdding(true);
  };
  const save = (e: FormEvent) => {
    e.preventDefault();
    const address = {
      id: editing?.id || `a${Date.now()}`,
      label: form.label || 'Maison',
      recipientName: form.recipientName || '',
      phone: form.phone || '',
      street: form.street || '',
      district: form.district || '',
      city: form.city || '',
      region: form.region || '',
      isDefault: editing?.isDefault || addresses.length === 0,
    };
    setAddresses((old) =>
      editing
        ? old.map((a) => (a.id === editing.id ? address : a))
        : [...old, address],
    );
    setAdding(false);
    notify('Adresse enregistrée en mode démo');
  };
  return (
    <div className="border border-[var(--color-parchment-200)] bg-white p-7 max-[800px]:p-5">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-parchment-200)] pb-5">
        <div>
          <UI.H2>Mes adresses</UI.H2>
          <p>Vos destinations préférées, toujours prêtes.</p>
        </div>
        <Button onClick={() => start()}>
          <Plus size={17} /> Ajouter
        </Button>
      </div>
      {addresses.map((a) => (
        <div className="flex gap-4 border-b border-[var(--color-parchment-100)] py-5" key={a.id}>
          <MapPin size={21} />
          <div>
            <strong>
              {a.label} {a.isDefault && <small>Par défaut</small>}
            </strong>
            <p className="my-2 text-[12px] text-[var(--color-ink-muted)]">
              {a.recipientName} · {a.phone}
              <br />
              {a.street}, {a.district}, {a.city}, {a.region}
            </p>
            <div className="flex flex-wrap gap-2">
              <UI.Button onClick={() => start(a)}>Modifier</UI.Button>
              <UI.Button
                onClick={() => {
                  setAddresses((old) => old.filter((x) => x.id !== a.id));
                  notify('Adresse supprimée');
                }}
              >
                Supprimer
              </UI.Button>
              {!a.isDefault && (
                <UI.Button
                  onClick={() =>
                    setAddresses((old) =>
                      old.map((x) => ({ ...x, isDefault: x.id === a.id })),
                    )
                  }
                >
                  Définir par défaut
                </UI.Button>
              )}
            </div>
          </div>
        </div>
      ))}
      {adding && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--color-overlay)] p-5" onClick={() => setAdding(false)}>
          <form
            className="relative max-h-[90vh] w-full max-w-[620px] overflow-y-auto bg-[var(--color-surface)] p-7"
            role="dialog"
            aria-modal="true"
            aria-label="Adresse"
            onClick={(e) => e.stopPropagation()}
            onSubmit={save}
          >
            <UI.Button
              type="button"
              className="absolute top-4 right-4 border-0 bg-transparent"
              aria-label="Fermer"
              onClick={() => setAdding(false)}
            >
              <X />
            </UI.Button>
            <UI.H2>{editing ? "Modifier l'adresse" : 'Nouvelle adresse'}</UI.H2>
            <div className="grid grid-cols-2 gap-4 max-[800px]:grid-cols-1">
              {[
                ['label', "Nom de l'adresse"],
                ['recipientName', 'Nom du destinataire'],
                ['phone', 'Téléphone'],
                ['street', 'Rue et numéro'],
                ['district', 'Quartier'],
                ['city', 'Ville'],
                ['region', 'Région'],
              ].map(([key, label]) => (
                <Field
                  key={key}
                  label={label}
                  value={String(form[key as keyof Address] || '')}
                  onChange={(e) =>
                    setForm((old) => ({ ...old, [key]: e.target.value }))
                  }
                  required
                />
              ))}
            </div>
            <Button type="submit">Enregistrer l'adresse</Button>
          </form>
        </div>
      )}
    </div>
  );
};
