import { computed, ref, watch } from 'vue';

import { usePreferencesManagement } from '~/composables/preferences/usePreferencesManagement';
import useTranslations from '~/composables/useTranslations';
import useSettingsStore from '~/stores/settings';

const { $i18n } = useTranslations();

export function useTogglePreference({ needDropDown, lock, toggleValue }) {
  const settingStore = useSettingsStore();

  const preferenceAdmin = settingStore.isPlatformPreferences;

  // state
  const isOpen = ref(false);

  const isRevertingToggle = ref(false);

  const lockContainerClass = preferenceAdmin ? 'cursor-pointer' : '';

  const lockTitle = computed(() => preferenceAdmin
    ? (lock.value
        ? $i18n('forcedPreferenceOption')
        : $i18n('notForcedPreferenceOption'))
    : $i18n('forcedPreference'));

  // computed
  const chevronClass = computed(() => isOpen.value
    ? 'INTFCenter-app-setting-drop-down-open fonticon-expand-down'
    : 'fonticon-expand-right');

  const needLock = computed(() => (settingStore.isPlatformPreferences && lock.value !== null) || lock.value);

  const lockClass = ref(getLockClassValue(lock.value));

  watch(lock, () => {
    lockClass.value = getLockClassValue(lock.value);
  });

  const needToggle = computed(() => toggleValue.value !== null);

  const toggleEnable = ref(toggleValue.value);

  watch(toggleValue, (newResult) => {
    toggleEnable.value = newResult;
  });

  const isDisabled = computed(() => preferenceAdmin ? false : lock.value);

  // methods
  function toggleDropdown() {
    if (needDropDown.value) {
      isOpen.value = !isOpen.value;
      return isOpen.value;
    }
    return null;
  }

  function getLockClassValue(value) {
    return `${value ? 'fonticon-lock' : 'fonticon-lock-open'}
    ${preferenceAdmin ? 'fonticon-clickable' : ''}`.trim();
  }

  function canUpdateLock() {
    if (preferenceAdmin) {
      return true;
    }
    else {
      const { messageNotice } = usePreferencesManagement();
      messageNotice($i18n('forcedPreference'), 3000);
      return false;
    }
  }

  const revertLock = () => {
    lockClass.value = getLockClassValue(lock.value);
  };

  function handleClickNotAllowed(event) {
    const label = event.target.closest('label');
    if (isDisabled.value && label) {
      const { messageNotice } = usePreferencesManagement();
      messageNotice($i18n('forcedPreference'), 3000);
    }
  }

  const revertToggleEnable = (oldValue) => {
    isRevertingToggle.value = true;
    toggleEnable.value = oldValue;
  };

  return {
    lockContainerClass,
    isRevertingToggle,
    lockTitle,

    chevronClass,
    needLock,
    lockClass,
    needToggle,
    toggleEnable,
    isDisabled,

    revertToggleEnable,
    getLockClassValue,
    canUpdateLock,
    revertLock,
    handleClickNotAllowed,
    toggleDropdown,
  };
}
