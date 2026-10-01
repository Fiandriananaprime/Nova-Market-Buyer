import { PageTitle, StoreCard, useShop } from "../../components/shared"
export const StoresPage = () => {
  const { stores } = useShop()
  return (
    <div className="container page">
      <PageTitle
        eyebrow="DERRIÈRE CHAQUE OBJET"
        title="Rencontrez nos boutiques"
        description="Des passionnés, des univers singuliers et des découvertes à partager."
      />
      <div className="store-grid store-page-grid">
        {stores.map((s) => (
          <StoreCard key={s.id} store={s} />
        ))}
      </div>
    </div>
  )
}
