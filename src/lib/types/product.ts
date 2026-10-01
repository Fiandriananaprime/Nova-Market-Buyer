export type ProductVariant = { name: string; values: string[] }
export type Product = { id: string; name: string; brand: string; price: number; rating: number; reviewsCount: number; storeId: string; storeName: string; categoryId: string; images: string | string[]; stock: number; tags: string[]; description: string; specs: Record<string, string>; variants: ProductVariant[] }
export type Review = { id: string; customerName: string; rating: number; comment: string; date: string; verifiedPurchase: boolean; helpfulCount: number; reply?: string }
