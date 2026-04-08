import { computed } from 'vue';

import useSettingsStore from '~/stores/settings';

export function useSettingHomeList(settingId) {
  const settingStore = useSettingsStore();
  const setting = computed(() => settingStore.getSetting(settingId.value));

  const AppOptionContainerClass = settingStore.isPlatformPreferences
    ? 'INTFCenter-option-platform-preferences-list'
    : 'INTFCenter-option-list';

  const openAppSettingsId = computed(() => {
    return settingStore.getGroupIndividualSettingsId(setting.value);
  });

  function getListOption() {
    const mailOption = { name: 'email', fonticonName: 'icon-desktop-email' };

    if (settingStore.isPlatformPreferences)
      return [mailOption];
    const acceptedParam = (name) => {
      return setting.value.enable || (name !== 'center' && setting.value.getNotifOptionReadOnly(name));
    };
    return [
      ...(acceptedParam('center') ? [{ name: 'center', fonticonName: 'icon-desktop-center' }] : []),
      ...(acceptedParam('alert') ? [{ name: 'alert', fonticonName: 'icon-desktop-alert' }] : []),
      ...(acceptedParam('email') ? [mailOption] : []),
      ...(acceptedParam('browser') ? [{ name: 'browser', fonticonName: 'icon-desktop-empty' }] : []),
    ];
  }

  return {
    setting,
    AppOptionContainerClass,
    openAppSettingsId,

    getListOption,

  };
}
