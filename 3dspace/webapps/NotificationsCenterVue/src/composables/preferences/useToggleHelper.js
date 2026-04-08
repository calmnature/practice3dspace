import { computed } from 'vue';

import { trackPreferences } from '~/api/trackerv2';
import { usePreferencesManagement } from '~/composables/preferences/usePreferencesManagement';
import useTranslations from '~/composables/useTranslations';
import useSettingsStore from '~/stores/settings';

const { $i18n } = useTranslations();

export function useToggleHelper(settingId, option = null) {
  const settingStore = useSettingsStore();

  const isPlatformPreferences = settingStore.isPlatformPreferences;

  const setting = computed(() => settingStore.getSetting(settingId.value));

  const state = computed(() => option ? setting.value.getNotifOptionEnabled(option.value.name) : setting.value.enable);

  const isReadOnly = computed(() => option
    ? setting.value.getNotifOptionReadOnly(option.value.name)
    : setting.value.readOnly);

  function createWarning(isEnable, isEnforced) {
    if (isEnable && isEnforced)
      return $i18n('settingTurnedOnAndForced');
    else if (isEnable)
      return $i18n('settingTurnedOnNotForced');
    else if (isEnforced)
      return $i18n('settingTurnedOffAndForced');
    else
      return $i18n('settingTurnedOffNotForced');
  }

  async function updateState(newValue, revert) {
    const { alertConfirmNotice } = usePreferencesManagement();
    if (isPlatformPreferences) {
      const msg = option
        ? createWarning(newValue, setting.value.getNotifOptionReadOnly(option.value.name))
        : createWarning(newValue, setting.value.readOnly);
      const confirmation = await alertConfirmNotice({
        title: $i18n('warningTitlePlatformPreferences'),
        msg,
        okLabel: $i18n('confirmButtonLabel'),
        cancelLabel: $i18n('cancel'),
      });

      if (!confirmation) {
        revert();
        return;
      }
    }
    if (option) {
      setting.value.setNotifOptionEnabled(option.value.name, newValue);
      // analytics
      trackPreferences('setEnable', { setting: setting.value, state: newValue, optionType: option.value.name });
    }
    else {
      setting.value.setEnable(newValue);
      // analytics
      trackPreferences('setEnable', { setting: setting.value, state: newValue, optionType: 'notification center' });
    }
  }

  async function updateReadOnly(newValue, revert) {
    const { alertConfirmNotice } = usePreferencesManagement();

    if (isPlatformPreferences) {
      const msg = option
        ? createWarning(setting.value.getNotifOptionEnabled(option.value.name), newValue)
        : createWarning(setting.value.enable, newValue);
      const confirmation = await alertConfirmNotice({
        title: $i18n('warningTitlePlatformPreferences'),
        msg: newValue ? msg : $i18n('settingTurnedUnlocked'),
        okLabel: $i18n('confirmButtonLabel'),
        cancelLabel: $i18n('cancel'),
      });

      if (!confirmation) {
        revert();
        return;
      }
    }

    if (option) {
      setting.value.setNotifOptionReadOnly(option.value.name, newValue);
      trackPreferences('setReadOnly', { setting: setting.value, state: newValue, optionType: option.value.name });
    }
    else {
      setting.value.setReadOnly(newValue);
      trackPreferences('setReadOnly', { setting: setting.value, state: newValue, optionType: 'notification center' });
    }
  }

  return {
    setting,
    state,
    isReadOnly,
    isPlatformPreferences,
    updateState,
    updateReadOnly,
  };
}
