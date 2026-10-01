import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, Check, CreditCard, LockKeyhole, MapPin, Plus, ShoppingBag, Sparkles, Store as StoreIcon, Truck, Wallet } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { money, products } from "../../lib/mock"
import type { Order } from "../../lib/mock"
import * as UI from "../../lib/ui"
import { Button, Field, PageTitle, Empty, useShop } from "../../components/shared"
export const CheckoutPage = () => {
  const { cart, addresses, place } = useShop()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [addressId, setAddressId] = useState(
    addresses.find((a) => a.isDefault)?.id || "",
  )
  const [delivery, setDelivery] = useState("standard")
  const [payment, setPayment] = useState("mvola")
  const [phone, setPhone] = useState("")
  const [note, setNote] = useState("")
  const [error, setError] = useState("")
  const items = products.filter((p) => cart[p.id])
  const subtotal = items.reduce((sum, p) => sum + p.price * cart[p.id], 0)
  const fee = delivery === "express" ? 20000 : delivery === "pickup" ? 0 : 12000
  const address = addresses.find((a) => a.id === addressId)
  const steps = ["Adresse", "Livraison", "Paiement", "Confirmation"]
  const next = () => {
    if (step === 0 && !address && delivery !== "pickup") {
      setError(
        "Choisissez une adresse de livraison ou ajoutez-en une dans votre compte.",
      )
      return
    }
    if (
      step === 2 &&
      payment !== "card" &&
      payment !== "cod" &&
      !phone.trim()
    ) {
      setError("Renseignez le numéro associé à votre paiement mobile.")
      return
    }
    setError("")
    setStep(step + 1)
  }
  const submit = () => {
    if (!address && delivery !== "pickup") {
      setError("Une adresse est nécessaire pour cette livraison.")
      return
    }
    const now = new Date()
    const order: Order = {
      id: `ORD-${now.getFullYear()}-${String(Date.now()).slice(-6)}`,
      items: items.map((p) => ({
        productId: p.id,
        productName: p.name,
        image: p.images,
        price: p.price,
        qty: cart[p.id],
        sellerName: p.storeName,
      })),
      subtotal,
      deliveryFee: fee,
      total: subtotal + fee,
      status: "pending",
      deliveryMethod: delivery,
      paymentMethod: payment,
      paymentStatus: "pending",
      note: note.trim() || undefined,
      address: address || addresses[0],
      createdAt: now.toISOString(),
      estimatedDelivery: new Date(now.getTime() + 4 * 86400000).toISOString(),
    }
    place(order)
    navigate(`/orders/${order.id}`)
  }
  if (!items.length)
    return (
      <div className="container page">
        <Empty
          icon={ShoppingBag}
          title="Votre panier est vide"
          text="Ajoutez des articles avant de passer commande."
          to="/explore"
        />
      </div>
    )
  return (
    <div className="container page">
      <PageTitle
        eyebrow="PLUS QUE QUELQUES ÉTAPES"
        title="Finaliser ma commande"
        description="Un parcours simple pour vos belles découvertes."
      />
      <div className="checkout-steps">
        {steps.map((s, i) => (
          <div
            key={s}
            className={i === step ? "current" : i < step ? "done" : ""}
          >
            <span>{i < step ? <Check size={15} /> : i + 1}</span>
            {s}
          </div>
        ))}
      </div>
      <div className="checkout-layout">
        <div className="checkout-panel">
          {step === 0 && (
            <>
              <UI.H2>Où souhaitez-vous être livré ?</UI.H2>
              <p>Choisissez une adresse enregistrée.</p>
              {addresses.map((a) => (
                <UI.Button
                  className={`option-card ${
                    addressId === a.id ? "active" : ""
                  }`}
                  onClick={() => setAddressId(a.id)}
                  key={a.id}
                >
                  <MapPin size={22} />
                  <span>
                    <strong>
                      {a.label} {a.isDefault && <small>Par défaut</small>}
                    </strong>
                    <span>
                      {a.recipientName} · {a.phone}
                    </span>
                    <span>
                      {a.street}, {a.city}
                    </span>
                  </span>
                  <span className="radio-dot" />
                </UI.Button>
              ))}
              <Link className="text-link" to="/account/addresses">
                <Plus size={17} /> Ajouter une adresse
              </Link>
            </>
          )}
          {step === 1 && (
            <>
              <UI.H2>Choisissez votre livraison</UI.H2>
              <p>La meilleure option selon votre envie.</p>
              {[
                [
                  "standard",
                  "Livraison standard",
                  "Livraison à domicile en quelques jours",
                  12000,
                  Truck,
                ],
                [
                  "express",
                  "Livraison express",
                  "Pour recevoir vos trouvailles plus vite",
                  20000,
                  Sparkles,
                ],
                [
                  "pickup",
                  "Retrait sur place",
                  "Récupérez votre commande en boutique",
                  0,
                  StoreIcon,
                ],
              ].map(([id, title, sub, price, Icon]) => {
                const I = Icon as LucideIcon
                return (
                  <UI.Button
                    key={id as string}
                    className={`option-card ${delivery === id ? "active" : ""}`}
                    onClick={() => setDelivery(id as string)}
                  >
                    <I size={23} />
                    <span>
                      <strong>{title as string}</strong>
                      <span>{sub as string}</span>
                    </span>
                    <b>{price ? money(price as number) : "Gratuit"}</b>
                    <span className="radio-dot" />
                  </UI.Button>
                )
              })}
            </>
          )}
          {step === 2 && (
            <>
              <UI.H2>Comment souhaitez-vous payer ?</UI.H2>
              <p>Choisissez votre moyen de paiement préféré.</p>
              {[
                ["mvola", "MVola", "Paiement mobile"],
                ["orange_money", "Orange Money", "Paiement mobile"],
                ["card", "Carte bancaire", "Paiement sécurisé"],
                ["cod", "À la livraison", "Payez à la réception"],
              ].map(([id, title, sub]) => (
                <UI.Button
                  key={id}
                  className={`option-card ${payment === id ? "active" : ""}`}
                  onClick={() => setPayment(id)}
                >
                  {id === "card" ? (
                    <CreditCard size={22} />
                  ) : (
                    <Wallet size={22} />
                  )}
                  <span>
                    <strong>{title}</strong>
                    <span>{sub}</span>
                  </span>
                  <span className="radio-dot" />
                </UI.Button>
              ))}
              {(payment === "mvola" || payment === "orange_money") && (
                <Field
                  label="Numéro de téléphone pour le paiement"
                  type="tel"
                  placeholder="+261 34 00 000 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              )}
            </>
          )}
          {step === 3 && (
            <>
              <UI.H2>Tout est prêt ?</UI.H2>
              <p>Vérifiez les détails de votre commande avant de confirmer.</p>
              <div className="checkout-recap">
                <UI.H3>Votre sélection</UI.H3>
                {items.map((p) => (
                  <div key={p.id}>
                    <img src={p.images} alt="" />
                    <span>
                      {p.name}
                      <small>
                        {p.storeName} · Quantité {cart[p.id]}
                      </small>
                    </span>
                    <strong>{money(p.price * cart[p.id])}</strong>
                  </div>
                ))}
              </div>
              <div className="checkout-detail">
                <strong>Livraison</strong>
                <span>
                  {delivery === "standard"
                    ? "Standard"
                    : delivery === "express"
                      ? "Express"
                      : "Retrait en boutique"}{" "}
                  · {address?.street || "Retrait sur place"}
                </span>
                <strong>Paiement</strong>
                <span>
                  {payment === "mvola"
                    ? "MVola"
                    : payment === "orange_money"
                      ? "Orange Money"
                      : payment === "cod"
                        ? "À la livraison"
                        : "Carte bancaire"}
                </span>
              </div>
              <label className="field">
                <span>Une note pour votre commande ? (facultatif)</span>
                <UI.Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Instructions pour la livraison..."
                />
              </label>
            </>
          )}
          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}
          <div className="checkout-buttons">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setError("")
                  setStep(step - 1)
                }}
              >
                <ArrowLeft size={17} /> Retour
              </Button>
            )}
            <Button onClick={step === 3 ? submit : next}>
              {step === 3 ? "Confirmer la commande" : "Continuer"}
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
        <aside className="summary-card">
          <UI.H2>Votre commande</UI.H2>
          {items.map((p) => (
            <div key={p.id}>
              <span>
                {p.name} × {cart[p.id]}
              </span>
              <strong>{money(p.price * cart[p.id])}</strong>
            </div>
          ))}
          <div>
            <span>Sous-total</span>
            <strong>{money(subtotal)}</strong>
          </div>
          <div>
            <span>Livraison</span>
            <strong>{money(fee)}</strong>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>{money(subtotal + fee)}</strong>
          </div>
          <p>
            <LockKeyhole size={16} /> Vos informations sont protégées
          </p>
        </aside>
      </div>
    </div>
  )
}
