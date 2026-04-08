import requirejs from '~/modules/require';

async function getPlatformAPI() {
  const [PlatformAPI] = await requirejs(['DS/PlatformAPI/PlatformAPI']);
  return PlatformAPI;
}

export { getPlatformAPI };

async function getI3DXCompassPlatformServices() {
  const [i3DXCompassPlatformServices] = await requirejs(['DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices']);
  return i3DXCompassPlatformServices;
}

export { getI3DXCompassPlatformServices };

async function getTransientWidget() {
  const [TransientWidget] = await requirejs(['DS/TransientWidget/TransientWidget']);
  return TransientWidget;
}

export { getTransientWidget };

async function getWAFData() {
  const [WAFData] = await requirejs(['DS/WAFData/WAFData']);
  return WAFData;
}

export { getWAFData };

async function getOpenWith() {
  const [OpenWith] = await requirejs(['DS/i3DXCompassPlatformServices/OpenWith']);
  return OpenWith;
}

export { getOpenWith };

async function getTrackerAPI() {
  const [TrackerAPI] = await requirejs(['DS/Usage/TrackerAPI']);
  return TrackerAPI;
}

export { getTrackerAPI };

async function getCompassData() {
  const [CompassData] = await requirejs(['DS/i3DXCompass/Data']);
  return CompassData;
}

export { getCompassData };

async function getI18n() {
  const [I18n] = await requirejs(['DS/UWPClientCode/I18n']);
  return I18n;
}

export { getI18n };
