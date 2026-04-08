<script setup>
import { computed, h, nextTick, reactive, ref, withDirectives } from 'vue';

import { ADateSeparator } from '@ds/platformkit/components'
import { vIntersectionObserver } from '@vueuse/components'

import { useCallHistoryStore } from '../../stores/CallHistoryStore';
import { useRTCStore } from '../../stores/RTCStore';

import CallItem from './call-item.vue';


const callHistoryStore = useCallHistoryStore();
const rtcStore = useRTCStore();

const props = defineProps(['filterValue']);
const filteredCalls = computed(() => callHistoryStore.filteredCalls);
const headerDate = ref(null);
const stickyDateMinWidth = ref(0)
const dateSeparatorsMap = reactive(new Map())

const dateSeparatorStickyCmp = ref(null);

const showStickyDate = ref(false)
/**
 * Date separators keys sorted by date (reverse sorted if reverse mode).
 * FYI: Need it because date separators cmp may have been added in the
 *      map in a random way, so need to sort them by date.
 */
const dateSeparatorsSortedList = computed(() => {
  return Array.from(dateSeparatorsMap.values())
    .sort((dateSepItemA, dateSepItemB) => {
      const dateA = dateSepItemA.date.getTime()
      const dateB = dateSepItemB.date.getTime()

      if (props.reverse)
        return dateA - dateB
      else
        return dateB - dateA
    })
})

const displayDateSeparator = (i) => {
  return (
    !callHistoryStore.filteredCalls[i - 1] ||
    new Date(callHistoryStore.filteredCalls[i - 1].creation_date).toDateString() !==
      new Date(callHistoryStore.filteredCalls[i].creation_date).toDateString()
  );
};

const getConversationById = (call) => {
  let contact = null;
  if (call.isUserCall) {
    // single user call -> send user as contact
    const users = call.users.filter((el) => el.login !== rtcStore.currentUserLogin);
    if (users.length === 1) contact = rtcStore.getUserById(users[0].user_id);
  } else {
    let convId = '';
    if (call.isSwymV3) convId = call.conversation_id;
    else if (call.isSwymV2) convId = call.ext_conv_id;
    contact = rtcStore.getConversationById(convId);
  }
  if (contact == null) {
    contact = {};

    contact.id = call.conversation_id || call.ext_conv_id;
    contact.members = call.users;

    let convTitle = '';
    const users =
      (contact.members.length === 1
        ? contact.members
        : contact.members.filter((el) => el.login !== rtcStore.currentUserLogin)) || [];
    convTitle = users.map((el) => `${el.username}`).join(', ');
    contact.title = convTitle;
  }

  return contact;
};

function RenderListWithDateSeparator() {
  const components = []

  filteredCalls.value.forEach((callitem, i) => {

    if (displayDateSeparator(i)) {
      const dateRef = ref(null);
      components.push(withDirectives(h(ADateSeparator, {
        'style': { marginTop: '1.75rem', marginBottom: '.75rem' },
        'date': callitem.creation_date,
        'disableAnimation': false,
        'hasStickyBorderTop': false,
        'isHiddenInViewport': false,
        'isStickyShape': false,
        'ref': dateRef,
        'data-key': i,
        'onVnodeMounted': async () => {
          await nextTick()
          onDateSeparatorInit(dateRef.value, i, callitem)
        },
        'onVnodeUpdated': () => onDateSeparatorInit(dateRef.value, i, callitem),
      }), [[vIntersectionObserver, [onDateSeparatorVisibleChange, { threshold: 1 }]]]))
    }

    components.push(
      h(CallItem,
        {
          'contact': getConversationById(callitem),
          'call': callitem
        },
      ),
    )
  })

  return components
}

/**
 * Triggered when a date separator is referenced by vuejs lifecycle.
 * @param cmp - Date separator component.
 * @param dateSeparatorKey - Date separator key.
 * @param item - Item to display below.
 */
function onDateSeparatorInit(cmp, dateSeparatorKey, item) {
  const dateSeparatorInstance = cmp

  if (dateSeparatorsMap.has(dateSeparatorKey)) {
    return
  }

  const dateWidth = dateSeparatorInstance.getDateWidth?.() ?? 0
  stickyDateMinWidth.value = Math.max(dateWidth, stickyDateMinWidth.value)
  

  dateSeparatorsMap.set(
    dateSeparatorKey,
    {
      cmp: dateSeparatorInstance,
      date: new Date(item.creation_date),
      isVisible: false,
    },
  )
}

/**
 * Triggered when a rounded date separator enter or leave the viewport.
 * Update if necessary the sticky date separator date.
 * @param intersectionObserverEntry
 * @param intersectionObserverEntry."0" - Intersection observer entry.
 */
function onDateSeparatorVisibleChange(
  [{ isIntersecting, boundingClientRect, target }],
){
  const dateSepKey = Number.parseInt((target).dataset.key || '0', 10)
  const dateSepItem = dateSeparatorsMap.get(dateSepKey)

  if (!dateSepItem)
    return

  dateSepItem.isVisible = isIntersecting

  showStickyDate.value = !dateSeparatorsSortedList.value[0]?.isVisible

  target.classList.toggle('visible-in-viewport', isIntersecting)

  const _stickyDateSeparatorTop = dateSeparatorStickyCmp.value?.getElement()?.getBoundingClientRect()?.top
  if (typeof _stickyDateSeparatorTop !== 'number')
    return

  const THRESHOLD = 10

  if (!isIntersecting) {
    if ((boundingClientRect.top < _stickyDateSeparatorTop + THRESHOLD))
      setClosetOverflowedDate(_stickyDateSeparatorTop + THRESHOLD)
  }
  else {
    if (boundingClientRect.top > (_stickyDateSeparatorTop - THRESHOLD))
      setClosetOverflowedDate(_stickyDateSeparatorTop - THRESHOLD)
  }
}


/**
 * Set the closet date in overlflow which is above the sticky date separator.
 * @param stickyDateSeparatorTop - Top position of the sticky date separator.
 * @info Use IntersectionObserver to get boundingClientRect instead of using
 *       directly el.getBoundingClientRect for performance issue and avoid browser reflow.
 *       See: https://toruskit.com/blog/how-to-get-element-bounds-without-reflow/
 */
function setClosetOverflowedDate(stickyDateSeparatorTop) {
  const dateSeparatorsList = dateSeparatorsSortedList.value

  const observer = new IntersectionObserver((entries) => {
    let index = dateSeparatorsList.length - 1

    for (let i = 0; i < dateSeparatorsList.length; i++) {
      const dateSepTop = entries[i].boundingClientRect.top

      // Calculate the distance between the current rounded date separator and the sticky one.
      const distance = dateSepTop - stickyDateSeparatorTop

      // Find the first rounded date separator which is below the sticky one.
      if (distance > 0) {
        // Get the previous rounded date separator in the list (which is above the sticky one).
        index = i - 1
        break
      }
    }

    // If a matching rounded date separator index is found.
    if (index >= 0) {
      headerDate.value = dateSeparatorsList[index]?.date.getTime();
    }
    else {
      headerDate.value = filteredCalls.value[0].creation_date;
    }
    observer.disconnect()
  })

  for (const dateSepInfo of dateSeparatorsList) {
    const dateSepEl = dateSepInfo.cmp.getElement()

    if (dateSepEl)
      observer.observe(dateSepEl)
  }
}

</script>

<template>
    <ADateSeparator ref="dateSeparatorStickyCmp" class="date-separator-sticky"
        :class="[{ 'show-sticky-date': showStickyDate }]"
        :date="headerDate" :disableAnimation="false" :hasStickyBorderTop="false" :isHiddenInViewport="false"
        isStickyShape :minDateWidth="stickyDateMinWidth" />
    <RenderListWithDateSeparator />
</template>

<style scoped>
.date-separator-sticky {
  @apply sticky top-0 z-50 origin-top;
  @apply opacity-25 scale-0;
  @apply mt-0;
  transition: opacity .3s ease-in, transform .3s ease-in;

  &.show-sticky-date {
    @apply opacity-100 scale-100;
    transition: opacity .2s ease-out, transform .2s ease-out;
  }}
</style>