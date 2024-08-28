<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { DriverDto } from './TrackingMap.vue'
import IconLocation from '../icons/IconLocation.vue'
import IconCopy from '../icons/IconCopy.vue'
import IconShare from '../icons/IconShare.vue'
import IconDropdown from '../icons/IconDropdown.vue'
import moment from 'moment-timezone'
import { computed, ref } from 'vue'

const props = defineProps<{
  drivers: DriverDto[]
}>()

const router = useRouter()
const route = useRoute()

const isCollapsed = ref<Record<number, boolean>>({})

const toggleCollapse = (driverId: number): void => {
  isCollapsed.value[driverId] = !isCollapsed.value[driverId]
}

const onClickCard = (driverId: number): void => {
  router.push({ path: route.path, query: { driverId } })
}

const filteredDrivers = computed(() => {
  const driverId = Number(route.query.driverId)
  if (driverId) {
    return props.drivers?.filter((driver) => driver.id === driverId)
  }
  return props.drivers
})

const navigateToDriverLogs = (id: number): void => {
  router.push({ name: 'Driver Logs', params: { id }, query: {} })
}
</script>

<template>
  <div
    v-for="driver in filteredDrivers"
    :key="driver.id"
    @click="() => onClickCard(driver.id)"
    class="flex flex-col gap-2 border border-[#EAECF0] rounded-lg shadow-md p-4 cursor-pointer"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-[#101828] text-lg font-semibold">{{ driver?.name }}</h3>

      <span
        class="flex items-center justify-center border border-[#EAECF0] rounded-xl bg-[#EAECF0] w-12 py-1 text-xs font-medium text-[#344054]"
      >
        {{ driver?.status }}
      </span>
    </div>

    <div class="flex items-center gap-5">
      <h3 class="flex items-center gap-2 text-[#475467] text-sm font-normal">
        <IconLocation />
        {{ driver?.lat + ', ' + driver?.lng }}
      </h3>

      <IconCopy class="cursor-pointer" />
      <IconShare class="cursor-pointer" />
    </div>

    <h3 class="text-[#475467] text-sm font-medium">
      Started:
      {{ moment(driver?.startTime).tz('America/New_York').format('DD-MM-YYYY hh:mm z') }}
    </h3>

    <div v-if="route.query.driverId == String(driver.id)" class="flex flex-col mt-4">
      <h3
        class="underline text-sm font-medium text-[#175CD3] leading-5"
        @click="() => navigateToDriverLogs(driver.id)"
      >
        View Driver Logs
      </h3>

      <router-link class="underline mt-6 text-sm font-medium text-[#175CD3] leading-5" to="/">
        Share tracking
      </router-link>

      <div
        @click.stop="toggleCollapse(driver.id)"
        class="flex items-center justify-between cursor-pointer mt-6"
      >
        <h3>Diagnostics</h3>
        <IconDropdown :class="{ 'rotate-180': isCollapsed[driver.id] }" />
      </div>

      <div
        :class="[
          'bg-gray-100 overflow-auto text-nowrap flex flex-col gap-2 transition-all duration-300',
          isCollapsed[driver.id] ? 'h-full mt-2 p-2' : 'h-0'
        ]"
      >
        Diagnostics details for {{ driver.name }}
      </div>
    </div>
  </div>
</template>
