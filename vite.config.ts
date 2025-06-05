import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/powellkerry.github.io/',
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
