# ÉcoWatt — Réduire votre facture d'électricité

ÉcoWatt est une application web interactive qui aide les utilisateurs à surveiller et réduire leur consommation d'électricité. Elle offre un tableau de bord visuel, un gestionnaire d'appareils, un calculateur de facture et des conseils d'économie personnalisés.

## Fonctionnalités

- **Tableau de bord** : Vue d'ensemble de la consommation mensuelle, du coût estimé, du budget et des économies potentielles avec graphiques interactifs (répartition par catégorie, consommation mensuelle)
- **Gestionnaire d'appareils** : Ajoutez, modifiez et supprimez vos appareils électriques. Catalogue d'appareils types (réfrigérateur, lave-linge, climatiseur…). Calcul automatique de la consommation en kWh et coût mensuel par appareil.
- **Calculateur de facture** : Choisissez parmi les tarifs EDF/marché français ou saisissez votre propre tarif. Définissez votre budget mensuel cible. Visualisez des scénarios de réduction de 5% à 30%.
- **Conseils d'économie** : 20+ conseils organisés par catégorie (chauffage, cuisine, lavage, éclairage, électronique, tarification). Filtrés par niveau de difficulté (Facile / Moyen / Effort), avec économies estimées pour chaque action.

## Technologies utilisées

| Couche | Technologie |
|--------|-------------|
| Framework | TanStack Start (React 19 + TanStack Router v1) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Graphiques | Chart.js + react-chartjs-2 |
| Icônes | Lucide React |
| Persistance | localStorage (données utilisateur côté client) |
| Déploiement | Netlify |

## Démarrage local

```bash
npm install
npm run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000).

## Construction pour la production

```bash
npm run build
```
