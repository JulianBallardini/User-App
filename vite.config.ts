import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,jsx,tsx}'],
    exclude: [
      'src/app/components/user-app/user-app.ts',
      'src/app/components/user-form/user-form.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test-setup.ts', '**/*.d.ts'],
    },
  },
  define: {
    global: 'globalThis',
  },
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Permissions-Policy': 'interest-cohort=(), camera=(), microphone=(), geolocation=()',
    },
  },
  optimizeDeps: {
    include: [
      '@angular/core',
      '@angular/common',
      '@angular/platform-browser',
      '@angular/router',
      '@ngrx/store',
      '@ngrx/effects',
      'rxjs',
    ],
  },
});
