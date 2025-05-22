/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import tsconfigpaths from 'vite-tsconfig-paths';

export default defineConfig({
    test: {
        coverage: {
            include: [ 'src' ]
        },
        environment: 'jsdom',
        restoreMocks: true,
    },
    plugins: [
        // Automatically resolve paths based on tsconfig.json
        // https://https://vitest.dev/guide/common-errors 
        tsconfigpaths() 
    ]
});
