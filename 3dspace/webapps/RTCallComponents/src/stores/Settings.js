import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { setRingtone as sendRingtone } from '../api/callhistory_api';
import { useRTCStore } from './RTCStore';
import { RTCallComponentsTracker } from '../api/rtcallcomponentsTracker';
import { version } from '../../package.json';

export const RINGTONES = {
  technologies: 'Technologies',
  '3ds_phone': '3DS Phone',
  solarium: 'Solarium',
  upbeat: 'Upbeat Uplifting',
  documentary: 'Documentary Chill',
};

/**
 * @typedef {'audioinput'|'videoinput'|'audiooutput'} MediaType
 */
/**
 * @typedef {'selector'|'deviceChange'} DeviceOrigin - To track where the device changed.
 */

/**
 * Get the key name by type of the device.
 * @param {MediaType} type
 */
const localStorageKey = (type) => `collab${type}`;

/**
 * Get from localStorage the device by type.
 * @param {MediaType} type - Type of the device.
 * @returns {{ deviceId: string, label: string, next?: { deviceId: string, label: string } }} Returns the device.
 */
const getDeviceFromLocalStorage = (type) => JSON.parse(localStorage.getItem(localStorageKey(type)));

/**
 * Set in localStorage device by type.
 * @param {MediaType} type
 * @param {{ deviceId: string, label: string }} deviceInfos
 */
const setDeviceInLocalStorage = (type, deviceInfos) =>
  localStorage.setItem(localStorageKey(type), JSON.stringify(deviceInfos));

const useSettings = defineStore('settings', () => {
  const rtcStore = useRTCStore();

  // #region STATE

  /**
   * Represents current audioinput
   */
  const audioinput = ref('');

  /**
   * Represents current videoinput
   */
  const videoinput = ref('');

  /**
   * Represents current audiooutput
   */
  const audiooutput = ref('');

  /**
   * Represents current ringtone
   */
  const ringtone = ref('');

  const ignoreTracking = reactive({
    camera: false,
    microphone: false,
    speaker: false,
  });

  // #region ACTION

  /**
   * Set the audioinput.
   * @param {string} microId - Id of the audioinput device.
   * @param {DeviceOrigin} [from] - Where the device change occured.
   */
  const setMicrophone = (microId, from) => {
    const oldMicrophone = getDeviceFromLocalStorage('audioinput');
    audioinput.value = microId;

    if (ignoreTracking.microphone) {
      ignoreTracking.microphone = false;
      return;
    }

    if (from) {
      deviceTracker(microId, oldMicrophone && oldMicrophone.deviceId, 'microphone', from);
    }
  };

  /**
   * Set the videoinput.
   * @param {string} cameraId - Id of the videoinput device.
   * @param {DeviceOrigin} [from] - Where the device change occured.
   */
  const setCamera = (cameraId, from) => {
    const oldCamera = getDeviceFromLocalStorage('videoinput');
    videoinput.value = cameraId;

    if (ignoreTracking.camera) {
      ignoreTracking.camera = false;
      return;
    }

    if (from) {
      deviceTracker(cameraId, oldCamera && oldCamera.deviceId, 'camera', from);
    }
  };

  /**
   * Set the audiooutput.
   * @param {string} speakerId - Id of the audiooutput device.
   * @param {DeviceOrigin} [from] - Where the device change occured.
   */
  const setSpeaker = (speakerId, from) => {
    const oldSpeaker = getDeviceFromLocalStorage('audiooutput');
    audiooutput.value = speakerId;

    if (ignoreTracking.speaker) {
      ignoreTracking.speaker = false;
      return;
    }

    if (from) {
      deviceTracker(speakerId, oldSpeaker && oldSpeaker.deviceId, 'speaker', from);
    }
  };

  /**
   * Set the ringtone.
   * @param {string} newRingtone - Name of the ringtone.
   */
  const setRingtone = (newRingtone) => {
    if (newRingtone !== ringtone.value) {
      ringtone.value = newRingtone;
    }
  };

  /**
   * Reset devices state.
   */
  const resetDevices = () => {
    audioinput.value = '';
    videoinput.value = '';
    audiooutput.value = '';
  };

  /**
   * Get deviceId by label from mediaDevices exposed list.
   * @param {Record<MediaType, Omit<MediaDeviceInfo, "kind">[]>} mediaDevices - List of media devices of a specific type.
   * @param {MediaType} type - Type of the device.
   * @returns The deviceId.
   */
  const getDeviceIdByLabel = (mediaDevices, type) => {
    let localDevice = getDeviceFromLocalStorage(type);

    if (!localDevice || !localDevice.label) return '';
    if (localDevice && localDevice.next && localDevice.next.deviceId) {
      localDevice = localDevice.next;
    }
    const findDevice = mediaDevices[type].find((mediaDevice) => mediaDevice.label === localDevice.label);
    if (findDevice && findDevice.deviceId) return findDevice.deviceId;
    return '';
  };

  /**
   * Get a device with the same groupId of the given device and whose the deviceId is neither `default` or `communications` and composed of only letters.
   * @param {Omit<MediaDeviceInfo, "kind">[]} mediaDevicesByKind - List of media devices of a specific type.
   * @param {string} device - Id of the given device.
   * @returns Returns a device.
   */
  const getUsableDevice = (mediaDevicesByKind, deviceId) => {
    if (!mediaDevicesByKind || mediaDevicesByKind.length < 1) return { deviceId: '', label: '' };
    const choosenDevice = mediaDevicesByKind.find((mediaDevice) => mediaDevice.deviceId === deviceId);
    const checkDeviceId = (id) => typeof id === 'string' && /\d/.test(id);
    const deviceToSave = mediaDevicesByKind.find(
      (mediaDevice) => mediaDevice.groupId == choosenDevice.groupId && checkDeviceId(mediaDevice.deviceId)
    );
    return deviceToSave;
  };

  /**
   * Updates device state with new data from the localStorage.
   */
  const updateCallSettings = () => {
    ['audioinput', 'videoinput', 'audiooutput'].forEach((type) => {
      const localStorage = getDeviceFromLocalStorage(type);
      if (!localStorage || !localStorage.deviceId || !localStorage.label) return '';
      if (type === 'audioinput') setMicrophone(localStorage.deviceId);
      if (type === 'videoinput') setCamera(localStorage.deviceId);
      if (type === 'audiooutput') setSpeaker(localStorage.deviceId);
    });
  };

  /**
   * Save `audioinput`, `videoinput` and `audiooutput` devices in localStorage and ringtone at server side.
   * @param {Record<MediaType, Omit<MediaDeviceInfo, "kind">[]>} exposedMediaDevicesList - Media devices list.
   * @param {{ value: string, label: string }} newRingtone - New ringtone with label and url value.
   */
  const saveDevices = (exposedMediaDevicesList, newRingtone) => {
    const audioInputDevice = getUsableDevice(exposedMediaDevicesList.audioinput, audioinput.value);
    const videoInputDevice = getUsableDevice(exposedMediaDevicesList.videoinput, videoinput.value);
    const audioOutputDevice = getUsableDevice(exposedMediaDevicesList.audiooutput, audiooutput.value);

    // analytics
    saveTracker(videoInputDevice.deviceId, audioInputDevice.deviceId, audioOutputDevice.deviceId, newRingtone.value);

    setDeviceInLocalStorage('audioinput', { deviceId: audioInputDevice.deviceId, label: audioInputDevice.label });
    // IR-1470509 If user is in call, for the next one save the video device in next property
    if (rtcStore.currentUserInCall) {
      const currentVideoinput = getDeviceFromLocalStorage('videoinput');
      setDeviceInLocalStorage('videoinput', {
        ...currentVideoinput,
        next: { deviceId: videoInputDevice.deviceId, label: videoInputDevice.label },
      });
    } else {
      setDeviceInLocalStorage('videoinput', { deviceId: videoInputDevice.deviceId, label: videoInputDevice.label });
    }
    setDeviceInLocalStorage('audiooutput', { deviceId: audioOutputDevice.deviceId, label: audioOutputDevice.label });
    if ((newRingtone.value && newRingtone.value.toLowerCase()) !== (ringtone.value && ringtone.value.toLowerCase())) {
      setRingtone(newRingtone.value);
      sendRingtone(newRingtone.value.toLowerCase());
    }
  };

  // #region TRACKING

  /**
   * Helps to chose if tracking is needed.
   * @param {'all'|'camera'|'microphone'|'speaker'} which
   * @param {boolean} ignore
   */
  const updateIgnoreTracking = function (which, ignore) {
    switch (which) {
      case 'camera':
        ignoreTracking.camera = ignore;
        break;
      case 'microphone':
        ignoreTracking.microphone = ignore;
        break;
      case 'speaker':
        ignoreTracking.speaker = ignore;
        break;
      case 'all':
        for (const key of Object.keys(ignoreTracking)) {
          ignoreTracking[key] = ignore;
        }
        break;
    }
  };

  /**
   * Tracks device events.
   * @param {string} newDeviceId - New deviceId.
   * @param {string} oldDeviceId - Old deviceId.
   * @param {'camera'|'microphone'|'speaker'} type - Device type.
   * @param {DeviceOrigin} from - Where the device change occured.
   */
  const deviceTracker = function (newDeviceId, oldDeviceId, type, from) {
    const { callSettings } = RTCallComponentsTracker();
    if (!oldDeviceId || oldDeviceId === '' || newDeviceId === '') return;
    if (newDeviceId === oldDeviceId) {
      callSettings().changeDevice({
        persDim: {
          pd1: rtcStore.currentUserId,
          pd2: version,
          pd3: type,
          pd4: from,
        },
        value: 0,
      });
    } else if (newDeviceId !== oldDeviceId) {
      callSettings().changeDevice({
        persDim: {
          pd1: rtcStore.currentUserId,
          pd2: version,
          pd3: type,
          pd4: from,
        },
        value: 1,
      });
    }
  };

  /**
   * Tracks ringtone events.
   * @param {string} newRingtoneValue - New ringtone value.
   */
  const ringtoneTracker = function (newRingtoneValue) {
    const { callSettings } = RTCallComponentsTracker();

    if (newRingtoneValue.toLowerCase() !== (ringtone.value && ringtone.value.toLowerCase())) {
      callSettings().selectRingtone({
        persDim: {
          pd1: rtcStore.currentUserId,
          pd2: version,
          pd3: newRingtoneValue.toLocaleLowerCase(),
        },
        value: 1,
      });
    } else {
      callSettings().selectRingtone({
        persDim: {
          pd1: rtcStore.currentUserId,
          pd2: version,
          pd3: ringtone.value.toLocaleLowerCase(),
        },
        value: 0,
      });
    }
  };

  /**
   * Tracks save events.
   * @param {string} cameraId - Choosen camera deviceId.
   * @param {string} microphoneId - Choosen microphone deviceId.
   * @param {string} speakerId - Choosen speaker deviceId.
   * @param {string} ringtoneValue - Choosen ringtone value.
   */
  const saveTracker = function (cameraId, microphoneId, speakerId, ringtoneValue) {
    const { callSettings } = RTCallComponentsTracker();

    const isCameraChanged = getDeviceFromLocalStorage('videoinput')?.deviceId !== cameraId ? 1 : 0;
    const isMicrophoneChanged = getDeviceFromLocalStorage('audioinput')?.deviceId !== microphoneId ? 1 : 0;
    const isSpeakerChanged = getDeviceFromLocalStorage('audiooutput')?.deviceId !== speakerId ? 1 : 0;
    const isRingtoneChanged =
      ringtoneValue.toLowerCase() !== (ringtone.value && ringtone.value.toLowerCase())
        ? { label: ringtoneValue.toLowerCase(), value: 1 }
        : { label: ringtone.value.toLowerCase(), value: 0 };

    callSettings().saveCallSettings({
      persDim: {
        pd1: rtcStore.currentUserId,
        pd2: version,
        pd3: isRingtoneChanged.label,
      },
      persVal: {
        pv1: isCameraChanged,
        pv2: isMicrophoneChanged,
        pv3: isSpeakerChanged,
        pv4: isRingtoneChanged.value,
      },
    });
  };

  return {
    audioinput,
    videoinput,
    audiooutput,
    ringtone,
    ignoreTracking,

    setCamera,
    setMicrophone,
    setRingtone,
    setSpeaker,
    getDeviceIdByLabel,
    resetDevices,
    saveDevices,
    updateCallSettings,

    updateIgnoreTracking,
    ringtoneTracker,
  };
});

export default useSettings;
