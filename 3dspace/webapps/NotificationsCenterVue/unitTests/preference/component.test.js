import { config, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { createFilteredConsoleError } from '../functions/WarningHandler';
import { setup } from '../functions/setup';

import BasePreferences from '~/components/BaseCenter/BasePreferences.vue';
import AppGlobalSetting from '~/components/BaseCenter/CenterBody/Preferences/App/AppGlobalSetting.vue';
import AppSettingOption from '~/components/BaseCenter/CenterBody/Preferences/App/AppSettingOption.vue';
import GlobalApp from '~/components/BaseCenter/CenterBody/Preferences/GlobalApp.vue';
import PreferencesHome from '~/components/BaseCenter/CenterBody/Preferences/PreferencesHome.vue';
import { Setting } from '~/models/setting';
import useSettingsStore from '~/stores/settings';

const { initDriver, init } = setup();

vi.mock('~/functions/utils', async () => {
  const actual = await vi.importActual('~/functions/utils');
  return {
    ...actual, // Keep all other functions
    getDateMergeFormat: vi.fn(() => Promise.resolve('Mocked Date')),
  };
});

describe('component initialisation', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = createFilteredConsoleError(originalError);
    try {
      setActivePinia(createPinia());
      initDriver();
      init();
    }
    catch (error) {
      console.log(error);
    }
  });
  beforeEach(() => {
    config.global.directives = {
      'click-outside': { },
      'mask': { },
      'tooltip': { },
      'focus': {},
    };
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('basePreferences', () => {
    const wrapper = mount(BasePreferences);
    const settingStore = useSettingsStore();
    settingStore.setAppSettingOpened(true);
    settingStore.setWindoShow('PREFERENCES');
    expect(wrapper.exists())
      .toBe(true);

    const app = wrapper.find('[data-testid="base-preferences-go-back"]');
    app.trigger('click');
    expect(settingStore.appSettingOpened)
      .toBe(false);
    expect(settingStore.getWindowShow())
      .toBe('PREFERENCES');
    app.trigger('click');

    expect(settingStore.getWindowShow())
      .toBe('CENTER');
  });

  it('preferencesHome', () => {
    const wrapper = mount(PreferencesHome);

    expect(wrapper.exists())
      .toBe(true);
  });

  it('globalApp', async () => {
    const wrapper = mount(GlobalApp, {
      props: {
        setting: new Setting({
          id: 11,
          name: 'GLOBAL',
          serviceName: '3DDashboard',
          service: 'X3DDASH_AP',
          icon: 'https://euw1-devprol42-apps.3dx-staging.3ds.com:443/enovia/widget/images/MyApps/X3DDASH_AP_AppIcon.svg',
          subscribe: 1,
          notif_by_ui: 1,
          notif_by_email: 0,
          notif_by_browser: 0,
          unsubscribe_date: null,
        }),
      },
    });

    expect(wrapper.exists())
      .toBe(true);
    const app = wrapper.find('[data-testid="global-app-container"]');
    expect(app.exists());

    await app.trigger('click');

    const settingStore = useSettingsStore();
    expect(settingStore.currentSetting)
      .toBe(11);
    expect(settingStore.appSettingOpened)
      .toBe(true);
  });

  it('appGlobalSetting', () => {
    const wrapper = mount(AppGlobalSetting, { props: { settingId: 11 } });
    expect(wrapper.exists())
      .toBe(true);
  });

  it('appSettingOption', () => {
    const option = { name: 'email', fonticonName: 'fonticon-mail' };
    const wrapper = mount(AppSettingOption, { props: { settingId: 10, option } });

    expect(wrapper.exists())
      .toBe(true);
  });
});
