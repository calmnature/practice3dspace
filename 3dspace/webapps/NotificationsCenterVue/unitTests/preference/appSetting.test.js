import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { computed, ref } from 'vue';

import { setup } from '../functions/setup';

import AppSetting from '~/components/BaseCenter/CenterBody/Preferences/App/AppSetting.vue';
import { useAppSetting } from '~/composables/preferences/App/useAppSetting';
import useSettingsStore from '~/stores/settings';

vi.mock('~/composables/useTranslations', () => ({
  default: () => ({
    $i18n: key => key,
  }),
}));

function setSetting(settingId, { state, readOnly, optionState, optionReadOnly }, globalEnable = true) {
  const settingStore = useSettingsStore();
  const setting = computed(() => settingStore.getSetting(settingId));

  const parentSetting = computed(() => settingStore.getSettingGroup(setting.value));
  parentSetting.value.updateTheSettings = () => { };
  parentSetting.value.setEnable(globalEnable);

  setting.value.updateTheSettings = () => { };
  setting.value.setEnable(state);
  setting.value.setReadOnly(readOnly);
  setting.value.set_notif_by_emailEnabled(optionState);
  setting.value.set_notif_by_emailReadOnly(optionReadOnly);
}

function resultAppSetting(settingId, expectedResult) {
  const {
    hideToggle,
    displaySetting,
    needDropDown,
    settingOffClass,
    optionOffClass,
  } = useAppSetting({ settingId });
  expect(hideToggle.value)
    .toBe(expectedResult.hideToggle);
  expect(displaySetting.value)
    .toBe(expectedResult.displaySetting);
  expect(needDropDown.value)
    .toBe(expectedResult.needDropDown);
  if (expectedResult.settingOff !== undefined) {
    expect(settingOffClass.value)
      .toBe(expectedResult.settingOff ? 'INTFCenter-preference-appname-off' : '');
  }
  if (expectedResult.optionOff !== undefined) {
    expect(optionOffClass({ name: 'email' }))
      .toBe(expectedResult.optionOff ? 'INTFCenter-preference-appname-off' : '');
  }
}

const { initDriver, init } = setup();
describe('appSetting test', () => {
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

  it('init composant', () => {
    const wrapper = mount(AppSetting, { props: { settingId: 10 } });
    expect(wrapper.exists())
      .toBe(true);
  });

  it('composable with setting enable', () => {
    const settingId = ref(10);

    setSetting(settingId.value, { state: true, readOnly: false, optionState: false, optionReadOnly: false });

    resultAppSetting(settingId, { hideToggle: false, displaySetting: true, needDropDown: false, settingOff: false, optionOff: false });
  });

  it('composable with setting forced', () => {
    const settingId = ref(10);

    setSetting(settingId.value, { state: false, readOnly: true, optionState: false, optionReadOnly: false });

    resultAppSetting(settingId, { hideToggle: false, displaySetting: true, needDropDown: false, settingOff: true, optionOff: false });
  });
  it('composable with option forced', () => {
    const settingId = ref(10);

    setSetting(settingId.value, { state: false, readOnly: false, optionState: false, optionReadOnly: true });

    resultAppSetting(settingId, { hideToggle: false, displaySetting: true, needDropDown: true });
  });

  it('composable with setting enable and global disabled', () => {
    const settingId = ref(10);

    setSetting(settingId.value, { state: true, readOnly: false, optionState: false, optionReadOnly: false }, false);

    resultAppSetting(settingId, { hideToggle: false, displaySetting: false, needDropDown: false, settingOff: true, optionOff: false });
  });

  it('composable with setting forced and global disabled', () => {
    const settingId = ref(10);

    setSetting(settingId.value, { state: false, readOnly: true, optionState: false, optionReadOnly: false }, false);

    resultAppSetting(settingId, { hideToggle: false, displaySetting: true, needDropDown: false, settingOff: true, optionOff: false });
  });
  it('composable with setting not forced, option forced and global disabled', () => {
    const settingId = ref(10);

    setSetting(settingId.value, { state: false, readOnly: false, optionState: false, optionReadOnly: true }, false);

    resultAppSetting(settingId, { hideToggle: true, displaySetting: true, needDropDown: true, settingOff: true, optionOff: true });
  });

  it('composable in PlatformPreferences with setting enable', () => {
    const settingId = ref(10);
    const settingStore = useSettingsStore();
    settingStore.setWindoShow('PLATFORM_PREFERENCES');

    setSetting(settingId.value, { state: true, readOnly: false, optionState: false, optionReadOnly: false });

    resultAppSetting(settingId, { hideToggle: false, displaySetting: true, needDropDown: true, settingOff: false, optionOff: false });
    settingStore.setWindoShow('PREFERENCES');
  });

  it('composable in PlatformPreferences with setting forced', () => {
    const settingId = ref(10);
    const settingStore = useSettingsStore();
    settingStore.setWindoShow('PLATFORM_PREFERENCES');

    setSetting(settingId.value, { state: false, readOnly: true, optionState: false, optionReadOnly: false });

    resultAppSetting(settingId, { hideToggle: false, displaySetting: true, needDropDown: true, settingOff: false, optionOff: false });
    settingStore.setWindoShow('PREFERENCES');
  });
  it('composable in PlatformPreferences with option forced', () => {
    const settingId = ref(10);
    const settingStore = useSettingsStore();
    settingStore.setWindoShow('PLATFORM_PREFERENCES');

    setSetting(settingId.value, { state: false, readOnly: false, optionState: false, optionReadOnly: true });

    resultAppSetting(settingId, { hideToggle: false, displaySetting: true, needDropDown: true, settingOff: false, optionOff: false });
    settingStore.setWindoShow('PREFERENCES');
  });

  it('composable in PlatformPreferences with setting enable and global disabled', () => {
    const settingId = ref(10);
    const settingStore = useSettingsStore();
    settingStore.setWindoShow('PLATFORM_PREFERENCES');

    setSetting(settingId.value, { state: true, readOnly: false, optionState: false, optionReadOnly: false }, false);

    resultAppSetting(settingId, { hideToggle: false, displaySetting: true, needDropDown: true, settingOff: false, optionOff: false });
    settingStore.setWindoShow('PREFERENCES');
  });

  it('composable in PlatformPreferences with setting forced and global disabled', () => {
    const settingId = ref(10);
    const settingStore = useSettingsStore();
    settingStore.setWindoShow('PLATFORM_PREFERENCES');

    setSetting(settingId.value, { state: false, readOnly: true, optionState: false, optionReadOnly: false }, false);

    resultAppSetting(settingId, { hideToggle: false, displaySetting: true, needDropDown: true, settingOff: false, optionOff: false });
    settingStore.setWindoShow('PREFERENCES');
  });
  it('composable in PlatformPreferences with setting not forced, option forced and global disabled', () => {
    const settingId = ref(10);
    const settingStore = useSettingsStore();
    settingStore.setWindoShow('PLATFORM_PREFERENCES');

    setSetting(settingId.value, { state: false, readOnly: false, optionState: false, optionReadOnly: true }, false);

    resultAppSetting(settingId, { hideToggle: false, displaySetting: true, needDropDown: true, settingOff: false, optionOff: false });
    settingStore.setWindoShow('PREFERENCES');
  });

  it('composable chevron update', () => {
    const settingId = ref(10);

    setSetting(settingId.value, { state: false, readOnly: false, optionState: false, optionReadOnly: true });

    const {
      isOpen,
      handleChevronUpdate,
    } = useAppSetting({ settingId });
    expect(isOpen.value)
      .toBe(false);
    handleChevronUpdate(true);
    expect(isOpen.value)
      .toBe(true);
  });
});
