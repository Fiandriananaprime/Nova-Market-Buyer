import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import { date, money } from '../../lib/format';
import { Button, PageTitle, Empty, useShop } from '../../components/shared';
export const OrdersPage = () => {
  const { orders } = useShop();
  const [filter, setFilter] = useState('all');
  const visible = orders.filter((o) => filter === 'all' || o.status === filter);
  return (
    <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
      <PageTitle
        eyebrow="VOTRE PARCOURS"
        title="Mes commandes"
        description="Suivez chaque découverte, de la commande jusqu'à chez vous."
      />
      <div className="mb-7 flex flex-wrap gap-2">
        {[
          ['all', 'Toutes'],
          ['pending', 'En attente'],
          ['processing', 'En cours'],
          ['delivered', 'Livrées'],
          ['cancelled', 'Annulées'],
        ].map(([v, label]) => (
          <Button
            key={v}
            variant={filter === v ? 'dark' : 'outline'}
            onClick={() => setFilter(v)}
          >
            {label}
          </Button>
        ))}
      </div>
      {visible.length ? (
        <div className="space-y-3">
          {visible.map((o) => (
            <Link className="block border border-[var(--color-parchment-200)] bg-white p-5 transition-shadow hover:shadow-[0_10px_28px_var(--color-shadow-soft)]" to={`/orders/${o.id}`} key={o.id}>
              <div className="flex items-start justify-between gap-4">
                <span>
                  <strong>{o.id}</strong>
                  <small className="mt-1 block text-[11px] text-[var(--color-ink-subtle)]">Commandée le {date(o.createdAt)}</small>
                </span>
                <span className="rounded-full bg-[var(--color-tropical-teal-100)] px-3 py-1 text-[10px] font-bold">
                  {o.status === 'processing'
                    ? 'En cours'
                    : o.status === 'pending'
                      ? 'En attente'
                      : o.status === 'delivered'
                        ? 'Livrée'
                        : o.status}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-5 max-[800px]:flex-wrap">
                <div className="flex">
                  {o.items.map((item, i) => (
                    <img className="-mr-2 size-12 rounded-full border-2 border-white object-cover" key={i} src={item.image} alt={item.productName} />
                  ))}
                </div>
                <span className="text-[12px] text-[var(--color-ink-muted)]">
                  {o.items.length} article{o.items.length > 1 ? 's' : ''}
                  <small className="mt-1 block text-[11px] text-[var(--color-ink-faint)]">
                    {[...new Set(o.items.map((i) => i.sellerName))].join(' · ')}
                  </small>
                </span>
                <strong className="ml-auto font-['Manrope'] text-[15px]">{money(o.total)}</strong>
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
  );
};
