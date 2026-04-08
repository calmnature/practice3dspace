import { computed, ref } from 'vue';

import useSettingsStore from '~/stores/settings';

export function useAppSetting({ settingId }) {
  const settingStore = useSettingsStore();

  const setting = computed(() => settingStore.getSetting(settingId.value));

  const listOption = [
    // { name: 'center', icon: 'icon-desktop-center' },
    // { name: 'alert', icon: 'icon-desktop-alert' },
    // { name: 'email', icon: 'icon-desktop-email' },
    // { name: 'browser', icon: 'icon-desktop-empty' },
  ];

  const displaySetting = computed(() =>
    settingStore.isPlatformPreferences || settingStore.getSettingGroup(setting.value).enable
    || setting.value.hasAtLeastOneReadonly);

  const needDropDown = computed(() =>
    settingStore.isPlatformPreferences || setting.value.hasAtLeastOneNotifOptionReadonly);

  const parentSetting = computed(() => settingStore.getSettingGroup(setting.value));

  const hideToggle = computed(() => !settingStore.isPlatformPreferences
    && setting.value.hasAtLeastOneNotifOptionReadonly
    && !parentSetting.value.enable
    && !setting.value.readOnly);

  const settingOffClass = computed(() => {
    return !settingStore.isPlatformPreferences
      && (setting.value.readOnly || !parentSetting.value.enable || !setting.value.enable)
      ? 'INTFCenter-preference-appname-off'
      : '';
  });

  const isOpen = ref(false);
  function handleChevronUpdate(newValue) {
    isOpen.value = newValue;
  }

  function optionOffClass(option) {
    return setting.value.getNotifOptionReadOnly(option.name) && !settingStore.isPlatformPreferences
      ? 'INTFCenter-preference-appname-off'
      : '';
  }

  return {
    hideToggle,
    displaySetting,
    needDropDown,
    listOption,
    isOpen,
    settingOffClass,
    optionOffClass,
    handleChevronUpdate,
  };
}
