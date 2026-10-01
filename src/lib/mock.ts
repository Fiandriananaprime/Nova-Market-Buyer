// Demo fixtures match the buyer-facing OpenAPI shapes. Replace this module with API services when the backend is ready.
export type Category = {
  id: string
  name: string
  count: number
  children?: Category[]
  image: string
}
export type ProductSummary = {
  id: string
  name: string
  brand: string
  price: number
  rating: number
  reviewsCount: number
  storeId: string
  storeName: string
  categoryId: string
  images: string
  stock: number
  tags: string[]
  description: string
  specs: Record<string, string>
  variants: {
    name: string
    values: string[]
  }[]
}
export type Store = {
  id: string
  name: string
  slug: string
  logoUrl: string
  coverUrl: string
  verified: boolean
  rating: number
  reviewsCount: number
  productsCount: number
  location: string
  joinedYear: string
  followersCount: number
  description: string
  isOpen: boolean
}
export type Review = {
  id: string
  customerName: string
  rating: number
  comment: string
  date: string
  verifiedPurchase: boolean
  helpfulCount: number
  reply?: string
}
export type Address = {
  id: string
  label: string
  recipientName: string
  phone: string
  street: string
  district: string
  city: string
  region: string
  isDefault: boolean
}
export type Order = {
  id: string
  items: {
    productId: string
    productName: string
    image: string
    price: number
    qty: number
    sellerName: string
  }[]
  subtotal: number
  deliveryFee: number
  total: number
  status: "pending" | "confirmed" | "processing" | "preparing" | "delivered" | "cancelled"
  deliveryMethod: string
  paymentMethod: string
  paymentStatus: string
  note?: string
  address: Address
  createdAt: string
  estimatedDelivery: string
}

const photo = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
export const imagery = {
  hero: photo("photo-1625480963923-7c5b0de97624", 1400),
  craft: photo("photo-1627202626612-1e304a201b32"),
  decor: photo("photo-1667312939934-60fc3bfa4ec0"),
  fashion: photo("photo-1555885425-f605efd01224"),
  beauty: photo("photo-1608248543803-ba4f8c70ae0b"),
  tech: photo("photo-1505740420928-5e560c06d30e"),
  food: photo("photo-1606313564200-e75d5e30476c"),
}
export const categories: Category[] = [
  {
    id: "artisanat",
    name: "Artisanat",
    count: 248,
    image: imagery.craft,
    children: [
      { id: "vannerie", name: "Vannerie", count: 76, image: imagery.craft },
      {
        id: "maison-artisanale",
        name: "Maison artisanale",
        count: 52,
        image: imagery.decor,
      },
    ],
  },
  {
    id: "mode",
    name: "Mode & accessoires",
    count: 186,
    image: imagery.fashion,
  },
  { id: "maison", name: "Maison & déco", count: 132, image: imagery.decor },
  {
    id: "beaute",
    name: "Beauté & bien-être",
    count: 94,
    image: imagery.beauty,
  },
  { id: "tech", name: "Tech & lifestyle", count: 73, image: imagery.tech },
  { id: "saveurs", name: "Saveurs de l'île", count: 58, image: imagery.food },
]
export const stores: Store[] = [
  {
    id: "s1",
    name: "Atelier Ravinala",
    slug: "atelier-ravinala",
    logoUrl: imagery.craft,
    coverUrl: imagery.hero,
    verified: true,
    rating: 4.9,
    reviewsCount: 128,
    productsCount: 42,
    location: "Antananarivo",
    joinedYear: "2022",
    followersCount: 1240,
    description:
      "Des créations artisanales façonnées avec soin, inspirées par les matières et savoir-faire de Madagascar.",
    isOpen: true,
  },
  {
    id: "s2",
    name: "Maison Tana",
    slug: "maison-tana",
    logoUrl: imagery.decor,
    coverUrl: imagery.decor,
    verified: true,
    rating: 4.8,
    reviewsCount: 86,
    productsCount: 35,
    location: "Antananarivo",
    joinedYear: "2023",
    followersCount: 820,
    description: "Des objets singuliers pour une maison qui vous ressemble.",
    isOpen: true,
  },
  {
    id: "s3",
    name: "Mora Studio",
    slug: "mora-studio",
    logoUrl: imagery.beauty,
    coverUrl: imagery.beauty,
    verified: true,
    rating: 4.7,
    reviewsCount: 64,
    productsCount: 28,
    location: "Antsirabe",
    joinedYear: "2021",
    followersCount: 610,
    description: "Le quotidien, en plus beau. Une sélection pensée pour durer.",
    isOpen: true,
  },
]
export const products: ProductSummary[] = [
  {
    id: "p1",
    name: "Panier en raphia tressé à la main",
    brand: "Ravinala",
    price: 89000,
    rating: 4.9,
    reviewsCount: 48,
    storeId: "s1",
    storeName: "Atelier Ravinala",
    categoryId: "artisanat",
    images: imagery.craft,
    stock: 12,
    tags: ["Coup de cœur", "Fait main"],
    description:
      "Un panier unique, tressé à la main par des artisanes malgaches. Une pièce naturelle, aussi belle au marché qu'à la maison.",
    specs: {
      Matière: "Raphia naturel",
      Origine: "Madagascar",
      Fabrication: "Artisanale",
      Entretien: "Nettoyage à sec",
    },
    variants: [{ name: "Taille", values: ["Petit", "Moyen", "Grand"] }],
  },
  {
    id: "p2",
    name: "Vase céramique Aina",
    brand: "Maison Tana",
    price: 125000,
    rating: 4.8,
    reviewsCount: 32,
    storeId: "s2",
    storeName: "Maison Tana",
    categoryId: "maison",
    images: imagery.decor,
    stock: 8,
    tags: ["Nouveau"],
    description:
      "Une forme sculpturale et une texture douce qui apportent du caractère à votre intérieur.",
    specs: { Matière: "Céramique", Couleur: "Ivoire", Hauteur: "28 cm" },
    variants: [{ name: "Couleur", values: ["Ivoire", "Sable"] }],
  },
  {
    id: "p3",
    name: "Sac cabas en cuir naturel",
    brand: "Mora Studio",
    price: 179000,
    rating: 4.9,
    reviewsCount: 76,
    storeId: "s3",
    storeName: "Mora Studio",
    categoryId: "mode",
    images: imagery.fashion,
    stock: 5,
    tags: ["Best-seller"],
    description:
      "Le compagnon idéal de toutes vos journées, avec une silhouette intemporelle.",
    specs: { Matière: "Cuir", Fermeture: "Bouton pression" },
    variants: [{ name: "Couleur", values: ["Camel", "Brun"] }],
  },
  {
    id: "p4",
    name: "Huile précieuse de baobab",
    brand: "Mora Studio",
    price: 59000,
    rating: 4.7,
    reviewsCount: 29,
    storeId: "s3",
    storeName: "Mora Studio",
    categoryId: "beaute",
    images: imagery.beauty,
    stock: 24,
    tags: ["Naturel"],
    description:
      "Une huile douce pour accompagner votre rituel de soin quotidien.",
    specs: { Contenance: "50 ml", Origine: "Madagascar" },
    variants: [],
  },
  {
    id: "p5",
    name: "Casque audio sans fil Studio",
    brand: "Nova Select",
    price: 249000,
    rating: 4.6,
    reviewsCount: 54,
    storeId: "s2",
    storeName: "Maison Tana",
    categoryId: "tech",
    images: imagery.tech,
    stock: 17,
    tags: ["Populaire"],
    description:
      "Un son immersif pour accompagner chaque moment de votre journée.",
    specs: { Connectivité: "Bluetooth", Autonomie: "30 heures" },
    variants: [{ name: "Couleur", values: ["Noir", "Crème"] }],
  },
  {
    id: "p6",
    name: "Chocolat noir de Madagascar",
    brand: "Terroir",
    price: 32000,
    rating: 4.9,
    reviewsCount: 61,
    storeId: "s1",
    storeName: "Atelier Ravinala",
    categoryId: "saveurs",
    images: imagery.food,
    stock: 34,
    tags: ["Local"],
    description: "Un chocolat au caractère intense, à savourer ou à offrir.",
    specs: { Origine: "Madagascar", Poids: "100 g" },
    variants: [],
  },
  {
    id: "p7",
    name: "Panier rond en fibres naturelles",
    brand: "Ravinala",
    price: 73000,
    rating: 4.8,
    reviewsCount: 24,
    storeId: "s1",
    storeName: "Atelier Ravinala",
    categoryId: "artisanat",
    images: photo("photo-1625480963979-80b42a089aa3"),
    stock: 9,
    tags: ["Fait main"],
    description: "Un bel objet de rangement à l'esprit naturel.",
    specs: { Matière: "Fibres végétales" },
    variants: [],
  },
  {
    id: "p8",
    name: "Vase en grès et fleurs séchées",
    brand: "Maison Tana",
    price: 99000,
    rating: 4.7,
    reviewsCount: 18,
    storeId: "s2",
    storeName: "Maison Tana",
    categoryId: "maison",
    images: photo("photo-1774364830987-d18b6b063ab7"),
    stock: 6,
    tags: ["Nouveau"],
    description: "Une touche de poésie pour les espaces du quotidien.",
    specs: { Matière: "Grès" },
    variants: [],
  },
]
export const reviews: Review[] = [
  {
    id: "r1",
    customerName: "Aina R.",
    rating: 5,
    comment:
      "Très belle qualité, encore plus joli en vrai. L'emballage était soigné et la livraison rapide !",
    date: "2026-04-12",
    verifiedPurchase: true,
    helpfulCount: 12,
    reply: "Merci beaucoup pour votre confiance !",
  },
  {
    id: "r2",
    customerName: "Hery M.",
    rating: 5,
    comment:
      "Un produit authentique et une très belle finition. Je recommande sans hésiter.",
    date: "2026-03-28",
    verifiedPurchase: true,
    helpfulCount: 8,
  },
  {
    id: "r3",
    customerName: "Lova T.",
    rating: 4,
    comment:
      "Conforme aux photos et livré avec soin. Très contente de mon achat.",
    date: "2026-03-10",
    verifiedPurchase: true,
    helpfulCount: 4,
  },
  {
    id: "r4",
    customerName: "Sara N.",
    rating: 5,
    comment: "Super expérience, et le vendeur a été très réactif.",
    date: "2026-02-18",
    verifiedPurchase: true,
    helpfulCount: 3,
  },
]
export const initialAddresses: Address[] = [
  {
    id: "a1",
    label: "Maison",
    recipientName: "Aina Rakoto",
    phone: "+261 34 12 345 67",
    street: "Lot II A 45, Ankorondrano",
    district: "Ankorondrano",
    city: "Antananarivo",
    region: "Analamanga",
    isDefault: true,
  },
]
export const initialOrders: Order[] = [
  {
    id: "ORD-2026-001",
    items: [
      {
        productId: "p1",
        productName: products[0].name,
        image: products[0].images,
        price: 89000,
        qty: 1,
        sellerName: "Atelier Ravinala",
      },
      {
        productId: "p2",
        productName: products[1].name,
        image: products[1].images,
        price: 125000,
        qty: 1,
        sellerName: "Maison Tana",
      },
    ],
    subtotal: 214000,
    deliveryFee: 12000,
    total: 226000,
    status: "processing",
    deliveryMethod: "standard",
    paymentMethod: "mvola",
    paymentStatus: "paid",
    address: initialAddresses[0],
    createdAt: "2026-05-19T10:30:00Z",
    estimatedDelivery: "2026-05-24T14:00:00Z",
  },
]
export const money = (amount: number) =>
  `${new Intl.NumberFormat("fr-FR").format(amount)} Ar`
export const date = (value: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value))
export const API_URL = import.meta.env.VITE_API_URL
// Cursor-shaped mock response for UI development. Never interpreted as a real backend response.
type CursorResponse<T,> = {
  data: T[]
  meta: {
    nextCursor?: string
    hasMore: boolean
  }
}
export async function mockCursor<T extends { id: string }>(
  items: T[],
  cursor?: string,
  limit = 2,
): Promise<CursorResponse<T>> {
  await new Promise((resolve) => setTimeout(resolve, 350))
  const start = cursor
    ? Math.max(0, items.findIndex((item) => item.id === cursor) + 1)
    : 0
  const data = items.slice(start, start + limit)
  return {
    data,
    meta: {
      nextCursor: data.at(-1)?.id,
      hasMore: start + limit < items.length,
    },
  }
}
