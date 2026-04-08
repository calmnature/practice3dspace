import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import { message } from '@ds/platformkit';
import { useTranslations } from '../components/utils/translations';

/**
 * @typedef {'mediaDeviceNotFound'|'mediaDeviceAccessDisabled'|'mediaDeviceAccessAborted'|'mediaAudioAccessNotAllowed'|'mediaVideoAccessNotAllowed'|'mediaDeviceAccessFailed'|'mediaDeviceNotSupported'|'browserNotCompatible'|'morethan15Members'} AlertKey
 */

const TIMEOUT = 3000;

const COLOR = {
  ERROR: 'error',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARNING: 'warning',
};

const useMessages = defineStore('messages', () => {
  const { $i18n } = useTranslations('callhistory');
  // #region STATE

  /**
   * Represents current audioinput
   */
  const alerts = reactive({
    mediaAudioAccessNotAllowed: {
      text: 'getUserMedia_NotAllowedErrorAudio',
      color: COLOR.WARNING,
      timeout: TIMEOUT,
    },
    mediaVideoAccessNotAllowed: {
      text: 'getUserMedia_NotAllowedErrorVideo',
      color: COLOR.WARNING,
      timeout: TIMEOUT,
    },
    mediaDeviceNotFound: {
      text: 'getUserMedia_NotFoundError',
      color: COLOR.WARNING,
      timeout: TIMEOUT,
    },
    mediaDeviceOverConstrained: {
      text: 'getUserMedia_OverConstrainedError',
      color: COLOR.WARNING,
      timeout: TIMEOUT,
    },
    mediaDeviceNotReadableError: {
      text: 'getUserMedia_NotReadableError',
      color: COLOR.WARNING,
      timeout: TIMEOUT,
    },
    mediaDeviceAccessAborted: {
      text: 'getUserMedia_AbortError',
      color: COLOR.WARNING,
      timeout: TIMEOUT,
    },
    mediaDeviceAccessDisabled: {
      text: 'getUserMedia_SecurityError',
      color: COLOR.WARNING,
      timeout: TIMEOUT,
    },
    mediaDeviceAccessFailed: {
      text: 'getUserMedia_NotSupportedError',
      color: COLOR.WARNING,
      timeout: TIMEOUT,
    },
    browserNotCompatible: {
      text: 'getUserMedia_TypeError',
      color: COLOR.WARNING,
      timeout: TIMEOUT,
    },
    morethan15Members: {
      text: 'morethan15Members',
      color: COLOR.WARNING,
      timeout: TIMEOUT,
    },
  });

  // #region ACTION

  /**
   * Displays the message with the given key.
   * @param {AlertKey} key
   */
  function displayAlert(key) {
    const alert = alerts[key];
    const text = computed(() => $i18n(alert.text));
    message.create({
      target: 'call-history',
      text: text.value || alert.text,
      color: alert.color,
      timeout: alert.timeout,
    });
  }

  /**
   * Handles getUserMedia error.
   * @param {Error} error
   */
  function getUserMediaError(error) {
    switch (error.name) {
      // Permission
      case 'NotAllowedError':
      case 'PermissionDeniedError':
        if (error.mediaType === 'video') displayAlert('mediaVideoAccessNotAllowed');
        else if (error.mediaType === 'audio') displayAlert('mediaAudioAccessNotAllowed');
        break;
      // Not found
      case 'NotFoundError':
      case 'DevicesNotFoundError':
        displayAlert('mediaDeviceNotFound');
        break;
      // Wrong constraints
      case 'OverConstrainedError':
      case 'ConstraintNotSatisfiedError':
        displayAlert('mediaDeviceOverConstrained');
        break;
      // Device in use
      case 'NotReadableError':
      case 'TrackStartError':
        displayAlert('mediaDeviceNotReadableError');
        break;
      // Request abort
      case 'AbortError':
        displayAlert('mediaDeviceAccessAborted');
        break;
      // Security
      case 'SecurityError':
        displayAlert('mediaDeviceAccessDisabled');
      // Device issue
      case 'InvalidStateError':
      case 'MediaDeviceFailedDueToShutdown':
      case 'MediaDeviceKillSwitchOn':
      case 'InternalError':
        displayAlert('mediaDeviceAccessFailed');
        break;
      // Other
      case 'TypeError':
      case 'NotSupportedError':
        displayAlert('browserNotCompatible');
        break;
      default:
        return;
    }
  }

  return {
    displayAlert,
    getUserMediaError,
  };
});

export default useMessages;
