import { ref, unref } from 'vue';

import nls from '../../assets/nls/feed_en.json';

import requirejs from '~/modules/require';

const i18n = ref({});

/**
 * Load translations.
 * @param {string} filename the nls file name, @default 'feed'
 * @param {string} path the DS AMDLoader path, @default 'i18n!DS/NotificationsCenterVue/assets/nls'
 * @returns A promise that resolve with i18n value.
 */
async function loadTranslations(filename = 'feed', path = 'i18n!DS/NotificationsCenterVue/assets/nls/') {
  try {
    const [result] = await requirejs([`${path}${filename}`]);
    i18n.value = Object.assign(unref(i18n), result);
  }
  catch (error) {
    console.error(`Error loading nls ${path}${filename}, using local nls.`);
    i18n.value = Object.assign(unref(i18n), nls);
  }
  return i18n.value;
}

const translationsPromiseSetup = loadTranslations();

/**
 * Use translations hosted in /assets/nls/**.json. It will return the i18n ref object and a $i18n function.
 * @warn Translation are download from network, so i18n object might be empty!
 * Use the `promise` to await for the download to be done
 */
function useTranslations() {
  const $i18n = (key, values = {}) => {
    let value = unref(i18n)[key] || '';
    Object.entries(values)
      .forEach(([key, val]) => {
        value = value.replace(`{${key}}`, val);
      });
    return value;
  };

  return { i18n, $i18n };
}

export default useTranslations;

export { translationsPromiseSetup };
