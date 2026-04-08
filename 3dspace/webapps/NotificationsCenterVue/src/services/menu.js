import { ref } from 'vue';

import {
  deleteAllFilteredNotification,
  deleteAllNotification,
  notificationRead,
  unsubscribe,
  updateTenantAgnosticMode,
} from '~/api/senders';
import { NotificationTrackerUsage } from '~/api/tracker';
import { trackPreferences } from '~/api/trackerv2';
import { useNotificationManagement } from '~/composables/notification/useNotificationManagement';
import { usePreferencesManagement } from '~/composables/preferences/usePreferencesManagement';
import useTranslations from '~/composables/useTranslations';
import useFilterStore from '~/stores/filter';
import useNotificationsStore from '~/stores/notifications';
import useSettingsStore from '~/stores/settings';

const { $i18n } = useTranslations();

// Build the  disabled menu options for the notification center.

/**
 * Marks the selected notifications as read.
 * @param {boolean} read - Indicates whether the notifications should be marked as read or unread.
 * @returns {void}
 */
export function markSelectedAsRead(read) {
  const { multipleSelectionActionTracker } = NotificationTrackerUsage();
  const { getSelected, getNotificationById } = useNotificationsStore();
  const selected = getSelected();
  // length selected items actually concerned about the action
  let length = 0;
  selected.forEach((id) => {
    const notification = getNotificationById(id);
    if (notification.isRead !== read) {
      length++;
      const data = {
        action: 'notificationRead',
        id: notification.ID,
        clusterId: notification.CLUSTER_ID,
        archive: !!notification.FROM_ARCHIVE,
        read,
        ...(notification.isGroup && { groupID: notification.GROUPID, hiddenMerged: true }),
      };
      notificationRead(data);
    }
  });

  // analytics
  multipleSelectionActionTracker()
    .readSelectedNotifications({ read, length });
}

/**
 * Marks the selected notifications as starred or unstarred.
 * @param {boolean} starred - Indicates whether the notifications should be marked as starred or unstarred.
 * @returns {void}
 */
export function markSelectedAsStarred(starred) {
  const { multipleSelectionActionTracker } = NotificationTrackerUsage();
  const { getSelected, getNotificationById } = useNotificationsStore();
  const selected = getSelected();

  let length = 0;
  selected.forEach((id) => {
    const notification = getNotificationById(id);
    if (notification.isStarred !== starred) {
      length++;
      const data = {
        action: 'notificationRead',
        archive: !!notification.FROM_ARCHIVE,
        id: notification.ID,
        starred: 'starred',
        param: starred ? 1 : 0,
        clusterId: notification.CLUSTER_ID,
        ...(notification.isGroup && { groupID: notification.GROUPID, hiddenMerged: true }),
      };
      notificationRead(data);
    }
  });

  // analytics
  multipleSelectionActionTracker()
    .starSelectedNotifications({ starred, length });
}

/**
 * Unsubscribes the selected notifications.
 * @param {boolean} forHour - Indicates whether to unsubscribe for an hour.
 * @returns {void}
 */
export function unsubscribeSelected(forHour) {
  const { multipleSelectionActionTracker } = NotificationTrackerUsage();
  const { getSelected, getNotificationById } = useNotificationsStore();
  // make a copy of the selected items to avoid issues with the array changing while iterating over it
  const copySelected = [...getSelected()];
  // save only one notification for each service
  const notifServices = [];
  // sort and add only one notification for each service
  copySelected.forEach((id) => {
    const notification = getNotificationById(id);
    // get unique service id (setting id)
    const find = notifServices.find(notif => notif.SERVICE_ID === notification.SERVICE_ID);
    if (!find) {
      notifServices.push(notification);
    }
  });

  // unsubscribe
  notifServices.forEach((notification) => {
    const data = {
      id: notification.ID,
      subscribe: 0,
      ...(forHour === true && { forHour: true }),
    };
    unsubscribe(data);
  });

  // analytics
  multipleSelectionActionTracker()
    .unsubscribeSelectedNotifications({ length: copySelected.length });
}

/**
 * Deletes the selected notifications.
 */
export function deleteSelected() {
  const { multipleSelectionActionTracker } = NotificationTrackerUsage();
  const { getSelected, getNotificationById } = useNotificationsStore();
  const { tryNotificationDeletion } = useNotificationManagement();
  const { alertConfirmNotice } = usePreferencesManagement();
  // make a copy of the selected items to avoid issues with the array changing while iterating over it
  alertConfirmNotice({
    title: $i18n('deleteSelectedTitle'),
    msg: $i18n('deleteSelectedMsg'),
  })
    .then((confirmed) => {
      if (confirmed) {
        const copySelected = [...getSelected()];

        copySelected.forEach((id) => {
          const notification = getNotificationById(id);
          tryNotificationDeletion({
            id: notification.ID,
            merge: notification.isMerge,
            group: notification.isGroup,
            archive: !!notification.FROM_ARCHIVE,
            withCancelation: false,
          });
        });

        // analytics
        multipleSelectionActionTracker()
          .deleteSelectedNotifications({ length: copySelected.length });
      }
    });
}
/**
 * Returns an array of menu items for the disabled state.
 * @param {Function} selectAllNotification - The callback function to be executed when the 'selectAll' menu item is clicked.
 * @returns {Array} An array of menu items for the disabled state.
 */
export function selectMenuDisabled(selectAllNotification) {
  return [
    {
      fonticon: '',
      name: 'selectAll',
      text: $i18n('selectAll'),
      handler: () => {
        selectAllNotification();
      },
    },
    {
      class: 'divider',
    },
    {
      fonticon: 'fonticon fonticon-bell-alt',
      name: 'read',
      disabled: true,
      text: $i18n('markSelectedAsRead'),
    },
    {
      fonticon: 'fonticon fonticon-bell',
      name: 'read',
      disabled: true,
      text: $i18n('markSelectedAsUnread'),
    },
    {
      fonticon: 'fonticon fonticon-star',
      name: 'important',
      disabled: true,
      text: $i18n('markSelectedAsStarred'),
    },
    {
      fonticon: 'fonticon fonticon-favorite-off',
      name: 'important',
      text: $i18n('markSelectedAsUnstarred'),
      disabled: true,
    },
    {
      class: 'divider',
    },
    {
      fonticon: 'fonticon fonticon-list-delete',
      name: 'unsubscribe',
      disabled: true,
      text: $i18n('unsubscribeSelected'),
    },
    {
      fonticon: 'fonticon fonticon-trash',
      text: $i18n('deleteSelected'),
      disabled: true,
      name: 'delete',
    },
  ];
}

// Build the menu options for the notification center.

/**
 * Generates a menu based on the provided parameters.
 * @param {boolean} options
 * @param {boolean} options.canSelectMore - Indicates whether more items can be selected.
 * @param {boolean} options.moreThanOneSelected - Indicates whether more than one item is currently selected.
 * @param {Function} options.selectAll - Function to select all items.
 * @param {Function} options.unselectAll - Function to unselect all items.
 * @param {boolean} options.canMarkAsStarredMore - indicates if at least one notification is not marked as important
 * @param {boolean} options.canMarkSelectedAsUnstarred - indicates if at least one notification is not marked not important
 * @param {boolean} options.canMarkAllAsRead - indicates if at least one notification is not marked as read
 * @param {boolean} options.canMarkAllAsUnread - indicates if at least one notification is not marked as not read
 * @returns {Array} - The generated menu as an array of objects.
 */
export function selectMenu({
  canSelectMore,
  moreThanOneSelected,
  selectAll,
  unselectAll,
  canMarkAsStarredMore,
  canMarkSelectedAsUnstarred,
  canMarkAllAsRead,
  canMarkAllAsUnread,
}) {
  const { multipleSelectionActionTracker } = NotificationTrackerUsage();
  let menu = [];
  const firstOption = {
    fonticon: '',
    name: 'selectAll',
    text: canSelectMore ? $i18n('selectAll') : $i18n('unselectAll'),
    handler: (item) => {
      if (item.text === $i18n('unselectAll')) {
        unselectAll();

        // analytics
        multipleSelectionActionTracker()
          .selectionAction({ action: 'unselectAllNotifications', length: 0 });
        //
        item.text = $i18n('selectAll');
      }
      else {
        selectAll();
        item.text = $i18n('unselectAll');
      }
    },
  };

  // Add the first option to the menu.
  menu.push(firstOption);
  menu.push({
    class: 'divider',
  });

  // add if more than one selected
  if (moreThanOneSelected) {
    // Build the rest of the menu options.
    const restOfMenu = [
      {
        fonticon: 'fonticon fonticon-bell-alt',
        name: 'read',
        text: $i18n('markSelectedAsRead'),
        disabled: !canMarkAllAsRead.value,
        handler: (item) => {
          markSelectedAsRead(true);
          item.disabled = true;
        },
      },
      {
        fonticon: 'fonticon fonticon-bell',
        name: 'read',
        text: $i18n('markSelectedAsUnread'),
        disabled: !canMarkAllAsUnread.value,
        handler: (item) => {
          markSelectedAsRead(false);
          item.disabled = true;
        },
      },
      {
        fonticon: 'fonticon fonticon-star',
        name: 'important',
        text: $i18n('markSelectedAsStarred'),
        disabled: !canMarkAsStarredMore.value,
        handler: (item) => {
          markSelectedAsStarred(true);
          item.disabled = true;
        },
      },
      {
        fonticon: 'fonticon fonticon-favorite-off',
        name: 'important',
        text: $i18n('markSelectedAsUnstarred'),
        disabled: !canMarkSelectedAsUnstarred.value,
        handler: (item) => {
          markSelectedAsStarred(false);
          item.disabled = true;
        },
      },
      {
        class: 'divider',
      },
      {
        fonticon: 'fonticon fonticon-list-delete',
        name: 'unsubscribe',
        text: $i18n('unsubscribeSelected'),
        items: [
          {
            fonticon: 'fonticon fonticon-list-delete',
            text: $i18n('unsubscribeForHour'),
            name: 'anHour',
            handler: () => {
              unsubscribeSelected(true); // for an hour
            },
          },
          {
            fonticon: 'fonticon fonticon-list-delete',
            text: $i18n('unsubscribeIndefinitely'),
            name: 'indefinetly',
            handler: () => {
              unsubscribeSelected(false); // indefinetly
            },
          },
        ],
      },
      {
        fonticon: 'fonticon fonticon-trash',
        text: $i18n('deleteSelected'),
        name: 'delete',
        handler: () => {
          deleteSelected();
        },
      },
    ];

    // Add the rest of the menu options to the menu.
    menu = menu.concat(restOfMenu);
  }

  const menuItems = ref(menu);

  return menuItems.value;
}

/**
 * Marks all notifications as read or unread based on the provided parameter.
 * @param {boolean} read - Indicates whether to mark notifications as read (true) or unread (false).
 */
export function readAllNotifications(read) {
  const { settingIconActionTracker } = NotificationTrackerUsage();
  const iconsActionTracker = settingIconActionTracker();
  //
  const { isFilterApplied, getFilter } = useFilterStore();
  const { filterNotifIds } = useNotificationsStore();
  if (isFilterApplied()) {
    notificationRead({
      action: 'notificationRead',
      read,
      scope: true,
      filter: true,
      filterData: getFilter(),
      filterNotifIds,
    });
    // analytics
    read ? iconsActionTracker.readAllFilteredNotifications() : iconsActionTracker.unreadAllFilteredNotifications();
  }
  else {
    // todo: all cases handled ??
    notificationRead({ action: 'notificationRead', read, scope: true, filter: false });
    // analytics
    read ? iconsActionTracker.readAllNotifications() : iconsActionTracker.unreadAllNotifications();
  }
}

/**
 * Returns an array of menu items for the settings menu.
 */
export function settingsMenu() {
  const { isEmpty } = useNotificationsStore();
  const {
    isTenantAgnostic,
    getCurrentTenant,
    hidePlatformSelection,
    setWindoShow,
    getPlatformPreferencesAccess,
  } = useSettingsStore();
  const { alertConfirmNotice } = usePreferencesManagement();
  const { isFilterApplied } = useFilterStore();
  const { settingIconActionTracker } = NotificationTrackerUsage();
  const iconsActionTracker = settingIconActionTracker();

  const readAll = {
    fonticon: '',
    name: 'readAll',
    text: isFilterApplied() ? $i18n('markAllFilterAsRead') : $i18n('markAllAsRead'),
    disabled: isEmpty,
    handler: () => {
      readAllNotifications(true);
    },
  };

  const unreadAll = {
    fonticon: '',
    name: 'unreadAll',
    text: isFilterApplied() ? $i18n('markAllFilterAsUnread') : $i18n('markAllAsUnread'),
    disabled: isEmpty,
    handler: () => {
      readAllNotifications(false);
    },
  };

  const deleteAll = {
    fonticon: '',
    name: 'deleteAll',
    text: isFilterApplied() ? $i18n('deleteFilteredNotif') : $i18n('deleteAll'),
    disabled: isEmpty,
    handler: () => {
      // todo: use the vuekit modal component (after fixing the issue with the modal component)
      alertConfirmNotice(
        {
          title: isFilterApplied() ? $i18n('deleteFilteredTitle') : $i18n('deleteAllTitle'),
          msg: isFilterApplied() ? $i18n('deleteFilteredMsg') : $i18n('deleteAllMsg'),
          cancelLabel: $i18n('cancel'),
        },
      )
        .then(
          (confirmed) => {
            if (confirmed) {
              if (isFilterApplied()) {
                const { filterNotifIds } = useNotificationsStore();
                const { getFilter } = useFilterStore();
                deleteAllFilteredNotification({
                  notificationID: filterNotifIds,
                  filterData: getFilter(),
                });
                // analytics
                iconsActionTracker.deleteAllFilteredNotifications();
              }
              else {
                deleteAllNotification();
                // analytics
                iconsActionTracker.deleteAllNotifications();
              }
            }
          },
        );
    },
  };

  const selectPlatform = {
    fonticon: '',
    name: 'tenantAgnosticMode',
    text: $i18n('notificationsDisplay'),
    items: [
      {
        fonticon: '',
        text: $i18n('currentPlatform'),
        name: 'currentPlatform',
        selected: !isTenantAgnostic,
        handler: () => {
          updateTenantAgnosticMode({
            isTenantAgnostic: 0,
            hidePlatformSelection,
          });

          // analytics
          iconsActionTracker.switchTenantNotifications({
            tenant: getCurrentTenant() ?? 'current',
            persDim: {
              pd1: getCurrentTenant() ?? 'current',
            },
          });
        },
      },
      {
        fonticon: '',
        text: $i18n('allPlatforms'),
        name: 'allPlatforms',
        selected: isTenantAgnostic,
        handler: () => {
          updateTenantAgnosticMode({
            isTenantAgnostic: 1,
            hidePlatformSelection,
          });

          // analytics
          iconsActionTracker.switchTenantNotifications({
            tenant: 'all',
            persDim: {
              pd1: 'all',
            },
          });
        },
      },
    ],
  };

  const preferences = {
    fonticon: '',
    name: 'preferences',
    text: $i18n('preferencesMenu'),
    handler: () => {
      setWindoShow('PREFERENCES');

      // analytics
      iconsActionTracker.invokenotifSettingView();
    },
  };
  const platformPreferences = {
    fonticon: '',
    name: 'platformPreferences',
    text: $i18n('platformPreferencesMenu'),
    handler: () => {
      setWindoShow('PLATFORM_PREFERENCES');

      // analytics
      trackPreferences('openPlatformPreferences');
      iconsActionTracker.invokenotifSettingView();
    },
  };

  const menu = [
    // actions on all notifications
    readAll,
    unreadAll,
    deleteAll,
    // platform selection
    ...hidePlatformSelection ? [] : [selectPlatform],
    // preferences
    {
      class: 'divider',
    },
    preferences,
    ...getPlatformPreferencesAccess() ? [platformPreferences] : [],
  ];

  return menu;
}
