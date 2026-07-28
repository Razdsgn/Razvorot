# 🚀 Installation & Deployment Guide

## Quick Install (5 minutes)

### Windows
1. Open Command Prompt in the project folder
2. Double-click `setup.bat` OR run:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:3000

### Mac/Linux
1. Open Terminal in the project folder
2. Run:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   npm run dev
   ```
3. Open http://localhost:3000

## File Structure

```
modern-portfolio/
├── app/
│   ├── layout.tsx       ← SEO, metadata, root layout
│   ├── page.tsx         ← Main page with all sections
│   └── globals.css      ← Styles and animations
├── components/
│   ├── navbar.tsx       ← Navigation with mobile menu
│   └── lenis-provider.tsx ← Smooth scrolling
├── public/              ← PUT YOUR IMAGES HERE
├── package.json         ← Dependencies
├── tailwind.config.ts   ← Theme colors
├── tsconfig.json        ← TypeScript settings
├── next.config.mjs      ← Next.js config
├── postcss.config.js    ← PostCSS config
├── setup.bat            ← Windows installer
└── setup.sh             ← Mac/Linux installer
```

## Customization Priority

### 1. MUST CHANGE (5 min)
- [ ] Your name in `/app/page.tsx` line 200
- [ ] Your email in `/app/page.tsx` line 550
- [ ] Your location in `/app/page.tsx` line 205

### 2. IMPORTANT (10 min)
- [ ] Job titles in `/app/page.tsx` line 32
- [ ] Bio paragraph in `/app/page.tsx` line 270
- [ ] Add 3+ projects in `/app/page.tsx` line 45
- [ ] Social media links in `/app/page.tsx` line 570

### 3. RECOMMENDED (15 min)
- [ ] Profile images (3 images)
- [ ] Project images
- [ ] Skills lists
- [ ] Awards section
- [ ] Contact phone number

### 4. OPTIONAL (30+ min)
- [ ] Colors in `tailwind.config.ts`
- [ ] SEO metadata in `/app/layout.tsx`
- [ ] Animation speeds
- [ ] Add new sections

## Deployment Options

### Option 1: Vercel (Easiest - 2 minutes)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repo
   - Click "Deploy"
   - Done! You'll get a URL like: yourname.vercel.app

### Option 2: Netlify (5 minutes)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy on Netlify**
   - Go to https://netlify.com
   - Drag and drop the `.next` folder
   - OR connect your GitHub repo
   - Build command: `npm run build`
   - Publish directory: `.next`

### Option 3: Custom Domain (10 minutes)

1. **Deploy with any option above**
2. **Add custom domain**
   - In Vercel/Netlify dashboard
   - Go to Settings → Domains
   - Add your domain
   - Update DNS records (they'll show you what to do)

### Option 4: Own Server

```bash
# Build
npm run build

# Start production server
npm start

# Or use PM2 for production
npm install -g pm2
pm2 start npm --name "portfolio" -- start
```

## Environment Setup

### Node.js Version
- Minimum: Node.js 18+
- Recommended: Node.js 20+
- Check: `node --version`

### Package Manager
```bash
# npm (comes with Node.js)
npm install

# OR yarn
yarn install

# OR pnpm
pnpm install
```

## Adding Your Images

### Option 1: Local Images (Recommended)

1. **Add images to `/public` folder**
   ```
   /public
     ├── profile1.jpg
     ├── profile2.jpg
     ├── profile3.jpg
     ├── project1.jpg
     └── award1.jpg
   ```

2. **Reference in code**
   ```typescript
   images: [
     "/profile1.jpg",
     "/project1.jpg",
   ]
   ```

### Option 2: External URLs

Use any image hosting:
- Unsplash: `https://images.unsplash.com/photo-...`
- Cloudinary: `https://res.cloudinary.com/...`
- ImgBB: Upload and get URL

```typescript
images: [
  "https://images.unsplash.com/photo-123456",
]
```

## Connecting to Your GitHub Repo

```bash
# In your project folder
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/Razdsgn/Cv.git
git push -u origin main
```

## Performance Optimization

### Images
```bash
# Install sharp for better image optimization
npm install sharp

# Images will auto-optimize on build
```

### Fonts
Already optimized with Next.js font optimization

### Lighthouse Score Tips
1. Compress images to WebP
2. Add alt text to all images
3. Use `next/image` (already implemented)
4. Keep animations under 60fps

## Testing Before Deploy

```bash
# Build production version locally
npm run build

# Test production build
npm start

# Check at http://localhost:3000
```

## Common Issues & Fixes

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Images not showing
- Check path starts with `/`
- Verify images are in `/public`
- Check browser console for errors

### Build fails
```bash
# Check for syntax errors
npm run build

# Clear Next.js cache
rm -rf .next
npm run build
```

### Animations not working
- Ensure all dependencies installed
- Check browser console
- Try different browser

## Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all
npm update

# Update specific package
npm install framer-motion@latest
```

## Analytics (Optional)

### Add Google Analytics

In `/app/layout.tsx`, add:

```typescript
export default function RootLayout() {
  return (
    <html>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'YOUR-GA-ID');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Security Best Practices

1. **Never commit sensitive data**
   - Create `.env.local` for secrets
   - Add to `.gitignore`

2. **Update dependencies regularly**
   ```bash
   npm audit
   npm audit fix
   ```

3. **Use environment variables**
   ```
   NEXT_PUBLIC_API_URL=https://api.example.com
   ```

## Backup Your Work

```bash
# Create backup
git add .
git commit -m "Backup before changes"
git push
```

## Get Help

1. **Check documentation**
   - README.md
   - QUICK_START.md
   - FEATURES.md

2. **Common errors**
   - Google the error message
   - Check Next.js docs
   - Check component comments

3. **Test locally first**
   - Always test changes locally
   - Build before deploying
   - Check browser console

## Next Steps After Deploy

1. ✅ Test on mobile devices
2. ✅ Test in different browsers
3. ✅ Run Lighthouse audit
4. ✅ Share with friends for feedback
5. ✅ Add to resume/LinkedIn
6. ✅ Submit to portfolio sites
7. ✅ Update regularly with new projects

---

## Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Utilities
npm run lint         # Check code quality
```

## Support Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Support](https://vercel.com/support)

---

**You're all set! Deploy and impress! 🚀**
