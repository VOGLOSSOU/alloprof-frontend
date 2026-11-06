# AlloProf — Identité visuelle

La référence pour tout ce qui porte la marque AlloProf : applications, affiches, maquettes, réseaux sociaux.

- Couleurs en version machine : [`tokens.json`](tokens.json)
- Logo : dossier [`logos/`](logos/)
- Dans le frontend, ces valeurs vivent dans `app/globals.css`. Si une couleur change, mettre à jour les deux endroits.

## Couleurs

| Rôle | Nom | Hex | Usage |
|---|---|---|---|
| Primaire | Pétrole | `#0F5C63` | Boutons principaux, logo, navigation active, liens |
| Accent | Ambre | `#F2A93B` | Petites touches : icônes, mises en avant |
| Fond | Blanc cassé | `#FAF8F3` | Fond des pages et des supports |
| Surface | Blanc | `#FFFFFF` | Cartes |
| Texte | Presque noir | `#14292B` | Titres et texte courant |
| Texte secondaire | Gris pétrole | `#566769` | Descriptions, légendes |
| Surface douce | Sable | `#F2EFE7` | Zones discrètes |
| Teinte | Pétrole clair | `#E3EFEF` | Survol, élément actif |
| Bordure | Sable foncé | `#E5E1D8` | Contours, séparateurs |

## Règles

1. **Jamais de texte blanc sur l'ambre** : il est illisible (contraste 2,0:1). Sur l'ambre, le texte est `#14292B`.
2. **L'ambre reste un accent.** Pas de bouton principal ni de grand aplat ambre dans l'application, pour ne pas le confondre avec les badges orange (« Suspendue », « En attente »). Une affiche peut l'utiliser plus largement.
3. **Les couleurs de statut ne sont pas des couleurs de marque.** Le bleu, le vert, l'orange et le rouge sont réservés aux badges de statut de l'application (voir `03-ECRANS-ET-PARCOURS.md`, section 1).

## Contrastes mesurés (WCAG)

| Texte sur fond | Ratio | Convient pour |
|---|---|---|
| Blanc sur pétrole | 7,69:1 | Tout texte |
| Texte `#14292B` sur blanc cassé | 14,32:1 | Tout texte |
| Pétrole sur blanc cassé | 7,24:1 | Tout texte |
| Gris pétrole sur blanc cassé | 5,59:1 | Tout texte |
| Texte `#14292B` sur ambre | 7,61:1 | Tout texte |
| Ambre sur pétrole | 3,85:1 | Icônes et grands titres seulement |
| Blanc sur ambre | 2,00:1 | **À proscrire** |

## Logo

Le logo est un **symbole carré, sans écriture** : une toque de professeur au-dessus d'un combiné de téléphone. Il réunit le prof et l'appel, et l'ensemble évoque un visage souriant coiffé d'une toque.

| Fichier (`logos/`) | Usage |
|---|---|
| `symbole.svg`, `symbole.png` | Usage principal : site, favicon, photo de profil, affiches sur fond clair |
| `symbole-sur-petrole.svg`, `symbole-sur-petrole.png` | Fonds pétrole |
| `apercu.png` | Vue d'ensemble |
| `logo.svg`, `logo-sur-petrole.svg`, `logo.png`, `logo-sur-petrole.png` | Ancien logo en toutes lettres, plus utilisé sur le site |

- Préférer le SVG. Les PNG font 1024 px, avec un fond transparent aux coins.
- Dans l'en-tête du site, le symbole est suivi du nom « AlloProf » en texte (Geist semi-gras).
- Ne pas changer les couleurs, ne pas déformer, et laisser autour du symbole un espace au moins égal à un quart de sa largeur.

## Typographie

- **Geist** pour tout le texte, **Geist Mono** pour les codes et les chiffres alignés (ex. le code du jour). **Sora Bold** ne sert qu'à l'ancien logo en toutes lettres. Toutes sont gratuites (licence OFL), disponibles sur Google Fonts.
- Titres en semi-gras, texte courant en normal.

## Formes

Coins arrondis (rayon de base 10 px, cartes un peu plus), fonds clairs, peu d'images : la plupart des utilisateurs sont sur téléphone, parfois avec une connexion lente.

## Écriture

Pas de tiret long (`—`, `–`) dans les textes visibles : utiliser `-` ou `:`.
