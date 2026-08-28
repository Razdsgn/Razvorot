# 🎨 Portfolio Raman Khaniakou

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer)

**Portfolio personnel et CV interactif pour développeur full-stack**

[🌐 Voir le site en ligne](https://razvorot8.netlify.app/) • [📦 Code source](https://github.com/Razdsgn/Razvorot.git)

</div>

---

## 📋 Table des matières

- [À propos](#-à-propos)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🎬 Animations & Interactions](#-animations--interactions)
- [🏗️ Structure](#️-structure)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🛠️ Technologies](#️-technologies)
- [📱 Sections du site](#-sections-du-site)
- [🎯 Personnalisation](#-personnalisation)
- [📄 Licence](#-licence)

---

## 🎯 À propos

Portfolio moderne et minimaliste conçu pour Raman Khaniakou, développeur full-stack spécialisé en Symfony/PHP basé à Rennes, France. Le design s'inspire de l'esthétique **Editorial Mono** de [Cuberto](https://cuberto.com) avec une approche épurée : fond blanc, encre noire, un seul accent de couleur, et des animations fluides qui captivent sans distraire.

### Pourquoi ce portfolio ?

- ✅ **Design épuré et professionnel** — mise en page minimaliste qui met en valeur le contenu
- ✅ **Animations fluides** — interactions subtiles et engageantes avec Framer Motion
- ✅ **Performance optimale** — construit avec Next.js 15 et optimisé pour le SEO
- ✅ **Accessible** — respect des standards WCAG, support de `prefers-reduced-motion`
- ✅ **Facile à personnaliser** — tout le contenu centralisé dans un seul fichier

---

## ✨ Fonctionnalités

### 🎨 Design moderne

- **Interface minimaliste** — blanc pur, noir profond, un seul accent de couleur (lime)
- **Typographie cinétique** — révélations de texte animées et fluides
- **Curseur personnalisé** — effet `mix-blend-mode: difference` avec étiquettes contextuelles
- **Panneaux arrondis** — sections avec coins arrondis pour un look éditorial

### 🎭 Interactions avancées

- **Boutons magnétiques** — les CTA suivent subtilement le curseur avec physique à ressort
- **Défilement fluide** — propulsé par Lenis pour une expérience de navigation douce
- **Marquees bidirectionnelles** — bande de technologies défilant dans des directions opposées
- **Badge flottant** — bouton de contact avec texte en orbite, toujours visible

### 🚀 Performance & Accessibilité

- **Preloader intelligent** — compteur 0→100 au premier chargement (ignoré pour `prefers-reduced-motion`)
- **Responsive** — adaptation parfaite du mobile au desktop
- **SEO optimisé** — métadonnées, structure sémantique, performances
- **Focus visible** — navigation au clavier complète avec indicateurs clairs

---

## 🎬 Animations & Interactions

| Fonctionnalité | Description | Composant |
|----------------|-------------|-----------|
| **Preloader** | Compteur plein écran (0 → 100) au premier chargement | `components/ui/Preloader.tsx` |
| **Curseur custom** | Cercle avec `mix-blend-mode`, grandit avec label au survol | `components/ui/Cursor.tsx` |
| **Boutons magnétiques** | CTAs qui suivent le curseur avec physique à ressort | `components/ui/Magnetic.tsx` |
| **Révélation de texte** | Titres masqués qui glissent vers le haut au défilement | `components/ui/RevealText.tsx` |
| **Défilement fluide** | Lenis + Framer Motion `whileInView` | Intégré globalement |
| **Marquees** | Deux rangées de technos défilant en sens inverse | Section Tech Stack |
| **Badge contact** | Circulaire, fixe en bas à droite, texte en rotation | Fixé sur toutes les pages |

---

## 🏗️ Structure

```
Razvorot/
├── app/                      # App Router Next.js 15
│   ├── globals.css          # Styles globaux
│   ├── layout.tsx           # Layout racine
│   ├── page.tsx             # Page d'accueil
│   └── styles/
│       └── variables.css    # Design tokens (couleurs, rayons, easing)
├── components/
│   ├── sections/            # Sections de la page
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   ├── Stats.tsx
│   │   ├── Experience.tsx
│   │   └── CTA.tsx
│   └── ui/                  # Composants réutilisables
│       ├── Cursor.tsx
│       ├── Preloader.tsx
│       ├── Magnetic.tsx
│       ├── RevealText.tsx
│       └── Accordion.tsx
├── lib/
│   └── content.ts           # ⭐ Tout le contenu du site (textes, projets, FAQ)
├── public/                  # Assets statiques
├── tailwind.config.ts       # Configuration Tailwind
└── package.json
```

---

## 🚀 Installation

### Prérequis

- **Node.js** 18.17 ou supérieur
- **npm** ou **yarn**

### Étapes

1. **Cloner le dépôt**

```bash
git clone https://github.com/Razdsgn/Razvorot.git
cd Razvorot
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Lancer le serveur de développement**

```bash
npm run dev
```

4. **Ouvrir dans le navigateur**

```
http://localhost:3000
```

### Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Crée le build de production |
| `npm start` | Lance le serveur de production |
| `npm run lint` | Vérifie le code avec ESLint |

---

## ⚙️ Configuration

### Installation automatisée (Windows)

Pour Windows, utilisez le script batch :

```bash
setup.bat
```

### Installation automatisée (Linux/Mac)

Pour Linux/Mac, utilisez le script shell :

```bash
chmod +x setup.sh
./setup.sh
```

---

## 🛠️ Technologies

<table>
  <tr>
    <td align="center" width="150">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="48" height="48" alt="Next.js"/>
      <br><strong>Next.js 15</strong>
      <br><sub>App Router</sub>
    </td>
    <td align="center" width="150">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="48" height="48" alt="React"/>
      <br><strong>React 18</strong>
      <br><sub>Server Components</sub>
    </td>
    <td align="center" width="150">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript"/>
      <br><strong>TypeScript 5</strong>
      <br><sub>Mode strict</sub>
    </td>
    <td align="center" width="150">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="48" height="48" alt="Tailwind"/>
      <br><strong>Tailwind CSS</strong>
      <br><sub>Utility-first</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="150">
      <img src="https://www.framer.com/images/favicons/apple-touch-icon.png" width="48" height="48" alt="Framer Motion"/>
      <br><strong>Framer Motion</strong>
      <br><sub>Animations</sub>
    </td>
    <td align="center" width="150">
      <img src="https://avatars.githubusercontent.com/u/139895814" width="48" height="48" alt="Lenis"/>
      <br><strong>Lenis</strong>
      <br><sub>Smooth scroll</sub>
    </td>
    <td align="center" width="150">
      <img src="https://lucide.dev/apple-touch-icon.png" width="48" height="48" alt="Lucide"/>
      <br><strong>Lucide React</strong>
      <br><sub>Icônes</sub>
    </td>
    <td align="center" width="150">
      <img src="https://www.netlify.com/v3/img/components/netlify-light.svg" width="120" height="48" alt="Netlify"/>
      <br><strong>Netlify</strong>
      <br><sub>Hébergement</sub>
    </td>
  </tr>
</table>

---

## 📱 Sections du site

### 1. 🦸 Hero
- Badge de disponibilité
- Révélation du nom avec animation
- Texte de rôle en rotation
- Bio courte
- Double CTA

### 2. 🔧 Tech Stack
- Marquee à deux rangées
- Défilement infini dans des directions opposées
- Pause au survol

### 3. 💼 Services ("Ce que je fais")
- Liste en rangées (index / titre / description+tags / flèche)
- Layout inspiré de "What we do" de Cuberto

### 4. 🎨 Projets ("Réalisations sélectionnées")
- Grille asymétrique (1 grand + 2 moyens)
- Coins arrondis
- Zoom au survol + révélation de flèche
- Placeholders de gradient pour projets sans screenshot

### 5. 📊 Stats ("Pourquoi moi")
- Compteurs animés (comptent au défilement)
- Liste de points forts
- Chiffres clés

### 6. 📚 Parcours
- Timeline à deux colonnes (expérience / éducation)
- Graphique de niveaux de langues animé

### 7. ❓ FAQ
- Accordéon de questions fréquentes
- Composant `Accordion` réutilisable
- Animation fluide

### 8. 📞 CTA Panel
- Panneau noir arrondi
- Grand titre "Prenez contact"
- Lien email géant avec soulignement au survol
- Formulaire de contact compact
- Footer intégré

---

## 🎯 Personnalisation

### Modifier le contenu

**Tout le contenu** (bio, rôles, stack technique, projets, expérience, éducation, FAQ, infos de contact) se trouve dans un seul fichier :

```typescript
lib/content.ts
```

Ouvrez ce fichier et modifiez les valeurs. Exemple :

```typescript
export const contact = {
  name: "Votre Nom",
  email: "votre@email.com",
  phone: "+33 6 XX XX XX XX",
  location: "Votre Ville, France",
  availability: "Disponible",
};
```

### Modifier les couleurs

Les design tokens sont centralisés dans :

```css
app/styles/variables.css
```

Modifiez les variables CSS :

```css
:root {
  --color-accent: 203 100% 50%; /* Couleur d'accent principale */
  --color-bg: 0 0% 100%;        /* Fond blanc */
  --color-fg: 0 0% 5%;          /* Texte noir */
  --color-muted: 0 0% 40%;      /* Gris atténué */
}
```

### Modifier la typographie

Ajustez l'échelle de type dans :

```typescript
tailwind.config.ts
```

### Ajouter un projet

Dans `lib/content.ts`, ajoutez un objet dans le tableau `projects` :

```typescript
{
  title: "Mon Nouveau Projet",
  description: "Description courte",
  tags: ["React", "Node.js"],
  image: "/images/mon-projet.jpg", // Ou laissez vide pour un gradient
  link: "https://mon-projet.com"
}
```

Pour un guide complet, consultez **[QUICK_START.md](./QUICK_START.md)**.

---

## 📂 Documentation complète

- **[FEATURES.md](./FEATURES.md)** — Liste détaillée de toutes les fonctionnalités et interactions
- **[INSTALLATION.md](./INSTALLATION.md)** — Guide d'installation approfondi
- **[QUICK_START.md](./QUICK_START.md)** — Guide de personnalisation pas à pas

---

## 🌐 Déploiement

Le site est déployé sur **Netlify** avec déploiement continu depuis GitHub :

🔗 **[razvorot8.netlify.app](https://razvorot8.netlify.app/)**

### Déployer votre propre version

1. Forkez ce dépôt
2. Créez un compte sur [Netlify](https://www.netlify.com/)
3. Connectez votre dépôt GitHub
4. Configurez les paramètres de build :
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Déployez !

---

## 📸 Aperçu

> **Visitez le site en ligne pour voir toutes les animations en action :**  
> 🌐 **[razvorot8.netlify.app](https://razvorot8.netlify.app/)**

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Si vous souhaitez améliorer ce projet :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 👤 Auteur

**Raman Khaniakou**

- 🌐 Portfolio : [razvorot8.netlify.app](https://razvorot8.netlify.app/)
- 💼 GitHub : [@Razdsgn](https://github.com/Razdsgn)
- 📧 Email : Disponible sur le site

---

## 🙏 Remerciements

- Design inspiré par [Cuberto](https://cuberto.com)
- Animations propulsées par [Framer Motion](https://www.framer.com/motion/)
- Défilement fluide avec [Lenis](https://github.com/darkroomengineering/lenis)
- Icônes par [Lucide](https://lucide.dev/)

---

<div align="center">

**⭐ Si ce projet vous a aidé, n'hésitez pas à lui donner une étoile !**

Made with ❤️ and ☕ by Raman Khaniakou

</div>
