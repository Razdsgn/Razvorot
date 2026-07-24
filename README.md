# 🚀 Modern Award-Winning Portfolio

A stunning, modern portfolio website featuring smooth animations, parallax effects, magnetic buttons, and award-winning design patterns inspired by the best portfolios on the web.

## ✨ Features

### 🎨 Visual & Animation Features
- **Smooth Scrolling** - Lenis for buttery-smooth scroll experiences
- **Advanced Animations** - Framer Motion for sophisticated micro-interactions
- **Magnetic Buttons** - Interactive hover effects that follow cursor
- **Rotating Text** - Animated job title rotations
- **Scroll-Triggered Animations** - Content reveals as you scroll
- **Image Parallax** - Smooth image transitions on hover
- **Expandable Project Cards** - Award sections that expand/collapse
- **Animated Statistics** - Numbers that count up on scroll

### 📱 Technical Features
- **Responsive Design** - Perfect on all devices
- **Dark Theme** - Sophisticated dark mode with gradients
- **Mobile Menu** - Smooth slide-in navigation
- **SEO Optimized** - Full meta tags and OpenGraph
- **Performance Optimized** - Next.js 15 with Image optimization
- **TypeScript** - Full type safety
- **Accessibility** - ARIA labels and keyboard navigation

## 🎯 Sections Included

1. **Hero Section**
   - Animated rotating job titles
   - Large name display
   - Profile image gallery
   - Magnetic CTA buttons
   - Scroll indicator

2. **Statistics Section**
   - Animated counting numbers
   - Grid layout
   - Auto-triggers on scroll

3. **About Section**
   - Experience timeline
   - Education history
   - Two-column responsive layout

4. **Work Portfolio**
   - Project cards with image galleries
   - Multi-image navigation
   - Expandable award sections
   - Live preview links
   - Behance integration

5. **Awards Section**
   - Grid showcase
   - Hover animations
   - Image thumbnails

6. **Skills Section**
   - Soft skills tags
   - Hard skills (tools)
   - Animated tag appearance

7. **Contact Section**
   - Email, phone, location
   - Social media links
   - Professional contact info

8. **Footer**
   - Copyright notice
   - Professional tagline

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. **Clone or download the files**
   ```bash
   # If using git
   git clone [your-repo-url]
   cd modern-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 📝 Customization Guide

### 1. Personal Information

Edit `/app/page.tsx` and update:

```typescript
// Hero Section
<h1>YOUR NAME</h1>
<p>Based in Your Location</p>

// Bio
Winner of the world's most prestigious web design awards...

// Contact
your@email.com
+1 (123) 456-7890
```

### 2. Job Titles

Update the rotating text array:

```typescript
const roles = [
  "Creative Art Director",
  "Creative Designer",
  "Your Custom Title",
  "Another Title",
];
```

### 3. Add Your Projects

Replace the projects array with your work:

```typescript
const projects = [
  {
    slug: "project-slug",
    title: "Project Title",
    description: "Brief description of the project and what you did...",
    images: [
      "/path/to/image1.jpg",
      "/path/to/image2.jpg",
      "/path/to/image3.jpg",
    ],
    liveUrl: "https://project-url.com",
    behanceUrl: "https://behance.net/gallery/your-project",
    awards: [
      {
        name: "Awwwards",
        awards: ["Site of the Day", "Developer Award"],
        href: "https://awwwards.com/sites/your-project",
      },
      {
        name: "CSS Design Awards",
        awards: ["UI Design", "UX Design", "Innovation"],
        href: "https://cssdesignawards.com/sites/your-project",
      },
    ],
  },
  // Add more projects...
];
```

### 4. Update Statistics

Edit the stats section:

```typescript
<AnimatedStat end={27} label="Awards Won" suffix="+" />
<AnimatedStat end={40} label="Projects Completed" suffix="+" />
<AnimatedStat end={5} label="Years Experience" suffix="+" />
<AnimatedStat end={100} label="Client Satisfaction" suffix="%" />
```

### 5. Add Your Images

**Option 1: Local Images**
1. Place images in `/public` folder
2. Reference as: `/image-name.jpg`

**Option 2: External URLs**
Use any image hosting service (Unsplash, Cloudinary, etc.)

### 6. Update Skills

Edit the skills object:

```typescript
const skills = {
  soft: [
    "Art Direction",
    "Leadership",
    "Your Skill",
    // Add more...
  ],
  hard: [
    "Figma",
    "Photoshop",
    "Your Tool",
    // Add more...
  ],
};
```

### 7. Social Links

Update in the contact section:

```typescript
["LinkedIn", "Behance", "Dribbble", "Instagram", "Twitter"].map((social) => (
  <a href={`https://${social.toLowerCase()}.com/yourusername`}>
    {social}
  </a>
))
```

### 8. Colors

Edit `/tailwind.config.ts`:

```typescript
colors: {
  background: "#0a0a0a",  // Main background
  foreground: "#ffffff",  // Text color
  muted: "#9ca3af",      // Secondary text
  border: "rgba(255, 255, 255, 0.1)", // Borders
}
```

### 9. SEO & Metadata

Update `/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Your Title",
  description: "Your bio...",
  openGraph: {
    images: ["/your-og-image.jpg"],
  },
  twitter: {
    creator: "@yourusername",
  },
};
```

## 🎨 Customization Tips

### Changing Animation Speed

In components, adjust Framer Motion `duration`:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }} // Change this
/>
```

### Adjusting Smooth Scroll

Edit `/components/lenis-provider.tsx`:

```typescript
const lenis = new Lenis({
  duration: 1.2,  // Scroll duration (higher = slower)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
```

### Adding New Sections

1. Create a new section in `/app/page.tsx`
2. Add to navbar in `/components/navbar.tsx`
3. Use the `useInView` hook for scroll animations:

```typescript
const [ref, isInView] = useInView({ threshold: 0.2 });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 60 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
>
  Your content
</motion.div>
```

## 📦 File Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main homepage with all sections
│   └── globals.css         # Global styles & animations
├── components/
│   ├── navbar.tsx          # Animated navigation
│   └── lenis-provider.tsx  # Smooth scroll wrapper
├── public/                 # Your images go here
├── tailwind.config.ts      # Tailwind configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript config
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project to Vercel
3. Deploy automatically

### Netlify
1. Push code to GitHub
2. New site from Git
3. Build command: `npm run build`
4. Publish directory: `.next`

### Custom Server
```bash
npm run build
npm start
```

## 🔧 Troubleshooting

**Animations not smooth?**
- Ensure Lenis is installed: `npm install @studio-freight/lenis`
- Check browser console for errors

**Images not loading?**
- Verify images are in `/public` folder
- Check paths start with `/`
- For external URLs, ensure CORS is enabled

**Mobile menu not working?**
- Clear browser cache
- Check Framer Motion is installed

**TypeScript errors?**
- Run `npm install` again
- Check all imports are correct

## 🎓 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 License

This template is free to use for personal portfolios.

## 🙏 Credits

Design inspired by award-winning portfolios including amirmohseni.com

## 💡 Pro Tips

1. **Images**: Use WebP format for better performance
2. **Fonts**: Consider using variable fonts for smoother animations
3. **Performance**: Run Lighthouse audits regularly
4. **Analytics**: Add Google Analytics in `layout.tsx`
5. **Forms**: Consider using Formspree or similar for contact forms

## 🐛 Common Issues

**"Module not found" error?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build fails?**
- Check all image paths
- Verify all imports
- Run `npm run build` locally first

**Slow animations?**
- Reduce Lenis duration
- Simplify Framer Motion transitions
- Optimize images

---

**Ready to impress? 🚀**

Update your content, deploy, and watch your portfolio shine!

For questions or issues, check the code comments or create an issue in your repo.
