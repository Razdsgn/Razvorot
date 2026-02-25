# 🎯 Quick Customization Guide

Get your portfolio up and running in 15 minutes!

## Step 1: Install (2 minutes)

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Step 2: Update Personal Info (5 minutes)

### In `/app/page.tsx`:

**Line 200-240 - Hero Section:**
```typescript
<h1>YOUR NAME</h1>  // Change to your name
<p>Based in Your Location</p>  // Your location
```

**Lines 30-35 - Job Titles:**
```typescript
const roles = [
  "Your Primary Title",
  "Your Second Title",
  "Your Third Title",
];
```

**Lines 270-280 - Bio:**
Replace with your actual bio.

**Lines 540-560 - Contact:**
```typescript
your@email.com
+1 (123) 456-7890
Based in Your City
```

## Step 3: Add Your Projects (5 minutes)

### In `/app/page.tsx` around line 45:

```typescript
const projects = [
  {
    slug: "your-project-slug",
    title: "Your Project Name",
    description: "What you did for this project...",
    images: [
      "https://your-image-url.com/image1.jpg",
      "https://your-image-url.com/image2.jpg",
    ],
    liveUrl: "https://your-live-site.com",
    behanceUrl: "https://behance.net/gallery/your-project",
    awards: [
      {
        name: "Award Organization",
        awards: ["Award 1", "Award 2"],
        href: "https://award-site.com/your-project",
      },
    ],
  },
  // Copy and paste for more projects
];
```

## Step 4: Update Images (3 minutes)

### Two options:

**Option A: Use your own images**
1. Put images in `/public` folder
2. Reference as: `/image-name.jpg`

**Option B: Use Unsplash (quick)**
Go to https://unsplash.com and copy image URLs
Use format: `https://images.unsplash.com/photo-...`

## Quick Edits Checklist

- [ ] Name and location
- [ ] Job titles
- [ ] Bio paragraph  
- [ ] Profile images (3 images in hero)
- [ ] At least 3 projects with images
- [ ] Contact email and phone
- [ ] Social media links
- [ ] Skills list (soft & hard)
- [ ] Awards section (optional)
- [ ] Statistics numbers

## Optional Customizations

### Change Colors

In `/tailwind.config.ts`:
```typescript
colors: {
  background: "#0a0a0a",  // Your background color
  foreground: "#ffffff",  // Your text color
}
```

### Update SEO

In `/app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Your Name - Your Title",
  description: "Your description...",
};
```

### Social Links

In `/app/page.tsx` around line 570:
```typescript
["LinkedIn", "Behance", "Instagram"].map((social) => (
  <a href={`https://${social.toLowerCase()}.com/yourusername`}>
```

## Deploy (Easiest)

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Go to vercel.com
3. Import your GitHub repo
4. Click Deploy
5. Done! ✅

### Option 2: Netlify
1. Push code to GitHub  
2. Go to netlify.com
3. New site from Git
4. Select your repo
5. Deploy! ✅

## 🎨 Where Everything Is

| What | File | Line |
|------|------|------|
| Name & Bio | `/app/page.tsx` | 200-280 |
| Projects | `/app/page.tsx` | 45-120 |
| Contact Info | `/app/page.tsx` | 540-560 |
| Job Titles | `/app/page.tsx` | 30-35 |
| Colors | `/tailwind.config.ts` | 10-15 |
| Navigation | `/components/navbar.tsx` | 15-25 |
| SEO/Meta | `/app/layout.tsx` | 10-40 |

## Need Help?

**Images not showing?**
- Check the path starts with `/` for local images
- Verify external URLs are working

**Can't find where to edit something?**
- Use Cmd/Ctrl + F to search in your code editor
- Most content is in `/app/page.tsx`

**Want to change animation speed?**
Search for `duration: 0.6` and change the number (higher = slower)

---

**That's it! Your modern portfolio is ready to impress! 🚀**
