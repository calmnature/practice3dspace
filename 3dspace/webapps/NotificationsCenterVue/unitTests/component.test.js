import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeAll, describe, expect, it } from 'vitest';

import BaseCenter from '../src/components/BaseCenter/BaseCenter.vue';
import NoNotification from '../src/components/BaseCenter/CenterBody/NoNotification.vue';
import NotificationActions from '../src/components/BaseCenter/CenterBody/Notification/NotificationBody/NotificationActions.vue';
import NotificationBody from '../src/components/BaseCenter/CenterBody/Notification/NotificationBody/NotificationBody.vue';
import NotificationDate from '../src/components/BaseCenter/CenterBody/Notification/NotificationBody/NotificationDate.vue';
import NotificationIcon from '../src/components/BaseCenter/CenterBody/Notification/NotificationBody/NotificationIcon.vue';
import NotificationMenu from '../src/components/BaseCenter/CenterBody/Notification/NotificationBody/NotificationMenu.vue';
import NotificationMessage from '../src/components/BaseCenter/CenterBody/Notification/NotificationBody/NotificationMessage.vue';
import NotificationStatus from '../src/components/BaseCenter/CenterBody/Notification/NotificationBody/NotificationStatus.vue';
import NotificationDeleted from '../src/components/BaseCenter/CenterBody/Notification/NotificationDeleted.vue';
import NotificationItem from '../src/components/BaseCenter/CenterBody/Notification/NotificationItem.vue';
import NotificationMergesList from '../src/components/BaseCenter/CenterBody/Notification/NotificationMergesList.vue';
import SectionItem from '../src/components/BaseCenter/CenterBody/SectionItem.vue';
import SectionList from '../src/components/BaseCenter/CenterBody/SectionList.vue';
import CenterHeader from '../src/components/BaseCenter/CenterHeader/CenterHeader.vue';
import FilterBody from '../src/components/BaseCenter/CenterHeader/FilterBody/FilterBody.vue';
import FilterButtons from '../src/components/BaseCenter/CenterHeader/FilterBody/FilterButtons.vue';
import FilterOptions from '../src/components/BaseCenter/CenterHeader/FilterBody/FilterOptions.vue';
import Filter from '../src/components/BaseCenter/CenterHeader/Toolbar/Filter.vue';
import SelectTool from '../src/components/BaseCenter/CenterHeader/Toolbar/SelectTool.vue';
import SelectWrapper from '../src/components/BaseCenter/CenterHeader/Toolbar/SelectWrapper.vue';
import Setting from '../src/components/BaseCenter/CenterHeader/Toolbar/Setting.vue';
import Toolbar from '../src/components/BaseCenter/CenterHeader/Toolbar/Toolbar.vue';
import UnreadCounter from '../src/components/BaseCenter/CenterHeader/UnreadCounter.vue';
import useNotificationsStore from '../src/stores/notifications';

import { setHistory } from './functions/setHistory';
import { setup } from './functions/setup';

import actions from '~/test/mock/actions.json';

const { initDriver, init } = setup();
describe('notification Center Vue Components ODT', () => {
  beforeAll(async () => {
    setActivePinia(createPinia());
    initDriver();
    init();
    setHistory();
  });
  //
  it('unreadCounter', async () => {
    const wrapper = mount(UnreadCounter);
    expect(wrapper.exists())
      .toBe(true);
  });
  //
  it('centerHeader', async () => {
    const wrapper = mount(CenterHeader);
    expect(wrapper.exists())
      .toBe(true);
  });
  //
  it('filterBody', async () => {
    const wrapper = mount(FilterBody);
    expect(wrapper.exists())
      .toBe(true);
  });
  //
  it('filterButtons', async () => {
    const wrapper = mount(FilterButtons);
    expect(wrapper.exists())
      .toBe(true);
  });
  //
  it('filterOptions', async () => {
    const wrapper = mount(FilterOptions);
    expect(wrapper.exists())
      .toBe(true);
  });
  //
  it('filter', async () => {
    const wrapper = mount(Filter);
    expect(wrapper.exists())
      .toBe(true);
  });
  //
  it('selectTool', async () => {
    const wrapper = mount(SelectTool);
    expect(wrapper.exists())
      .toBe(true);
  });
  //
  it('selectWrapper', async () => {
    const wrapper = mount(SelectWrapper);
    expect(wrapper.exists())
      .toBe(true);
  });
  it('setting', async () => {
    const wrapper = mount(Setting);
    expect(wrapper.exists())
      .toBe(true);
  });
  it('toolbar', async () => {
    const wrapper = mount(Toolbar);
    expect(wrapper.exists())
      .toBe(true);
  });

  it('notificationDate', async () => {
    const date = new Date()
      .toDateString();
    const wrapper = mount(NotificationDate, {
      props: {
        date,
        isRead: true,
      },
    });
    //
    expect(wrapper.classes())
      .toContain('INTFCenter-is-read');
    expect(wrapper.exists())
      .toBe(true);
    expect(wrapper.html())
      .toContain(date);
  });
  //

  //
  it('notificationActions', async () => {
    const wrapper = mount(NotificationActions, {
      // shallow: true,
      props: {
        actions,
      },
    });
    //

    expect(wrapper.exists())
      .toBe(true);
    // expect(wrapper.html()).toContain(date);
  });

  it('notificationMenu', async () => {
    const store = useNotificationsStore();
    const notification = store.getNotificationById('5332-devprol42');
    // console.log('options', notification.OPTIONS);
    const wrapper = mount(NotificationMenu, {
      props: {
        options: notification.OPTIONS,
      },
    });
    //

    expect(wrapper.exists())
      .toBe(true);
    // expect(wrapper.html()).toContain(date);
  });

  it('notificationBody', async () => {
    const store = useNotificationsStore();
    const notification = store.getNotificationById('5332-devprol42');
    const wrapper = mount(NotificationBody, {
      props: {
        notification,
      },
    });
    //

    expect(wrapper.exists())
      .toBe(true);
    // expect(wrapper.html()).toContain(date);
  });
  it('notificationMessage', async () => {
    const store = useNotificationsStore();
    const notification = store.getNotificationById('5332-devprol42');
    const wrapper = mount(NotificationMessage, {
      props: {
        notification,
      },
    });
    //

    expect(wrapper.exists())
      .toBe(true);
    // expect(wrapper.html()).toContain(date);
  });

  it('notificationIcon', async () => {
    const wrapper = mount(NotificationIcon, {
      props: {
        icon: './../../resources/en/1/webapps/NotifAlert/assets/icons/notificon.png',
      },
    });
    //

    expect(wrapper.exists())
      .toBe(true);
    // expect(wrapper.html()).toContain(date);
  });

  it('notificationStatus', async () => {
    const wrapper = mount(NotificationStatus, {
      props: {
        isRead: false,
        isStarred: false,
      },
    });
    //

    expect(wrapper.exists())
      .toBe(true);
    // expect(wrapper.html()).toContain(date);
  });

  it('notificationDeleted', async () => {
    const wrapper = mount(NotificationDeleted, {
      props: {
        id: 13,
      },
    });
    //

    expect(wrapper.exists())
      .toBe(true);
    // expect(wrapper.html()).toContain(date);
  });
  //
  it('noNotification', async () => {
    const wrapper = mount(NoNotification);
    //

    expect(wrapper.exists())
      .toBe(true);
    // expect(wrapper.html()).toContain(date);
  });
  it('notificationItem', async () => {
    const store = useNotificationsStore();
    const notification = store.getNotificationById('5332-devprol42');
    const wrapper = mount(NotificationItem, {
      props: {
        notification,
      },
    });
    //

    expect(wrapper.exists())
      .toBe(true);
    // expect(wrapper.html()).toContain(date);
  });
  //
  it('notificationMergesList', async () => {
    const store = useNotificationsStore();
    const notification = store.getNotificationById('5332-devprol42');
    const wrapper = mount(NotificationMergesList, {
      props: {
        mainId: notification.ID,
        groupId: notification.GROUPID,
      },
    });
    //

    expect(wrapper.exists())
      .toBe(true);
    // expect(wrapper.html()).toContain(date);
  });
  //
  it('sectionItem', async () => {
    const store = useNotificationsStore();
    const section = store.sectionList.get(store.sectionListIds[0] ?? expect.fail());
    const wrapper = mount(SectionItem, {
      props: {
        section,
      },
    });
    //

    expect(wrapper.exists())
      .toBe(true);
    // expect(wrapper.html()).toContain(date);
  });
  //
  it('sectionList', async () => {
    const wrapper = mount(SectionList);
    //

    expect(wrapper.exists())
      .toBe(true);
    // expect(wrapper.html()).toContain(date);
  });

  //
  it('baseCenter', async () => {
    const wrapper = mount(BaseCenter);
    //
    // todo: test the center as if it was a user interacting with it
    expect(wrapper.exists())
      .toBe(true);
    // expect(wrapper.html()).toContain(date);
  });
});
