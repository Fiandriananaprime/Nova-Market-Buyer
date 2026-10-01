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
      <div className="container page">
        <Empty
          title="Suivi indisponible"
          text="Cette commande n'existe pas."
          to="/orders"
        />
      </div>
    );
  return (
    <div className="container page tracking-page">
      <Link className="back-link" to={`/orders/${id}`}>
        <ArrowLeft size={17} /> Retour à la commande
      </Link>
      <PageTitle
        eyebrow="SUIVI DE LIVRAISON"
        title="Votre commande est en chemin"
        description={`Commande ${id} · Arrivée estimée le ${order.estimatedDelivery ? date(order.estimatedDelivery) : 'à confirmer'}`}
      />
      <div className="tracking-layout">
        <div
          className="mock-map"
          aria-label="Aperçu du trajet de livraison (démonstration)"
        >
          <div className="map-grid" />
          <div className="map-road road-one" />
          <div className="map-road road-two" />
          <div className="map-road road-three" />
          <div className="map-park park-one" />
          <div className="map-park park-two" />
          <span className="map-name name-one">ANTANANARIVO</span>
          <span className="map-name name-two">ANALAKELY</span>
          <span className="map-name name-three">ANKORONDRANO</span>
          <svg
            className="map-route"
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
          <span className="map-pin driver">
            <Truck size={21} />
          </span>
          <span className="map-pin destination">
            <MapPin size={23} fill="currentColor" />
          </span>
          <div className="map-controls">
            <Plus size={20} />
            <Minus size={20} />
          </div>
          <div className="map-attribution">
            Aperçu illustratif · La carte en direct sera disponible avec le
            service de cartographie
          </div>
        </div>
        <aside className="tracking-sidebar">
          <div className="tracking-state">
            <div className="tracking-icon">
              <Truck size={24} />
            </div>
            <span className="eyebrow">ÉTAT ACTUEL</span>
            <UI.H2>
              {order.status === 'pending'
                ? 'Commande reçue'
                : order.status === 'delivered'
                  ? 'Commande livrée'
                  : 'En cours de livraison'}
            </UI.H2>
            <p>
              Votre commande poursuit son chemin. Revenez ici pour suivre son
              avancement.
            </p>
            <div className="eta">
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
          <div className="tracking-events">
            <UI.H3>Étapes de livraison</UI.H3>
            {[
              ['Commande confirmée', 'Votre commande a bien été enregistrée'],
              ['Préparation', 'Les boutiques préparent vos articles'],
              ['Livraison', 'En route vers votre adresse'],
            ].map(([title, sub], i) => (
              <div key={title} className={i <= 1 ? 'done' : ''}>
                <span className="event-dot" />
                <div>
                  <strong>{title}</strong>
                  <p>{sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="tracking-address">
            <MapPin size={18} />
            <span>
              <strong>Destination</strong>
              {order.address?.street}, {order.address?.city}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
};
