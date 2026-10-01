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
    <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
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
        <div className="grid grid-cols-[minmax(0,1fr)_340px] items-start gap-8 max-[800px]:block">
          <div className="space-y-4">
            {groups.map((group) => (
              <div className="border border-[var(--color-parchment-200)] bg-white" key={group}>
                <div className="flex items-center gap-2 border-b border-[var(--color-parchment-100)] px-5 py-4 text-[12px]">
                  <StoreIcon size={17} /> Vendu par <strong>{group}</strong>
                </div>
                {items
                  .filter((item) => item.sellerName === group)
                  .map((item) => (
                    <div className="flex items-center gap-4 border-b border-[var(--color-parchment-100)] px-5 py-5 last:border-0 max-[800px]:flex-wrap" key={item.productId}>
                      <Link to={`/products/${item.productId}`}>
                        <img className="size-[76px] object-cover" src={item.image} alt={item.productName} />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link to={`/products/${item.productId}`}>
                          <strong className="block font-['Playfair_Display'] text-[18px] font-medium">{item.productName}</strong>
                        </Link>
                        <small className="mt-2 flex items-center gap-1 text-[11px] text-[var(--color-tropical-teal-700)]">
                          <CircleCheck size={14} /> En stock
                        </small>
                        <UI.Button
                          className="mt-2 border-0 bg-transparent p-0 text-[11px] text-[var(--color-ink-subtle)] underline"
                          onClick={() => update(item.productId, 0)}
                        >
                          Retirer
                        </UI.Button>
                      </div>
                      <div className="flex items-end gap-5 max-[800px]:ml-[92px]">
                        <strong className="font-['Manrope'] text-[15px]">{money(item.price * item.qty)}</strong>
                        <div className="flex items-center border border-[var(--color-parchment-200)]">
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
          <aside className="sticky top-5 border border-[var(--color-parchment-200)] bg-white p-6 max-[800px]:static max-[800px]:mt-6">
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
            <div className="flex justify-between border-t border-[var(--color-parchment-200)] pt-4">
              <span>Total provisoire</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <Link className="mt-5 flex w-full items-center justify-center gap-2 bg-[var(--color-smart-blue-950)] px-4 py-3 text-[12px] font-bold text-white" to="/checkout">
              Passer commande <ArrowRight size={17} />
            </Link>
            <p className="mt-4 flex items-center gap-2 text-[11px] text-[var(--color-ink-subtle)]">
              <ShieldCheck size={16} /> Paiement sécurisé et boutiques vérifiées
            </p>
          </aside>
        </div>
      )}
    </div>
  );
};
