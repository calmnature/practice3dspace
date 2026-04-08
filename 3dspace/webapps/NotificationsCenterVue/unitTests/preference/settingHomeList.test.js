import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { computed, ref } from 'vue';

import { setup } from '../functions/setup';

import SettingHomeList from '~/components/BaseCenter/CenterBody/Preferences/SettingHomeList.vue';
import { useSettingHomeList } from '~/composables/preferences/useSettingHomeList';
import useSettingsStore from '~/stores/settings';

const { initDriver, init } = setup();

vi.mock('~/functions/utils', async () => {
  const actual = await vi.importActual('~/functions/utils');
  return {
    ...actual, // Keep all other functions
    getDateMergeFormat: vi.fn(() => Promise.resolve('Mocked Date')),
  };
});

function setSetting(settingId, { state, alertReadOnly, emailReadOnly, browserReadOnly }) {
  const settingStore = useSettingsStore();
  const setting = computed(() => settingStore.getSetting(settingId.value));

  setting.value.updateTheSettings = () => { };
  if (state !== undefined)
    setting.value.setEnable(state);
  if (alertReadOnly !== undefined)
    setting.value.set_notif_by_uiReadOnly(alertReadOnly);
  if (emailReadOnly !== undefined)
    setting.value.set_notif_by_emailReadOnly(emailReadOnly);
  if (browserReadOnly !== undefined)
    setting.value.set_notif_by_browserReadOnly(browserReadOnly);
}

describe('settingHomeList test', () => {
  beforeAll(() => {
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
    const settingStore = useSettingsStore();

    settingStore.setWindoShow('PREFERENCES');
  });
  it('init', () => {
    const wrapper = mount(SettingHomeList, { props: { settingId: 11 } });

    expect(wrapper.exists())
      .toBe(true);
  });
  it('composable getListOption in platformPreferences', () => {
    const settingId = ref(10);
    const settingStore = useSettingsStore();
    settingStore.setWindoShow('PLATFORM_PREFERENCES');

    const { getListOption } = useSettingHomeList(settingId);
    const array = getListOption();
    expect(array.length)
      .toBe(1);
    expect(array[0].name)
      .toBe('email');
  });
  it('composable getListOption with setting enable', () => {
    const settingId = ref(10);
    setSetting(settingId, { state: true });

    const { getListOption } = useSettingHomeList(settingId);
    const array = getListOption();
    expect(array.length)
      .toBe(4);
  });
  it('composable getListOption with setting disable without readOnly', () => {
    const settingId = ref(10);
    setSetting(settingId, { state: false, alertReadOnly: false, emailReadOnly: false, browserReadOnly: false });

    const { getListOption } = useSettingHomeList(settingId);
    const array = getListOption();
    expect(array.length)
      .toBe(0);
  });
  it('composable getListOption with setting disable with readOnly', () => {
    const settingId = ref(10);
    setSetting(settingId, { state: false, alertReadOnly: true, emailReadOnly: true, browserReadOnly: true });

    const { getListOption } = useSettingHomeList(settingId);
    const array = getListOption();
    expect(array.length)
      .toBe(3);
  });
});
