import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';

import { Setting } from '~/models/setting';
/**
 * General settings store.
 */

const useSettingsStore = defineStore('settings', () => {
  const settingState = reactive({
    loaded: {
      settings: false,
    },
    isLoading: {
      settings: false,
    },
  });

  /**
   * Sets the load state of a setting.
   *
   * @param {string} key - The key of the setting.
   * @param {any} value - The value to set for the setting.
   */
  const setSettingLoadState = (key, value) => {
    settingState.loaded[key] = value;
  };

  /**
   * Sets the loading state of a setting.
   *
   * @param {string} key - The key of the setting.
   * @param {any} value - The value to set for the setting.
   */
  const setSettingLoadingState = (key, value) => {
    settingState.isLoading[key] = value;
  };

  /**
   * Indicates which window is shown (CENTER, PREFERENCES or PLATFORM_PREFERENCES).
   * @type {ref<string>}
   */
  const windowShow = ref('CENTER');

  /**
   * Indicates the DND status of the user.
   * @type {Ref<boolean>}
   */
  const isDND = ref(false);

  /**
   * Indicates if the DND status of the user is still the default one.
   * @type {Ref<boolean>}
   */
  const isDNDRefreshed = ref(false);

  /**
   * Represents the state of the app setting panel.
   * @type {boolean}
   */
  const appSettingOpened = ref(false);
  // #region STATE
  // list of tenants
  /**
   * Represents a collection of tenants.
   * @typedef {object} Tenants
   * @property {Array} tenants - The array of tenants.
   */
  const tenants = reactive({
    tenants: [],
  });

  /**
   * Represents the current setting.
   */
  const currentSetting = ref(null);

  /**
   * sets the current setting.
   * @param {*} id
   */
  const setCurrentSetting = (id) => {
    currentSetting.value = id;
  };

  /**
   * Resets the current setting.
   */
  const resetCurrentSetting = () => {
    currentSetting.value = null;
  };

  /**
   * Represents the current tenant.
   */
  const currentTenant = ref(null);

  /**
   * @type {Map}
   */
  const userSettings = reactive(new Map());

  /**
   * @type {Map}
   */
  const ServicesSettings = reactive(new Map());

  /**
   * Dynamically points to either userSettings or ServicesSettings
   * based on the current windowShow value
   * @type {ComputedRef<Map>}
   */
  const settings = ref(userSettings);

  /**
   * Retrieves the value of a setting based on its ID.
   *
   * @param {number} id - The ID of the setting to retrieve.
   * @returns {any} The value of the setting, or null if the setting does not exist.
   */
  const getSetting = (id) => {
    return settings.value.get(id) ?? null;
  };

  /**
   * resets the unsubscription date of a setting.
   * @param {*} id
   */
  const resetSettingUnsubDate = (id) => {
    const s = getSetting(id);
    if (s)
      s.unsubscribe_date = null;
  };

  watch(
    () => windowShow.value,
    (newValue) => {
      settings.value = newValue === 'PLATFORM_PREFERENCES' ? ServicesSettings : userSettings;
    },
    { immediate: true },
  );

  /**
   * List of settings with an unsubscribe date.
   */
  const unsubscribe_dateSettingList = ref([]);

  /**
   * checks if the setting is in the unsubscribe_dateSettingList.
   * @param {*} id
   * @returns return true if the id is in the unsubscribe_dateSettingsList.
   */
  const isInUnsubscribe_dateSettingList = (id) => {
    return unsubscribe_dateSettingList.value.includes(id);
  };

  /**
   * adds a setting to the unsubscribe_dateSettingList.
   * @param {*} id
   */
  const addUnsubscribe_dateSetting = (id) => {
    if (!isInUnsubscribe_dateSettingList(id)) {
      unsubscribe_dateSettingList.value.push(id);
    }
  };

  /**
   * removes a setting from the unsubscribe_dateSettingList.
   * @param {*} id
   */
  const removeUnsubscribe_dateSetting = (id) => {
    const index = unsubscribe_dateSettingList.value.indexOf(id);
    if (index !== -1) {
      unsubscribe_dateSettingList.value.splice(index, 1);
    }
  };

  /**
   * Individual setting of a global setting.
   * @type {Map}
   */
  const settingsList = reactive(new Map());

  //
  const listOfService = ref([]);
  const platformPreferencesAccess = ref(false);
  const refreshNotificationCenter = ref(false);
  const nameofUpdatedSetting = ref(null);
  const hidePlatformSelection = ref(true); // true if platform selection should be hidden
  const isTenantAgnostic = ref(0); // 0: current, 1: all

  // #region ACTIONS

  /**
   * Sets the value of useRole to know if the user ass access to platform preferences.
   * @param {boolean} userRole - The new value for platformPreferencesAccess.
   */
  const setPlatformPreferencesAccess = (userRole) => {
    platformPreferencesAccess.value = !!userRole;
  };

  /**
   * Sets the value of windowShow.
   *
   * @param {string} value - The new value for windowShow.
   */
  const setWindoShow = (value) => {
    const allowedWindow = ['CENTER', 'PREFERENCES', 'PLATFORM_PREFERENCES'];

    if (!allowedWindow.includes(value)) {
      return;
    }

    windowShow.value = value;
  };

  const isPlatformPreferences = computed(() => windowShow.value === 'PLATFORM_PREFERENCES');

  /**
   * Sets the value of isDND.
   *
   * @param {boolean} value - The new value for isDND.
   */
  const setDNDStatus = (value) => {
    isDND.value = value.isDND;
    isDNDRefreshed.value = true;
  };

  const setAppSettingOpened = (value) => {
    appSettingOpened.value = value;
  };

  const setCurrentTenant = (tenant) => {
    currentTenant.value = tenant;
  };

  const getCurentTenantName = () => {
    return tenants.tenants.find(tenant => tenant.PLATFORMID.toLowerCase() === currentTenant.value.toLowerCase()).NAME;
  };

  /**
   * Set the tenant agnostic mode.
   * @param {object} data
   */
  const setTenantAgnosticData = (data) => {
    hidePlatformSelection.value = data.hidePlatformSelection;
    isTenantAgnostic.value = data.isTenantAgnostic;
  };

  /**
   * Set the list of services.
   * @param {object} data
   */
  const setListOfService = (data) => {
    listOfService.value = data.services;
    setCurrentTenant(data.currentTenant);
    // listOfServicesDone.value = true;
  };

  /**
   * Set the name of the updated setting.
   * @param {object} data
   */
  const setNameofUpdatedSetting = (data) => {
    nameofUpdatedSetting.value = data.setting;
  };
  /**
   * Set the tenants.
   * @param {object} data
   */
  const setTenantsData = (data) => {
    tenants.tenants = data;
  };

  // settings ---------------------------------
  const getIndividualSettingIds = (id) => {
    const setting = getSetting(id);
    return setting ? setting.groupList : [];
  };

  /**
   * Retrieves the setting group that matches the specified setting.
   *
   * @param {object} setting - The setting to match.
   * @param {object} settingsMap - The setting map.
   * @returns {object | null} - The matching setting group, or null if not found.
   */
  const getSettingGroup = (setting, settingsMap = null) => {
    for (const [, value] of settingsMap ? settingsMap.entries() : settings.value.entries()) {
      if (value.isGroup && value.service === setting.service) {
        return value;
      }
    }
    return null;
  };

  /**
   * Checks if a setting belongs to the 'GLOBAL' group.
   *
   * @param {object} setting - The setting object to check.
   * @returns {boolean} - Returns true if the setting belongs to the 'GLOBAL' group, otherwise returns false.
   */
  const isSettingGroup = (setting) => {
    const thatSetting = getSetting(setting.id);
    return thatSetting && thatSetting.isGroup;
  };

  const addSettingIdToGroupList = (group, settingId) => {
    group.addIdToGroupList(settingId);
  };

  const getAllGroupSettings = computed(() => {
    const groupSettings = [];
    settings.value.forEach((setting) => {
      if (setting.isGroup) {
        groupSettings.push(setting);
      }
    });
    return groupSettings;
  });

  const getGroupIndividualSettingsId = (group) => {
    const groupSettingsId = [];
    group.groupList.forEach((id) => {
      const setting = getSetting(id);
      if (setting && !setting.isGroup) {
        groupSettingsId.push(id);
      }
    });
    return groupSettingsId;
  };

  const addSetting = (setting, settingsMap) => {
    const newSetting = new Setting(setting);
    // check if the setting already exists
    const existingSetting = settingsMap.get(setting.ID) ?? null; // ID
    if (existingSetting) {
      for (const key in setting) {
        if (key.toLowerCase() !== 'servicename' && key.toLowerCase() !== 'id' && key.toLowerCase() !== 'name'
          && !existingSetting[key.toLowerCase()]?.readOnly) {
          existingSetting[key.toLowerCase()] = newSetting[key.toLowerCase()];
        }
      }
    }
    else {
      settingsMap.set(newSetting.id, newSetting);
      //
      if (newSetting.unsubscribe_date !== null) {
        addUnsubscribe_dateSetting(newSetting.id);
      }
    }
  };

  /**
   * Sets the settings data.
   *
   * @param {object} data - The data containing the settings.
   */
  const setSettingsData = (data) => {
    for (let i = 0; i < data.settings.length; i++) {
      if (data.settings[i].service !== 'X3DNTFC_AP') {
        addSetting(data.settings[i], userSettings);
      }
    }
    // Add individual settings to the group list
    userSettings.forEach((setting) => {
      const group = getSettingGroup(setting, userSettings);
      if (group) {
        addSettingIdToGroupList(group, setting.id);
      }
    });
  };

  /**
   * Sets the settings data.
   *
   * @param {object} data - The data containing the settings.
   */
  const setServicesSettingsData = (data) => {
    for (let i = 0; i < data.settings.length; i++) {
      if (data.settings[i].service !== 'X3DNTFC_AP') {
        addSetting(data.settings[i], ServicesSettings);
      }
    }

    // Add individual settings to the group list
    ServicesSettings.forEach((setting) => {
      const group = getSettingGroup(setting, ServicesSettings);
      if (group) {
        addSettingIdToGroupList(group, setting.id);
      }
    });
  };

  /**
   * Sets the setting data.
   *
   * @param {any} data - The data to be set.
   * @returns {void}
   */
  const setSettingData = (data) => {
    addSetting(data, userSettings);
  };

  return {
    refreshNotificationCenter,
    unsubscribe_dateSettingList,
    listOfService,
    nameofUpdatedSetting,
    tenants,
    settings,
    settingsList,
    isDND,
    isDNDRefreshed,
    currentTenant,
    appSettingOpened,
    getAllGroupSettings,
    settingState,
    currentSetting,
    hidePlatformSelection,
    isTenantAgnostic,

    getPlatformPreferencesAccess: () => platformPreferencesAccess.value,
    getDNDStatus: () => isDND.value,
    getDNDRefreshedStatus: () => isDNDRefreshed.value,
    getCurrentTenant: () => currentTenant.value,
    getTenants: () => tenants.tenants,
    getListOfService: () => listOfService.value,
    getWindowShow: () => windowShow.value,

    setPlatformPreferencesAccess,
    setCurrentSetting,
    resetCurrentSetting,
    getGroupIndividualSettingsId,
    getSettingGroup,
    getSetting,
    isSettingGroup,
    isPlatformPreferences,
    getIndividualSettingIds,
    addSettingIdToGroupList,
    addSetting,
    setTenantAgnosticData,
    setSettingLoadState,
    setSettingLoadingState,
    setListOfService,
    setCurrentTenant,
    getCurentTenantName,
    setTenantsData,
    setNameofUpdatedSetting,
    setSettingsData,
    setServicesSettingsData,
    setSettingData,
    setWindoShow,
    setDNDStatus,
    setAppSettingOpened,
    addUnsubscribe_dateSetting,
    removeUnsubscribe_dateSetting,
    resetSettingUnsubDate,
  };
});

export default useSettingsStore;
