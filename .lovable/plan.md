## Goal
Make the project deployable on Vercel instead of Cloudflare Workers, so your linked Vercel deployment serves the site instead of returning 404.

## Why it's 404 now
The template's build (`@lovable.dev/vite-tanstack-config`) targets Cloudflare Workers via Nitro. Vercel receives the build output but doesn't find the routing manifest it expects, so every path returns `NOT_FOUND`.

## Changes

### 1. Switch Nitro build target to Vercel
Update `vite.config.ts` to override the Nitro preset:

```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: { server: { entry: "server" } },
  nitro: { preset: "vercel-edge" },
});
```

`vercel-edge` keeps the edge runtime (closest to Workers, so existing server functions/SSR keep working). If we hit Node-only dependency issues during Vercel's build, fall back to `vercel` (Node serverless) as a second attempt.

### 2. Environment variables on Vercel (you do this in the Vercel dashboard)
Add these in Vercel → Project → Settings → Environment Variables (Production + Preview):

- `VITE_SUPABASE_URL` = `https://jfoodhgpsehnlvdkprhw.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY` = `sb_publishable_gDOL8i0yq6dPrW2DJV6IfA_TaJGi_kZ`
- `SUPABASE_URL` = same as above
- `SUPABASE_PUBLISHABLE_KEY` = same publishable key

These are required because Vercel doesn't inherit Lovable's injected env. Without them the contact form / payment proof server functions will fail at runtime.

### 3. Backend stays on Lovable Cloud
Your database, storage, and auth keep running on Lovable Cloud (Supabase). Only the **frontend + server functions** move to Vercel. Form submissions still write to the same database.

### 4. Redeploy on Vercel
After the config change lands, Vercel will auto-redeploy from your linked Git repo. The 404 should resolve.

## Caveats
- Server functions that use `requireSupabaseAuth` will continue to work, but realtime/auth flows assume same-origin — that's fine because Vercel will serve everything from your Vercel domain.
- File uploads (payment screenshots) go to Lovable Cloud storage via the publishable key — no Vercel-specific change needed.
- If `vercel-edge` build fails on a dependency, I'll switch the preset to `vercel` and redeploy.

## Out of scope
- No code/UI changes.
- No DB migration.
- No changes to forms or wallet addresses.

Ready to apply the config change when you approve.