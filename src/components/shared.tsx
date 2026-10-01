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
  const variants = {
    dark: 'bg-[var(--color-smart-blue-950)] text-white hover:bg-[var(--color-smart-blue-800)]',
    light: 'bg-[var(--color-parchment-50)] text-[var(--color-smart-blue-950)]',
    outline:
      'border-[var(--color-parchment-200)] bg-transparent text-[var(--color-smart-blue-950)] hover:border-[var(--color-smart-blue-950)]',
    ghost:
      'bg-transparent text-[var(--color-smart-blue-800)] hover:text-[var(--color-black-700)]',
  } as const;
  return (
    <UI.Button
      className={`inline-flex items-center justify-center gap-[11px] rounded-[4px] border border-transparent px-[19px] py-[13px] text-[12px] font-bold tracking-[0.015em] whitespace-nowrap transition-[transform,background,border-color] duration-200 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </UI.Button>
  );
};

export const Field = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => {
  return (
    <label className="flex min-w-0 flex-col gap-[7px] text-[11px] font-bold text-[var(--color-ink-muted)]">
      <span>{label}</span>
      <UI.Input
        className="w-full rounded-[2px] border border-[var(--color-parchment-200)] bg-white px-[13px] py-3 text-[12px] text-[var(--color-smart-blue-950)] outline-none focus:border-[var(--color-smart-blue-500)]"
        {...props}
      />
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
    <label className="flex min-w-0 flex-col gap-[7px] text-[11px] font-bold text-[var(--color-ink-muted)]">
      <span>{label}</span>
      <UI.Select
        className="w-full rounded-[2px] border border-[var(--color-parchment-200)] bg-white px-[13px] py-3 text-[12px] text-[var(--color-smart-blue-950)] outline-none focus:border-[var(--color-smart-blue-500)]"
        {...props}
      >
        {children}
      </UI.Select>
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
    <div className="mb-[33px] flex items-end justify-between gap-[25px]">
      <div>
        {eyebrow && (
          <div className="mb-2 font-['Manrope'] text-[10px] font-extrabold tracking-[0.19em] text-[var(--color-black-800)] uppercase">
            {eyebrow}
          </div>
        )}
        <UI.H1 className="m-0 font-['Playfair_Display'] text-[clamp(34px,3.5vw,51px)] font-normal leading-tight tracking-[-0.035em]">
          {title}
        </UI.H1>
        {description && (
          <p className="mt-3 mb-0 text-[13px] text-[var(--color-ink-muted)]">{description}</p>
        )}
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
  <div className="mb-8 flex items-end justify-between gap-[25px]">
      <div>
      {eyebrow && (
        <div className="mb-2 font-['Manrope'] text-[10px] font-extrabold tracking-[0.19em] text-[var(--color-black-800)] uppercase">
          {eyebrow}
        </div>
      )}
      <UI.H2 className="m-0 font-['Playfair_Display'] text-[clamp(30px,3vw,44px)] font-normal leading-tight tracking-[-0.035em]">
        {title}
      </UI.H2>
    </div>
    {to && (
      <Link
        className="inline-flex items-center gap-2 border-b border-current pb-1 text-[12px] font-bold hover:text-[var(--color-black-700)]"
        to={to}
      >
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
    <span className="inline-flex items-center gap-1 text-[11px] text-[var(--color-parchment-600)]">
      <Star size={14} fill="currentColor" strokeWidth={1.5} />
      <strong className="font-bold text-[var(--color-smart-blue-950)]">
        {rating.toFixed(1)}
      </strong>
      {count !== undefined && <span className="text-[var(--color-ink-faint)]">({count})</span>}
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
    <div className="flex min-h-[320px] flex-col items-center justify-center bg-[var(--color-parchment-50)] px-5 py-[45px] text-center">
      <div className="mb-5 grid size-[72px] place-items-center rounded-full bg-[var(--color-tropical-teal-100)] text-[var(--color-black-800)]">
        <Icon size={30} />
      </div>
      <UI.H2 className="mb-2 font-['Playfair_Display'] text-[28px] font-normal">
        {title}
      </UI.H2>
      <p className="mb-[21px] max-w-[340px] text-[12px] leading-[1.7] text-[var(--color-ink-muted)]">
        {text}
      </p>
      {to && (
        <Link
          className="inline-flex items-center justify-center gap-[11px] rounded-[4px] bg-[var(--color-smart-blue-950)] px-[19px] py-[13px] text-[12px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-smart-blue-800)]"
          to={to}
        >
          {action || 'Explorer les produits'}
          <ArrowRight size={17} />
        </Link>
      )}
    </div>
  );
};

export const Skeleton = ({ cards = 4 }: { cards?: number }) => {
  return (
    <div className="grid grid-cols-4 gap-[22px] max-[800px]:grid-cols-2">
      {Array.from({ length: cards }, (_, i) => (
        <div className="min-w-0 bg-white pb-[3px]" key={i}>
          <div className="aspect-[0.94] animate-[shimmer_1.5s_infinite] bg-[linear-gradient(90deg,var(--color-parchment-50)_20%,var(--color-parchment-100)_50%,var(--color-parchment-50)_80%)] bg-[length:220%_100%]" />
          <div className="mx-3 my-4 h-[13px] animate-[shimmer_1.5s_infinite] bg-[linear-gradient(90deg,var(--color-parchment-50)_20%,var(--color-parchment-100)_50%,var(--color-parchment-50)_80%)] bg-[length:220%_100%]" />
          <div className="mx-3 my-4 h-[13px] w-[65%] animate-[shimmer_1.5s_infinite] bg-[linear-gradient(90deg,var(--color-parchment-50)_20%,var(--color-parchment-100)_50%,var(--color-parchment-50)_80%)] bg-[length:220%_100%]" />
          <div className="mx-3 my-4 h-[13px] w-[40%] animate-[shimmer_1.5s_infinite] bg-[linear-gradient(90deg,var(--color-parchment-50)_20%,var(--color-parchment-100)_50%,var(--color-parchment-50)_80%)] bg-[length:220%_100%]" />
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
      className={`grid size-9 place-items-center rounded-full border-0 bg-[var(--color-surface)] text-[var(--color-smart-blue-950)] transition-transform duration-200 hover:scale-110 ${active ? 'text-[var(--color-smart-blue-600)]' : ''}`}
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
    <article className="min-w-0 bg-white pb-[3px] transition-transform duration-200 hover:-translate-y-1">
      <div className="relative aspect-[0.94] overflow-hidden bg-[var(--color-parchment-50)]">
        <Link
          to={`/products/${product.id}`}
          aria-label={`Voir ${product.name}`}
        >
          <img
            className="block h-full w-full object-cover transition-transform duration-500 hover:scale-[1.045]"
            src={imageUrl(product.images)}
            alt={product.name}
            loading="lazy"
          />
        </Link>
        {product.tags[0] && (
          <span className="absolute top-3.5 left-3.5 bg-[var(--color-surface)] px-2.5 py-2 text-[9px] font-extrabold tracking-[0.04em] text-[var(--color-smart-blue-950)]">{product.tags[0]}</span>
        )}
        <FavoriteButton id={product.id} />
      </div>
      <div className="px-[3px] pt-[17px] pb-[9px]">
        <div className="mb-1.5 text-[10px] font-extrabold tracking-[0.08em] text-[var(--color-black-800)] uppercase">{product.brand}</div>
        <Link className="block min-h-[50px] font-['Playfair_Display'] text-[18px] font-medium leading-[1.38] hover:text-[var(--color-black-800)]" to={`/products/${product.id}`}>
          {product.name}
        </Link>
        <Stars rating={product.rating} count={product.reviewsCount} />
        <div className="mt-[15px] flex items-end justify-between gap-2.5">
          <div>
            <strong className="block font-['Manrope'] text-[16px] font-extrabold">{money(product.price)}</strong>
            <span className="mt-1 block text-[11px] text-[var(--color-ink-faint)]">{product.storeName}</span>
          </div>
          <UI.Button
            className="grid size-[38px] flex-none place-items-center border-0 bg-[var(--color-smart-blue-950)] text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-black-800)]"
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
    <div className="grid grid-cols-4 gap-[22px] max-[800px]:grid-cols-2">
      {items.map((item) => (
        <ProductCard product={item} key={item.id} />
      ))}
    </div>
  );
};
export const StoreCard = ({ store }: { store: Store }) => {
  return (
    <Link className="border border-[var(--color-parchment-200)] bg-white transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_var(--color-shadow-soft)]" to={`/stores/${store.id}`}>
      <div className="h-[145px] overflow-hidden rounded-[2px]">
        <img className="h-full w-full object-cover" src={store.coverUrl} alt="" loading="lazy" />
      </div>
      <div className="relative px-[22px] pb-[19px]">
        <img className="relative -mt-6 size-[58px] rounded-full border-4 border-white object-cover" src={store.logoUrl} alt="" />
        <div className="mt-2.5">
          <UI.H3 className="flex items-center gap-1 text-[17px] font-semibold">
            {store.name}{' '}
            {store.verified && (
              <ShieldCheck size={16} aria-label="Boutique vérifiée" />
            )}
          </UI.H3>
          <span className="text-[11px] text-[var(--color-ink-faint)]">{store.location}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--color-ink-muted)]">
          <Stars rating={store.rating} count={store.reviewsCount} />
          <span>{store.productsCount} produits</span>
        </div>
        <span className="mt-4 flex items-center gap-2 text-[11px] font-bold">
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
      className={`flex items-center gap-3 rounded-[5px] border border-[var(--color-parchment-200)] bg-white p-[6px] pl-[17px] [&_input]:min-w-0 [&_input]:flex-1 [&_input]:border-0 [&_input]:bg-transparent [&_input]:text-[12px] [&_input]:outline-none ${hero ? 'max-w-[530px] shadow-[0_10px_30px_var(--color-shadow-medium)] max-[800px]:w-full' : ''}`}
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
          className="grid place-items-center border-0 bg-transparent"
          aria-label="Effacer la recherche"
          onClick={() => setValue('')}
        >
          <X size={16} />
        </UI.Button>
      )}
      <UI.Button type="submit" className="flex items-center gap-[7px] rounded-[3px] border-0 bg-[var(--color-smart-blue-950)] px-3.5 py-3 text-[11px] font-bold text-white">
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
      <div ref={ref} className="h-px" aria-hidden="true" />
    </>
  );
}
export const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <article className="border-b border-[var(--color-parchment-100)] py-6">
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-full bg-[var(--color-tropical-teal-100)] font-bold text-[var(--color-black-800)]">{review.customerName[0]}</div>
        <div className="flex flex-col gap-1">
          <strong className="text-[12px]">{review.customerName}</strong>
          <span className="text-[10px] text-[var(--color-ink-faint)]">
            {date(review.date)} ·{' '}
            {review.verifiedPurchase ? 'Achat vérifié' : 'Avis client'}
          </span>
        </div>
        <div className="ml-auto tracking-[2px] text-[var(--color-parchment-600)]">
          {'★'.repeat(review.rating)}
          {'☆'.repeat(5 - review.rating)}
        </div>
      </div>
      <p className="my-[17px] text-[12px] leading-[1.8] text-[var(--color-ink-muted)]">{review.comment}</p>
      {review.reply && (
        <div className="mb-[18px] bg-[var(--color-parchment-50)] p-[15px] text-[11px]">
          <strong>Réponse de la boutique</strong>
          <p className="mt-1.5 text-[var(--color-ink-muted)]">{review.reply}</p>
        </div>
      )}
      <small className="flex items-center gap-1 text-[var(--color-ink-faint)]">
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
    <section className="my-20">
      <SectionTitle eyebrow="LES AVIS" title={title} />
      <div className="my-[30px] flex items-center gap-[30px] bg-[var(--color-parchment-50)] p-[27px] max-[600px]:p-[17px]">
        <div className="border-r border-[var(--color-parchment-200)] pr-[27px] font-['Playfair_Display'] text-[47px] font-medium max-[600px]:pr-[17px] max-[600px]:text-[37px]">
          4.9<span className="font-['DM_Sans'] text-[17px] font-normal text-[var(--color-ink-faint)]">/ 5</span>
          <small className="block font-['DM_Sans'] text-[16px] tracking-[4px] text-[var(--color-parchment-600)]">★★★★★</small>
        </div>
        <div>
          <strong className="font-['Playfair_Display'] text-[19px] font-medium">Une expérience appréciée</strong>
          <p className="mt-1.5 text-[12px] text-[var(--color-ink-subtle)]">Des retours sincères de notre communauté.</p>
        </div>
      </div>
      <div className="my-[22px] flex flex-wrap gap-2 max-[600px]:gap-1">
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
      <div className="max-w-[840px]">
        <CursorList
          key={rating}
          items={filtered}
          render={(r) => <ReviewCard key={r.id} review={r} />}
          skeleton={
            <>
              <div className="my-[15px] h-[110px] animate-[shimmer_1.5s_infinite] bg-[linear-gradient(90deg,var(--color-parchment-50)_20%,var(--color-parchment-100)_50%,var(--color-parchment-50)_80%)] bg-[length:220%_100%]" />
              <div className="my-[15px] h-[110px] animate-[shimmer_1.5s_infinite] bg-[linear-gradient(90deg,var(--color-parchment-50)_20%,var(--color-parchment-100)_50%,var(--color-parchment-50)_80%)] bg-[length:220%_100%]" />
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
