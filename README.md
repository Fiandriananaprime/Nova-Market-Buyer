# NovaMarket Buyer

NovaMarket Buyer est l'interface web destinée aux clients de NovaMarket, une
marketplace mettant en avant des produits, des créateurs et des boutiques
indépendantes de Madagascar.

L'application permet notamment de :

- découvrir des produits et des catégories ;
- explorer les boutiques partenaires ;
- consulter les détails d'un produit ou d'une boutique ;
- gérer ses favoris et son panier ;
- simuler un parcours de commande et de livraison ;
- gérer son compte, ses adresses et ses préférences.

## Propriétaire

Ce projet appartient à **Fiandriananaprime**, son propriétaire et responsable.

## Technologies utilisées

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React

## Structure du projet

```text
src/
├── components/   # Composants réutilisables et shell de l'application
├── imports/      # Images et ressources graphiques
├── lib/          # Données de démonstration et primitives UI
├── pages/        # Pages regroupées par domaine fonctionnel
├── App.tsx       # Composition principale de l'application
├── main.tsx      # Point d'entrée
└── routes.tsx    # Définition des routes
```

Les pages sont regroupées par catégorie dans `src/pages/` :

- `home` : page d'accueil ;
- `catalog` : catégories, exploration et favoris ;
- `product` : détail d'un produit ;
- `store` : liste et détail des boutiques ;
- `cart` : panier et validation de commande ;
- `order` : commandes et suivi ;
- `account` : espace personnel ;
- `auth` : authentification ;
- `system` : notifications et pages système.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Vérification et build

```bash
npm run build
```

Le projet utilise actuellement des données de démonstration locales. Les
services backend pourront être branchés ultérieurement lorsque l'API
NovaMarket sera disponible.
