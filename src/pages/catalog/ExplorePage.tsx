import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Search, SlidersHorizontal, Star, X } from "lucide-react"
import * as UI from "../../lib/ui"
import { Button, Field, PageTitle, Empty, ProductGrid, useShop } from "../../components/shared"
export const ExplorePage = () => {
  const { categories, products } = useShop()
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const category = params.get("category") || ""
  const search = params.get("search") || ""
  const sort = params.get("sort") || "relevance"
  const minPrice = params.get("minPrice") || ""
  const maxPrice = params.get("maxPrice") || ""
  const minRating = params.get("minRating") || ""
  const [draftSearch, setDraftSearch] = useState(search)
  const change = (key: string, val: string) => {
    const next = new URLSearchParams(params)
    if (val) next.set(key, val)
    else next.delete(key)
    setParams(next)
  }
  const shown = useMemo(() => {
    let list = products.filter(
      (p) =>
        (!category ||
          p.categoryId === category ||
          (category === "vannerie" && p.categoryId === "artisanat") ||
          (category === "maison-artisanale" && p.categoryId === "maison")) &&
        (!search ||
          `${p.name} ${p.brand} ${p.storeName}`
            .toLowerCase()
            .includes(search.toLowerCase())) &&
        (!minPrice || p.price >= +minPrice) &&
        (!maxPrice || p.price <= +maxPrice) &&
        (!minRating || p.rating >= +minRating),
    )
    return [...list].sort((a, b) =>
      sort === "price_asc"
        ? a.price - b.price
        : sort === "price_desc"
          ? b.price - a.price
          : sort === "rating"
            ? b.rating - a.rating
            : sort === "newest"
              ? products.indexOf(b) - products.indexOf(a)
              : sort === "popularity"
                ? b.reviewsCount - a.reviewsCount
                : 0,
    )
  }, [category, search, sort, minPrice, maxPrice, minRating])
  const filters = (
    <>
      <div className="filter-heading">
        <UI.H3>Filtres</UI.H3>
        <UI.Button
          onClick={() =>
            setParams(new URLSearchParams(search ? { search } : {}))
          }
        >
          Réinitialiser
        </UI.Button>
      </div>
      <div className="filter-group">
        <UI.H4>Catégorie</UI.H4>
        <UI.Button
          className={!category ? "selected" : ""}
          onClick={() => change("category", "")}
        >
          Tout voir <span>{products.length}</span>
        </UI.Button>
        {categories.map((c) => (
          <UI.Button
            key={c.id}
            className={category === c.id ? "selected" : ""}
            onClick={() => change("category", c.id)}
          >
            {c.name}
            <span>{products.filter((p) => p.categoryId === c.id).length}</span>
          </UI.Button>
        ))}
      </div>
      <div className="filter-group">
        <UI.H4>Prix (Ar)</UI.H4>
        <div className="price-fields">
          <Field
            label="Min"
            type="number"
            min="0"
            placeholder="0"
            value={minPrice}
            onChange={(e) => change("minPrice", e.target.value)}
          />
          <Field
            label="Max"
            type="number"
            min="0"
            placeholder="∞"
            value={maxPrice}
            onChange={(e) => change("maxPrice", e.target.value)}
          />
        </div>
      </div>
      <div className="filter-group">
        <UI.H4>Avis clients</UI.H4>
        {[0, 4, 4.5].map((n) => (
          <UI.Button
            key={n}
            className={minRating === (n ? String(n) : "") ? "selected" : ""}
            onClick={() => change("minRating", n ? String(n) : "")}
          >
            {n ? (
              <>
                <Star size={14} fill="currentColor" /> {n} et plus
              </>
            ) : (
              "Tous les avis"
            )}
          </UI.Button>
        ))}
      </div>
    </>
  )
  return (
    <div className="container page">
      <PageTitle
        eyebrow="LA COLLECTION"
        title="Explorer les découvertes"
        description="Des trouvailles sélectionnées pour rendre chaque jour un peu plus inspirant."
      />
      <form
        className="explore-search"
        onSubmit={(e) => {
          e.preventDefault()
          change("search", draftSearch)
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
      <div className="explore-layout">
        <aside className="filters-sidebar">{filters}</aside>
        <div className="results">
          <div className="results-toolbar">
            <span>
              <strong>{shown.length}</strong>{" "}
              {shown.length > 1 ? "résultats" : "résultat"}
              {search && <> pour « {search} »</>}
            </span>
            <div>
              <Button
                variant="outline"
                className="mobile-filter"
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal size={17} /> Filtres
              </Button>
              <label className="sort-label">
                Trier par{" "}
                <UI.Select
                  value={sort}
                  onChange={(e) => change("sort", e.target.value)}
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
        <div className="modal-backdrop" onClick={() => setFiltersOpen(false)}>
          <div
            className="filter-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Filtres"
            onClick={(e) => e.stopPropagation()}
          >
            <UI.Button
              className="close-button"
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
  )
}
