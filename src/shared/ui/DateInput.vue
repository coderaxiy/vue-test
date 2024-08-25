<template>
  <div class="relative inline-block">
    <div
      class="w-44 flex items-center justify-between border border-[#D0D5DD] rounded-lg px-3.5 py-2.5 cursor-pointer"
      @click="toggleDatePicker"
    >
      <div class="flex items-center gap-2">
        <IconCalendar />

        <h3 class="text-[#344054] text-sm font-semibold">{{ formattedDate }}</h3>
      </div>

      <IconDropdown :class="{ 'rotate-180': !showDatePicker }" />
    </div>

    <div v-if="showDatePicker" class="absolute mt-1 w-72 z-10">
      <CalendarPopup :selected-date="selectedDate" @select-date="handleDateSelect" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import CalendarPopup from './CalendarPopup.vue'
import IconCalendar from '@/components/icons/IconCalendar.vue'
import IconDropdown from '@/components/icons/IconDropdown.vue'

const showDatePicker = ref(false)
const selectedDate = ref<Dayjs>(dayjs())

const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value
}

const handleDateSelect = (date: Dayjs) => {
  selectedDate.value = date
  showDatePicker.value = false
}

const formattedDate = computed(() => {
  return selectedDate.value.format('DD.MM.YYYY')
})
</script>
