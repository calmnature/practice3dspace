import { Logger } from '../utils/logger';
import { requirejs } from '../modules/require';

const getTrackerAPI = async () => {
  const [TrackerAPI] = await requirejs(['DS/Usage/TrackerAPI']);
  return TrackerAPI;
};

export function RTCallComponentsTracker() {
  const report = {
    appID: 'X3DIMSG_AP',
    eventCategory: 'collabexperience.calls',
  };

  /**
   * Tracks event related to Clear History.
   * @returns An object containing functions to track different events.
   */
  const clearHistory = () => {
    /**
     * Opens Clear History confirmation modal.
     *
     * @param {Object} data - The data object containing optional parameters.
     * @param {{pd1: string, pd2: string}} data.persDim - The personalized dimension.
     * @param {string} data.persVal - The personalized value.
     */
    const openClearHistoryConfirmationModal = async (data = {}) => {
      const logger = await Logger();
      const { persDim, persVal } = data;

      report.eventAction = 'openClearHistory';
      report.eventLabel = 'Open Clear History';
      // report.eventValue = 1;
      report.persDim = persDim;
      report.persVal = persVal;

      try {
        logger.RTCallComponents('[TRACKER] Open Clear History with Analytics : ' + JSON.stringify(report));
        const trackerAPI = await getTrackerAPI();
        trackerAPI.trackPageEvent(report);
      } catch (error) {
        logger.RTCallComponents('[TRACKER] request failed for action "Open Clear History" : ' + error);
      }
    };

    /**
     * Clears Call History.
     *
     * @param {Object} data - The data object containing optional parameters.
     * @param {{pd1: string, pd2: string}} data.persDim - The personalized dimension.
     * @param {string} data.persVal - The personalized value.
     */
    const clearHistory = async (data = {}) => {
      const logger = await Logger();
      const { persDim, persVal } = data;

      report.eventCategory = 'collabexperience.calls';
      report.eventAction = 'clearHistory';
      report.eventLabel = 'Clear History';
      // report.eventValue = 1;
      report.persDim = persDim;
      report.persVal = persVal;
      try {
        logger.RTCallComponents('[TRACKER] Clear History with Analytics : ' + JSON.stringify(report));
        const trackerAPI = await getTrackerAPI();
        trackerAPI.trackPageEvent(report);
      } catch (error) {
        logger.RTCallComponents('[TRACKER] request failed for action "Clear History" : ' + error);
      }
    };

    /**
     * Closes Clear History Confirmation modal.
     *
     * @param {Object} data - The data object containing optional parameters.
     * @param {{pd1: string, pd2: string}} data.persDim - The personalized dimension.
     * @param {string} data.persVal - The personalized value.
     */
    const closeClearHistory = async (data = {}) => {
      const logger = await Logger();
      const { persDim, persVal } = data;

      report.eventCategory = 'collabexperience.calls';
      report.eventAction = 'closeClearHistory';
      report.eventLabel = 'Close Clear History';
      // report.eventValue = 0;
      report.persDim = persDim;
      report.persVal = persVal;
      try {
        logger.RTCallComponents('[TRACKER] Close Clear History with Analytics : ' + JSON.stringify(report));
        const trackerAPI = await getTrackerAPI();
        trackerAPI.trackPageEvent(report);
      } catch (error) {
        logger.RTCallComponents('[TRACKER] request failed for action "Close Clear History" : ' + error);
      }
    };

    return {
      openClearHistoryConfirmationModal,
      clearHistory,
      closeClearHistory,
    };
  };

  /**
   * Tracks event related to Call Settings.
   * @returns An object containing functions to track different events.
   */
  const callSettings = () => {
    /**
     * Opens Call Settings.
     *
     * @param {Object} data - The data object containing optional parameters.
     * @param {{pd1: string, pd2: string}} data.persDim - The personalized dimension.
     * @param {string} data.persVal - The personalized value.
     */
    const openCallSettings = async (data = {}) => {
      const logger = await Logger();
      const { persDim, persVal } = data;

      report.eventAction = 'openCallSettings';
      report.eventLabel = 'Open Call Settings';
      // report.eventValue = 1;
      report.persDim = persDim;
      report.persVal = persVal;
      try {
        logger.RTCallComponents('[TRACKER] Open Call Settings with Analytics : ' + JSON.stringify(report));
        const trackerAPI = await getTrackerAPI();
        trackerAPI.trackPageEvent(report);
      } catch (error) {
        logger.RTCallComponents('[TRACKER] request failed for action "Open Call Settings" : ' + error);
      }
    };

    /**
     * Saves Call Settings.
     *
     * @param {Object} data - The data object containing optional parameters.
     * @param {{pd1: string, pd2: string, pd3: 'technologies'|'3ds_phone'|'solarium'|'upbeat'|'documentary'}} data.persDim - The personalized dimension.
     * @param {{ pv1: 0|1, pv2: 0|1, pv3: 0|1, pv4: 0|1 }} data.persVal - The personalized value.
     * + The same (0) or a new (1) device/ringtone.
     * + Camera device `pv1`
     * + Microphone device `pv2`
     * + Speaker device `pv3`
     * + Ringtone `pv4`
     */
    const saveCallSettings = async (data = {}) => {
      const logger = await Logger();
      const { persDim, persVal } = data;

      report.eventCategory = 'collabexperience.calls';
      report.eventAction = 'saveCallSettings';
      report.eventLabel = 'Save Call Settings';
      // report.eventValue = 1;
      report.persDim = persDim;
      report.persVal = persVal;
      try {
        logger.RTCallComponents('[TRACKER] Save Call Settings with Analytics : ' + JSON.stringify(report));
        const trackerAPI = await getTrackerAPI();
        trackerAPI.trackPageEvent(report);
      } catch (error) {
        logger.RTCallComponents('[TRACKER] request failed for action "Save Call Settings" : ' + error);
      }
    };

    /**
     * Closes Call Settings.
     *
     * @param {Object} data - The data object containing optional parameters.
     * @param {{pd1: string, pd2: string}} data.persDim - The personalized dimension.
     * @param {string} data.persVal - The personalized value.
     */
    const closeCallSettings = async (data = {}) => {
      const logger = await Logger();
      const { persDim, persVal } = data;

      report.eventCategory = 'collabexperience.calls';
      report.eventAction = 'closeCallSettings';
      report.eventLabel = 'Close Call Settings';
      // report.eventValue = 0;
      report.persDim = persDim;
      report.persVal = persVal;
      try {
        logger.RTCallComponents('[TRACKER] Close Call Settings with Analytics : ' + JSON.stringify(report));
        const trackerAPI = await getTrackerAPI();
        trackerAPI.trackPageEvent(report);
      } catch (error) {
        logger.RTCallComponents('[TRACKER] request failed for action "Close Call Settings" : ' + error);
      }
    };

    /**
     * Changes a device.
     *
     * @param {Object} data - The data object containing optional parameters.
     * @param {0|1} data.value - The event value. The same (0) or a new (1) device.
     * @param {{ pd1: string, pd2: string, pd3: 'camera'|'microphone'|'speaker', pd4: 'selector'|'deviceChange' }} data.persDim - The personalized dimension.
     * @param {object} data.persVal - The personalized value.
     */
    const changeDevice = async (data = {}) => {
      const logger = await Logger();
      const { persDim, persVal, value } = data;

      report.eventCategory = 'collabexperience.calls';
      report.eventAction = 'changeDevice';
      report.eventLabel = `Change ${persDim.pd3} to ${value ? 'a new' : 'the same'} device`;
      report.eventValue = value;
      report.persDim = persDim;
      report.persVal = persVal;
      try {
        logger.RTCallComponents(
          '[TRACKER] Change device ' + persDim.pd3 + ' with Analytics : ' + JSON.stringify(report)
        );
        const trackerAPI = await getTrackerAPI();
        trackerAPI.trackPageEvent(report);
      } catch (error) {
        logger.RTCallComponents(
          '[TRACKER] request failed for action "Change device" ',
          persDim.pd3,
          ' with Analytics : ',
          error
        );
      }
    };

    /**
     * Selects a ringtone.
     *
     * @param {Object} data - The data object containing optional parameters.
     * @param {0|1} data.value - The event value. The same (0) or a new (1) ringtone.
     * @param {{ pd1: string, pd2: string, pd3: 'technologies'|'3ds_phone'|'solarium'|'upbeat'|'documentary' }} data.persDim - The personalized dimension.
     * @param {object} data.persVal - The personalized value.
     */
    const selectRingtone = async (data = {}) => {
      const logger = await Logger();
      const { persDim, persVal, value } = data;

      report.eventCategory = 'collabexperience.calls';
      report.eventAction = 'selectRingtone';
      report.eventLabel = `Select ${value ? 'a new' : 'the same'} ringtone`;
      report.eventValue = value;
      report.persDim = persDim;
      report.persVal = persVal;
      try {
        logger.RTCallComponents('[TRACKER] Select ringtone with Analytics : ' + JSON.stringify(report));
        const trackerAPI = await getTrackerAPI();
        trackerAPI.trackPageEvent(report);
      } catch (error) {
        logger.RTCallComponents('[TRACKER] request failed for action "Select ringtone" : ' + error);
      }
    };

    /**
     * Click on play / pause button of the ringtone / speaker player.
     *
     * @param {Object} data - The data object containing optional parameters.
     * @param {0|1} data.value - The event value. Pause (0) / Play (1).
     * @param {{ pd1: string, pd2: string, pd3: 'technologies'|'3ds_phone'|'solarium'|'upbeat'|'documentary' }} data.persDim - The personalized dimension.
     * @param {object} data.persVal - The personalized value.
     */
    const testRingtone = async (data = {}) => {
      const logger = await Logger();
      const { persDim, persVal, value } = data;

      report.eventCategory = 'collabexperience.calls';
      report.eventAction = 'testRingtone';
      report.eventLabel = `Click on ${value ? 'play' : 'pause'} the speaker/ringtone player`;
      report.eventValue = value;
      report.persDim = persDim;
      report.persVal = persVal;
      try {
        logger.RTCallComponents('[TRACKER] Click player with Analytics : ' + JSON.stringify(report));
        const trackerAPI = await getTrackerAPI();
        trackerAPI.trackPageEvent(report);
      } catch (error) {
        logger.RTCallComponents('[TRACKER] request failed for action "Click on speaker/ringtone player" : ' + error);
      }
    };

    /**
     * Call Settings error.
     *
     * @param {Object} data - The data object containing optional parameters.
     * @param {{ pd1: string, pd2: string, pd3: Error, pd4?: 'video'|'audio' }} data.persDim - The personalized dimension.
     * @param {object} data.persVal - The personalized value.
     */
    const callSettingsError = async (data = {}) => {
      const logger = await Logger();
      const { persDim, persVal } = data;

      report.eventCategory = 'collabexperience.calls';
      report.eventAction = 'callSettingsError';
      report.eventLabel = 'Call Settings error';
      // report.eventValue = 0;
      report.persDim = persDim;
      report.persVal = persVal;
      try {
        logger.RTCallComponents('[TRACKER] Call Settings error with Analytics : ' + JSON.stringify(report));
        const trackerAPI = await getTrackerAPI();
        trackerAPI.trackPageEvent(report);
      } catch (error) {
        logger.RTCallComponents('[TRACKER] request failed for action "Call Settings error" : ' + error);
      }
    };

    return {
      openCallSettings,
      saveCallSettings,
      closeCallSettings,
      changeDevice,
      selectRingtone,
      testRingtone,
      callSettingsError,
    };
  };

  return {
    clearHistory,
    callSettings,
  };
}
