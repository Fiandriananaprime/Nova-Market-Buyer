import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowRight, ChevronRight, CircleCheck, Minus, Plus, ShieldCheck, ShoppingBag, Sparkles, Star, Truck } from "lucide-react"
import { categories, money, products, stores } from "../../lib/mock"
import * as UI from "../../lib/ui"
import { Button, SectionTitle, Stars, Empty, Skeleton, useShop, FavoriteButton, ProductCard, CursorList, Reviews } from "../../components/shared"
export const ProductPage = () => {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const [qty, setQty] = useState(1)
  const [image, setImage] = useState(0)
  const [chosen, setChosen] = useState<Record<string, string>>({})
  const { add } = useShop()
  if (!product)
    return (
      <div className="container page">
        <Empty
          title="Produit introuvable"
          text="Cette pièce n'est plus disponible dans notre sélection."
          to="/explore"
        />
      </div>
    )
  const store = stores.find((s) => s.id === product.storeId)!
  return (
    <div className="container page detail-page">
      <div className="breadcrumbs">
        <Link to="/">Accueil</Link>
        <ChevronRight size={14} />
        <Link to="/explore">Explorer</Link>
        <ChevronRight size={14} />
        <span>{product.name}</span>
      </div>
      <div className="product-detail">
        <div className="detail-gallery">
          <div className="detail-main-image">
            <img src={product.images} alt={product.name} />
            <span className="product-tag">{product.tags[0]}</span>
          </div>
          <div className="thumbnail-row">
            <UI.Button
              className={image === 0 ? "selected" : ""}
              onClick={() => setImage(0)}
              aria-label="Image principale"
            >
              <img src={product.images} alt="" />
            </UI.Button>
            <UI.Button
              className={image === 1 ? "selected" : ""}
              onClick={() => setImage(1)}
              aria-label="Voir le détail"
            >
              <img src={product.images} alt="" className="detail-crop" />
            </UI.Button>
          </div>
        </div>
        <div className="detail-info">
          <span className="eyebrow">
            {product.brand} ·{" "}
            {categories.find((c) => c.id === product.categoryId)?.name}
          </span>
          <UI.H1>{product.name}</UI.H1>
          <div className="detail-rating">
            <Stars rating={product.rating} count={product.reviewsCount} />
            <span>·</span>
            <span>Réf. {product.id.toUpperCase()}</span>
          </div>
          <div className="detail-price">{money(product.price)}</div>
          <p className="detail-description">{product.description}</p>
          <span className="stock-line">
            <CircleCheck size={17} />{" "}
            {product.stock > 0
              ? `En stock · ${product.stock} disponibles`
              : "Rupture de stock"}
          </span>
          {product.variants.map((v) => (
            <div className="variant" key={v.name}>
              <strong>
                {v.name} :{" "}
                <span>{chosen[v.name] || "Choisissez une option"}</span>
              </strong>
              <div>
                {v.values.map((value) => (
                  <UI.Button
                    className={chosen[v.name] === value ? "active" : ""}
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
          <div className="purchase-box">
            <div className="purchase-actions">
              <div className="quantity">
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
            <span className="purchase-note">
              <Truck size={17} /> Livraison partout à Madagascar · Paiement
              sécurisé
            </span>
          </div>
          <Link className="detail-store" to={`/stores/${store.id}`}>
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
      <div className="detail-lower">
        <div className="detail-tabs">
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
        <div className="detail-promise">
          <Sparkles size={25} />
          <UI.H3>Choisi avec intention.</UI.H3>
          <p>
            Chaque article de notre sélection raconte une histoire. Merci de
            soutenir des boutiques passionnées.
          </p>
        </div>
      </div>
      <Reviews />
      <section className="section related-section">
        <SectionTitle
          eyebrow="À DÉCOUVRIR AUSSI"
          title="Vous aimerez peut-être"
          to="/explore"
        />
        <div className="product-grid">
          <CursorList
            items={products.filter((p) => p.id !== id)}
            render={(p) => <ProductCard key={p.id} product={p} />}
            skeleton={<Skeleton cards={2} />}
            empty={null}
          />
        </div>
      </section>
      <div className="mobile-purchase">
        <strong>{money(product.price)}</strong>
        <Button disabled={!product.stock} onClick={() => add(product.id, qty)}>
          <ShoppingBag size={18} /> Ajouter au panier
        </Button>
      </div>
    </div>
  )
}
