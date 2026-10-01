import { PageTitle, StoreCard, useShop } from '../../components/shared';
export const StoresPage = () => {
  const { stores } = useShop();
  return (
    <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
      <PageTitle
        eyebrow="DERRIÈRE CHAQUE OBJET"
        title="Rencontrez nos boutiques"
        description="Des passionnés, des univers singuliers et des découvertes à partager."
      />
      <div className="grid grid-cols-3 gap-[22px] max-[800px]:grid-cols-1">
        {stores.map((s) => (
          <StoreCard key={s.id} store={s} />
        ))}
      </div>
    </div>
  );
};
