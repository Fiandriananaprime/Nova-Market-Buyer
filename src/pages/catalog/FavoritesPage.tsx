import { useState } from 'react';
import { Heart, Store as StoreIcon } from 'lucide-react';
import * as UI from '../../lib/ui';
import {
  PageTitle,
  Empty,
  useShop,
  ProductGrid,
  StoreCard,
} from '../../components/shared';
export const FavoritesPage = () => {
  const { favorites, followed, products, stores } = useShop();
  const [tab, setTab] = useState('Produits');
  return (
    <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
      <PageTitle
        eyebrow="VOTRE SÉLECTION"
        title="Mes favoris"
        description="Gardez vos belles découvertes à portée de main."
      />
      <div className="flex gap-8 border-b border-[var(--color-parchment-200)] max-[800px]:gap-6">
        <UI.Button
          className={`border-0 border-b-2 bg-transparent px-0 py-3 text-[12px] font-bold ${tab === 'Produits' ? 'border-[var(--color-smart-blue-950)] text-[var(--color-smart-blue-950)]' : 'border-transparent text-[var(--color-ink-subtle)]'}`}
          onClick={() => setTab('Produits')}
        >
          Produits ({favorites.length})
        </UI.Button>
        <UI.Button
          className={`border-0 border-b-2 bg-transparent px-0 py-3 text-[12px] font-bold ${tab === 'Boutiques' ? 'border-[var(--color-smart-blue-950)] text-[var(--color-smart-blue-950)]' : 'border-transparent text-[var(--color-ink-subtle)]'}`}
          onClick={() => setTab('Boutiques')}
        >
          Boutiques suivies ({followed.length})
        </UI.Button>
      </div>
      {tab === 'Produits' ? (
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
        <div className="grid grid-cols-3 gap-[22px] max-[800px]:grid-cols-1">
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
  );
};
