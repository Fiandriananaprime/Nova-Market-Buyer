import { useState } from "react"
import type { FormEvent } from "react"
import { MapPin, Plus, X } from "lucide-react"
import type { Address } from "../../lib/types"
import * as UI from "../../lib/ui"
import { Button, Field, useShop } from "../../components/shared"
export const AddressesPage = () => {
  const { addresses, setAddresses, notify } = useShop()
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<Address | null>(null)
  const [form, setForm] = useState<Partial<Address>>({})
  const start = (a?: Address) => {
    setEditing(a || null)
    setForm(a || {})
    setAdding(true)
  }
  const save = (e: FormEvent) => {
    e.preventDefault()
    const address = {
      id: editing?.id || `a${Date.now()}`,
      label: form.label || "Maison",
      recipientName: form.recipientName || "",
      phone: form.phone || "",
      street: form.street || "",
      district: form.district || "",
      city: form.city || "",
      region: form.region || "",
      isDefault: editing?.isDefault || addresses.length === 0,
    }
    setAddresses((old) =>
      editing
        ? old.map((a) => (a.id === editing.id ? address : a))
        : [...old, address],
    )
    setAdding(false)
    notify("Adresse enregistrée en mode démo")
  }
  return (
    <div className="settings-panel">
      <div className="panel-heading">
        <div>
          <UI.H2>Mes adresses</UI.H2>
          <p>Vos destinations préférées, toujours prêtes.</p>
        </div>
        <Button onClick={() => start()}>
          <Plus size={17} /> Ajouter
        </Button>
      </div>
      {addresses.map((a) => (
        <div className="address-card" key={a.id}>
          <MapPin size={21} />
          <div>
            <strong>
              {a.label} {a.isDefault && <small>Par défaut</small>}
            </strong>
            <p>
              {a.recipientName} · {a.phone}
              <br />
              {a.street}, {a.district}, {a.city}, {a.region}
            </p>
            <div>
              <UI.Button onClick={() => start(a)}>Modifier</UI.Button>
              <UI.Button
                onClick={() => {
                  setAddresses((old) => old.filter((x) => x.id !== a.id))
                  notify("Adresse supprimée")
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
        <div className="modal-backdrop" onClick={() => setAdding(false)}>
          <form
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Adresse"
            onClick={(e) => e.stopPropagation()}
            onSubmit={save}
          >
            <UI.Button
              type="button"
              className="close-button"
              aria-label="Fermer"
              onClick={() => setAdding(false)}
            >
              <X />
            </UI.Button>
            <UI.H2>{editing ? "Modifier l'adresse" : "Nouvelle adresse"}</UI.H2>
            <div className="form-grid">
              {[
                ["label", "Nom de l'adresse"],
                ["recipientName", "Nom du destinataire"],
                ["phone", "Téléphone"],
                ["street", "Rue et numéro"],
                ["district", "Quartier"],
                ["city", "Ville"],
                ["region", "Région"],
              ].map(([key, label]) => (
                <Field
                  key={key}
                  label={label}
                  value={String(form[(key as keyof Address)] || "")}
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
  )
}
