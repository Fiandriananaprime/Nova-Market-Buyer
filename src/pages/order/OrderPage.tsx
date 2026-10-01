import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, MapPin, Wallet } from 'lucide-react';
import { date, money } from '../../lib/format';
import * as UI from '../../lib/ui';
import { Button, PageTitle, Empty, useShop } from '../../components/shared';
export const OrderPage = () => {
  const { id } = useParams();
  const { orders, notify } = useShop();
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === id);
  if (!order)
    return (
      <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
        <Empty
          title="Commande introuvable"
          text="Cette commande n'est pas disponible."
          to="/orders"
          action="Voir mes commandes"
        />
      </div>
    );
  const phases = [
    'Commande passée',
    'Confirmée',
    'En préparation',
    'En livraison',
    'Livrée',
  ];
  const current =
    order.status === 'pending'
      ? 0
      : order.status === 'confirmed'
        ? 1
        : order.status === 'preparing'
          ? 2
          : order.status === 'processing'
            ? 3
            : 4;
  return (
    <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
      <Link className="mb-6 inline-flex items-center gap-2 text-[11px] text-[var(--color-ink-muted)]" to="/orders">
        <ArrowLeft size={17} /> Toutes les commandes
      </Link>
      <PageTitle
        eyebrow="DÉTAILS DE COMMANDE"
        title={`Commande ${order.id}`}
        description={`Passée le ${date(order.createdAt)}`}
        action={
          <span className="bg-[var(--color-tropical-teal-100)] px-2.5 py-2 text-[10px] font-bold whitespace-nowrap text-[var(--color-black-800)]">
            {order.status === 'processing'
              ? 'En cours de livraison'
              : order.status === 'pending'
                ? 'En attente'
                : order.status}
          </span>
        }
      />
      <div className="grid grid-cols-[minmax(0,1fr)_330px] gap-8 max-[1100px]:grid-cols-1">
        <div>
          <div className="mb-4 border border-[var(--color-border-soft)] p-7">
            <div className="flex items-center justify-between">
              <UI.H2>Votre commande avance</UI.H2>
              <Link className="text-[12px] font-bold underline underline-offset-4" to={`/orders/${order.id}/tracking`}>
                Suivre la livraison <ArrowRight size={16} />
              </Link>
            </div>
            <div className="my-7 flex justify-between gap-1">
              {phases.map((phase, i) => (
                <div className={`relative flex flex-1 flex-col gap-2.5 text-[10px] text-[var(--color-ink-faint)] ${i <= current ? 'text-[var(--color-smart-blue-950)]' : ''}`} key={phase}>
                  <span className={`relative z-10 grid size-6 place-items-center rounded-full border border-current bg-white ${i <= current ? 'bg-[var(--color-smart-blue-950)] text-white' : ''}`}>{i <= current ? <Check size={14} /> : i + 1}</span>
                  <strong className="font-normal">{phase}</strong>
                </div>
              ))}
            </div>
            <p className="text-[11px] leading-[1.7] text-[var(--color-ink-faint)]">
              Livraison estimée le{' '}
              {order.estimatedDelivery
                ? date(order.estimatedDelivery)
                : 'à confirmer'}
            </p>
          </div>
          <div className="mb-4 border border-[var(--color-border-soft)] p-7">
            <UI.H2>Articles commandés</UI.H2>
            {order.items.map((item, i) => (
              <div className="flex items-center gap-4 border-t border-[var(--color-border-soft)] py-4" key={i}>
                <img className="size-[65px] object-cover" src={item.image} alt="" />
                <div className="flex-1">
                  <Link to={`/products/${item.productId}`}>
                    <strong>{item.productName}</strong>
                  </Link>
                  <span className="mt-1.5 block text-[10px] text-[var(--color-ink-faint)]">
                    {item.sellerName} · Quantité {item.qty}
                  </span>
                </div>
                <strong>{money(item.price * item.qty)}</strong>
              </div>
            ))}
          </div>
        </div>
        <aside>
          <div className="mb-4 border border-[var(--color-border-soft)] p-7">
            <UI.H2>Récapitulatif</UI.H2>
            <div className="my-3.5 flex justify-between text-[11px]">
              <span>Sous-total</span>
              <strong>{money(order.subtotal)}</strong>
            </div>
            <div className="my-3.5 flex justify-between text-[11px]">
              <span>Livraison</span>
              <strong>{money(order.deliveryFee)}</strong>
            </div>
            <div className="flex justify-between border-t border-[var(--color-border-soft)] pt-4 text-[15px]">
              <span>Total</span>
              <strong>{money(order.total)}</strong>
            </div>
          </div>
          <div className="mb-4 border border-[var(--color-border-soft)] p-7">
            <UI.H2>Livraison & paiement</UI.H2>
            <p className="flex gap-2.5 text-[11px] leading-[1.6] text-[var(--color-ink-muted)]">
              <MapPin size={17} />
              <span>
                {order.address?.recipientName}
                <br />
                {order.address?.street}, {order.address?.city}
              </span>
            </p>
            <p className="flex gap-2.5 text-[11px] leading-[1.6] text-[var(--color-ink-muted)]">
              <Wallet size={17} />
              <span>
                {order.paymentMethod.toUpperCase()} · {order.paymentStatus}
              </span>
            </p>
            {order.note && (
              <p className="flex gap-2.5 text-[11px] leading-[1.6] text-[var(--color-ink-muted)]">
                <span>Note de livraison : {order.note}</span>
              </p>
            )}
          </div>
          <Link
            className="flex w-full items-center justify-center gap-2 bg-[var(--color-smart-blue-950)] px-4 py-3 text-[12px] font-bold text-white"
            to={`/orders/${order.id}/tracking`}
          >
            Suivre ma livraison <ArrowRight size={17} />
          </Link>
          {order.status === 'pending' && (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                notify("Annulation disponible une fois l'API connectée");
                navigate('/orders');
              }}
            >
              Annuler la commande
            </Button>
          )}
        </aside>
      </div>
    </div>
  );
};
