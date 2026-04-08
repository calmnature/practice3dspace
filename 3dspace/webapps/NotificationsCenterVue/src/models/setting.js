import { updateServiceSettings, updateSettings } from '~/api/senders';
import { usePreferencesManagement } from '~/composables/preferences/usePreferencesManagement';
import useTranslations from '~/composables/useTranslations';
import useSettingsStore from '~/stores/settings';

const { $i18n } = useTranslations();

/**
 * Format options 'notif_by_ui', 'notif_by_email', 'notif_by_browser', 'subscribe'
 * to respect the format: {enable: 0 | 1, readOnly: 0 | 1}
 * @param {number|boolean|object} value - The setting object.
 */
function formatOptions(value) {
  if (typeof value !== 'object') {
    return { enable: +value, readOnly: 0 };
  }
  else {
    return value;
  }
}

export class Setting {
  /**
   * Constructs a new Setting object.
   * @param {object} setting - The setting object.
   */
  constructor(setting) {
    const keyToMap = ['notif_by_ui', 'notif_by_email', 'notif_by_browser', 'subscribe'];
    for (const [key, value] of Object.entries(setting)) {
      if (keyToMap.includes(key.toLowerCase())) {
        this[key.toLowerCase()] = formatOptions(value);
      }
      else {
        this[key.toLowerCase()] = value;
      }
    }
    this.groupList = [];
  }

  /**
   * Returns whether the setting is a group.
   * @returns {boolean} True if the setting is a group, false otherwise.
   */
  get isGroup() {
    return this.name === 'GLOBAL';
  }

  /**
   * Returns whether the setting is read-only.
   * @returns {boolean} True if the setting is read-only, false otherwise.
   */
  get readOnly() {
    return !!this.subscribe.readOnly;
  }

  /**
   * Change the value readOnly of subscribe and call updateTheSettings.
   * @param {number | boolean} readOnly
   */
  setReadOnly(readOnly) {
    this.subscribe.readOnly = +readOnly;
    this.updateTheSettings();
  }

  /**
   * Returns whether the notification is enabled.
   * @returns {boolean} True if the notification is enabled, false otherwise.
   */
  get enable() {
    return (
      this?.subscribe.enable === 1
      && (this.unsubscribe_date === null || new Date(this.unsubscribe_date) < new Date(Date.now()))
    );
  }

  /**
   * Change the value of enabled and call updateTheSettings.
   * @param {number | boolean} value if the notification is enabled, false otherwise.
   */
  setEnable(value) {
    this.subscribe.enable = +value;
    this.updateTheSettings(true);
  }

  /**
   * Returns the value of notif_by_uiEnabled.
   * @returns {boolean} The value of notif_by_uiEnabled.
   */
  get notif_by_uiEnabled() {
    return !!this?.notif_by_ui.enable;
  }

  /**
   * Change the value of notif_by_uiEnabled and call updateTheSettings.
   * @param {number | boolean} value if the notification is notif_by_uiEnabled, false otherwise.
   */
  set_notif_by_uiEnabled(value) {
    this.notif_by_ui.enable = +value;
    this.updateTheSettings(false);
  }

  /**
   * Returns the value of notif_by_uiReadOnly.
   * @returns {boolean} The value of notif_by_uiReadOnly.
   */
  get notif_by_uiReadOnly() {
    return !!this?.notif_by_ui.readOnly;
  }

  /**
   * Change the value of notif_by_uiReadOnly and call updateTheSettings.
   * @param {number | boolean} value if the notification is notif_by_uiReadOnly, false otherwise.
   */
  set_notif_by_uiReadOnly(value) {
    this.notif_by_ui.readOnly = +value;
    this.updateTheSettings();
  }

  /**
   * Returns the value of notif_by_emailEnabled.
   * @returns {boolean} The value of notif_by_emailEnabled.
   */
  get notif_by_emailEnabled() {
    return !!this?.notif_by_email.enable;
  }

  /**
   * Change the value of notif_by_emailEnabled and call updateTheSettings.
   * @param {number | boolean} value if the notification is notif_by_emailEnabled, false otherwise.
   */
  set_notif_by_emailEnabled(value) {
    this.notif_by_email.enable = +value;
    this.updateTheSettings(false);
  }

  /**
   * Returns the value of notif_by_emailReadOnly.
   * @returns {boolean} The value of notif_by_emailReadOnly.
   */
  get notif_by_emailReadOnly() {
    return !!this?.notif_by_email.readOnly;
  }

  /**
   * Change the value of notif_by_emailReadOnly and call updateTheSettings.
   * @param {number | boolean} value if the notification is notif_by_emailReadOnly, false otherwise.
   */
  set_notif_by_emailReadOnly(value) {
    this.notif_by_email.readOnly = +value;
    this.updateTheSettings();
  }

  /**
   * Returns the value of notif_by_browserEnabled.
   * @returns {boolean} The value of notif_by_browserEnabled.
   */
  get notif_by_browserEnabled() {
    return !!this?.notif_by_browser.enable;
  }

  /**
   * Change the value of notif_by_browserEnabled and call updateTheSettings.
   * @param {number | boolean} value if the notification is notif_by_browserEnabled, false otherwise.
   */
  set_notif_by_browserEnabled(value) {
    this.notif_by_browser.enable = value;
    this.updateTheSettings(false);
  }

  /**
   * Returns the value of notif_by_browserReadOnly.
   * @returns {boolean} The value of notif_by_browserReadOnly.
   */
  get notif_by_browserReadOnly() {
    return !!this?.notif_by_browser.readOnly;
  }

  /**
   * Change the value of notif_by_browserReadOnly and call updateTheSettings.
   * @param {number | boolean} value if the notification is notif_by_browserReadOnly, false otherwise.
   */
  set_notif_by_browserReadOnly(value) {
    this.notif_by_browser.readOnly = +value;
    this.updateTheSettings();
  }

  /**
   * Returns true if at least one notification option or subscribe is readOnly.
   * @returns {boolean} return true if one options of the setting is readOnly or subscribe is readOnly.
   */
  get hasAtLeastOneReadonly() {
    return this.hasAtLeastOneNotifOptionReadonly || this.readOnly;
  }

  /**
   * Returns true if at least one notification option is readOnly.
   * @returns {boolean} return true if one options of the setting is readOnly
   */
  get hasAtLeastOneNotifOptionReadonly() {
    return this.notif_by_emailReadOnly || this.notif_by_browserReadOnly || this.notif_by_uiReadOnly;
  }

  /**
   * Returns the value of enable dependig of the option.
   * @param {string} option email | ui | browser
   * @returns {boolean} The value of enable depending of the option.
   */
  getNotifOptionEnabled(option) {
    switch (option) {
      case 'email':
        return this.notif_by_emailEnabled;
      case 'ui':
      case 'alert':
        return this.notif_by_uiEnabled;
      case 'browser':
        return this.notif_by_browserEnabled;
      case 'center':
        return this.enable;
      default:
        throw new Error(`Option ${option} didn't exist. Only 'email', 'ui', 'alert' and 'browser' are available.`);
    }
  }

  /**
   * Change the value of enable dependig of the option and call updateTheSettings.
   * @param {string} option email | ui | browser
   * @param {number | boolean} value if the notification is notif_by_browserReadOnly, false otherwise.
   */
  setNotifOptionEnabled(option, value) {
    switch (option) {
      case 'email':
        this.set_notif_by_emailEnabled(value);
        break;
      case 'ui':
      case 'alert':
        this.set_notif_by_uiEnabled(value);
        break;
      case 'browser':
        this.set_notif_by_browserEnabled(value);
        break;
      default:
        throw new Error(`Option ${option} didn't exist. Only 'email', 'ui', 'alert' and 'browser' are available.`);
    }
  }

  /**
   * Returns the value of readOnly dependig of the option.
   * @param {string} option email | ui | browser
   * @returns {boolean} The value of ReadOnly depending of the option.
   */
  getNotifOptionReadOnly(option) {
    switch (option) {
      case 'email':
        return this.notif_by_emailReadOnly;
      case 'ui':
      case 'alert':
        return this.notif_by_uiReadOnly;
      case 'browser':
        return this.notif_by_browserReadOnly;
      case 'center':
        return this.readOnly;
      default:
        throw new Error(`Option ${option} didn't exist. Only 'email', 'ui', 'alert' and 'browser' are available.`);
    }
  }

  /**
   * Change the value of ReadOnly dependig of the option and call updateTheSettings.
   * @param {string} option email | ui | browser
   * @param {number | boolean} value if the notification is notif_by_browserReadOnly, false otherwise.
   */
  setNotifOptionReadOnly(option, value) {
    switch (option) {
      case 'email':
        this.set_notif_by_emailReadOnly(value);
        break;
      case 'ui':
      case 'alert':
        this.set_notif_by_uiReadOnly(value);
        break;
      case 'browser':
        this.set_notif_by_browserReadOnly(value);
        break;
      default:
        throw new Error(`Option ${option} didn't exist. Only 'email', 'ui', 'alert' and 'browser' are available.`);
    }
  }

  /**
   * Resets the unsubscription date.
   */
  resetUnsubscriptionDate() {
    this.unsubscribe_date = null;
  }

  /**
   * Checks if the given ID is present in the group list.
   *
   * @param {any} id - The ID to check.
   * @returns {boolean} - Returns true if the ID is present in the group list, otherwise returns false.
   */
  isInGroupList(id) {
    return this.groupList.includes(id);
  }

  /**
   * Sets the group list.
   *
   * @param {Array} groupList - The new group list.
   * @returns {void}
   */
  setGroupList(groupList) {
    this.groupList = groupList;
  }

  /**
   * Adds an ID to the group list.
   *
   * @param {any} id - The ID to be added to the group list.
   * @returns {void}
   */
  addIdToGroupList(id) {
    if (!this.groupList.includes(id))
      this.groupList.push(id);
  }

  /**
   * Updates the settings with the given value.
   *
   * @param {boolean} updateSubscribe - true if the udpateSetting is call to update subscribe.
   */
  updateTheSettings = (updateSubscribe) => {
    const { isPlatformPreferences } = useSettingsStore();
    if (isPlatformPreferences) {
      updateServiceSettings({
        subscribe: this.subscribe,
        id: this.id,
        notif_by_email: this.notif_by_email,
      });
    }
    else if (this.readOnly) {
      const { messageNotice } = usePreferencesManagement();
      messageNotice($i18n('forcedPreference'), 3000);
    }
    else {
      if (updateSubscribe) {
        updateSettings({
          id: this.id,
          subscribe: this.subscribe,
        });
      }
      else {
        updateSettings({
          id: this.id,
          notif_by_browser: this.notif_by_browser.enable,
          notif_by_email: this.notif_by_email.enable,

          notif_by_ui: this.notif_by_ui.enable,
        });
      }
    }
  };
}
