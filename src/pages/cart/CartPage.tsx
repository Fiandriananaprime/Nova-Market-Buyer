import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CircleCheck,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Store as StoreIcon,
  Trash2,
} from 'lucide-react';
import { money } from '../../lib/format';
import * as UI from '../../lib/ui';
import { Button, PageTitle, Empty, useShop } from '../../components/shared';
export const CartPage = () => {
  const { cart, cartItems: items, update, clear } = useShop();
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  const groups = [...new Set(items.map((i) => i.sellerName))];
  return (
    <div className="container page">
      <PageTitle
        eyebrow="VOTRE SÉLECTION"
        title="Mon panier"
        description={
          items.length
            ? `${items.length} belle${items.length > 1 ? 's' : ''} découverte${
                items.length > 1 ? 's' : ''
              } vous attendent.`
            : 'Les belles choses commencent par une découverte.'
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
                  .filter((item) => item.sellerName === group)
                  .map((item) => (
                    <div className="cart-row" key={item.productId}>
                      <Link to={`/products/${item.productId}`}>
                        <img src={item.image} alt={item.productName} />
                      </Link>
                      <div className="cart-row-info">
                        <Link to={`/products/${item.productId}`}>
                          <strong>{item.productName}</strong>
                        </Link>
                        <small>
                          <CircleCheck size={14} /> En stock
                        </small>
                        <UI.Button
                          className="remove-link"
                          onClick={() => update(item.productId, 0)}
                        >
                          Retirer
                        </UI.Button>
                      </div>
                      <div className="cart-row-end">
                        <strong>{money(item.price * item.qty)}</strong>
                        <div className="quantity">
                          <UI.Button
                            aria-label="Diminuer"
                            onClick={() => update(item.productId, item.qty - 1)}
                          >
                            <Minus size={15} />
                          </UI.Button>
                          <span>{item.qty}</span>
                          <UI.Button
                            aria-label="Augmenter"
                            onClick={() => update(item.productId, item.qty + 1)}
                            disabled={
                              item.stock !== undefined && item.qty >= item.stock
                            }
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
                Sous-total ({Object.values(cart).reduce((a, b) => a + b, 0)}{' '}
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
  );
};
