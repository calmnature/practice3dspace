<script setup>
import { onMounted, watch, computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { initLogger } from '../../utils/logger';
import CallList from './call-list.vue';
import CallSettings from '../call-delegation/call-settings.vue';
import ClearConfirmModal from '../utils/clear-confirm-modal.vue';
import SettingsModal from '../utils/settings-modal.vue';
import { initCallHistoryApi, getRingtone } from '../../api/callhistory_api';
import { useCallHistoryStore } from '../../stores/CallHistoryStore';
import { useRTCStore } from '../../stores/RTCStore';
import { useEventBus } from '@vueuse/core';
import { useTranslations } from '../utils/translations';
import { VuMessageContainer } from '@ds/platformkit';
import { version } from '../../../package.json';
import { Preferences } from '@3ds/common-preferences';
import { RTCallComponentsTracker } from '../../api/rtcallcomponentsTracker';

const emit = defineEmits(['getTopBarItems', 'startConversation', 'loaded', 'viewProfile']);
const props = defineProps([
  'searchedValue',
  'activeFilter',
  'activatedComponent',
  'hasCallsProfileActivated',
  'loadRequestId',
  'hasPhoneCallActivated',
  'activationId',
]);

const bus = useEventBus('swym-events');
const rtcStore = useRTCStore();
const callHistoryStore = useCallHistoryStore();
const { $i18n, promise } = useTranslations('callhistory');
const { isRTCStoreLoaded } = storeToRefs(callHistoryStore);

let isModalOpen = ref(false);
const showSettings = ref(false);

// computed props
const userSearched = computed(() => props.searchedValue);
const filterApplied = computed(() => props.activeFilter);
const activatedComponent = computed(() => props.activatedComponent);
const activationId = computed(() => props.activationId);

// dynamic CallHistory/CallPreference component toggle
const currentComponent = computed(() => {
  if (props.activatedComponent == 'Preferences') return CallSettings;
  else return CallList;
});
const currentProperties = computed(() => {
  if (props.activatedComponent == 'Preferences') return '';
  else return filterApplied.value;
});
watch(activationId, () => {
  const rtcallcomponentsTracker = RTCallComponentsTracker();

  if (activatedComponent.value == 'clearHistory') {
    isModalOpen.value = true;
    rtcallcomponentsTracker.clearHistory().openClearHistoryConfirmationModal({
      persDim: {
        pd1: rtcStore.currentUserId,
        pd2: version,
      },
    });
  } else if (activatedComponent.value == 'settings') {
    showSettings.value = true;
    rtcallcomponentsTracker.callSettings().openCallSettings();
  }
});

// fetch call history and favorites only after rtc store is loaded
watch(
  isRTCStoreLoaded,
  () => {
    if (isRTCStoreLoaded.value) {
      callHistoryStore.fetchCallHistory();
      getRingtone();
      let data = {};
      data.hasCallsProfileActivated = props.hasCallsProfileActivated;
      data.hasPhoneCallActivated = props.hasPhoneCallActivated;
      callHistoryStore.updateUwpVars(data);
    }
  },
  { immediate: true }
);

// to handle pagination on scroll of call history page
// From Swym: loadRequestId (incremental value on scoll)
watch(
  () => props.loadRequestId,
  () => {
    callHistoryStore.fetchNextPage();
  }
);

// to update filters and search sent from swym-ui
watch(
  userSearched,
  () => {
    callHistoryStore.updateFilters({ category: filterApplied, search: userSearched });
  },
  { immediate: true }
);
watch(
  filterApplied,
  () => {
    callHistoryStore.updateFilters({ category: filterApplied, search: userSearched });
  },
  { immediate: true }
);

const closeModal = () => {
  isModalOpen.value = false;
};

const closeSettings = () => {
  showSettings.value = false;
};

onMounted(async () => {
  initCallHistoryApi();
  await initLogger();
  await promise;
  promise.then(() => {
    let TopBarItems = {
      filters: [
        {
          fonticon: 'phone-call-missed',
          text: $i18n('missed'),
          color: 'text-grey-6',
          bgcolor: 'bg-red-1',
          value: 'Missed',
        },
        {
          fonticon: 'phone-call-sent',
          text: $i18n('outgoing'),
          color: 'text-grey-6',
          bgcolor: 'bg-blue-3',
          value: 'Outgoing',
        },
        {
          fonticon: 'phone-call-received',
          text: $i18n('incoming'),
          color: 'text-grey-6',
          bgcolor: 'bg-blue-3',
          value: 'Incoming',
        },
      ],
      menu: [
        {
          fonticon: 'cog',
          text: $i18n('preferences'),
          value: 'Preferences',
        },
        {
          fonticon: 'trash',
          text: $i18n('clearHistory'),
          value: 'clearHistory',
        },
      ],
      states: {
        Preferences: {
          fonticon: 'cog',
          text: $i18n('preferences'),
          value: 'Preferences',
          nextState: 'History',
        },
        History: {
          fonticon: 'navigation-history',
          text: $i18n('history'),
          value: 'History',
          nextState: 'Preferences',
        },
      },
      initialState: 'Preferences',
      initialActiveComponent: 'History',
    };
    if (!Preferences.isMobileApp()) {
      const callSettingsItem = {
        fonticon: 'cog',
        text: $i18n('callSettings'),
        value: 'settings',
      };
      TopBarItems.menu.unshift(callSettingsItem);
    }
    emit('getTopBarItems', TopBarItems);
  });
  console.log('Call history version:', version);

  bus.on((event, data) => {
    if (event == 'viewProfile') emit('viewProfile', data);

    if (event == 'startConversation') {
      emit('startConversation', data);
    }

    // "loaded" event with moreCallsToFetch(to stop loader on swym)
    if (event == 'loaded') emit('loaded', data.moreCallsToFetch);
  });
});
</script>

<template>
  <div>
    <VuMessageContainer namespace="call-history" />
    <component :is="currentComponent" :filterValue="currentProperties" />
    <div v-if="isModalOpen">
      <clear-confirm-modal @closeModal="closeModal"></clear-confirm-modal>
    </div>
    <settings-modal :show="showSettings" @close="closeSettings" />
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .right-panel {
    padding: 0%;
  }
}

@media (max-width: 465px) {
  .right-panel {
    padding: 0%;
  }
}
</style>
