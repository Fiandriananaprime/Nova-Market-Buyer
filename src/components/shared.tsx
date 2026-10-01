import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Heart,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { catalogApi } from '../lib/api/catalog';
import { accountApi, cartApi } from '../lib/api/account';
import { buyerApi } from '../lib/api/buyer';
import { checkoutApi } from '../lib/api/checkout';
import type {
  Address,
  CartItem,
  Category,
  Notification,
  Order,
  Product,
  ProductSummary,
  Review,
  Store,
} from '../lib/types';
import { date, imageUrl, money } from '../lib/format';
import * as UI from '../lib/ui';
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'dark' | 'light' | 'outline' | 'ghost';
  children: ReactNode;
};
export const Button = ({
  variant = 'dark',
  className = '',
  children,
  ...props
}: ButtonProps) => {
  return (
    <UI.Button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </UI.Button>
  );
};

export const Field = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => {
  return (
    <label className="field">
      <span>{label}</span>
      <UI.Input {...props} />
    </label>
  );
};

export const Select = ({
  label,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
}) => {
  return (
    <label className="field">
      <span>{label}</span>
      <UI.Select {...props}>{children}</UI.Select>
    </label>
  );
};

export const PageTitle = ({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) => {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <UI.H1>{title}</UI.H1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
};

export const SectionTitle = ({
  eyebrow,
  title,
  to,
  link = 'Tout voir',
}: {
  eyebrow?: string;
  title: string;
  to?: string;
  link?: string;
}) => {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <UI.H2>{title}</UI.H2>
      </div>
      {to && (
        <Link className="text-link" to={to}>
          {link}
          <ArrowRight size={17} />
        </Link>
      )}
    </div>
  );
};
type StarsProps = {
  rating: number;
  count?: number;
};

export const Stars = ({ rating, count }: StarsProps) => {
  return (
    <span className="rating">
      <Star size={14} fill="currentColor" strokeWidth={1.5} />
      <strong>{rating.toFixed(1)}</strong>
      {count !== undefined && <span>({count})</span>}
    </span>
  );
};

export const Empty = ({
  icon: Icon = ShoppingBag,
  title,
  text,
  to,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  text: string;
  to?: string;
  action?: string;
}) => {
  return (
    <div className="empty">
      <div className="empty-icon">
        <Icon size={30} />
      </div>
      <UI.H2>{title}</UI.H2>
      <p>{text}</p>
      {to && (
        <Link className="btn btn-dark" to={to}>
          {action || 'Explorer les produits'}
          <ArrowRight size={17} />
        </Link>
      )}
    </div>
  );
};

export const Skeleton = ({ cards = 4 }: { cards?: number }) => {
  return (
    <div className="product-grid">
      {Array.from({ length: cards }, (_, i) => (
        <div className="product-card skeleton-card" key={i}>
          <div className="skeleton skeleton-image" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
          <div className="skeleton skeleton-line tiny" />
        </div>
      ))}
    </div>
  );
};

type ShopState = {
  products: Product[];
  categories: Category[];
  stores: Store[];
  cart: Record<string, number>;
  cartItems: CartItem[];
  favorites: string[];
  followed: string[];
  orders: Order[];
  addresses: Address[];
  notifications: Notification[];
  toast: string;
  add: (id: string, qty?: number) => Promise<void>;
  update: (id: string, qty: number) => Promise<void>;
  favorite: (id: string) => Promise<void>;
  follow: (id: string) => Promise<void>;
  notify: (text: string) => void;
  clear: () => Promise<void>;
  place: (order: Order) => Promise<void>;
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
};
const ShopContext = createContext<ShopState | null>(null);
export const useShop = () => {
  const value = useContext(ShopContext);
  if (!value) throw new Error('Shop provider missing');
  return value;
};
export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [followed, setFollowed] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [toast, setToast] = useState('');
  useEffect(() => {
    void Promise.all([
      catalogApi.categories().then(setCategories),
      catalogApi.featuredProducts().then(setProducts),
      catalogApi.featuredStores().then(setStores),
      cartApi.get().then((value) => {
        setCartItems(value.items);
        setCart(
          Object.fromEntries(
            value.items.map((item) => [item.productId, item.qty]),
          ),
        );
        setCartItems(value.items);
      }),
      buyerApi.addresses().then(setAddresses),
      buyerApi
        .favorites()
        .then((items) => setFavorites(items.map((item) => item.id))),
      buyerApi
        .followedStores()
        .then((items) => setFollowed(items.map((store) => store.id))),
      checkoutApi.orders().then((value) => setOrders(value.data)),
      accountApi.notifications().then((value) => setNotifications(value.data)),
    ]).catch((error: unknown) =>
      notify(
        error instanceof Error
          ? error.message
          : 'Impossible de charger les données',
      ),
    );
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(''), 2800);
    return () => clearTimeout(timeout);
  }, [toast]);
  const notify = (text: string) => setToast(text);
  const add = async (id: string, qty = 1) => {
    const value = await cartApi.addItem({ productId: id, qty });
    setCart(
      Object.fromEntries(value.items.map((item) => [item.productId, item.qty])),
    );
    setCartItems(value.items);
    notify('Ajouté au panier');
  };
  const update = async (id: string, qty: number) => {
    const value =
      qty <= 0
        ? await cartApi.removeItem(id)
        : await cartApi.updateItem(id, { qty });
    setCart(
      Object.fromEntries(value.items.map((item) => [item.productId, item.qty])),
    );
  };
  const favorite = async (id: string) => {
    const active = favorites.includes(id);
    if (active) await buyerApi.unfavoriteProduct(id);
    else await buyerApi.favoriteProduct(id);
    setFavorites((old) =>
      active ? old.filter((x) => x !== id) : [...old, id],
    );
  };
  const follow = async (id: string) => {
    const active = followed.includes(id);
    if (active) await buyerApi.unfollowStore(id);
    else await buyerApi.followStore(id);
    setFollowed((old) => (active ? old.filter((x) => x !== id) : [...old, id]));
  };
  const clear = async () => {
    await cartApi.clear();
    setCart({});
    setCartItems([]);
  };
  const place = async (order: Order) => {
    setOrders((old) => [order, ...old]);
    await clear();
    notify('Votre commande a été enregistrée');
  };
  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        stores,
        cart,
        cartItems,
        favorites,
        followed,
        orders,
        addresses,
        notifications,
        toast,
        add,
        update,
        favorite,
        follow,
        notify,
        clear,
        place,
        setAddresses,
        setNotifications,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const FavoriteButton = ({ id }: { id: string }) => {
  const { favorites, favorite } = useShop();
  const active = favorites.includes(id);
  return (
    <UI.Button
      className={`favorite-button ${active ? 'active' : ''}`}
      aria-label={active ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        favorite(id);
      }}
    >
      <Heart size={19} fill={active ? 'currentColor' : 'none'} />
    </UI.Button>
  );
};

export const ProductCard = ({ product }: { product: ProductSummary }) => {
  const { add } = useShop();
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link
          to={`/products/${product.id}`}
          aria-label={`Voir ${product.name}`}
        >
          <img
            src={imageUrl(product.images)}
            alt={product.name}
            loading="lazy"
          />
        </Link>
        {product.tags[0] && (
          <span className="product-tag">{product.tags[0]}</span>
        )}
        <FavoriteButton id={product.id} />
      </div>
      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <Link className="product-name" to={`/products/${product.id}`}>
          {product.name}
        </Link>
        <Stars rating={product.rating} count={product.reviewsCount} />
        <div className="product-bottom">
          <div>
            <strong>{money(product.price)}</strong>
            <span className="seller-name">{product.storeName}</span>
          </div>
          <UI.Button
            className="add-icon"
            aria-label={`Ajouter ${product.name} au panier`}
            onClick={() => add(product.id)}
            disabled={!product.stock}
          >
            <Plus size={20} />
          </UI.Button>
        </div>
      </div>
    </article>
  );
};
export const ProductGrid = ({ items }: { items: ProductSummary[] }) => {
  return (
    <div className="product-grid">
      {items.map((item) => (
        <ProductCard product={item} key={item.id} />
      ))}
    </div>
  );
};
export const StoreCard = ({ store }: { store: Store }) => {
  return (
    <Link className="store-card" to={`/stores/${store.id}`}>
      <div className="store-cover">
        <img src={store.coverUrl} alt="" loading="lazy" />
      </div>
      <div className="store-card-body">
        <img className="store-avatar" src={store.logoUrl} alt="" />
        <div className="store-card-title">
          <UI.H3>
            {store.name}{' '}
            {store.verified && (
              <ShieldCheck size={16} aria-label="Boutique vérifiée" />
            )}
          </UI.H3>
          <span>{store.location}</span>
        </div>
        <div className="store-meta">
          <Stars rating={store.rating} count={store.reviewsCount} />
          <span>{store.productsCount} produits</span>
        </div>
        <span className="store-visit">
          Découvrir la boutique <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
};
export const SearchBox = ({ hero = false }: { hero?: boolean }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  return (
    <form
      className={`search-box ${hero ? 'hero-search' : ''}`}
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/explore?search=${encodeURIComponent(value)}`);
      }}
    >
      <Search size={19} />
      <UI.Input
        aria-label="Rechercher un produit"
        placeholder="Rechercher une pièce, une marque, une envie..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <UI.Button
          type="button"
          className="clear-search"
          aria-label="Effacer la recherche"
          onClick={() => setValue('')}
        >
          <X size={16} />
        </UI.Button>
      )}
      <UI.Button type="submit" className="search-submit">
        Rechercher <ArrowRight size={16} />
      </UI.Button>
    </form>
  );
};

export function CursorList<T extends { id: string }>({
  items,
  render,
  skeleton,
  empty,
}: {
  items: T[];
  render: (item: T) => ReactNode;
  skeleton: ReactNode;
  empty: ReactNode;
}) {
  const [data, setData] = useState<T[]>([]);
  const [cursor, setCursor] = useState<string>();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const key = items.map((i) => i.id).join('|');
  useEffect(() => {
    setData([]);
    setCursor(undefined);
    setHasMore(true);
    busy.current = false;
  }, [key]);
  useEffect(() => {
    if (!hasMore || busy.current) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || busy.current) return;
        busy.current = true;
        setLoading(true);
        setData(items);
        setHasMore(false);
        busy.current = false;
        setLoading(false);
      },
      { rootMargin: '350px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [cursor, hasMore, items, key]);
  return (
    <>
      {data.length ? data.map(render) : !loading && !hasMore ? empty : null}
      {loading && skeleton}
      <div ref={ref} className="scroll-sentinel" aria-hidden="true" />
    </>
  );
}
export const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <article className="review-card">
      <div className="review-top">
        <div className="review-avatar">{review.customerName[0]}</div>
        <div>
          <strong>{review.customerName}</strong>
          <span>
            {date(review.date)} ·{' '}
            {review.verifiedPurchase ? 'Achat vérifié' : 'Avis client'}
          </span>
        </div>
        <div className="review-stars">
          {'★'.repeat(review.rating)}
          {'☆'.repeat(5 - review.rating)}
        </div>
      </div>
      <p>{review.comment}</p>
      {review.reply && (
        <div className="seller-reply">
          <strong>Réponse de la boutique</strong>
          <p>{review.reply}</p>
        </div>
      )}
      <small>
        <Heart size={13} /> Utile ({review.helpfulCount})
      </small>
    </article>
  );
};
export const Reviews = ({
  title = "Ce qu'ils en pensent",
  reviews = [],
}: {
  title?: string;
  reviews?: Review[];
}) => {
  const [rating, setRating] = useState('all');
  const filtered = useMemo(
    () => reviews.filter((r) => rating === 'all' || r.rating === +rating),
    [rating, reviews],
  );
  return (
    <section className="reviews-section">
      <SectionTitle eyebrow="LES AVIS" title={title} />
      <div className="review-summary">
        <div className="rating-large">
          4.9<span>/ 5</span>
          <small>★★★★★</small>
        </div>
        <div>
          <strong>Une expérience appréciée</strong>
          <p>Des retours sincères de notre communauté.</p>
        </div>
      </div>
      <div className="review-filters">
        {['all', '5', '4', '3', '2', '1'].map((r) => (
          <Button
            key={r}
            variant={rating === r ? 'dark' : 'outline'}
            onClick={() => setRating(r)}
          >
            {r === 'all' ? 'Tous' : `${r} ★`}
          </Button>
        ))}
      </div>
      <div className="review-list">
        <CursorList
          key={rating}
          items={filtered}
          render={(r) => <ReviewCard key={r.id} review={r} />}
          skeleton={
            <>
              <div className="review-skeleton skeleton" />
              <div className="review-skeleton skeleton" />
            </>
          }
          empty={
            <Empty
              icon={Star}
              title="Pas encore d'avis"
              text="Les premiers avis apparaîtront ici."
            />
          }
        />
      </div>
    </section>
  );
};

export type AccountNavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};
