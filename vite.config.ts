import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => ({
    base: mode === 'development' ? '/' : 'https://www.kerrywpowell.com/',
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
}));
