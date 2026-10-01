import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, X } from 'lucide-react';
import * as UI from '../../lib/ui';
import {
  Button,
  Field,
  PageTitle,
  Empty,
  ProductGrid,
  useShop,
} from '../../components/shared';
export const ExplorePage = () => {
  const { categories, products } = useShop();
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const category = params.get('category') || '';
  const search = params.get('search') || '';
  const sort = params.get('sort') || 'relevance';
  const minPrice = params.get('minPrice') || '';
  const maxPrice = params.get('maxPrice') || '';
  const minRating = params.get('minRating') || '';
  const [draftSearch, setDraftSearch] = useState(search);
  const change = (key: string, val: string) => {
    const next = new URLSearchParams(params);
    if (val) next.set(key, val);
    else next.delete(key);
    setParams(next);
  };
  const shown = useMemo(() => {
    const list = products.filter(
      (p) =>
        (!category ||
          p.categoryId === category ||
          (category === 'vannerie' && p.categoryId === 'artisanat') ||
          (category === 'maison-artisanale' && p.categoryId === 'maison')) &&
        (!search ||
          `${p.name} ${p.brand} ${p.storeName}`
            .toLowerCase()
            .includes(search.toLowerCase())) &&
        (!minPrice || p.price >= +minPrice) &&
        (!maxPrice || p.price <= +maxPrice) &&
        (!minRating || p.rating >= +minRating),
    );
    return [...list].sort((a, b) =>
      sort === 'price_asc'
        ? a.price - b.price
        : sort === 'price_desc'
          ? b.price - a.price
          : sort === 'rating'
            ? b.rating - a.rating
            : sort === 'newest'
              ? products.indexOf(b) - products.indexOf(a)
              : sort === 'popularity'
                ? b.reviewsCount - a.reviewsCount
                : 0,
    );
  }, [category, search, sort, minPrice, maxPrice, minRating, products]);
  const filters = (
    <>
      <div className="flex items-center justify-between py-5">
        <UI.H3>Filtres</UI.H3>
        <UI.Button
          onClick={() =>
            setParams(new URLSearchParams(search ? { search } : {}))
          }
        >
          Réinitialiser
        </UI.Button>
      </div>
      <div className="border-t border-[var(--color-parchment-100)] py-[23px]">
        <UI.H4>Catégorie</UI.H4>
        <UI.Button
          className={`flex w-full items-center justify-between gap-1 border-0 bg-transparent py-[7px] text-left text-[12px] text-[var(--color-ink-muted)] hover:font-bold hover:text-[var(--color-smart-blue-950)] ${!category ? 'font-bold text-[var(--color-smart-blue-950)]' : ''}`}
          onClick={() => change('category', '')}
        >
          Tout voir <span>{products.length}</span>
        </UI.Button>
        {categories.map((c) => (
          <UI.Button
            key={c.id}
            className={`flex w-full items-center justify-between gap-1 border-0 bg-transparent py-[7px] text-left text-[12px] text-[var(--color-ink-muted)] hover:font-bold hover:text-[var(--color-smart-blue-950)] ${category === c.id ? 'font-bold text-[var(--color-smart-blue-950)]' : ''}`}
            onClick={() => change('category', c.id)}
          >
            {c.name}
            <span>{products.filter((p) => p.categoryId === c.id).length}</span>
          </UI.Button>
        ))}
      </div>
      <div className="border-t border-[var(--color-parchment-100)] py-[23px]">
        <UI.H4>Prix (Ar)</UI.H4>
        <div className="flex gap-2">
          <Field
            label="Min"
            type="number"
            min="0"
            placeholder="0"
            value={minPrice}
            onChange={(e) => change('minPrice', e.target.value)}
          />
          <Field
            label="Max"
            type="number"
            min="0"
            placeholder="∞"
            value={maxPrice}
            onChange={(e) => change('maxPrice', e.target.value)}
          />
        </div>
      </div>
      <div className="border-t border-[var(--color-parchment-100)] py-[23px]">
        <UI.H4>Avis clients</UI.H4>
        {[0, 4, 4.5].map((n) => (
          <UI.Button
            key={n}
            className={`flex w-full items-center justify-between gap-1 border-0 bg-transparent py-[7px] text-left text-[12px] text-[var(--color-ink-muted)] hover:font-bold hover:text-[var(--color-smart-blue-950)] ${minRating === (n ? String(n) : '') ? 'font-bold text-[var(--color-smart-blue-950)]' : ''}`}
            onClick={() => change('minRating', n ? String(n) : '')}
          >
            {n ? (
              <>
                <Star size={14} fill="currentColor" /> {n} et plus
              </>
            ) : (
              'Tous les avis'
            )}
          </UI.Button>
        ))}
      </div>
    </>
  );
  return (
    <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
      <PageTitle
        eyebrow="LA COLLECTION"
        title="Explorer les découvertes"
        description="Des trouvailles sélectionnées pour rendre chaque jour un peu plus inspirant."
      />
      <form
        className="mb-[42px] flex max-w-[680px] items-center gap-3.5 border border-[var(--color-parchment-200)] p-[6px] pl-[19px] [&_input]:min-w-0 [&_input]:flex-1 [&_input]:border-0 [&_input]:outline-none"
        onSubmit={(e) => {
          e.preventDefault();
          change('search', draftSearch);
        }}
      >
        <Search size={19} />
        <UI.Input
          value={draftSearch}
          onChange={(e) => setDraftSearch(e.target.value)}
          placeholder="Que recherchez-vous ?"
          aria-label="Recherche"
        />
        <Button type="submit">Rechercher</Button>
      </form>
      <div className="grid grid-cols-[235px_minmax(0,1fr)] gap-[45px] max-[800px]:block">
        <aside className="border-t border-[var(--color-parchment-200)] max-[800px]:hidden">{filters}</aside>
        <div>
          <div className="mb-[21px] flex items-center justify-between gap-[15px] border-t border-b border-[var(--color-parchment-100)] py-3 text-[12px] text-[var(--color-ink-muted)]">
            <span>
              <strong>{shown.length}</strong>{' '}
              {shown.length > 1 ? 'résultats' : 'résultat'}
              {search && <> pour « {search} »</>}
            </span>
            <div className="flex items-center gap-[15px]">
              <Button
                variant="outline"
                className="hidden max-[800px]:inline-flex"
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal size={17} /> Filtres
              </Button>
              <label className="flex items-center gap-2 whitespace-nowrap">
                Trier par{' '}
                <UI.Select
                  value={sort}
                  onChange={(e) => change('sort', e.target.value)}
                >
                  <option value="relevance">Pertinence</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                  <option value="rating">Mieux notés</option>
                  <option value="newest">Nouveautés</option>
                  <option value="popularity">Popularité</option>
                </UI.Select>
              </label>
            </div>
          </div>
          {shown.length ? (
            <ProductGrid items={shown} />
          ) : (
            <Empty
              icon={Search}
              title="Aucune découverte pour le moment"
              text="Essayez d'élargir vos filtres ou de rechercher autre chose."
              to="/explore"
              action="Voir tous les produits"
            />
          )}
        </div>
      </div>
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-[var(--color-overlay)] min-[801px]:hidden" onClick={() => setFiltersOpen(false)}>
          <div
            className="relative max-h-[85vh] w-full overflow-y-auto bg-[var(--color-surface)] p-5"
            role="dialog"
            aria-modal="true"
            aria-label="Filtres"
            onClick={(e) => e.stopPropagation()}
          >
            <UI.Button
              className="absolute top-4 right-4"
              aria-label="Fermer"
              onClick={() => setFiltersOpen(false)}
            >
              <X />
            </UI.Button>
            {filters}
            <Button className="w-full" onClick={() => setFiltersOpen(false)}>
              Voir {shown.length} résultats
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
