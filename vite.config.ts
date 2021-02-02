import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: 'lib/main.ts',
            name: 'drag-selectjs'
        }
    }
})
