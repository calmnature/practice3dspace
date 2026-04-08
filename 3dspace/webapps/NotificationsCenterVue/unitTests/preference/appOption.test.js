import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { computed, ref } from 'vue';

import { setup } from '../functions/setup';

import AppOption from '~/components/BaseCenter/CenterBody/Preferences/App/AppOption.vue';
import { useAppOption } from '~/composables/preferences/App/useAppOption';
import { usePreferencesManagement } from '~/composables/preferences/usePreferencesManagement';
import useSettingsStore from '~/stores/settings';

vi.mock('~/composables/useTranslations', () => ({
  default: () => ({
    $i18n: key => key,
  }),
}));

vi.mock('~/composables/preferences/App/useAppOption', async () => {
  const actual = await vi.importActual('~/composables/preferences/App/useAppOption');
  return {
    useAppOption: vi.fn((...args) => {
      const real = actual.useAppOption(...args);
      return {
        ...real, // ✅ Garde tout le comportement réel
        updateSetting: vi.fn(), // ✅ Mock juste cette méthode
      };
    }),
  };
});

vi.mock('~/composables/preferences/usePreferencesManagement', () => ({
  usePreferencesManagement: vi.fn(() => ({
    messageNotice: vi.fn(),
    settingUpdateVerification: vi.fn()
      .mockReturnValue(true),
  })),
}));

const { initDriver, init } = setup();

function setSetting(settingId, { state, readOnly, optionState, optionReadOnly }) {
  const settingStore = useSettingsStore();
  const setting = computed(() => settingStore.getSetting(settingId));

  setting.value.updateTheSettings = () => { };
  setting.value.setEnable(state);
  setting.value.setReadOnly(readOnly);
  setting.value.set_notif_by_emailEnabled(optionState);
  setting.value.set_notif_by_emailReadOnly(optionReadOnly);
}

function resultAppSetting(settingId, option, expectedResult) {
  const {
    displayOption,
    cursorReadOnly,
    needToggle,
    optionEnabled,
  } = useAppOption({ settingId, option });
  if (expectedResult.displayOption !== undefined) {
    expect(displayOption.value)
      .toBe(expectedResult.displayOption);
  }
  if (expectedResult.cursorReadOnly !== undefined) {
    expect(cursorReadOnly.value)
      .toBe(expectedResult.cursorReadOnly);
  }
  if (expectedResult.needToggle !== undefined) {
    expect(needToggle.value)
      .toBe(expectedResult.needToggle);
  }
  if (expectedResult.optionEnabled !== undefined) {
    expect(optionEnabled.value)
      .toBe(expectedResult.optionEnabled);
  }
}
describe('appOption test', () => {
  beforeAll(() => {
    try {
      setActivePinia(createPinia());
      initDriver();
      init();
    }
    catch (error) {
      console.log(error);
    }
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('init composant', () => {
    const option = { name: 'email', fonticonName: 'icon-desktop-email' };
    const wrapper = mount(AppOption, { props: { settingId: 11, option } });
    expect(wrapper.exists())
      .toBe(true);
  });
  it('composant change state option', async () => {
    const option = { name: 'email', fonticonName: 'icon-desktop-email' };
    const wrapper = mount(AppOption, { props: { settingId: 11, option } });

    // Récupérer le mock de updateSetting
    const mockCall = vi.mocked(useAppOption).mock.results[0].value;
    const updateSettingMock = mockCall.updateSetting;

    const app = wrapper.find('[data-testid="app-option-logo-container"]');
    app.trigger('click');

    expect(updateSettingMock)
      .toHaveBeenCalled(); ;
  });
  it('composable with setting and option enable', () => {
    const option = ref({ name: 'email', fonticonName: 'icon-desktop-email' });
    const settingId = ref(11);
    setSetting(settingId.value, { state: true, readOnly: false, optionState: true, optionReadOnly: false });

    resultAppSetting(settingId, option, { displayOption: true, cursorReadOnly: false, needToggle: false, optionEnabled: true });
  });

  it('composable with setting enable and option disable', () => {
    const option = ref({ name: 'email', fonticonName: 'icon-desktop-email' });
    const settingId = ref(11);
    setSetting(settingId.value, { state: true, readOnly: false, optionState: false, optionReadOnly: false });

    resultAppSetting(settingId, option, { displayOption: true, cursorReadOnly: false, needToggle: false, optionEnabled: false });
  });

  it('composable with setting enable and option: enable and readOnly', () => {
    const option = ref({ name: 'email', fonticonName: 'icon-desktop-email' });
    const settingId = ref(11);
    setSetting(settingId.value, { state: true, readOnly: false, optionState: true, optionReadOnly: true });

    resultAppSetting(settingId, option, { displayOption: true, cursorReadOnly: true, needToggle: false, optionEnabled: true });
  });

  it('composable with setting enable and option: disable and readOnly', () => {
    const option = ref({ name: 'email', fonticonName: 'icon-desktop-email' });
    const settingId = ref(11);
    setSetting(settingId.value, { state: true, readOnly: false, optionState: false, optionReadOnly: true });

    resultAppSetting(settingId, option, { displayOption: true, cursorReadOnly: true, needToggle: false, optionEnabled: false });
  });

  it('composable with setting disabled', () => {
    const option = ref({ name: 'email', fonticonName: 'icon-desktop-email' });
    const settingId = ref(11);
    setSetting(settingId.value, { state: false, readOnly: false, optionState: false, optionReadOnly: false });

    resultAppSetting(settingId, option, { displayOption: false });
  });

  it('composable with setting disabled and option readOnly', () => {
    const option = ref({ name: 'email', fonticonName: 'icon-desktop-email' });
    const settingId = ref(11);
    setSetting(settingId.value, { state: false, readOnly: false, optionState: false, optionReadOnly: true });

    resultAppSetting(settingId, option, { displayOption: true, cursorReadOnly: true, needToggle: false, optionEnabled: false });
  });

  it('composable in PlatformPreferences with setting enable', () => {
    const option = ref({ name: 'email', fonticonName: 'icon-desktop-email' });
    const settingId = ref(11);
    const settingStore = useSettingsStore();
    settingStore.setWindoShow('PLATFORM_PREFERENCES');

    setSetting(settingId.value, { state: true, readOnly: false, optionState: true, optionReadOnly: false });

    resultAppSetting(settingId, option, { displayOption: true, cursorReadOnly: false, needToggle: true });
    settingStore.setWindoShow('PREFERENCES');
  });

  it('composable updateSetting with readOnly to true', async () => {
    const { useAppOption: realUseAppOption } = await vi.importActual(
      '~/composables/preferences/App/useAppOption',
    );

    const option = ref({ name: 'email', fonticonName: 'icon-desktop-email' });
    const settingId = ref(11);

    setSetting(settingId.value, {
      state: true,
      readOnly: true,
      optionState: true,
      optionReadOnly: false, // ← Pas les deux à true
    });

    const { updateSetting } = realUseAppOption({ settingId, option });

    await updateSetting();

    // ✅ Debug : Voir combien d'appels
    //
    const mockCall = vi.mocked(usePreferencesManagement).mock.results[1]; // ← Pas [0] !

    if (!mockCall?.value) {
      throw new Error('Le deuxième appel à usePreferencesManagement n\'a pas été fait');
    }

    const messageNoticeMock = mockCall.value.messageNotice;

    expect(messageNoticeMock)
      .toHaveBeenCalled();
    expect(messageNoticeMock)
      .toHaveBeenCalledWith('forcedPreference', 3000);
  });
  it('composable updateSetting with optionReadOnly to true', async () => {
    const { useAppOption: realUseAppOption } = await vi.importActual(
      '~/composables/preferences/App/useAppOption',
    );

    const option = ref({ name: 'email', fonticonName: 'icon-desktop-email' });
    const settingId = ref(11);

    setSetting(settingId.value, {
      state: true,
      readOnly: false,
      optionState: true,
      optionReadOnly: true, // ← Pas les deux à true
    });

    const { updateSetting } = realUseAppOption({ settingId, option });

    await updateSetting();

    // ✅ Debug : Voir combien d'appels
    //
    const mockCall = vi.mocked(usePreferencesManagement).mock.results[1]; // ← Pas [0] !

    if (!mockCall?.value) {
      throw new Error('Le deuxième appel à usePreferencesManagement n\'a pas été fait');
    }

    const messageNoticeMock = mockCall.value.messageNotice;

    expect(messageNoticeMock)
      .toHaveBeenCalled();
    expect(messageNoticeMock)
      .toHaveBeenCalledWith('forcedPreference', 3000);
  });
  it('composable updateSetting email', async () => {
    const { useAppOption: realUseAppOption } = await vi.importActual(
      '~/composables/preferences/App/useAppOption',
    );

    const option = ref({ name: 'email', fonticonName: 'icon-desktop-email' });
    const settingId = ref(11);

    setSetting(settingId.value, {
      state: true,
      readOnly: false,
      optionState: false,
      optionReadOnly: false,
    });

    const { updateSetting } = realUseAppOption({ settingId, option });

    await updateSetting();

    const mockCall = vi.mocked(usePreferencesManagement).mock.results[0];

    if (!mockCall?.value) {
      throw new Error('Le deuxième appel à usePreferencesManagement n\'a pas été fait');
    }

    const settingUpdateVerificationMock = mockCall.value.settingUpdateVerification;

    expect(settingUpdateVerificationMock)
      .toHaveBeenCalled();

    const settingStore = useSettingsStore();
    const setting = computed(() => settingStore.getSetting(settingId.value));
    expect(setting.value.notif_by_emailEnabled)
      .toBe(true);
  });
});
