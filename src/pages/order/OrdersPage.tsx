import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Package } from "lucide-react"
import { date, money } from "../../lib/mock"
import { Button, PageTitle, Empty, useShop } from "../../components/shared"
export const OrdersPage = () => {
  const { orders } = useShop()
  const [filter, setFilter] = useState("all")
  const visible = orders.filter((o) => filter === "all" || o.status === filter)
  return (
    <div className="container page">
      <PageTitle
        eyebrow="VOTRE PARCOURS"
        title="Mes commandes"
        description="Suivez chaque découverte, de la commande jusqu'à chez vous."
      />
      <div className="pill-filters">
        {[
          ["all", "Toutes"],
          ["pending", "En attente"],
          ["processing", "En cours"],
          ["delivered", "Livrées"],
          ["cancelled", "Annulées"],
        ].map(([v, label]) => (
          <Button
            key={v}
            variant={filter === v ? "dark" : "outline"}
            onClick={() => setFilter(v)}
          >
            {label}
          </Button>
        ))}
      </div>
      {visible.length ? (
        <div className="orders-list">
          {visible.map((o) => (
            <Link className="order-card" to={`/orders/${o.id}`} key={o.id}>
              <div className="order-card-top">
                <span>
                  <strong>{o.id}</strong>
                  <small>Commandée le {date(o.createdAt)}</small>
                </span>
                <span className="status-badge">
                  {o.status === "processing"
                    ? "En cours"
                    : o.status === "pending"
                      ? "En attente"
                      : o.status === "delivered"
                        ? "Livrée"
                        : o.status}
                </span>
              </div>
              <div className="order-card-content">
                <div className="order-thumbs">
                  {o.items.map((item, i) => (
                    <img key={i} src={item.image} alt={item.productName} />
                  ))}
                </div>
                <span>
                  {o.items.length} article{o.items.length > 1 ? "s" : ""}
                  <small>
                    {[...new Set(o.items.map((i) => i.sellerName))].join(" · ")}
                  </small>
                </span>
                <strong>{money(o.total)}</strong>
                <ArrowRight size={19} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Empty
          icon={Package}
          title="Aucune commande ici"
          text="Vos futures commandes apparaîtront dans cet espace."
          to="/explore"
        />
      )}
    </div>
  )
}
