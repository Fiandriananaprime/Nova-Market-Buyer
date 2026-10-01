import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageTitle, useShop } from '../../components/shared';
import { imageUrl } from '../../lib/format';
export const CategoriesPage = () => {
  const { categories } = useShop();
  return (
    <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
      <PageTitle
        eyebrow="DÉCOUVRIR"
        title="Toutes les catégories"
        description="Une envie précise ou simplement envie de flâner ? Trouvez votre prochaine découverte."
      />
      <div className="grid grid-cols-3 gap-3.5 max-[800px]:grid-cols-2">
        {categories.map((c) => (
          <Link
            className="group relative min-h-[290px] overflow-hidden bg-[var(--color-parchment-100)] max-[800px]:min-h-[180px]"
            to={`/explore?category=${c.id}`}
            key={c.id}
          >
            <img className="absolute h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" src={imageUrl(c.image)} alt="" />
            <div className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(0deg,var(--color-smart-blue-950),transparent_67%)] p-[18px] text-white">
              <span className="mb-1.5 text-[9px] font-bold tracking-[0.13em]">{c.count} PRODUITS</span>
              <strong className="max-w-[150px] font-['Playfair_Display'] text-[20px] font-medium leading-[1.2]">{c.name}</strong>
              <span className="absolute right-[15px] bottom-[18px] grid size-7 place-items-center rounded-full border border-[var(--color-map-road-strong)]">
                <ArrowRight size={19} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-[35px] flex gap-[15px]">
        {categories[0].children?.map((c) => (
          <Link className="flex items-center gap-3 bg-[var(--color-parchment-50)] px-5 py-[15px] text-[12px]" to={`/explore?category=${c.id}`} key={c.id}>
            {c.name}
            <ArrowRight size={16} />
          </Link>
        ))}
      </div>
    </div>
  );
};
