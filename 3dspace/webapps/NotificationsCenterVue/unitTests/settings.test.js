import { createPinia, setActivePinia } from 'pinia';
import { beforeAll, describe, expect, it } from 'vitest';

import useNotificationsStore from '../src/stores/notifications';

import { setHistory } from './functions/setHistory';
import { setSettings } from './functions/setSettings';
import { setup } from './functions/setup';

const { initDriver, init } = setup();

describe('notification Center Vue Settings ODT', () => {
  beforeAll(async () => {
    setActivePinia(createPinia());
  });
  it('init Driver', async () => {
    await initDriver();
    //
    expect(true)
      .toBe(true);
  });

  it('init Center', async () => {
    await init();
    //
    expect(true)
      .toBe(true);
  });

  it('setHistory', async () => {
    const result = await setHistory();

    expect(result)
      .toBe(true);
    //
    const store = useNotificationsStore();
    console.log('setHistory', store.notifications.size);
  });

  it('setSettings', () => {
    expect(setSettings())
      .toBe(true);
  });

  // todo : add more tests specific to the settings
});
