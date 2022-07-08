/// <reference types="vitest" />

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
    test: {
      globals: true,
      environment: 'jsdom',
      transformMode: {
        web: [/.[tj]sx$/],
      },
      deps: {
        inline: [
          'ant-design-vue',
        ],
      },
    },
  }
})
