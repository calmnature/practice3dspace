import { getTrackerAPI } from '~/modules/imports';
import useSettingsStore from '~/stores/settings';

async function tracker(report = {}) {
  report.appID = 'X3DNTFC_AP';
  report.eventCategory = 'notification.center.v2';
  try {
    const trackerAPI = await getTrackerAPI();
    trackerAPI.trackPageEvent(report);
  }
  catch (error) {
    console.log(`Analytics request failed for event
      action: ${report.eventAction} with ${report.eventLabel} label: ${error}`);
  }
}

export async function trackPreferences(
  eventAction,
  { setting = null, state, optionType } = {},
) {
  const settingsStore = useSettingsStore();
  const report = {
    eventLabel: settingsStore.isPlatformPreferences ? 'PlatformPreferences' : 'Preferences',
    eventAction,
    eventValue: state ? 1 : 0,
    persDim: {},
  };
  if (setting) {
    report.persDim.pd2 = setting.servicename;
    report.persDim.pd3 = setting.service;
    report.persDim.pd4 = setting.name;
  }

  if (optionType)
    report.persDim.pd5 = optionType;

  await tracker(report);
}
