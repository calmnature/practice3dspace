import { getServices, getServicesSettingsOfTenant, getSettings, getTenantAgnosticMode, getTenants, resetBadge } from '../../src/api/senders';

import driver from '~/api/drivers/commonDriver';
import { responseHandler } from '~/api/responseHandlers';

export function setup() {
  /**
   * Initializes the notifications center.
   * @returns {void} A promise that resolves when the initialization is complete.
   */
  const init = () => {
    getServices();
    getServicesSettingsOfTenant();
    getSettings();
    resetBadge({ notifCenterOpened: true });
    getTenants();
    getTenantAgnosticMode();
  };

  /**
   * Initializes the driver.
   * @function initDriver
   * @returns {void}
   */
  const initDriver = () => {
    driver.init(responseHandler);
  };

  return { init, initDriver };
}
