<script setup>
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCallHistoryStore } from '../../stores/CallHistoryStore';
import { useRTCStore } from '../../stores/RTCStore';

import NoCallImage from '../../assets/NoCallsSoFar.png';

import startCallModal from '../utils/start-call-modal.vue';

import { useTranslations } from '../utils/translations';
import CallItemsAndDates from './call-items-and-dates.vue';
const { i18n, $i18n, promise } = useTranslations('callhistory');

const callHistoryStore = useCallHistoryStore();
const rtcStore = useRTCStore();
let isModalOpen = ref(false);
const translationsLoaded = ref(false);

const { waitForResponse } = storeToRefs(callHistoryStore);
const props = defineProps(['filterValue']);
const filteredCalls = computed(() => callHistoryStore.filteredCalls);

onMounted(async () => {
  await promise;
  promise.then((translationsLoaded.value = true));
});

const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  callHistoryStore.selectedContact = [];
  rtcStore.searchFilter = '';
  isModalOpen.value = false;
};

</script>

<template>
  <div>
    <div v-if="!callHistoryStore.isLoading && translationsLoaded">
      <div v-if="isModalOpen">
        <start-call-modal @closeModal="closeModal"></start-call-modal>
      </div>

      <div v-if="filteredCalls && !filteredCalls.length && !waitForResponse" class="imgContainer">
        <img :src="NoCallImage" class="emptyImg" />
        <span style="margin: auto" v-if="props.filterValue != ''">No {{ props.filterValue }} calls so far</span>
        <div v-else style="display: flex; justify-content: center; flex-direction: column">
          <span style="margin: auto">No calls</span>
          <vu-btn class="btn btn-primary call-btn" @click="openModal"><vu-icon icon="phone"
              style="color: white; margin: 0 5px 0 0"></vu-icon>{{ $i18n('startVoiceCall') }}</vu-btn>
          <vu-btn class="mobile-call" @click="isModalOpen = true"><vu-icon icon="phone"
              style="color: white; width: 22px; height: 22px; margin: auto"></vu-icon></vu-btn>
        </div>
      </div>

      <div v-else>
        <vu-btn class="btn btn-primary call-btn" @click="openModal"><vu-icon icon="phone"
            style="color: white; margin: 0 5px 0 0"></vu-icon>{{ $i18n('startVoiceCall') }}</vu-btn>
        <CallItemsAndDates/>
        <vu-btn class="mobile-call" @click="isModalOpen = true"><vu-icon icon="phone"
            style="color: white; width: 22px; height: 22px; margin: auto"></vu-icon></vu-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>

.scroller-style {
  max-height: 100vh;
}

.call-btn {
  border-radius: 19px;
  margin: auto;
  margin-top: 15px;
  background-color: #42a2da;
}

:deep(.call-btn.btn) {
  padding: 9px 10px;
}

.imgContainer {
  padding-top: 230px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-direction: column;
}

.mobile-call {
  color: rgb(255 255 255);
  background-color: rgb(54 142 196);
  border-radius: 9999px;
  position: absolute;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  min-height: 38px;
  right: 1.25rem;
  display: none;
  width: 38px;
  height: 38px;
  margin: auto;
  justify-content: center;
  align-items: center;
}

.emptyImg {
  max-width: 242px;
  max-height: 142px;
  margin: auto;
  display: block;
}

@media (max-width: 465px) {
  .mobile-call {
    display: inline-flex;
    bottom: 90px;
    position: fixed;
    /* display: block; */
  }

  .call-btn {
    display: none;
  }
}
</style>
