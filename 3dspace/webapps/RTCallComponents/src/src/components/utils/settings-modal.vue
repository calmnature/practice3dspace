<script setup>
import { ref, onMounted, useTemplateRef, watch, computed } from 'vue';
import { useTranslations } from './translations';
import { useRTCStore } from '../../stores/RTCStore';
import useMessages from '../../stores/Messages';
import useSettings from '../../stores/Settings';
import { RINGTONES } from '../../stores/Settings';
import { ModalMediaDevices, VuIcon, VuMessage, VuSelect } from '@ds/platformkit';
import { RTCallComponentsTracker } from '../../api/rtcallcomponentsTracker';
import { version } from '../../../package.json';

import { nextTick } from 'vue';

const { $i18n, promise } = useTranslations('callhistory');

const messages = useMessages();
const rtcStore = useRTCStore();
const settings = useSettings();

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

/**
 * Emit event to close settings modal.
 */
const emit = defineEmits(['close']);

const settingsModalRef = useTemplateRef('settings-modal');

const ringtoneModel = ref();
const ringtones = ref([]);
const ringtoneUrl = ref(new URL('../../assets/ringtones/Technologies.mp3', import.meta.url).href);
const translationsLoaded = ref(false);

const cameraRules = computed(() => {
  return !!settings.videoinput;
});

const microphoneRules = computed(() => {
  return !!settings.audioinput;
});

const speakerRules = computed(() => {
  return settingsModalRef.value.mediaDevices().audiooutput.length > 0 ? !!settings.audiooutput : true;
});

const ringtoneRules = computed(() => {
  return !!(ringtoneModel && ringtoneModel.value);
});

const selectedRingtone = computed(() => {
  if (ringtones.value.length > 0 && ringtoneModel && ringtoneModel.value) {
    const newRingtone = ringtones.value.find((ring) => ring.value === ringtoneModel.value);
    return newRingtone;
  }
  return ringtones.value[0];
});

/**
 * Init ringtones when settings modal is open.
 */
function initRingtones() {
  if (ringtones.value.length < 1) {
    for (const key of Object.keys(RINGTONES)) {
      ringtones.value.push({ label: RINGTONES[key], value: key });
    }
  }
}

/**
 * Tracks player events.
 */
const initPlayerTracking = function () {
  const { callSettings } = RTCallComponentsTracker();
  const playerBtn = document.querySelector('#calls-media-device-settings .voice-message-player-container div');

  if (playerBtn && selectedRingtone.value) {
    const playerIcon = playerBtn.children[0];
    if (playerIcon) {
      if (playerIcon.className.includes('play')) {
        callSettings().testRingtone({
          persDim: {
            pd1: rtcStore.currentUserId,
            pd2: version,
            pd3: selectedRingtone.value.value.toLocaleLowerCase(),
          },
          value: 0,
        });
      } else if (playerIcon.className.includes('pause')) {
        callSettings().testRingtone({
          persDim: {
            pd1: rtcStore.currentUserId,
            pd2: version,
            pd3: selectedRingtone.value.value.toLocaleLowerCase(),
          },
          value: 1,
        });
      }
    }
  }
};

/** Emits to close the modal */
const close = function () {
  playerController?.abort();
  setTimeout(() => {
    emit('close');
    ringtones.value = [];
    settings.resetDevices();
  }, 0);
};

/** Closes the modal */
const closeSettings = function () {
  const { callSettings } = RTCallComponentsTracker();
  callSettings().closeCallSettings();
  close();
};

/** Validates modal form and save the settings if it is `true` */
const validate = function () {
  if (!settingsModalRef.value.validate()) {
    // Validity check
    return;
  }
  settings.saveDevices(settingsModalRef?.value.mediaDevices(), selectedRingtone.value);
  close();
};

/** Displays alert message */
const errorMessage = function (error) {
  messages.getUserMediaError(error);
  const { callSettings } = RTCallComponentsTracker();
  callSettings().callSettingsError({
    persDim: {
      pd1: rtcStore.currentUserId,
      pd2: version,
      pd3: `${error.name}: ${error.message}`,
      pd4: error.mediaType,
    },
  });
  close();
};

let playerController;

watch(
  () => props.show,
  async (isDisplayed) => {
    if (isDisplayed) {
      initRingtones();
      playerController = new AbortController();
      settings.updateIgnoreTracking('all', true);

      const ringtoneValue =
        settings.ringtone && settings.ringtone !== ''
          ? ringtones.value.find((ring) => ring.value.toLowerCase() === settings.ringtone.toLowerCase())?.value
          : ringtones.value[0].value;
      ringtoneModel.value = ringtoneValue;

      await nextTick();
      // analytics
      const playerBtn = document.querySelector('#calls-media-device-settings .voice-message-player-container div');
      playerBtn && playerBtn.addEventListener('click', initPlayerTracking, { signal: playerController.signal });
    } else {
      playerController.abort();
    }
  }
);

watch(
  () => settingsModalRef.value?.mediaDevices(),
  (devices) => {
    if (!devices) return;
    if (devices.videoinput && devices.videoinput.length > 0) {
      const camera = settings.getDeviceIdByLabel(devices, 'videoinput') || devices.videoinput[0].deviceId;
      if (camera !== '') settings.setCamera(camera, 'deviceChange');
    }
    if (devices.audioinput && devices.audioinput.length > 0) {
      const microphone = settings.getDeviceIdByLabel(devices, 'audioinput') || devices.audioinput[0].deviceId;
      if (microphone !== '') settings.setMicrophone(microphone, 'deviceChange');
    }
    if (devices.audiooutput && devices.audioinput.length > 0) {
      settings.setSpeaker(settings.getDeviceIdByLabel(devices, 'audiooutput'), 'deviceChange');
    }
  },
  {
    deep: true,
  }
);

watch(
  () => selectedRingtone.value,
  async () => {
    if (selectedRingtone.value && selectedRingtone.value.label) {
      ringtoneUrl.value = new URL(`../../assets/ringtones/${selectedRingtone.value.label}.mp3`, import.meta.url).href;
    }
  }
);

onMounted(async () => {
  await promise;
  promise.then(() => {
    translationsLoaded.value = true;
  });
});
</script>

<template>
  <Teleport to="body">
    <div v-if="translationsLoaded && show" id="calls-media-device-settings">
      <ModalMediaDevices
        ref="settings-modal"
        :title="$i18n('callSettings')"
        :okLabel="$i18n('save')"
        :showMicrophoneVolume="true"
        :showSpeaker="true"
        :speakerSoundUrl="ringtoneUrl"
        :speakerSoundLabel="$i18n('speakerTest')"
        :cameraRules="[(v) => cameraRules]"
        :microphoneRules="[(v) => microphoneRules]"
        :speakerRules="[(v) => speakerRules]"
        v-model:model-camera="settings.videoinput"
        v-model:model-microphone="settings.audioinput"
        v-model:model-speaker="settings.audiooutput"
        @update:model-camera="settings.setCamera($event, 'selector')"
        @update:model-microphone="settings.setMicrophone($event, 'selector')"
        @update:model-speaker="settings.setSpeaker($event, 'selector')"
        @close="closeSettings"
        @confirm="validate"
        @mediaError="errorMessage"
      >
        <template #modalBodyMediaDevices v-if="rtcStore.currentUserInCall">
          <VuMessage :isClosable="false" :text="$i18n('settingsChangesForNextCall')" />
        </template>
        <template #speakerSettings>
          <div class="media-device-settings">
            <div class="media-device-label">
              <VuIcon icon="note" is-horizontal-margins size="text-lg" />
              {{ $i18n('ringtone') }}
            </div>
            <VuSelect
              v-model="ringtoneModel"
              @update:model-value="settings.ringtoneTracker($event)"
              hide-placeholder-option
              :options="ringtones"
              :rules="[(v) => ringtoneRules]"
            />
          </div>
        </template>
      </ModalMediaDevices>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
#calls-media-device-settings {
  :deep(.modal-body) {
    min-height: 100px;
  }
}

.media-device-settings {
  padding: 5px 0;
}

.media-device-label {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  color: #3d3d3d;
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  word-break: break-all;
}
</style>
