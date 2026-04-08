import { computed } from 'vue';

import { usePreferencesManagement } from '~/composables/preferences/usePreferencesManagement';
import { useToggleHelper } from '~/composables/preferences/useToggleHelper';
import useTranslations from '~/composables/useTranslations';
import useSettingsStore from '~/stores/settings';

const { $i18n } = useTranslations();

export function useAppOption({ settingId, option }) {
  const settingStore = useSettingsStore();
  const setting = computed(() => settingStore.getSetting(settingId.value));

  const needToggle = computed(() => settingStore.isPlatformPreferences);

  const displayOption = computed(() => settingStore.isPlatformPreferences
    || setting.value.enable || setting.value.getNotifOptionReadOnly(option.value.name));

  /**
   * Computes the value of `globalOptionOnSettingOff`.
   * @returns {ComputedRef} The computed value of `globalOptionOnSettingOff`.
   */
  /*   const globalOptionOnSettingOff = computed(() => {
    const globalSetting = settingStore.getSettingGroup(setting.value);
    return option.value.name !== 'center' && globalSetting.value
      && !setting.value.isGroup && globalSetting.value[option.value.settingName] === 1;
  }) */;

  const cursorReadOnly = computed(() =>
    !settingStore.isPlatformPreferences
    && (option.value.name === 'center' || setting.value.getNotifOptionReadOnly(option.value.name)));

  const optionEnabled = computed(() =>
    option.value.name === 'center' || setting.value.getNotifOptionEnabled(option.value.name));

  const tooltipText = computed(() => (optionEnabled.value
    ? $i18n(`${option.value.name}NotificationTooltipEnabled`)
    : $i18n(`${option.value.name}NotificationTooltipDisabled`)));
    /* + (globalOptionOnSettingOff ? `, ${$i18n('overrideByGlobal')}` : '') */

  /**
   * Updates the setting based on the given type.
   */
  async function updateSetting() {
    const { settingUpdateVerification } = usePreferencesManagement();
    if (!settingStore.isPlatformPreferences
      && (setting.value.readOnly || setting.value.getNotifOptionReadOnly(option.value.name))) {
      const { messageNotice } = usePreferencesManagement();
      messageNotice($i18n('forcedPreference'), 3000);
    }
    else if (option.value.name !== 'center'
      && (settingStore.isPlatformPreferences || await settingUpdateVerification(setting.value, option.value.name))) {
      const { updateState } = useToggleHelper(settingId, option);
      updateState(!setting.value.getNotifOptionEnabled(option.value.name));
    }
  }

  return {
    displayOption,
    cursorReadOnly,
    needToggle,
    optionEnabled,
    tooltipText,
    updateSetting,
  };
}
