import { VuSingleCheckbox } from '@ds/platformkit/components';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { computed, nextTick, ref } from 'vue';

import { setup } from '../functions/setup';

import TogglePreference from '~/components/BaseCenter/CenterBody/Preferences/App/TogglePreference.vue';
import { useTogglePreference } from '~/composables/preferences/App/useTogglePreference';
import { useToggleHelper } from '~/composables/preferences/useToggleHelper';
import useSettingsStore from '~/stores/settings';

const { init, initDriver } = setup();

const messageNoticeMock = vi.fn();
const alertConfirmNoticeMock = vi.fn();

vi.mock('~/composables/preferences/usePreferencesManagement', () => ({
  usePreferencesManagement: vi.fn(() => ({
    messageNotice: messageNoticeMock,
    alertConfirmNotice: alertConfirmNoticeMock,
  })),
}));

describe('component togglePreference', () => {
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
    const store = useSettingsStore();
    store.setWindoShow('PREFERENCES');
    vi.clearAllMocks();
  });

  it('initialisation', async () => {
    const wrapper = mount(TogglePreference);
    expect(wrapper.exists())
      .toBe(true);
  });

  it('emit chevronUpdate when click on text or chevron', async () => {
    const wrapper = mount(TogglePreference, { props: { needDropDown: true } });
    expect(wrapper.exists())
      .toBe(true);

    const dropdown = wrapper.find('[data-testid="toggle-preference-dropdown"]');
    expect(dropdown.exists());

    const description = wrapper.find('[data-testid="description-preference-dropdown"]');
    expect(description.exists());

    await dropdown.trigger('click');
    await description.trigger('click');

    expect(wrapper.emitted())
      .toHaveProperty('chevronUpdate');
    expect(wrapper.emitted('chevronUpdate'))
      .toHaveLength(2);
  });

  it('no DropDown so don\'t emit chevronUpdate when click on text', async () => {
    const wrapper = mount(TogglePreference, { props: { needDropDown: false } });
    expect(wrapper.exists())
      .toBe(true);

    const dropdown = wrapper.find('[data-testid="toggle-preference-dropdown"]');
    expect(!dropdown.exists());

    const description = wrapper.find('[data-testid="description-preference-dropdown"]');
    expect(description.exists());

    await description.trigger('click');

    expect(wrapper.emitted()).not
      .toHaveProperty('chevronUpdate');
  });

  it('admin emit lockUpdate', async () => {
    const store = useSettingsStore();
    store.setWindoShow('PLATFORM_PREFERENCES');
    const wrapper = mount(TogglePreference, { props: { lock: true } });

    expect(wrapper.exists())
      .toBe(true);

    const lockContainer = wrapper.find('[data-testid="toggle-preference-lock-container"]');

    await lockContainer.trigger('click');

    expect(wrapper.emitted())
      .toHaveProperty('lockUpdate');
    expect(wrapper.emitted('lockUpdate'))
      .toHaveLength(1);
  });

  it('user don\'t emit lockUpdate', async () => {
    const wrapper = mount(TogglePreference, { props: { lock: true } });

    expect(wrapper.exists())
      .toBe(true);

    const lockContainer = wrapper.find('[data-testid="toggle-preference-lock-container"]');

    await lockContainer.trigger('click');

    expect(wrapper.emitted()).not
      .toHaveProperty('lockUpdate');
  });

  it('lock not exist', async () => {
    const wrapper = mount(TogglePreference, { props: { lock: false } });
    expect(wrapper.exists())
      .toBe(true);

    const lockContainer = wrapper.find('[data-testid="toggle-preference-lock-container"]');
    expect(!lockContainer.exists());
  });

  it('toggleUpdate exist and emit toggleUpdate', async () => {
    const wrapper = mount(TogglePreference, {
      props: { toggleValue: true },
    });

    expect(wrapper.exists())
      .toBe(true);

    const checkbox = wrapper.findComponent(VuSingleCheckbox);
    expect(checkbox.exists())
      .toBe(true);

    await checkbox.vm.$emit('update:modelValue', false);
    await flushPromises();

    expect(wrapper.emitted())
      .toHaveProperty('toggleUpdate');
    expect(wrapper.emitted('toggleUpdate'))
      .toHaveLength(1);
  });

  it('toggleUpdate not exist', async () => {
    const wrapper = mount(TogglePreference, { props: { toggleValue: false } });

    expect(wrapper.exists())
      .toBe(true);

    const switchContainer = wrapper.find('[data-testid="toggle-preference-switch-container"]');
    expect(!switchContainer.exists);
  });

  it('message not allowed is diaplayed when user try to modify forced preference', async () => {
    const wrapper = mount(TogglePreference, { props: { lock: true, toggleValue: true } });
    wrapper.find('[data-testid="toggle-preference-switch-container"]')
      .find('label')
      .trigger('click');

    expect(messageNoticeMock)
      .toHaveBeenCalledTimes(1);
  });

  describe('togglePreference helper', () => {
    function setSetting(settingId, { state, readOnly, emailState, emailReadOnly }) {
      const settingStore = useSettingsStore();
      const setting = computed(() => settingStore.getSetting(settingId));

      setting.value.updateTheSettings = () => { };
      setting.value.setEnable(state);
      setting.value.setReadOnly(readOnly);
      setting.value.set_notif_by_emailEnabled(emailState);
      setting.value.set_notif_by_emailReadOnly(emailReadOnly);
    }
    it('helper enable without option', async () => {
      alertConfirmNoticeMock.mockResolvedValue(true);
      const settingId = ref(10);
      setSetting(settingId.value, { state: true, readOnly: false, emailState: false, emailReadOnly: true });

      const {
        state,
        isReadOnly,
        updateState,
        updateReadOnly,
      } = useToggleHelper(settingId);
      expect(state.value)
        .toBe(true);
      expect(isReadOnly.value)
        .toBe(false);
      await updateState(false);
      await updateReadOnly(true);
      expect(state.value)
        .toBe(false);
      expect(isReadOnly.value)
        .toBe(true);
    });
    it('helper enable with option', async () => {
      alertConfirmNoticeMock.mockResolvedValue(true);
      const option = ref({ name: 'email', fonticonName: 'icon-desktop-email' });
      const settingId = ref(10);
      setSetting(settingId.value, { state: true, readOnly: false, emailState: false, emailReadOnly: true });

      const {
        state,
        isReadOnly,
        updateState,
        updateReadOnly,
      } = useToggleHelper(settingId, option);
      expect(state.value)
        .toBe(false);
      expect(isReadOnly.value)
        .toBe(true);
      await updateState(true);
      await updateReadOnly(false);
      expect(state.value)
        .toBe(true);
      expect(isReadOnly.value)
        .toBe(false);
    });
    it('admin helper need confirmation, confiramtion false', async () => {
      alertConfirmNoticeMock.mockResolvedValue(false);
      const settingStore = useSettingsStore();
      settingStore.setWindoShow('PLATFORM_PREFERENCES');

      await nextTick();

      const settingId = ref(9);
      const setting = computed(() => settingStore.getSetting(settingId.value));
      setSetting(settingId.value, { state: true, readOnly: false, emailState: false, emailReadOnly: true });

      const {
        revertLock,
        revertToggleEnable,
      } = useTogglePreference({ needDropDown: false, lock: setting.value.readOnly, toggleValue: setting.value.enable });

      const {
        state,
        isReadOnly,
        updateState,
        updateReadOnly,
      } = useToggleHelper(settingId);
      await updateState(false, revertToggleEnable);
      await updateReadOnly(true, revertLock);
      expect(state.value)
        .toBe(true);
      expect(isReadOnly.value)
        .toBe(false);

      expect(alertConfirmNoticeMock)
        .toHaveBeenCalledTimes(2);
    });
    it('admin helper need confirmation, confiramtion true', async () => {
      alertConfirmNoticeMock.mockResolvedValue(true);
      const settingStore = useSettingsStore();
      settingStore.setWindoShow('PLATFORM_PREFERENCES');

      await nextTick();

      const settingId = ref(9);
      setSetting(settingId.value, { state: false, readOnly: true, emailState: false, emailReadOnly: true });

      const {
        state,
        isReadOnly,
        updateState,
        updateReadOnly,
      } = useToggleHelper(settingId);
      await updateState(true);
      await updateReadOnly(false);
      expect(state.value)
        .toBe(true);
      expect(isReadOnly.value)
        .toBe(false);

      expect(alertConfirmNoticeMock)
        .toHaveBeenCalledTimes(2);
    });
  });
});
