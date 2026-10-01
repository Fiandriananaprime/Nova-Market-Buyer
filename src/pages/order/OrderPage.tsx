import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, Check, MapPin, Wallet } from "lucide-react"
import { date, money } from "../../lib/mock"
import * as UI from "../../lib/ui"
import { Button, PageTitle, Empty, useShop } from "../../components/shared"
export const OrderPage = () => {
  const { id } = useParams()
  const { orders, notify } = useShop()
  const navigate = useNavigate()
  const order = orders.find((o) => o.id === id)
  if (!order)
    return (
      <div className="container page">
        <Empty
          title="Commande introuvable"
          text="Cette commande n'est pas disponible."
          to="/orders"
          action="Voir mes commandes"
        />
      </div>
    )
  const phases = [
    "Commande passée",
    "Confirmée",
    "En préparation",
    "En livraison",
    "Livrée",
  ]
  const current =
    order.status === "pending"
      ? 0
      : order.status === "confirmed"
        ? 1
        : order.status === "preparing"
          ? 2
          : order.status === "processing"
            ? 3
            : 4
  return (
    <div className="container page">
      <Link className="back-link" to="/orders">
        <ArrowLeft size={17} /> Toutes les commandes
      </Link>
      <PageTitle
        eyebrow="DÉTAILS DE COMMANDE"
        title={`Commande ${order.id}`}
        description={`Passée le ${date(order.createdAt)}`}
        action={
          <span className="status-badge">
            {order.status === "processing"
              ? "En cours de livraison"
              : order.status === "pending"
                ? "En attente"
                : order.status}
          </span>
        }
      />
      <div className="order-detail-layout">
        <div>
          <div className="panel">
            <div className="panel-heading">
              <UI.H2>Votre commande avance</UI.H2>
              <Link className="text-link" to={`/orders/${order.id}/tracking`}>
                Suivre la livraison <ArrowRight size={16} />
              </Link>
            </div>
            <div className="timeline">
              {phases.map((phase, i) => (
                <div className={i <= current ? "complete" : ""} key={phase}>
                  <span>{i <= current ? <Check size={14} /> : i + 1}</span>
                  <strong>{phase}</strong>
                </div>
              ))}
            </div>
            <p className="muted">
              Livraison estimée le {date(order.estimatedDelivery)}
            </p>
          </div>
          <div className="panel">
            <UI.H2>Articles commandés</UI.H2>
            {order.items.map((item, i) => (
              <div className="order-item" key={i}>
                <img src={item.image} alt="" />
                <div>
                  <Link to={`/products/${item.productId}`}>
                    <strong>{item.productName}</strong>
                  </Link>
                  <span>
                    {item.sellerName} · Quantité {item.qty}
                  </span>
                </div>
                <strong>{money(item.price * item.qty)}</strong>
              </div>
            ))}
          </div>
        </div>
        <aside>
          <div className="panel">
            <UI.H2>Récapitulatif</UI.H2>
            <div className="detail-row">
              <span>Sous-total</span>
              <strong>{money(order.subtotal)}</strong>
            </div>
            <div className="detail-row">
              <span>Livraison</span>
              <strong>{money(order.deliveryFee)}</strong>
            </div>
            <div className="detail-row total">
              <span>Total</span>
              <strong>{money(order.total)}</strong>
            </div>
          </div>
          <div className="panel">
            <UI.H2>Livraison & paiement</UI.H2>
            <p>
              <MapPin size={17} />
              <span>
                {order.address?.recipientName}
                <br />
                {order.address?.street}, {order.address?.city}
              </span>
            </p>
            <p>
              <Wallet size={17} />
              <span>
                {order.paymentMethod.toUpperCase()} · {order.paymentStatus}
              </span>
            </p>
            {order.note && (
              <p>
                <span>Note de livraison : {order.note}</span>
              </p>
            )}
          </div>
          <Link
            className="btn btn-dark w-full"
            to={`/orders/${order.id}/tracking`}
          >
            Suivre ma livraison <ArrowRight size={17} />
          </Link>
          {order.status === "pending" && (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                notify("Annulation disponible une fois l'API connectée")
                navigate("/orders")
              }}
            >
              Annuler la commande
            </Button>
          )}
        </aside>
      </div>
    </div>
  )
}
