import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                products: 'products/index.html',
                about: 'about/index.html',
                contact: 'contact/index.html',
            }
        }
    }
});
