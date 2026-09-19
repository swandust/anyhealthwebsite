import { defineConfig, type Plugin } from 'vite';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';

const root = __dirname;

/** Inlines `<!-- @include partials/xxx.html -->` markers into every page. */
function includePartials(): Plugin {
  return {
    name: 'include-partials',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(/<!--\s*@include\s+([\w./-]+)\s*-->/g, (_m, file) =>
          readFileSync(resolve(root, file), 'utf-8'),
        );
      },
    },
  };
}

/** Dev-server rewrite so clean URLs (/about, /blog/slug) resolve to .html files, matching Vercel's cleanUrls. */
function cleanUrls(): Plugin {
  return {
    name: 'clean-urls',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = (req.url ?? '/').split('?')[0];
        if (url !== '/' && !url.includes('.')) {
          const candidate = url.replace(/\/$/, '') + '.html';
          if (existsSync(resolve(root, candidate.slice(1)))) req.url = candidate;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [includePartials(), cleanUrls()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        about: resolve(root, 'about.html'),
        contact: resolve(root, 'contact.html'),
        privacy: resolve(root, 'privacy.html'),
        blog: resolve(root, 'blog.html'),
        'blog-ai-agents': resolve(root, 'blog/healthcare-ai-2026-chatbots-to-ai-agents.html'),
        'blog-ai-trust': resolve(root, 'blog/can-healthcare-ai-be-trusted.html'),
        'blog-ai-clinics': resolve(root, 'blog/ai-for-clinics-what-practices-need.html'),
        'blog-whatsapp': resolve(root, 'blog/whatsapp-chatbot-for-clinics-and-hospitals.html'),
        'blog-noshows': resolve(root, 'blog/reduce-no-shows-appointment-reminders.html'),
        'blog-multibranch': resolve(root, 'blog/ai-for-multi-branch-clinic-chains.html'),
        'blog-ambulance': resolve(root, 'blog/non-emergency-ambulance-coordination.html'),
        'blog-crm': resolve(root, 'blog/healthcare-crm-patient-engagement.html'),
      },
    },
  },
});
