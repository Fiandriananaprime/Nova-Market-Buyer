import { Search } from 'lucide-react';
import { Empty } from '../../components/shared';
export const NotFound = () => {
  return (
    <div className="mx-auto w-[calc(100%-64px)] max-w-[1360px] pt-[49px] pb-[110px] max-[1100px]:w-[calc(100%-48px)] max-[800px]:w-[calc(100%-40px)] max-[800px]:max-w-[720px] max-[800px]:pt-[34px] max-[800px]:pb-[92px] max-[600px]:w-[calc(100%-32px)] max-[600px]:pt-[27px]">
      <Empty
        icon={Search}
        title="Cette page s'est égarée"
        text="Retournons ensemble vers les découvertes."
        to="/"
        action="Retour à l'accueil"
      />
    </div>
  );
};
