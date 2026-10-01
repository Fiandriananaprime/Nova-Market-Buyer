import { useState } from "react"
import { Heart, Store as StoreIcon } from "lucide-react"
import { products, stores } from "../../lib/mock"
import * as UI from "../../lib/ui"
import { PageTitle, Empty, useShop, ProductGrid, StoreCard } from "../../components/shared"
export const FavoritesPage = () => {
  const { favorites, followed } = useShop()
  const [tab, setTab] = useState("Produits")
  return (
    <div className="container page">
      <PageTitle
        eyebrow="VOTRE SÉLECTION"
        title="Mes favoris"
        description="Gardez vos belles découvertes à portée de main."
      />
      <div className="tab-bar">
        <UI.Button
          className={tab === "Produits" ? "active" : ""}
          onClick={() => setTab("Produits")}
        >
          Produits ({favorites.length})
        </UI.Button>
        <UI.Button
          className={tab === "Boutiques" ? "active" : ""}
          onClick={() => setTab("Boutiques")}
        >
          Boutiques suivies ({followed.length})
        </UI.Button>
      </div>
      {tab === "Produits" ? (
        favorites.length ? (
          <ProductGrid
            items={products.filter((p) => favorites.includes(p.id))}
          />
        ) : (
          <Empty
            icon={Heart}
            title="Vos favoris commencent ici"
            text="Touchez le cœur d'un produit pour le retrouver à tout moment."
            to="/explore"
            action="Trouver des coups de cœur"
          />
        )
      ) : followed.length ? (
        <div className="store-grid">
          {stores
            .filter((s) => followed.includes(s.id))
            .map((s) => (
              <StoreCard key={s.id} store={s} />
            ))}
        </div>
      ) : (
        <Empty
          icon={StoreIcon}
          title="Aucune boutique suivie"
          text="Suivez les boutiques que vous aimez pour les retrouver facilement."
          to="/stores"
          action="Découvrir les boutiques"
        />
      )}
    </div>
  )
}
