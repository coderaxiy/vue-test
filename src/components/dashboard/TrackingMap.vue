<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PageHeader from '@/shared/ui/PageHeader.vue'
import IconSearch from '../icons/IconSearch.vue'
import FormInput from '@/shared/ui/FormInput.vue'
import IconLocation from '../icons/IconLocation.vue'
import IconCopy from '../icons/IconCopy.vue'
import IconShare from '../icons/IconShare.vue'
import moment from 'moment-timezone'

/// <reference types="@types/google.maps" />

interface DriverDto {
  id: number
  name: string
  lat: number
  lng: number
  status: string
  startTime: Date
  vehicle: string
}

const drivers: DriverDto[] = [
  {
    id: 1,
    name: 'Driver 1',
    lat: 40.712776,
    lng: -74.005974,
    status: 'OFF',
    startTime: new Date(),
    vehicle: 'Volvo'
  },
  {
    id: 2,
    name: 'Driver 2',
    lat: 34.052235,
    lng: -118.243683,
    status: 'OFF',
    startTime: new Date(),
    vehicle: 'Volvo'
  },
  {
    id: 3,
    name: 'Driver 3',
    lat: 37.774929,
    lng: -122.419418,
    status: 'OFF',
    startTime: new Date(),
    vehicle: 'Volvo'
  }
]

const selectedDrivers = ref<DriverDto[]>([])

const mapContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  const map = new google.maps.Map(mapContainer.value as HTMLElement, {
    center: { lat: 39.8283, lng: -98.5795 },
    zoom: 4
  })

  drivers.forEach((driver) => {
    const marker = new google.maps.Marker({
      position: { lat: driver.lat, lng: driver.lng },
      map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#FFD700',
        fillOpacity: 1,
        strokeWeight: 0
      }
    })

    marker.addListener('click', () => {
      const isDriverSelected = selectedDrivers.value.find((d) => d.id === driver.id)
      if (isDriverSelected) {
        selectedDrivers.value = selectedDrivers.value.filter((d) => d.id !== driver.id)
      } else {
        selectedDrivers.value.push(driver)
      }

      const infoWindow = new google.maps.InfoWindow({
        content: `<div><strong>${driver.name}</strong><br>Vehicle: ${driver.vehicle}</div>`
      })
      infoWindow.open(map, marker)
    })
  })
})
</script>

<template>
  <PageHeader />

  <main class="flex gap-6 mt-6">
    <div class="w-[70%] h-pageLayout" ref="mapContainer">
      <!-- Map slot -->
    </div>

    <div class="flex-1 flex flex-col gap-6">
      <FormInput name="search" placeholder="Search driver or vehicle" :icon="IconSearch" />

      <div class="flex flex-col gap-2 overflow-y-auto" v-if="selectedDrivers.length">
        <div
          v-for="driver in selectedDrivers"
          :key="driver.id"
          class="flex flex-col gap-2 border border-[#EAECF0] rounded-lg shadow-md p-4"
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

              {{ driver?.lat + '-' + driver?.lng }}
            </h3>

            <IconCopy class="cursor-pointer" />

            <IconShare class="cursor-pointer" />
          </div>

          <h3 class="text-[#475467] text-sm font-medium">
            Started:
            {{ moment(driver?.startTime).tz('America/New_York').format('DD-MM-YYYY hh:mm z') }}
          </h3>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
div[ref='mapContainer'] {
  height: 500px;
  width: 100%;
}
</style>
