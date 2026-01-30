# Deployment Guide

## Option 1: Static Site (No Database)

Perfect for showcasing workflows without needing a backend.

### Build

```bash
npm run build
```

This creates a `dist/` folder with static files.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or use the Vercel dashboard to import your GitHub repo.

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

Or drag and drop the `dist/` folder to Netlify's web interface.

### Deploy to Cloudflare Pages

1. Push to GitHub
2. Go to Cloudflare Pages dashboard
3. Connect your repository
4. Build command: `npm run build`
5. Output directory: `dist`

## Option 2: Full-Stack with Database

For the complete experience with diagram collection and dynamic content.

### Prerequisites

- PostgreSQL database
- Node.js hosting (Vercel, Railway, Render, etc.)

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```

### Deploy to Vercel (with Database)

**1. Setup Database**

Use Vercel Postgres or external provider (Neon, Supabase, Railway):

```bash
# Vercel Postgres
vercel postgres create
```

**2. Configure Environment**

```bash
vercel env add DATABASE_URL
# Paste your database URL
```

**3. Update `vercel.json`**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install && npm run db:generate && npm run db:push && npm run db:seed"
}
```

**4. Deploy**

```bash
vercel --prod
```

### Deploy to Railway

**1. Create Project**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init
```

**2. Add PostgreSQL**

```bash
railway add --plugin postgresql
```

**3. Configure**

```bash
# Link database
railway variables

# Add DATABASE_URL from the PostgreSQL plugin
```

**4. Deploy**

```bash
railway up
```

### Deploy to Render

**1. Create `render.yaml`**

```yaml
services:
  - type: web
    name: dia
    env: node
    buildCommand: npm install && npm run db:generate && npm run build
    startCommand: npm run preview
    envVars:
      - key: DATABASE_URL
        sync: false

databases:
  - name: dia-db
    databaseName: dia
    user: dia
```

**2. Connect Repository**

1. Go to Render dashboard
2. New → Blueprint
3. Connect your GitHub repo
4. Render will auto-detect `render.yaml`

## Option 3: Docker Deployment

**Dockerfile**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run db:generate
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
```

**Build and Run**

```bash
docker build -t dia .
docker run -p 4173:4173 -e DATABASE_URL="your-db-url" dia
```

**Docker Compose** (with PostgreSQL)

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "4173:4173"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/dia
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=dia
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Static Prerendering

For better performance and SEO, you can prerender static pages.

### Using Vite SSG

**Install**

```bash
npm install -D vite-ssg
```

**Update `vite.config.ts`**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    // Add static generation plugin
  ],
  ssgOptions: {
    format: 'esm',
    entry: './src/main.tsx',
  }
})
```

### Using Nitro (Recommended for SSR/SSG)

If you need full SSR/SSG capabilities, consider migrating to:

1. **Nitro** - Universal server
2. **Next.js** - React framework with SSG
3. **Remix** - Full-stack React framework

For now, Vite builds a performant SPA that works great for your use case.

## Performance Optimization

### Before Deployment

```bash
# Analyze bundle size
npm run build
npx vite-bundle-visualizer

# Optimize images (if you add any)
npm install -D vite-plugin-image-optimizer
```

### CDN Configuration

For static hosting, enable:
- **Gzip/Brotli compression**
- **Cache headers** (immutable for hashed assets)
- **HTTP/2 or HTTP/3**

Example headers for Netlify (`netlify.toml`):

```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Monitoring

### Error Tracking

```bash
npm install @sentry/react
```

### Analytics

```bash
npm install @vercel/analytics
# or
npm install plausible-tracker
```

## Database Migrations

When you update the schema:

```bash
# Development
npm run db:push

# Production (after deploying)
# Run via your hosting platform's CLI or dashboard
railway run npm run db:push
# or
vercel env exec npm run db:push
```

## Scaling Considerations

### Static Site
- ✅ Infinite scale via CDN
- ✅ Zero cost (on free tiers)
- ❌ No dynamic content

### Full-Stack
- ✅ Dynamic diagrams from database
- ✅ Can add user features
- ❌ Needs database management
- ❌ Higher hosting costs

**Recommendation**: Start with static, add database later if needed.

## Domain Setup

### Custom Domain

Most platforms support custom domains:

**Vercel**
```bash
vercel domains add yourdomain.com
```

**Netlify**
- Dashboard → Domain Settings → Add Custom Domain

**Cloudflare Pages**
- Dashboard → Custom Domains → Set up custom domain

All provide free SSL certificates via Let's Encrypt.

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Database Connection Issues

```bash
# Test connection locally
npm run db:generate
npx prisma studio
```

### Environment Variables Not Loading

```bash
# Check .env file exists
cat .env

# Verify in hosting platform
vercel env ls
# or
railway variables
```

## Cost Estimates

### Static Hosting (Free Tier)
- Vercel: Free
- Netlify: Free
- Cloudflare Pages: Free
- GitHub Pages: Free

### Full-Stack
- **Vercel** (Hobby): Free (with limits)
- **Railway** (Starter): $5/month
- **Render** (Free): Free (sleeps after inactivity)
- **Fly.io**: ~$5-10/month
- **Database** (Neon/Supabase): Free tier available

---

**Recommended Setup for Production:**

1. **Hosting**: Vercel (free tier)
2. **Database**: Neon PostgreSQL (free tier)
3. **Domain**: Cloudflare (free DNS + CDN)
4. **Monitoring**: Vercel Analytics (free)

Total Cost: **$0/month** 🎉
