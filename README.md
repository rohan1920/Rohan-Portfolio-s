# Rohan Majeed Portfolio

High-fidelity clone of modern portfolio website.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Clear cache (Windows)
npm run clean:win
```

## Note on 404 Errors in Dev Mode

The 404 errors you see in the terminal for `/_next/static/chunks/*` are **normal** in Next.js development mode. They occur when:
- The dev server is rebuilding chunks
- Hot reload is updating modules
- Font files are being optimized

**These are NOT actual errors** - your site is working correctly. The main page loads successfully (`GET / 200`).

If you want to minimize them:
1. Wait for the initial compilation to complete
2. Avoid rapid file saves
3. The errors will stop once all chunks are built

## Customization

Edit `lib/constants.ts` to update:
- `NAME` - Your name
- `ROLE` - Your role/title
- `CONTACT` - Your email

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
