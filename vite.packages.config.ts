import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        // 用来标记别名路径引入
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'lib',
      cssCodeSplit: false,
      lib: {
        entry: 'packages/components/menu-search-modal/index.ts',
        name: 'MenuSearchModal',
        // fileName: (format) => `index.${format}.js`,
        fileName: () => 'index.js',
        formats: ['es'],
      },
      emptyOutDir: false,
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }
})
