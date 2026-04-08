import { config } from '@vue/test-utils';
import { createApp } from 'vue';
import Vuekit from 'vuekit';

// Configure Vuekit une seule fois pour tous les tests
const app = createApp({});
app.use(Vuekit, { globalRegister: true });

// Polyfill ResizeObserver
globalThis.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {}
  unobserve() {}
  disconnect() {}
};

// Polyfill IntersectionObserver
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};

// Copie tous les composants enregistrés dans la config globale des tests
Object.assign(config.global.components, app._context.components);
