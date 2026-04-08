import { URL, fileURLToPath } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';

// import { readFileSync } from 'fs';
// import { resolve } from 'path';
import { version } from './package.json';
// import { homedir } from 'os';

process.env.VITE_BUILD_ID = Date.now();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['NODE', 'VITE']);
  const port = env.NODE_LOCALHOST_PORT || 8888;
  const baseUrl = env.NODE_PUBLIC_BASE_PATH || '/';
  // const host = env.NODE_LOCALHOST_URL;
  process.env.VITE_BASE_URL = baseUrl;
  return {
    test: {
      setupFiles: ['./unitTests/functions/setups.js'],
      globals: true,
      environment: 'jsdom',
      deps: {
        inline: ['@ds/platformkit'],
      },
      coverage: {
        provider: 'istanbul', // or 'v8'
        reporter: ['text', 'html'],
      },
      /* browser: {
        enabled: true, // ✔ needed for Vitest UI coverage
        provider: playwright(),
        instances: [ // 👈 REQUIRED in Vitest 2
          {
            browser: 'chromium', // chromium | firefox | webkit
          },
        ],
      }, */
server: {
    deps: {
      inline: ['@ds/platformkit'],
    },
  },
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // define: process.env.VITEST ? {} : { global: 'window' },
    base: baseUrl,
    build: {
      lib: {
        //
      },
      rollupOptions: {
        external: ['vue', 'pinia', 'vueuse'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    server: {
      // host: host,
      port,
      // https: {
      //   key:
      //     env.NODE_SSL_KEY_PATH &&
      //     readFileSync(resolve(env.NODE_SSL_KEY_PATH.replace('~', homedir()) || '') || 'key.pem'),
      //   cert:
      //     env.NODE_SSL_CER_PATH &&
      //     readFileSync(resolve(env.NODE_SSL_CER_PATH.replace('~', homedir()) || '') || 'cer.pem'),
      // },
      // proxy: {
      //   '/webapps': {
      //     target: env.VITE_SWYM_URL,
      //     changeOrigin: true,
      //   },
      // },
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
    },
    plugins: [vue({ reactivityTransform: true })],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
        'vue': 'vue/dist/vue.esm-bundler.js',
        'vuekit': '@ds/vuekit/dist/VUEKIT.umd.cjs',
      },
    },
    define: {
      _NODE_VITE_ENV_: env,
      _VERSION_: JSON.stringify(version),
    },
  };
});
