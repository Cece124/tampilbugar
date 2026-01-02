# Deployment Guide - Tampil Bugar Cashier Mockup

This guide explains how to deploy the mockup for demonstration purposes.

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Easiest and fastest deployment**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Scope: Select your account
   - Link to existing project? **N**
   - Project name: **tampilbugar-cashier**
   - Directory: **.**
   - Override settings? **N**

4. Your app is live! Vercel will provide a URL like:
   `https://tampilbugar-cashier.vercel.app`

**Production deployment:**
```bash
vercel --prod
```

### Option 2: Netlify

1. Build the project:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Deploy:
```bash
netlify deploy
```

4. For production:
```bash
netlify deploy --prod
```

**Or use Netlify Drop:**
- Go to https://app.netlify.com/drop
- Drag and drop the `dist` folder
- Get instant deployment URL

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update vite.config.js:
```js
export default defineConfig({
  plugins: [react()],
  base: '/tampilbugar/'  // Your repo name
})
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages in repo settings:
   - Settings → Pages
   - Source: gh-pages branch
   - URL: `https://username.github.io/tampilbugar/`

### Option 4: Docker (For Self-Hosting)

1. Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Create `.dockerignore`:
```
node_modules
dist
.git
*.log
```

3. Build and run:
```bash
docker build -t tampilbugar-cashier .
docker run -p 8080:80 tampilbugar-cashier
```

Access at: http://localhost:8080

### Option 5: Local Development Server

**For quick local demos:**

```bash
# Development server (with hot reload)
npm run dev

# Preview production build
npm run build
npm run preview
```

---

## 🚀 Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test the production build locally (`npm run preview`)
- [ ] Verify all screens work correctly
- [ ] Test on different screen sizes
- [ ] Check print functionality
- [ ] Ensure no console errors
- [ ] Update any hardcoded URLs if needed
- [ ] Set correct base URL in vite.config.js (if needed)

---

## 🔧 Environment Configuration

### Production Environment Variables (if needed later)

Create `.env.production`:
```env
VITE_API_URL=https://api.tampilbugar.com
VITE_APP_NAME=Tampil Bugar Cashier
```

Access in code:
```js
const apiUrl = import.meta.env.VITE_API_URL
```

**Note:** This mockup doesn't use environment variables yet, but you'll need them for production with real API integration.

---

## 📊 Performance Optimization

The build is already optimized, but for even better performance:

1. **Enable Compression** (on your server):
   - Gzip/Brotli compression
   - Most platforms (Vercel, Netlify) do this automatically

2. **CDN** (Content Delivery Network):
   - Vercel and Netlify include CDN automatically
   - For self-hosting, consider Cloudflare

3. **Caching**:
   - Static assets are already cache-busted with hashes
   - Configure long cache times on your server

---

## 🔒 Security Notes

**For Mockup:**
- No sensitive data - safe to deploy publicly
- No authentication required
- No backend connections

**For Production (Future):**
- [ ] Implement authentication
- [ ] Set up HTTPS (SSL certificate)
- [ ] Configure CORS properly
- [ ] Secure API endpoints
- [ ] Environment variable management
- [ ] Rate limiting
- [ ] Input validation

---

## 📱 Mobile/Tablet Access

Once deployed, access from any device:
- 📱 Mobile: Open URL in mobile browser
- 📲 Tablet: Open URL in tablet browser
- 💻 Desktop: Open URL in any browser

The app is fully responsive and works on all devices!

---

## 🎯 Sharing the Mockup

### For Client Review
1. Deploy to Vercel/Netlify (get public URL)
2. Share the URL
3. Provide QUICKSTART.md instructions
4. Gather feedback

### For Team Review
1. Deploy to staging environment
2. Share credentials if needed
3. Schedule demo session
4. Use FEATURES.md as demo script

### For Testing
1. Deploy to test environment
2. Run through complete workflows
3. Test on various devices
4. Document any issues

---

## 🛠️ Troubleshooting

### Build Fails
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Blank Page After Deploy
- Check browser console for errors
- Verify `base` URL in vite.config.js
- Ensure all routes use relative paths

### CSS Not Loading
- Check that CSS file is in dist/assets
- Verify PostCSS and Tailwind configs
- Clear browser cache

### 404 on Refresh (SPA routing)
For Netlify, create `public/_redirects`:
```
/*    /index.html   200
```

For Vercel, it's automatic.

---

## 📈 Monitoring (Future)

For production, consider:
- **Analytics**: Google Analytics, Plausible
- **Error Tracking**: Sentry, LogRocket
- **Performance**: Lighthouse CI, Web Vitals
- **Uptime**: UptimeRobot, Pingdom

---

## 🔄 Continuous Deployment

### Auto-deploy on Git Push

**Vercel:**
1. Link GitHub repo in Vercel dashboard
2. Auto-deploys on every push to main

**Netlify:**
1. Link GitHub repo in Netlify dashboard
2. Configure build settings
3. Auto-deploys on every push

**GitHub Actions Example:**
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 💡 Tips

1. **Use Vercel or Netlify** for quickest deployment
2. **Keep the URL simple** for easy sharing
3. **Deploy to staging first** before showing clients
4. **Test on real devices** after deployment
5. **Monitor performance** on different networks
6. **Gather analytics** on how users interact
7. **Keep mockup separate** from production deploy

---

## 🎉 Quick Deploy (1 minute)

**Fastest way to get online:**

```bash
# Install Vercel CLI (first time only)
npm install -g vercel

# Deploy (from project root)
vercel
```

Done! You'll get a URL instantly.

---

## 📞 Support

If you encounter deployment issues:
1. Check the platform's documentation (Vercel/Netlify/etc.)
2. Review build logs for errors
3. Test locally first (`npm run build && npm run preview`)
4. Ensure all dependencies are in package.json

---

## ✅ Post-Deployment

After successful deployment:
- [ ] Test all features on live site
- [ ] Check mobile responsiveness
- [ ] Verify print functionality works
- [ ] Share URL with stakeholders
- [ ] Gather feedback
- [ ] Document any issues
- [ ] Plan next iteration

---

**Remember:** This is a mockup/prototype. For production deployment with real backend, you'll need additional setup for API integration, authentication, database connections, and payment processing.

Enjoy your deployed mockup! 🚀
