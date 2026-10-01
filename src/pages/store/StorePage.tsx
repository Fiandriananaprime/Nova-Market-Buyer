import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, Check, MapPin, Plus, ShieldCheck } from 'lucide-react';
import { catalogApi } from '../../lib/api/catalog';
import type { Product } from '../../lib/types';
import * as UI from '../../lib/ui';
import {
  Button,
  SectionTitle,
  Stars,
  Empty,
  Skeleton,
  useShop,
  ProductCard,
  CursorList,
  Reviews,
} from '../../components/shared';
export const StorePage = () => {
  const { id } = useParams();
  const { stores } = useShop();
  const [store, setStore] = useState(stores.find((item) => item.id === id));
  const [own, setOwn] = useState<Product[]>([]);
  useEffect(() => {
    if (!id) return;
    void Promise.all([
      catalogApi.store(id).then(setStore),
      catalogApi.storeProducts(id).then((value) => setOwn(value.data)),
    ]);
  }, [id]);
  const [tab, setTab] = useState('Produits');
  const { followed, follow } = useShop();
  if (!store)
    return (
      <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
        <Empty
          title="Boutique introuvable"
          text="Cette boutique n'est pas disponible."
          to="/stores"
        />
      </div>
    );
  return (
    <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
      <div className="h-[250px] overflow-hidden rounded-[2px] max-[800px]:h-[170px]">
        <img className="h-full w-full object-cover" src={store.coverUrl} alt="" />
      </div>
      <div className="flex items-center gap-5 max-[800px]:flex-wrap max-[800px]:gap-x-[15px] max-[800px]:gap-y-1">
        <img className="mt-[-45px] size-[110px] rounded-full border-4 border-white object-cover max-[800px]:mt-[-26px] max-[800px]:size-20" src={store.logoUrl} alt="" />
        <div className="flex-1 pt-5 max-[800px]:pt-2">
          <div className="mb-3 font-['Manrope'] text-[10px] font-extrabold tracking-[0.19em] text-[var(--color-black-800)] uppercase">BOUTIQUE · {store.location}</div>
          <UI.H1 className="flex items-center gap-2 font-['Playfair_Display'] text-[clamp(32px,4vw,52px)] font-normal">
            {store.name} {store.verified && <ShieldCheck size={24} />}
          </UI.H1>
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-[var(--color-ink-muted)]">
            <Stars rating={store.rating} count={store.reviewsCount} />
            <span>{store.productsCount} produits</span>
            <span>{store.followersCount} abonnés</span>
            <span className="text-[var(--color-black-700)]">
              ● {store.isOpen ? 'Ouvert' : 'Fermé'}
            </span>
          </div>
        </div>
        <Button
          className="max-[800px]:my-2"
          variant={followed.includes(store.id) ? 'outline' : 'dark'}
          onClick={() => follow(store.id)}
        >
          {followed.includes(store.id) ? (
            <>
              <Check size={17} /> Abonné
            </>
          ) : (
            <>
              <Plus size={17} /> Suivre la boutique
            </>
          )}
        </Button>
      </div>
      <div className="mt-8 flex gap-8 border-b border-[var(--color-parchment-200)] max-[800px]:gap-6">
        {['Aperçu', 'Produits', 'Avis', 'À propos'].map((t) => (
          <UI.Button
            key={t}
            className={`border-0 border-b-2 bg-transparent px-0 py-3 text-[12px] font-bold ${tab === t ? 'border-[var(--color-smart-blue-950)] text-[var(--color-smart-blue-950)]' : 'border-transparent text-[var(--color-ink-subtle)]'}`}
            onClick={() => setTab(t)}
          >
            {t}
          </UI.Button>
        ))}
      </div>
      {tab === 'Aperçu' && (
        <div className="max-w-[760px] py-10">
          <span className="mb-3 block font-[Manrope] text-[10px] font-extrabold tracking-[0.19em] text-[var(--color-black-800)] uppercase">BIENVENUE CHEZ NOUS</span>
          <UI.H2>Des pièces faites pour durer.</UI.H2>
          <p>{store.description}</p>
          <Button onClick={() => setTab('Produits')}>
            Explorer les produits <ArrowRight size={16} />
          </Button>
        </div>
      )}
      {tab === 'Produits' && (
        <section className="py-10">
          <SectionTitle title={`La sélection ${store.name}`} />
          <div className="grid grid-cols-4 gap-[22px] max-[800px]:grid-cols-2">
            <CursorList
              items={own}
              render={(p) => <ProductCard key={p.id} product={p} />}
              skeleton={<Skeleton cards={2} />}
              empty={
                <Empty
                  title="Aucun produit"
                  text="La boutique prépare de nouvelles découvertes."
                />
              }
            />
          </div>
        </section>
      )}
      {tab === 'Avis' && <Reviews title="Avis sur la boutique" />}
      {tab === 'À propos' && (
        <div className="max-w-[760px] py-10">
          <UI.H2>À propos de {store.name}</UI.H2>
          <p>{store.description}</p>
          <p>
            <MapPin size={17} /> {store.location} · Membre depuis{' '}
            {store.joinedYear}
          </p>
        </div>
      )}
    </div>
  );
};
