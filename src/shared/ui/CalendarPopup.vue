<template>
  <div
    class="border border-[#F2F4F7] bg-white shadow-md rounded-lg w-72 py-5 px-2 flex flex-col items-center justify-center gap-2"
  >
    <div class="w-full flex items-center justify-between">
      <button
        class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
        @click="changeMonth(-1)"
      >
        <IconChevron />
      </button>

      <h3 class="text-[#344054] text-base font-semibold">{{ currentMonth.format('MMMM YYYY') }}</h3>
      <button
        class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
        @click="changeMonth(1)"
      >
        <IconChevron class="rotate-180" />
      </button>
    </div>

    <table class="w-full">
      <thead class="border-b border-b-[#F2F4F7]">
        <tr class="h-8">
          <th
            class="text-sm font-medium text-[#344054]"
            v-for="(day, index) in weekDays"
            :key="index"
          >
            {{ day }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr class="h-9" v-for="(week, weekIndex) in weeks" :key="weekIndex">
          <td
            class="text-sm font-normal text-[#344054] w-9 h-9 text-center cursor-pointer rounded"
            v-for="(day, dayIndex) in week"
            :key="dayIndex"
            :class="{
              'text-[#98A2B3]': isPreviousOrNextMonth(day),
              'line-through text-[#98A2B3]': isDisabled(day),
              'text-[#FEB94A]': isSelected(day),
              'hover:bg-[#FEB94A] hover:text-white': !isDisabled(day)
            }"
            @click="selectDate(day)"
          >
            {{ day.date() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/en-gb'
import IconChevron from '@/components/icons/IconChevron.vue'

const props = defineProps<{
  selectedDate: Dayjs
}>()

const currentMonth = ref<Dayjs>(dayjs())
const disabledDates = ref<Dayjs[]>([dayjs('2024-08-25')])

const emit = defineEmits(['select-date'])

const changeMonth = (offset: number) => {
  currentMonth.value = currentMonth.value.add(offset, 'month')
}

watch(
  () => props.selectedDate,
  (newDate) => {
    currentMonth.value = newDate.startOf('month')
  },
  { immediate: true }
)

const isSelected = (date: Dayjs) => {
  return props.selectedDate.isSame(date, 'day')
}

const isDisabled = (date: Dayjs) => {
  return disabledDates.value.some((d) => d.isSame(date, 'day'))
}

const selectDate = (date: Dayjs) => {
  if (isDisabled(date)) return
  emit('select-date', date)
}

const isPreviousOrNextMonth = (date: Dayjs) => {
  return !date.isSame(currentMonth.value, 'month')
}

const weekDays = computed(() => ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'])

const weeks = computed(() => {
  const startOfMonth = currentMonth.value.startOf('month').startOf('week')
  const endOfMonth = currentMonth.value.endOf('month').endOf('week')
  const weeks: Dayjs[][] = []
  let current = startOfMonth

  while (current.isBefore(endOfMonth, 'day')) {
    weeks.push(
      Array.from({ length: 7 }, () => {
        const day = current
        current = current.add(1, 'day')
        return day
      })
    )
  }

  return weeks
})
</script>
