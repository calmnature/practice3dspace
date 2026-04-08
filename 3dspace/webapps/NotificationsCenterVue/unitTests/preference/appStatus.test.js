import { mount } from '@vue/test-utils';
import { useNow } from '@vueuse/core';
import { createPinia, setActivePinia } from 'pinia';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';

import { setup } from '../functions/setup';

import AppStatus from '~/components/BaseCenter/CenterBody/Preferences/App/AppStatus.vue';
import { useAppStatus } from '~/composables/preferences/App/useAppStatus';
import { Setting } from '~/models/setting';

const { init, initDriver } = setup();

vi.mock('@vueuse/core', async () => {
  const actual = await vi.importActual('@vueuse/core');
  return {
    ...actual,
    useNow: vi.fn(),
  };
});

vi.mock('~/composables/useTranslations', () => ({
  default: () => ({
    $i18n: key => key,
  }),
}));

function createSetting({ subscribe, ui, email, browser, date }) {
  return new Setting({
    id: 11,
    name: 'GLOBAL',
    serviceName: '3DDashboard',
    service: 'X3DDASH_AP',
    icon: 'https://euw1-devprol42-apps.3dx-staging.3ds.com:443/enovia/widget/images/MyApps/X3DDASH_AP_AppIcon.svg',
    subscribe,
    notif_by_ui: ui !== undefined ? ui : 0,
    notif_by_email: email !== undefined ? email : 0,
    notif_by_browser: browser !== undefined ? browser : 0,
    unsubscribe_date: date !== undefined ? date : null,
  });
}

describe('appStatus test', () => {
  let mockNow;
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
    mockNow = ref(new Date('2025-01-07T10:00:00Z'));

    vi.mocked(useNow)
      .mockReturnValue(mockNow);
  });

  it('init', async () => {
    const wrapper = mount(AppStatus, {
      props: {
        setting: createSetting({ subscribe: 1, ui: 1, email: 1, browser: 1, date: '2025-01-07T10:30:00.000Z' }),
      },
    });

    expect(wrapper.exists())
      .toBe(true);
  });
  describe('statusText - disabled state', () => {
    it('should return "settingOff" when setting is disabled (subscribe: 0)', () => {
      const setting = ref(createSetting({ subscribe: 0 }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('settingOff');
    });
  });

  describe('statusText - enabled without unsubscribe_date', () => {
    it('should return only "centerIconText" when no notifications enabled', () => {
      const setting = ref(createSetting({
        subscribe: 1,
        ui: 0,
        email: 0,
        browser: 0,
      }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('centerIconText');
    });

    it('should return "centerIconText, alertIconText" when only UI enabled', () => {
      const setting = ref(createSetting({
        subscribe: 1,
        ui: 1,
        email: 0,
        browser: 0,
      }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('centerIconText, alertIconText');
    });

    it('should return "centerIconText, emailIconText" when only email enabled', () => {
      const setting = ref(createSetting({
        subscribe: 1,
        ui: 0,
        email: 1,
        browser: 0,
      }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('centerIconText, emailIconText');
    });

    it('should return "centerIconText, browserIconText" when only browser enabled', () => {
      const setting = ref(createSetting({
        subscribe: 1,
        ui: 0,
        email: 0,
        browser: 1,
      }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('centerIconText, browserIconText');
    });

    it('should return all notification types when all enabled', () => {
      const setting = ref(createSetting({
        subscribe: 1,
        ui: 1,
        email: 1,
        browser: 1,
      }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('centerIconText, alertIconText, emailIconText, browserIconText');
    });
  });

  describe('statusText - with unsubscribe_date', () => {
    it('should return "settingOffForAnHour (1 minLeft)" when 1 minute remaining', () => {
      const setting = ref(createSetting({
        subscribe: 1,
        date: '2025-01-07T10:01:00.000Z',
      }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('settingOffForAnHour (1 minLeft)');
    });

    it('should return "settingOffForAnHour (30 minLeft)" when 30 minutes remaining', () => {
      const setting = ref(createSetting({
        subscribe: 1,
        date: '2025-01-07T10:30:00.000Z',
      }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('settingOffForAnHour (30 minLeft)');
    });

    it('should return "settingOffForAnHour (59 minLeft)" when 59 minutes remaining', () => {
      const setting = ref(createSetting({
        subscribe: 1,
        date: '2025-01-07T10:59:00.000Z',
      }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('settingOffForAnHour (59 minLeft)');
    });

    it('should return "settingOffForAnHour (1 hourLeft)" when exactly 60 minutes', () => {
      const setting = ref(createSetting({
        subscribe: 1,
        date: '2025-01-07T11:00:00.000Z',
      }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('settingOffForAnHour (1 hourLeft)');
    });

    it('should return "settingOffForAnHour (1 hourLeft)" when more than 60 minutes (capped)', () => {
      const setting = ref(createSetting({
        subscribe: 1,
        date: '2025-01-07T12:00:00.000Z',
      }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('settingOffForAnHour (1 hourLeft)');
    });

    it('should handle past dates (Math.abs)', () => {
      const setting = ref(createSetting({
        subscribe: 1,
        date: '2025-01-07T09:30:00.000Z',
      }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('settingOffForAnHour (30 minLeft)');
    });
  });

  describe('statusText - reactivity', () => {
    it('should update when setting.enable changes', async () => {
      const setting = ref(createSetting({ subscribe: 0 }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('settingOff');

      setting.value = createSetting({ subscribe: 1, ui: 1 });
      await nextTick();

      expect(statusText.value)
        .toBe('centerIconText, alertIconText');
    });

    it('should update when notification types change', async () => {
      const setting = ref(createSetting({ subscribe: 1, ui: 1 }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('centerIconText, alertIconText');

      setting.value = createSetting({ subscribe: 1, ui: 1, email: 1 });
      await nextTick();

      expect(statusText.value)
        .toBe('centerIconText, alertIconText, emailIconText');
    });

    it('should update when time advances', async () => {
      const setting = ref(createSetting({
        subscribe: 1,
        date: '2025-01-07T10:30:00.000Z',
      }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('settingOffForAnHour (30 minLeft)');

      mockNow.value = new Date('2025-01-07T10:10:00Z');
      await nextTick();

      expect(statusText.value)
        .toBe('settingOffForAnHour (20 minLeft)');
    });

    it('should update when unsubscribe_date is set', async () => {
      const setting = ref(createSetting({ subscribe: 1, ui: 1 }));
      const { statusText } = useAppStatus({ setting });

      expect(statusText.value)
        .toBe('centerIconText, alertIconText');

      setting.value = createSetting({ subscribe: 1, ui: 1 });
      await nextTick();

      expect(statusText.value)
        .toBe('centerIconText, alertIconText');
    });
  });

  describe('component integration', () => {
    it('should display correct status in component when disabled', () => {
      const wrapper = mount(AppStatus, {
        props: {
          setting: createSetting({ subscribe: 0 }),
        },
      });

      expect(wrapper.text())
        .toContain('settingOff');
    });

    it('should display correct status in component when enabled', () => {
      const wrapper = mount(AppStatus, {
        props: {
          setting: createSetting({ subscribe: 1, ui: 1, email: 1 }),
        },
      });

      expect(wrapper.text())
        .toContain('centerIconText');
      expect(wrapper.text())
        .toContain('alertIconText');
      expect(wrapper.text())
        .toContain('emailIconText');
    });

    it('should display countdown when unsubscribed', () => {
      const wrapper = mount(AppStatus, {
        props: {
          setting: createSetting({
            subscribe: 1,
            date: '2025-01-07T10:30:00.000Z',
          }),
        },
      });

      expect(wrapper.text())
        .toContain('settingOffForAnHour');
      expect(wrapper.text())
        .toContain('30');
      expect(wrapper.text())
        .toContain('minLeft');
    });
  });
});
