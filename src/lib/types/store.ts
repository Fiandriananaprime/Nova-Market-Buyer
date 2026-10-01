export type Store = { id: string; name: string; slug: string; logoUrl: string; coverUrl: string; verified: boolean; rating: number; reviewsCount: number; productsCount: number; location: string; joinedYear: string; followersCount: number; description: string; isOpen: boolean }
export type Category = { id: string; name: string; count: number; children?: Category[]; image?: string }
