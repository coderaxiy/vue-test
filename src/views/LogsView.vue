<script setup lang="ts">
import LogsFilter from '@/components/logs/LogsFilter.vue'
import LogsTable from '@/components/logs/LogsTable.vue'
import { useRoute, useRouter } from 'vue-router'
import DriverLogsView from './DriverLogsView.vue'
import RefreshButton from '@/shared/widgets/RefreshButton.vue'
import IconGoback from '@/components/icons/IconGoback.vue'
import ChipTag from '@/shared/ui/ChipTag.vue'
import IconAndroid from '@/components/icons/IconAndroid.vue'
import IconAlertTriangle from '@/components/icons/IconAlertTriangle.vue'
import { computed, ref } from 'vue'
import ToggleSwitch from '@/shared/ui/ToggleSwitch.vue'

const route = useRoute()
const router = useRouter()

const rows = [
  {
    id: 1,
    fullName: 'Nuriddin Pardayev',
    truckNum: '007',
    phone: '(843) 447-9604',
    workedHours: 'No working hours',
    certified: false,
    status: 'OFF',
    lastLoc: '2.83 mi SW Chalco, Ne (3 days ago)',
    warnings: '0',
    breakTime: '08:00',
    drive: '08:00',
    shift: '08:00'
  },
  {
    id: 2,
    fullName: 'Jasur Khudiyarov',
    truckNum: '',
    phone: '(843) 447-9604',
    workedHours: 'No working hours',
    certified: false,
    status: 'SB',
    lastLoc: '2.83 mi SW Chalco, Ne (3 days ago)',
    warnings: '0',
    breakTime: '08:00',
    drive: '08:00',
    shift: '08:00'
  },
  {
    id: 3,
    fullName: 'ZOIR KHALMATOV',
    truckNum: '007',
    phone: '(843) 447-9604',
    workedHours: 'No working hours',
    certified: false,
    status: 'OFF',
    lastLoc: '2.83 mi SW Chalco, Ne (3 days ago)',
    warnings: '0',
    breakTime: '08:00',
    drive: '08:00',
    shift: '08:00'
  }
]

const isToggled = ref<boolean>(false)

const currentDriver = computed(() => rows.find((r) => r.id === +route.params.id))

const chipClasses =
  currentDriver.value?.status === 'OFF'
    ? 'border border-[#E3E5E7] bg-[#EEF0F2] text-[#5B6871] text-xs font-medium'
    : 'border border-[#F4F1AF] bg-[#FFFCC2] text-[#D29404] text-xs font-medium'
</script>

<template>
  <template v-if="!route.params.id">
    <div class="flex justify-between border-b border-b-[#EAECF0] pb-5">
      <div class="flex-1">
        <h1 class="text-[#101828] text-2xl font-semibold">{{ route.name }}</h1>
      </div>

      <div class="flex-1 flex items-center justify-end"><RefreshButton /></div>
    </div>

    <div class="flex flex-col gap-6 mt-6">
      <LogsFilter />

      <LogsTable :data="rows" />
    </div>
  </template>

  <template v-if="route.params.id">
    <div class="flex justify-between border-b border-b-[#EAECF0] pb-5">
      <div class="flex-1 flex flex-col gap-2">
        <div class="flex items-center gap-3">
          <span
            @click="router.go(-1)"
            class="cursor-pointer w-11 h-11 rounded-full flex items-center justify-center hover:bg-[#dddfe3]"
          >
            <IconGoback />
          </span>

          <h1 class="text-[#101828] text-2xl font-semibold">{{ currentDriver?.fullName }}</h1>

          <ChipTag :classes="chipClasses">{{ currentDriver?.status }}</ChipTag>

          <IconAndroid />

          <IconAlertTriangle />
        </div>

        <h3 class="text-[#475467] text-sm font-normal">Phone No: {{ currentDriver?.phone }}</h3>

        <div class="flex items-center gap-6">
          <h3 class="text-[#98A2B3] text-sm font-medium">
            Certified:
            <span
              :class="[
                'text-sm font-medium',
                currentDriver?.certified ? 'text-[#F04438]' : 'text-[#17B26A]'
              ]"
              >{{ currentDriver?.certified ? 'Yes' : 'No' }}</span
            >
          </h3>

          <h3 class="text-[#98A2B3] text-sm font-medium">
            Worked hours:
            <span class="text-sm font-medium text-black">
              {{ currentDriver?.workedHours }}
            </span>
          </h3>

          <h3 class="text-[#98A2B3] text-sm font-medium">
            Violations:
            <span class="text-sm font-medium text-black">
              {{ currentDriver?.warnings }}
            </span>
          </h3>
        </div>
      </div>

      <div class="flex-1 flex items-center justify-end gap-5">
        <div class="flex items-center gap-3">
          <h3 class="text-[#344054] text-sm font-semibold">Show logs for 8 days</h3>
          <ToggleSwitch v-model="isToggled" />
        </div>

        <RefreshButton />
      </div>
    </div>

    <div class="flex flex-col gap-6 mt-6">
      <component :is="DriverLogsView" />
    </div>
  </template>
</template>
