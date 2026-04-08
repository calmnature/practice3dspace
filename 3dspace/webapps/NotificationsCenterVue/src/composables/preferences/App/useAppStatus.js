import { useNow } from '@vueuse/core';
import { computed } from 'vue';

import useTranslations from '~/composables/useTranslations';

const { $i18n } = useTranslations();
export function useAppStatus({ setting }) {
  const now = useNow();
  /**
   * Computes the remaining time.
   * @returns {number} The remaining time.
   */
  const remainingTime = computed(() => {
    const currentTime = new Date(now.value)
      .getTime();
    const unsubTime = new Date(setting.value.unsubscribe_date)
      .getTime();
    //
    const elapsedMilliseconds = Math.abs(currentTime - unsubTime);
    const elapsedMinutes = Math.round(elapsedMilliseconds / (1000 * 60));
    // supposed time can't be more than an hour (need to be redefine if else in the future)
    return elapsedMinutes > 60 ? 60 : elapsedMinutes;
  });

  /**
   * Computed property that returns the status.
   * @returns {any} The computed status.
   */
  const status = computed(() => {
    let status = $i18n('centerIconText');
    if (setting.value.notif_by_uiEnabled)
      status += `, ${$i18n('alertIconText')}`;
    if (setting.value.notif_by_emailEnabled)
      status += `, ${$i18n('emailIconText')}`;
    if (setting.value.notif_by_browserEnabled)
      status += `, ${$i18n('browserIconText')}`;
    return status;
  });

  /**
   * Computed property that returns the status text.
   * @returns {string} The status text.
   */
  const statusText = computed(() => {
  // Setting is disabled
    if (!setting.value.enable) {
      return $i18n('settingOff');
    }

    // Setting is temporarily unsubscribed (countdown active)
    if (setting.value.unsubscribe_date !== null) {
      const timeValue = remainingTime.value === 60 ? 1 : remainingTime.value;
      const timeUnit = remainingTime.value === 60
        ? $i18n('hourLeft')
        : $i18n('minLeft');

      return `${$i18n('settingOffForAnHour')} (${timeValue} ${timeUnit})`;
    }

    // Setting is active - show notification status
    return status.value;
  });

  return {
    statusText,
  };
}
