# Plan — Template Premium : Projet de Développement & Programme International

## Contexte
Conception d'un template web premium pour programmes de développement international (UE, AFD, Banque Mondiale, USAID, consortiums ONG). Contraintes contractuelles critiques : visibilité bailleurs, multilingue RTL, performance basse connexion.

## Spécifications Clés
- **3 palettes** : UE Programme (#003399 + #FFCC00), AFD Développement (rouge AFD + vert impact + orange), Neutre International (bleu ONU #009EDB + gris neutre)
- **Tokens métier** : bailleurs, indicateurs cadre logique, composantes programme, badges pays
- **Typographie internationale** : Noto Sans (Latin + Arabe + Cyrillique), fallback system fonts
- **RTL natif** : tous les composants RTL-aware avec LanguageSwitcher
- **Performance** : thème léger < 3KB, PWA-ready

## Étapes

### Stage 1 — Design System & Thématisation (Orchestrateur)
- Créer le design system avec les 3 palettes complètes
- Définir tous les tokens (bailleurs, indicateurs, composantes, pays, langues)
- Documenter le comportement RTL par composant
- **Livrables** : design.md complet

### Stage 2 — Architecture Thème & RTL (Sub-agent)
- Implémenter themes.config.ts (3 thèmes, < 3KB)
- ThemeContext avec RTL awareness
- useTheme.ts (helpers getIndicatorColor, getComponentColor)
- ThemeSwitcher.tsx
- GlobalStyles (direction support)
- tailwind.config.ts (extends avec tokens)
- App.tsx (provider racine)
- **Livrables** : tous les fichiers TS/TSX du système de thème
- **Note technique** : "Support RTL — ce que ça change dans l'implémentation CSS"

### Stage 3 — Génération Assets Visuels (Parallèle)
- Générer images héro pour les 3 thèmes
- Logos bailleurs (UE, AFD, Banque Mondiale, USAID)
- Photos terrain de qualité (bénéficiaires, activités)
- Infographies indicateurs
- Carte zones d'intervention
- **Livrables** : images dans public/assets/

### Stage 4 — Développement Pages Publiques (Sub-agents parallèles)
Basé sur le skill web-template-library, pages requises :
1. **Accueil** — Hero vision + axes intervention + chiffres clés + bailleurs + CTA
2. **Le Projet** — Objectifs, méthodologie, calendrier, budget
3. **Axes d'Intervention** — Santé, éducation, économie, gouvernance, environnement
4. **Résultats** — Indicateurs cadre logique avec visualisations, rapports, témoignages
5. **Partenaires** — Grille consortium avec logos et rôles
6. **Ressources** — Bibliothèque téléchargeable (rapports, études, outils)
7. **Actualités** — Blog, presse, événements
8. **Contact** — Formulaire + kit presse

### Stage 5 — Développement Admin Dashboard (Sub-agent)
- Dashboard admin simplifié
- Gestion indicateurs, rapports, partenaires, actualités
- Tableaux de bord résultats

### Stage 6 — Polish & Déploiement
- SEO Schema.org (Project, Organization, Dataset)
- Hreflang pour multilingue
- WCAG AA accessibility
- Optimisation images basse connexion
- Déploiement

### Stage 7 — Livraison Finale
- Assemblage complet
- Vérification 3 thèmes + RTL
- Déploiement final
