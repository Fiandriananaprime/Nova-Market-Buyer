import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { imageUrl } from '../../lib/format';
import * as UI from '../../lib/ui';
import {
  Button,
  SectionTitle,
  useShop,
  ProductGrid,
  StoreCard,
  SearchBox,
} from '../../components/shared';
export const HomePage = () => {
  const { notify, categories, products, stores } = useShop();
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-kicker">
              <span className="kicker-line" /> LE MARCHÉ AUTREMENT
            </span>
            <UI.H1>
              Des découvertes
              <br />
              qui <em>ont du sens.</em>
            </UI.H1>
            <p>
              Des pièces choisies avec soin, des créateurs passionnés et tout ce
              qui rend le quotidien plus beau. Bienvenue chez vous.
            </p>
            <SearchBox hero />
            <div className="hero-links">
              <Link className="btn btn-dark" to="/explore">
                Explorer la collection <ArrowRight size={18} />
              </Link>
              <Link className="underlined" to="/stores">
                Rencontrer nos boutiques
              </Link>
            </div>
            <div className="hero-trust">
              <span>
                <ShieldCheck size={18} /> Boutiques vérifiées
              </span>
              <span>
                <Truck size={18} /> Livraison partout sur l'île
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src={imageUrl(products[0]?.images)}
              alt="Sac artisanal tressé porté avec élégance"
            />
            <div className="hero-image-label">
              <span className="label-dot" /> LA SÉLECTION NOVAMARKET{' '}
              <span>01 / 03</span>
            </div>
            <div className="hero-floating">
              <span>À découvrir</span>
              <strong>
                Des trésors
                <br />
                bien de chez nous.
              </strong>
              <Link to="/explore">
                Voir la sélection <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="value-strip">
        <div className="container value-inner">
          <span>
            <Sparkles size={19} /> Sélection faite avec soin
          </span>
          <span>
            <ShieldCheck size={19} /> Achats en toute confiance
          </span>
          <span>
            <Truck size={19} /> Partout à Madagascar
          </span>
          <span>
            <Heart size={19} /> Des découvertes à aimer
          </span>
        </div>
      </div>
      <section className="section container">
        <SectionTitle
          eyebrow="POUR CHAQUE ENVIE"
          title="Explorez à votre façon"
          to="/categories"
        />
        <div className="category-grid">
          {categories.map((category, i) => (
            <Link
              className={`category-card category-${i}`}
              to={`/explore?category=${category.id}`}
              key={category.id}
            >
              <img src={category.image} alt="" loading="lazy" />
              <div className="category-overlay">
                <span>{String(i + 1).padStart(2, '0')} / COLLECTION</span>
                <strong>{category.name}</strong>
                <span className="category-arrow">
                  <ArrowRight size={19} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section container featured-section">
        <SectionTitle
          eyebrow="LE MEILLEUR DU MOMENT"
          title="Nos coups de cœur"
          to="/explore"
        />
        <ProductGrid items={products.slice(0, 4)} />
      </section>
      <section className="editorial container">
        <div className="editorial-image">
          <img
            src={imageUrl(products[1]?.images)}
            alt="Panier tressé artisanal"
            loading="lazy"
          />
        </div>
        <div className="editorial-copy">
          <span className="eyebrow">DES OBJETS, DES HISTOIRES</span>
          <UI.H2>
            Le beau a une
            <br />
            <em>origine.</em>
          </UI.H2>
          <p>
            Derrière chaque pièce, il y a des mains, un savoir-faire et une
            histoire à partager. Prenez le temps de découvrir ce qui la rend
            unique.
          </p>
          <Link className="btn btn-dark" to="/explore?category=artisanat">
            Découvrir l'artisanat <ArrowRight size={17} />
          </Link>
          <span className="editorial-number">N° 01 — FAIT AVEC INTENTION</span>
        </div>
      </section>
      <section className="section container">
        <SectionTitle
          eyebrow="DES GENS PASSIONNÉS"
          title="Boutiques à rencontrer"
          to="/stores"
          link="Toutes les boutiques"
        />
        <div className="store-grid">
          {stores.map((store) => (
            <StoreCard store={store} key={store.id} />
          ))}
        </div>
      </section>
      <section className="newsletter">
        <div className="container newsletter-inner">
          <div>
            <span className="eyebrow">
              UN PEU DE BEAU DANS VOTRE BOÎTE MAIL
            </span>
            <UI.H2>Les belles choses se partagent.</UI.H2>
            <p>
              Une sélection d'inspirations et de nouveautés, à votre rythme.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              notify('Inscription à la newsletter bientôt disponible');
            }}
          >
            <UI.Input
              type="email"
              required
              placeholder="Votre adresse e-mail"
              aria-label="Adresse e-mail"
            />
            <Button type="submit">
              M'inscrire <ArrowRight size={17} />
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};
