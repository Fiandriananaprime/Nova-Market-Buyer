import { Search } from 'lucide-react';
import { Empty } from '../../components/shared';
export const NotFound = () => {
  return (
    <div className="container page">
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
