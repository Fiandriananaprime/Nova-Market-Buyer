import { useState } from "react"
import { useParams } from "react-router-dom"
import { ArrowRight, Check, MapPin, Plus, ShieldCheck } from "lucide-react"
import { products, stores } from "../../lib/mock"
import * as UI from "../../lib/ui"
import { Button, SectionTitle, Stars, Empty, Skeleton, useShop, ProductCard, CursorList, Reviews } from "../../components/shared"
export const StorePage = () => {
  const { id } = useParams()
  const store = stores.find((s) => s.id === id)
  const [tab, setTab] = useState("Produits")
  const { followed, follow } = useShop()
  if (!store)
    return (
      <div className="container page">
        <Empty
          title="Boutique introuvable"
          text="Cette boutique n'est pas disponible."
          to="/stores"
        />
      </div>
    )
  const own = products.filter((p) => p.storeId === id)
  return (
    <div className="container page store-detail">
      <div className="store-banner">
        <img src={store.coverUrl} alt="" />
      </div>
      <div className="store-profile">
        <img className="store-profile-avatar" src={store.logoUrl} alt="" />
        <div className="store-profile-info">
          <div className="eyebrow">BOUTIQUE · {store.location}</div>
          <UI.H1>
            {store.name} {store.verified && <ShieldCheck size={24} />}
          </UI.H1>
          <div className="store-profile-stats">
            <Stars rating={store.rating} count={store.reviewsCount} />
            <span>{store.productsCount} produits</span>
            <span>{store.followersCount} abonnés</span>
            <span className="open-state">
              ● {store.isOpen ? "Ouvert" : "Fermé"}
            </span>
          </div>
        </div>
        <Button
          variant={followed.includes(store.id) ? "outline" : "dark"}
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
      <div className="tab-bar">
        {["Aperçu", "Produits", "Avis", "À propos"].map((t) => (
          <UI.Button
            key={t}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </UI.Button>
        ))}
      </div>
      {tab === "Aperçu" && (
        <div className="store-intro">
          <span className="eyebrow">BIENVENUE CHEZ NOUS</span>
          <UI.H2>Des pièces faites pour durer.</UI.H2>
          <p>{store.description}</p>
          <Button onClick={() => setTab("Produits")}>
            Explorer les produits <ArrowRight size={16} />
          </Button>
        </div>
      )}
      {tab === "Produits" && (
        <section className="section">
          <SectionTitle title={`La sélection ${store.name}`} />
          <div className="product-grid">
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
      {tab === "Avis" && <Reviews title="Avis sur la boutique" />}
      {tab === "À propos" && (
        <div className="store-intro">
          <UI.H2>À propos de {store.name}</UI.H2>
          <p>{store.description}</p>
          <p>
            <MapPin size={17} /> {store.location} · Membre depuis{" "}
            {store.joinedYear}
          </p>
        </div>
      )}
    </div>
  )
}
