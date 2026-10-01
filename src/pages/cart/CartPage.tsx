import { Link } from "react-router-dom"
import { ArrowRight, CircleCheck, Minus, Plus, ShieldCheck, ShoppingBag, Store as StoreIcon, Trash2 } from "lucide-react"
import { money, products } from "../../lib/mock"
import * as UI from "../../lib/ui"
import { Button, PageTitle, Empty, useShop } from "../../components/shared"
export const CartPage = () => {
  const { cart, update, clear } = useShop()
  const items = products.filter((p) => cart[p.id])
  const subtotal = items.reduce((total, p) => total + p.price * cart[p.id], 0)
  const groups = [...new Set(items.map((i) => i.storeName))]
  return (
    <div className="container page">
      <PageTitle
        eyebrow="VOTRE SÉLECTION"
        title="Mon panier"
        description={
          items.length
            ? `${items.length} belle${items.length > 1 ? "s" : ""} découverte${
                items.length > 1 ? "s" : ""
              } vous attendent.`
            : "Les belles choses commencent par une découverte."
        }
        action={
          items.length ? (
            <Button variant="ghost" onClick={clear}>
              <Trash2 size={16} /> Vider le panier
            </Button>
          ) : undefined
        }
      />
      {!items.length ? (
        <Empty
          icon={ShoppingBag}
          title="Votre panier attend ses découvertes"
          text="Parcourez notre sélection et trouvez quelque chose qui vous ressemble."
          to="/explore"
          action="Explorer la collection"
        />
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {groups.map((group) => (
              <div className="cart-group" key={group}>
                <div className="cart-group-title">
                  <StoreIcon size={17} /> Vendu par <strong>{group}</strong>
                </div>
                {items
                  .filter((p) => p.storeName === group)
                  .map((p) => (
                    <div className="cart-row" key={p.id}>
                      <Link to={`/products/${p.id}`}>
                        <img src={p.images} alt={p.name} />
                      </Link>
                      <div className="cart-row-info">
                        <Link to={`/products/${p.id}`}>
                          <strong>{p.name}</strong>
                        </Link>
                        <span>{p.brand}</span>
                        <small>
                          <CircleCheck size={14} /> En stock
                        </small>
                        <UI.Button
                          className="remove-link"
                          onClick={() => update(p.id, 0)}
                        >
                          Retirer
                        </UI.Button>
                      </div>
                      <div className="cart-row-end">
                        <strong>{money(p.price * cart[p.id])}</strong>
                        <div className="quantity">
                          <UI.Button
                            aria-label="Diminuer"
                            onClick={() => update(p.id, cart[p.id] - 1)}
                          >
                            <Minus size={15} />
                          </UI.Button>
                          <span>{cart[p.id]}</span>
                          <UI.Button
                            aria-label="Augmenter"
                            onClick={() => update(p.id, cart[p.id] + 1)}
                            disabled={cart[p.id] >= p.stock}
                          >
                            <Plus size={15} />
                          </UI.Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
          <aside className="summary-card">
            <UI.H2>Récapitulatif</UI.H2>
            <div>
              <span>
                Sous-total ({Object.values(cart).reduce((a, b) => a + b, 0)}{" "}
                articles)
              </span>
              <strong>{money(subtotal)}</strong>
            </div>
            <div>
              <span>Livraison</span>
              <span>Calculée à l'étape suivante</span>
            </div>
            <div className="summary-total">
              <span>Total provisoire</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <Link className="btn btn-dark w-full" to="/checkout">
              Passer commande <ArrowRight size={17} />
            </Link>
            <p>
              <ShieldCheck size={16} /> Paiement sécurisé et boutiques vérifiées
            </p>
          </aside>
        </div>
      )}
    </div>
  )
}
