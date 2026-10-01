import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { categories } from "../../lib/mock"
import { PageTitle } from "../../components/shared"
export const CategoriesPage = () => {
  return (
    <div className="container page">
      <PageTitle
        eyebrow="DÉCOUVRIR"
        title="Toutes les catégories"
        description="Une envie précise ou simplement envie de flâner ? Trouvez votre prochaine découverte."
      />
      <div className="category-grid category-page-grid">
        {categories.map((c, i) => (
          <Link
            className={`category-card category-${i}`}
            to={`/explore?category=${c.id}`}
            key={c.id}
          >
            <img src={c.image} alt="" />
            <div className="category-overlay">
              <span>{c.count} PRODUITS</span>
              <strong>{c.name}</strong>
              <span className="category-arrow">
                <ArrowRight size={19} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="subcategories">
        {categories[0].children?.map((c) => (
          <Link to={`/explore?category=${c.id}`} key={c.id}>
            {c.name}
            <ArrowRight size={16} />
          </Link>
        ))}
      </div>
    </div>
  )
}
