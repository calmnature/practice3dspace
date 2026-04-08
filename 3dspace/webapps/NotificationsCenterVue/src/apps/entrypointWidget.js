import '@ds/vuekit/dist/VUEKIT.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import Vuekit from 'vuekit';

import '~/assets/NotificationCenter.css';

// Provide papi_driver or mock_driver depending on the environment mode.
import App from '~/App.vue';
import driver from '~/api/drivers/commonDriver';
import { responseHandler } from '~/api/responseHandlers';
import {
  getServices,
  getSettings,
  getSocketStatus,
  getTenantAgnosticMode,
  getTenants,
  resetBadge,
} from '~/api/senders';
import { translationsPromiseSetup } from '~/composables/useTranslations';
import requirejs from '~/modules/require';

/**
 * Creates and mounts the Vue app.
 * @param {HTMLElement} container - HTML element.
 */
async function mount(container, app) {
  requirejs(['css!DS/UIKIT/UIKIT']);
  await translationsPromiseSetup;
  app.mount(container);
}

/**
 * Loads the specified app after a given delay.
 *
 * @param {Function} app - The app to be loaded.
 * @param {object} widget - The widget object.
 * @returns {Promise<void>}
 */
async function loadApp(app, widget) {
  widget.initFlag = true;
  const div = document.createElement('div');
  div.setAttribute('id', 'INTFCenter-app');

  document.body.innerHTML = '';
  document.body.appendChild(div);
  document.documentElement.style.fontSize = 'inherit';
  await mount(div, app);
}

/**
 * Setups and launches the 3DNotification Center widget.
 * @param {UWA.Widget} widget - Widget UWA.
 * https://uwa.netvibes.com/docs/Uwa/html/Widget.UWA.Widget.html.
 */
async function startWidget(widget, app) {
  //   let currentTenantUrl = widget.getValue<string>('url') || ''
  widget.onRefresh = function () {
    window.location.reload();
  };

  widget.onLoad = async function () {
    widget.initFlag = false;
    widget.counterRequest = 0;
    widget.maxRequest = 5;
    driver.init(widget);
    await driver.addCallback(responseHandler);
    await initAppData();
    await loadApp(app, widget);
  };

  widget.launch();
}

/**
 * Sets the application settings.
 * This function retrieves the tenants and services, and resets the badge count.
 */
function initAppData() {
  // Get the tenants and services
  return Promise.allSettled([
    getServices(),
    getSocketStatus(),
    resetBadge({ notifCenterOpened: true }),
    getTenants(),
    getTenantAgnosticMode(),
    getSettings(),
  ]);
}

(() => {
  if (window.widget === undefined || window.widget === null)
    throw new Error('No widget found');
  const widget = window.widget;
  // -----------------------------------------
  const app = createApp(App);
  app.use(Vuekit, { globalRegister: true });
  app.use(createPinia());
  // Pinia store must be activated before starting the widget
  // -----------------------------------------
  startWidget(widget, app);
})();
