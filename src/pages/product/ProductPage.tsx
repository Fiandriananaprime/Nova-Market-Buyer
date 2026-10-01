import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  CircleCheck,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';
import { catalogApi } from '../../lib/api/catalog';
import { imageUrl, money } from '../../lib/format';
import type { Product } from '../../lib/types';
import * as UI from '../../lib/ui';
import {
  Button,
  SectionTitle,
  Stars,
  Empty,
  Skeleton,
  useShop,
  FavoriteButton,
  ProductCard,
  CursorList,
  Reviews,
} from '../../components/shared';
export const ProductPage = () => {
  const { id } = useParams();
  const { categories, stores } = useShop();
  const [product, setProduct] = useState<Product>();
  const [related, setRelated] = useState<Product[]>([]);
  useEffect(() => {
    if (!id) return;
    void Promise.all([
      catalogApi.product(id).then(setProduct),
      catalogApi.relatedProducts(id).then((value) => setRelated(value.data)),
    ]);
  }, [id]);
  const [qty, setQty] = useState(1);
  const [image, setImage] = useState(0);
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const { add } = useShop();
  if (!product)
    return (
      <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
        <Empty
          title="Produit introuvable"
          text="Cette pièce n'est plus disponible dans notre sélection."
          to="/explore"
        />
      </div>
    );
  const store = stores.find((s) => s.id === product.storeId)!;
  return (
    <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
      <div className="mb-[33px] flex flex-wrap items-center gap-2 text-[11px] text-[var(--color-ink-faint)] [&_span]:text-[var(--color-smart-blue-950)]">
        <Link to="/">Accueil</Link>
        <ChevronRight size={14} />
        <Link to="/explore">Explorer</Link>
        <ChevronRight size={14} />
        <span>{product.name}</span>
      </div>
      <div className="grid grid-cols-[minmax(0,1.04fr)_minmax(0,0.9fr)] gap-[7%] max-[800px]:block">
        <div>
          <div className="relative h-[560px] overflow-hidden bg-[var(--color-parchment-50)] max-[800px]:h-[420px]">
            <img className="h-full w-full object-cover" src={imageUrl(product.images)} alt={product.name} />
            <span className="product-tag">{product.tags[0]}</span>
          </div>
          <div className="mt-3 flex gap-3">
            <UI.Button
              className={`h-[76px] w-[76px] overflow-hidden border-2 ${image === 0 ? 'border-[var(--color-smart-blue-950)]' : 'border-transparent'}`}
              onClick={() => setImage(0)}
              aria-label="Image principale"
            >
              <img src={imageUrl(product.images)} alt="" />
            </UI.Button>
            <UI.Button
              className={`h-[76px] w-[76px] overflow-hidden border-2 ${image === 1 ? 'border-[var(--color-smart-blue-950)]' : 'border-transparent'}`}
              onClick={() => setImage(1)}
              aria-label="Voir le détail"
            >
              <img
                src={imageUrl(product.images)}
                alt=""
                className="h-full w-full object-cover"
              />
            </UI.Button>
          </div>
        </div>
        <div className="pt-2.5 max-[800px]:pt-10">
          <span className="mb-3 block font-[Manrope] text-[10px] font-extrabold tracking-[0.19em] text-[var(--color-black-800)] uppercase">
            {product.brand} ·{' '}
            {categories.find((c) => c.id === product.categoryId)?.name}
          </span>
          <UI.H1>{product.name}</UI.H1>
          <div className="my-3 flex items-center gap-2 text-[12px] text-[var(--color-ink-cool)]">
            <Stars rating={product.rating} count={product.reviewsCount} />
            <span>·</span>
            <span>Réf. {product.id.toUpperCase()}</span>
          </div>
          <div className="my-5 font-['Manrope'] text-[28px] font-extrabold">{money(product.price)}</div>
          <p className="mb-5 text-[13px] leading-[1.8] text-[var(--color-ink-muted)]">{product.description}</p>
          <span className="flex items-center gap-2 text-[12px] font-bold text-[var(--color-tropical-teal-700)]">
            <CircleCheck size={17} />{' '}
            {product.stock > 0
              ? `En stock · ${product.stock} disponibles`
              : 'Rupture de stock'}
          </span>
          {product.variants.map((v) => (
            <div className="mt-6" key={v.name}>
              <strong>
                {v.name} :{' '}
                <span>{chosen[v.name] || 'Choisissez une option'}</span>
              </strong>
              <div className="mt-2 flex flex-wrap gap-2">
                {v.values.map((value) => (
                  <UI.Button
                    className={`border px-3 py-2 text-[11px] ${chosen[v.name] === value ? 'border-[var(--color-smart-blue-950)] bg-[var(--color-smart-blue-950)] text-white' : 'border-[var(--color-parchment-200)] bg-white'}`}
                    key={value}
                    onClick={() =>
                      setChosen((old) => ({ ...old, [v.name]: value }))
                    }
                  >
                    {value}
                  </UI.Button>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-7 border-y border-[var(--color-parchment-200)] py-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[var(--color-parchment-200)]">
                <UI.Button
                  aria-label="Diminuer"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  <Minus size={16} />
                </UI.Button>
                <span>{qty}</span>
                <UI.Button
                  aria-label="Augmenter"
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                >
                  <Plus size={16} />
                </UI.Button>
              </div>
              <Button
                className="grow"
                disabled={!product.stock}
                onClick={() => add(product.id, qty)}
              >
                <ShoppingBag size={18} /> Ajouter au panier
              </Button>
              <FavoriteButton id={product.id} />
            </div>
            <span className="mt-4 flex items-center gap-2 text-[11px] text-[var(--color-ink-subtle)]">
              <Truck size={17} /> Livraison partout à Madagascar · Paiement
              sécurisé
            </span>
          </div>
          <Link className="mt-6 flex items-center gap-3 border-t border-[var(--color-parchment-200)] pt-5" to={`/stores/${store.id}`}>
            <img src={store.logoUrl} alt="" />
            <span>
              <small>VENDU PAR</small>
              <strong>
                {store.name} <ShieldCheck size={15} />
              </strong>
              <small>
                <Star size={12} fill="currentColor" /> {store.rating} · Boutique
                vérifiée
              </small>
            </span>
            <ArrowRight size={19} />
          </Link>
        </div>
      </div>
      <div className="mt-20 grid grid-cols-[minmax(0,1fr)_280px] gap-20 border-t border-[var(--color-parchment-200)] pt-10 max-[800px]:block">
        <div>
          <UI.H2>L'histoire de cette pièce</UI.H2>
          <p>{product.description}</p>
          <UI.H2>Détails & caractéristiques</UI.H2>
          <dl>
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="h-fit bg-[var(--color-tropical-teal-100)] p-7 max-[800px]:mt-8">
          <Sparkles size={25} />
          <UI.H3>Choisi avec intention.</UI.H3>
          <p>
            Chaque article de notre sélection raconte une histoire. Merci de
            soutenir des boutiques passionnées.
          </p>
        </div>
      </div>
      <Reviews />
      <section className="mt-20">
        <SectionTitle
          eyebrow="À DÉCOUVRIR AUSSI"
          title="Vous aimerez peut-être"
          to="/explore"
        />
        <div className="grid grid-cols-4 gap-[22px] max-[800px]:grid-cols-2">
          <CursorList
            items={related}
            render={(p) => <ProductCard key={p.id} product={p} />}
            skeleton={<Skeleton cards={2} />}
            empty={null}
          />
        </div>
      </section>
      <div className="fixed right-0 bottom-0 left-0 z-40 hidden items-center justify-between gap-4 border-t border-[var(--color-parchment-200)] bg-[var(--color-surface)] p-4 max-[800px]:flex">
        <strong>{money(product.price)}</strong>
        <Button disabled={!product.stock} onClick={() => add(product.id, qty)}>
          <ShoppingBag size={18} /> Ajouter au panier
        </Button>
      </div>
    </div>
  );
};
