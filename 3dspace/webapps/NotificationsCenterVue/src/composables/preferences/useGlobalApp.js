import { trackPreferences } from '~/api/trackerv2';
import useSettingsStore from '~/stores/settings';

export function useGlobalApp(setting) {
  const store = useSettingsStore();
  /**
   * Opens the application settings.
   */
  function openAppSetting() {
    store.setCurrentSetting(setting.value.id);

    store.setAppSettingOpened(true);
    // analytics
    trackPreferences('openApp', { setting: setting.value });
  }

  const needStatus = !store.isPlatformPreferences;

  return {
    openAppSetting,
    needStatus,
  };
}
