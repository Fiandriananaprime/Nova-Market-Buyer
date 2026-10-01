import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock3, MapPin, Minus, Plus, Truck } from 'lucide-react';
import { date } from '../../lib/format';
import * as UI from '../../lib/ui';
import { PageTitle, Empty, useShop } from '../../components/shared';
export const TrackingPage = () => {
  const { id } = useParams();
  const { orders } = useShop();
  const order = orders.find((o) => o.id === id);
  if (!order)
    return (
      <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
        <Empty
          title="Suivi indisponible"
          text="Cette commande n'existe pas."
          to="/orders"
        />
      </div>
    );
  return (
    <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
      <Link className="mb-6 inline-flex items-center gap-2 text-[11px] text-[var(--color-ink-muted)]" to={`/orders/${id}`}>
        <ArrowLeft size={17} /> Retour à la commande
      </Link>
      <PageTitle
        eyebrow="SUIVI DE LIVRAISON"
        title="Votre commande est en chemin"
        description={`Commande ${id} · Arrivée estimée le ${order.estimatedDelivery ? date(order.estimatedDelivery) : 'à confirmer'}`}
      />
      <div className="grid min-h-[540px] grid-cols-[minmax(0,1.7fr)_minmax(290px,0.8fr)] border border-[var(--color-border)] max-[1100px]:grid-cols-1">
        <div
          className="relative min-h-[540px] overflow-hidden bg-[var(--color-map-surface)] max-[600px]:min-h-[390px]"
          aria-label="Aperçu du trajet de livraison (démonstration)"
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(30deg,transparent,transparent_72px,var(--color-map-road)_73px,var(--color-map-road)_82px,transparent_84px,transparent_130px),repeating-linear-gradient(120deg,transparent,transparent_85px,var(--color-map-road-strong)_86px,var(--color-map-road-strong)_98px,transparent_100px,transparent_155px)]" />
          <div className="absolute top-[32%] left-[-10%] h-[22px] w-[130%] rotate-[-23deg] bg-[var(--color-surface)] shadow-[0_0_0_1px_var(--color-map-border)]" />
          <div className="absolute top-[70%] left-[-10%] h-[15px] w-[120%] rotate-[31deg] bg-[var(--color-surface)] shadow-[0_0_0_1px_var(--color-map-border)]" />
          <div className="absolute top-[-10%] left-[49%] h-[120%] w-[18px] rotate-[15deg] bg-[var(--color-surface)] shadow-[0_0_0_1px_var(--color-map-border)]" />
          <div className="absolute top-[4%] left-[5%] h-[120px] w-[170px] rotate-[18deg] rounded-[45%] bg-[var(--color-map-park)]" />
          <div className="absolute right-[4%] bottom-[2%] h-[130px] w-[180px] rounded-[45%] bg-[var(--color-map-park)]" />
          <span className="absolute top-[17%] right-[18%] z-[1] text-[10px] font-bold tracking-[0.12em] text-[var(--color-ink-green)]">ANTANANARIVO</span>
          <span className="absolute bottom-[27%] left-[11%] z-[1] text-[10px] font-bold tracking-[0.12em] text-[var(--color-ink-green)]">ANALAKELY</span>
          <span className="absolute top-[56%] right-[8%] z-[1] text-[10px] font-bold tracking-[0.12em] text-[var(--color-ink-green)]">ANKORONDRANO</span>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 700 520"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M145 330 C230 340 210 225 335 260 S445 180 540 155"
              fill="none"
              stroke="white"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <path
              d="M145 330 C230 340 210 225 335 260 S445 180 540 155"
              fill="none"
              stroke="var(--color-smart-blue-500)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="1 0"
            />
          </svg>
          <span           className="absolute top-[60%] left-[20%] z-[3] grid size-11 place-items-center rounded-full bg-[var(--color-smart-blue-950)] text-white shadow-[0_5px_20px_var(--color-shadow-strong)]">
            <Truck size={21} />
          </span>
          <span           className="absolute top-[24%] right-[19%] z-[3] grid size-11 place-items-center rounded-full bg-[var(--color-black-700)] text-white shadow-[0_5px_20px_var(--color-shadow-strong)]">
            <MapPin size={23} fill="currentColor" />
          </span>
          <div className="absolute top-[15px] right-[15px] grid gap-3 bg-white p-2.5 shadow-[0_3px_10px_var(--color-shadow-faint)]">
            <Plus size={20} />
            <Minus size={20} />
          </div>
          <div className="absolute right-[9px] bottom-[9px] left-[9px] w-fit bg-[color-mix(in_srgb,var(--color-surface)_79%,transparent)] px-[7px] py-1 text-[9px] text-[var(--color-ink-muted)]">
            Aperçu illustratif · La carte en direct sera disponible avec le
            service de cartographie
          </div>
        </div>
        <aside className="bg-white p-[26px] max-[1100px]:grid max-[1100px]:grid-cols-2 max-[1100px]:gap-6 max-[800px]:block">
          <div>
            <div className="mb-[18px] grid size-[45px] place-items-center bg-[var(--color-tropical-teal-100)] text-[var(--color-black-800)]">
              <Truck size={24} />
            </div>
            <span className="mb-3 block font-['Manrope'] text-[10px] font-extrabold tracking-[0.19em] text-[var(--color-black-800)] uppercase">ÉTAT ACTUEL</span>
            <UI.H2 className="mb-2.5 font-['Playfair_Display'] text-[29px] font-normal">
              {order.status === 'pending'
                ? 'Commande reçue'
                : order.status === 'delivered'
                  ? 'Commande livrée'
                  : 'En cours de livraison'}
            </UI.H2>
            <p className="text-[11px] leading-[1.7] text-[var(--color-ink-subtle)]">
              Votre commande poursuit son chemin. Revenez ici pour suivre son
              avancement.
            </p>
            <div className="my-5 flex items-center gap-2.5 bg-[var(--color-parchment-50)] p-[15px] text-[11px]">
              <Clock3 size={19} />
              <span>
                Arrivée estimée{' '}
                <strong>
                  {order.estimatedDelivery
                    ? date(order.estimatedDelivery)
                    : 'à confirmer'}
                </strong>
              </span>
            </div>
          </div>
          <div className="border-t border-[var(--color-border-soft)] pt-5">
            <UI.H3 className="mb-5 text-[12px]">Étapes de livraison</UI.H3>
            {[
              ['Commande confirmée', 'Votre commande a bien été enregistrée'],
              ['Préparation', 'Les boutiques préparent vos articles'],
              ['Livraison', 'En route vers votre adresse'],
            ].map(([title, sub], i) => (
              <div key={title} className={`relative flex gap-3 pb-[17px] text-[11px] ${i <= 1 ? 'text-[var(--color-smart-blue-950)]' : 'text-[var(--color-ink-faint)]'}`}>
                <span className={`size-[13px] flex-none rounded-full border-2 border-current ${i <= 1 ? 'bg-[var(--color-black-700)]' : ''}`} />
                <div>
                  <strong>{title}</strong>
                  <p className="mt-1 text-[11px] leading-[1.7] text-[var(--color-ink-subtle)]">{sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2.5 border-t border-[var(--color-border-soft)] pt-5 text-[11px] text-[var(--color-ink-subtle)] max-[1100px]:col-span-2 max-[800px]:col-span-1">
            <MapPin size={18} />
            <span>
              <strong className="mb-1 block text-[var(--color-smart-blue-950)]">Destination</strong>
              {order.address?.street}, {order.address?.city}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
};
