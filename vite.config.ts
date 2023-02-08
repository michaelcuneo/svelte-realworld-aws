import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	server: {
		https: true
	},
	plugins: [sveltekit(), mkcert()],
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis' // <-- AWS SDK
			}
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
});
