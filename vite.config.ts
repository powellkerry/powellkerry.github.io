import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: 'https://www.kerrywpowell.com/',
    plugins: [react()],
    css: {
        postcss: './postcss.config.js',
    },
    server: {
        open: true,
    },
    build: {
        outDir: 'docs',
    },
});
