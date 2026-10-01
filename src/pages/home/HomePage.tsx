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
      <section className="bg-[var(--color-parchment-50)]">
        <div className="mx-auto grid min-h-[590px] w-[calc(100%-64px)] max-w-[1360px] grid-cols-[51%_49%] max-[800px]:grid-cols-1 max-[800px]:w-[calc(100%-40px)]">
          <div className="flex flex-col justify-center py-20 pr-[6%] pb-[35px] max-[800px]:py-12 max-[800px]:pr-0 max-[800px]:pb-10">
            <span className="mb-[26px] flex items-center gap-[13px] text-[10px] font-extrabold tracking-[0.2em] text-[var(--color-black-800)]">
              <span className="h-px w-7 bg-[var(--color-black-700)]" /> LE MARCHÉ AUTREMENT
            </span>
            <UI.H1 className="mb-[25px] font-['Playfair_Display'] text-[clamp(48px,5vw,78px)] font-normal leading-[1.11] tracking-[-0.05em] max-[800px]:text-[43px]">
              Des découvertes
              <br />
              qui <em className="font-normal text-[var(--color-black-800)]">ont du sens.</em>
            </UI.H1>
            <p className="mb-[29px] max-w-[480px] text-[14px] leading-[1.8] text-[var(--color-ink-body)] max-[800px]:mb-[22px] max-[800px]:text-[12px]">
              Des pièces choisies avec soin, des créateurs passionnés et tout ce
              qui rend le quotidien plus beau. Bienvenue chez vous.
            </p>
            <SearchBox hero />
            <div className="mt-6 flex flex-wrap items-center gap-[25px] max-[800px]:mt-[18px] max-[800px]:gap-[17px]">
              <Link className="inline-flex items-center justify-center gap-[11px] rounded-[4px] bg-[var(--color-smart-blue-950)] px-[19px] py-[13px] text-[12px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-smart-blue-800)] max-[800px]:px-[14px] max-[800px]:py-3" to="/explore">
                Explorer la collection <ArrowRight size={18} />
              </Link>
              <Link className="inline-flex items-center gap-2 border-b border-current pb-1 text-[12px] font-bold max-[800px]:text-[10px]" to="/stores">
                Rencontrer nos boutiques
              </Link>
            </div>
            <div className="mt-[51px] flex flex-wrap gap-7 text-[11px] text-[var(--color-ink-muted)] max-[800px]:mt-[27px] max-[800px]:gap-[17px] max-[800px]:text-[10px]">
              <span className="flex items-center gap-[9px]">
                <ShieldCheck size={18} /> Boutiques vérifiées
              </span>
              <span className="flex items-center gap-[9px]">
                <Truck size={18} /> Livraison partout sur l'île
              </span>
            </div>
          </div>
          <div className="relative min-h-[590px] max-[800px]:min-h-[320px]">
            <img
              className="absolute h-full w-full object-cover object-[center_43%]"
              src={imageUrl(products[0]?.images)}
              alt="Sac artisanal tressé porté avec élégance"
            />
            <div className="absolute top-[25px] right-[25px] left-[25px] flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] text-white [text-shadow:0_1px_8px_var(--color-overlay-text)]">
              <span className="size-1.5 rounded-full bg-[var(--color-black-500)]" /> LA SÉLECTION NOVAMARKET{' '}
              <span className="ml-auto">01 / 03</span>
            </div>
            <div className="absolute right-[-22px] bottom-[35px] flex w-[230px] flex-col items-start bg-white px-[25px] py-[23px] shadow-[0_13px_42px_var(--color-shadow-faint)] max-[800px]:right-[10px]">
              <span className="font-bold text-[10px] tracking-[0.14em] text-[var(--color-black-800)] uppercase">À découvrir</span>
              <strong className="my-[10px] mb-[18px] font-['Playfair_Display'] text-[23px] font-normal leading-[1.2]">
                Des trésors
                <br />
                bien de chez nous.
              </strong>
              <Link className="flex items-center gap-[7px] border-b border-current pb-[3px] text-[11px] font-bold" to="/explore">
                Voir la sélection <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="border-b border-[var(--color-parchment-100)]">
        <div className="mx-auto flex min-h-[76px] w-[calc(100%-64px)] max-w-[1360px] items-center justify-between gap-5 text-[11px] font-bold text-[var(--color-ink-secondary)] max-[800px]:min-h-[63px] max-[800px]:justify-center max-[800px]:gap-2.5 max-[800px]:text-[9px]">
          <span className="flex items-center gap-[9px] [&>svg]:text-[var(--color-black-800)]">
            <Sparkles size={19} /> Sélection faite avec soin
          </span>
          <span className="flex items-center gap-[9px] [&>svg]:text-[var(--color-black-800)]">
            <ShieldCheck size={19} /> Achats en toute confiance
          </span>
          <span className="flex items-center gap-[9px] [&>svg]:text-[var(--color-black-800)] max-[800px]:hidden">
            <Truck size={19} /> Partout à Madagascar
          </span>
          <span className="flex items-center gap-[9px] [&>svg]:text-[var(--color-black-800)] max-[800px]:hidden">
            <Heart size={19} /> Des découvertes à aimer
          </span>
        </div>
      </div>
      <section className="mx-auto w-[calc(100%-64px)] max-w-[1360px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[600px]:w-[calc(100%-32px)] mt-[94px] mb-[95px]">
        <SectionTitle
          eyebrow="POUR CHAQUE ENVIE"
          title="Explorez à votre façon"
          to="/categories"
        />
        <div className="grid grid-cols-6 gap-3.5 max-[1100px]:grid-cols-3 max-[800px]:grid-cols-2">
          {categories.map((category, i) => (
            <Link
              className="group relative min-h-[250px] overflow-hidden bg-[var(--color-parchment-100)]"
              to={`/explore?category=${category.id}`}
              key={category.id}
            >
              <img className="absolute h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" src={category.image} alt="" loading="lazy" />
              <div className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(0deg,var(--color-smart-blue-950),transparent_67%)] p-[18px] text-white">
                <span className="mb-1.5 text-[9px] font-bold tracking-[0.13em]">{String(i + 1).padStart(2, '0')} / COLLECTION</span>
                <strong className="max-w-[150px] font-['Playfair_Display'] text-[20px] font-medium leading-[1.2]">{category.name}</strong>
                <span className="absolute right-[15px] bottom-[18px] grid size-7 place-items-center rounded-full border border-[var(--color-map-road-strong)]">
                  <ArrowRight size={19} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto w-[calc(100%-64px)] max-w-[1360px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[600px]:w-[calc(100%-32px)] mt-[94px] mb-[95px]">
        <SectionTitle
          eyebrow="LE MEILLEUR DU MOMENT"
          title="Nos coups de cœur"
          to="/explore"
        />
        <ProductGrid items={products.slice(0, 4)} />
      </section>
      <section className="mx-auto grid min-h-[470px] w-[calc(100%-64px)] max-w-[1360px] grid-cols-[48%_52%] bg-[var(--color-parchment-50)] max-[800px]:flex max-[800px]:w-[calc(100%-40px)] max-[800px]:flex-col">
        <div className="overflow-hidden max-[800px]:h-[260px]">
          <img
            className="h-full max-h-[480px] w-full object-cover object-[center_60%]"
            src={imageUrl(products[1]?.images)}
            alt="Panier tressé artisanal"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-start px-[11%] py-[65px] max-[800px]:px-[25px] max-[800px]:py-10">
          <span className="mb-3 font-['Manrope'] text-[10px] font-extrabold tracking-[0.19em] text-[var(--color-black-800)] uppercase">DES OBJETS, DES HISTOIRES</span>
          <UI.H2 className="my-3 mb-[22px] font-['Playfair_Display'] text-[clamp(39px,4vw,64px)] font-normal leading-[1.16] tracking-[-0.045em]">
            Le beau a une
            <br />
            <em className="font-normal text-[var(--color-black-800)]">origine.</em>
          </UI.H2>
          <p className="mb-[27px] max-w-[380px] text-[13px] leading-[1.85] text-[var(--color-ink-tertiary)]">
            Derrière chaque pièce, il y a des mains, un savoir-faire et une
            histoire à partager. Prenez le temps de découvrir ce qui la rend
            unique.
          </p>
          <Link className="inline-flex items-center justify-center gap-[11px] rounded-[4px] bg-[var(--color-smart-blue-950)] px-[19px] py-[13px] text-[12px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-smart-blue-800)]" to="/explore?category=artisanat">
            Découvrir l'artisanat <ArrowRight size={17} />
          </Link>
          <span className="mt-auto pt-[30px] text-[9px] font-extrabold tracking-[0.15em] text-[var(--color-parchment-600)] max-[800px]:pt-5">N° 01 — FAIT AVEC INTENTION</span>
        </div>
      </section>
      <section className="mx-auto w-[calc(100%-64px)] max-w-[1360px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[600px]:w-[calc(100%-32px)] mt-[94px] mb-[95px]">
        <SectionTitle
          eyebrow="DES GENS PASSIONNÉS"
          title="Boutiques à rencontrer"
          to="/stores"
          link="Toutes les boutiques"
        />
        <div className="grid grid-cols-3 gap-[22px] max-[800px]:grid-cols-1">
          {stores.map((store) => (
            <StoreCard store={store} key={store.id} />
          ))}
        </div>
      </section>
      <section className="bg-[var(--color-tropical-teal-50)] px-0 py-[67px] max-[800px]:py-[50px]">
        <div className="mx-auto flex w-[calc(100%-64px)] max-w-[1360px] items-center justify-between gap-[30px] max-[800px]:w-[calc(100%-40px)] max-[800px]:flex-col max-[800px]:items-stretch">
          <div>
            <span className="mb-3 font-['Manrope'] text-[10px] font-extrabold tracking-[0.19em] text-[var(--color-black-800)] uppercase">
              UN PEU DE BEAU DANS VOTRE BOÎTE MAIL
            </span>
            <UI.H2 className="mb-[9px] font-['Playfair_Display'] text-[37px] font-normal max-[800px]:text-[32px]">Les belles choses se partagent.</UI.H2>
            <p className="m-0 text-[12px] text-[var(--color-ink-muted)]">
              Une sélection d'inspirations et de nouveautés, à votre rythme.
            </p>
          </div>
          <form
            className="flex min-w-[420px] items-center border border-[var(--color-parchment-200)] bg-white p-[5px] max-[800px]:min-w-0"
            onSubmit={(e) => {
              e.preventDefault();
              notify('Inscription à la newsletter bientôt disponible');
            }}
          >
            <UI.Input
              className="min-w-0 flex-1 border-0 px-[15px] text-[12px] outline-none"
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
