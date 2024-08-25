<template>
  <PageHeader />

  <main class="flex gap-6 mt-6">
    <div class="w-[70%] h-pageLayout" ref="mapContainer">
      <GoogleMap
        :fullscreen-control="false"
        :center="{ lat: 39.8283, lng: -98.5795 }"
        :zoom="4"
        style="width: 100%; height: 500px"
        @mapLoaded="onMapLoaded"
      >
        <CustomMarker
          v-for="driver in filteredDrivers"
          :key="driver.id"
          :position="{ lat: driver.lat, lng: driver.lng }"
          @click="onMarkerClick(driver)"
          :options="{
            position: { lat: driver.lat, lng: driver.lng }
          }"
        >
          <span class="w-9 h-9 flex items-center justify-center bg-white rounded-full">
            <IconMapMarker />
          </span>

          <InfoWindow
            v-if="selectedDriver && selectedDriver.id === driver.id"
            class="pt-3 w-56"
            :options="{ position: { lat: driver.lat, lng: driver.lng } }"
          >
            <div class="bg-white flex items-center gap-3" id="content">
              <div class="bg-amber-500 w-11 h-11 rounded-full"></div>
              <div id="bodyContent">
                <h3 class="text-[#101828] text-sm font-semibold">{{ selectedDriver?.name }}</h3>
                <h3 class="text-[#475467] text-sm font-normal">
                  Truck No: {{ selectedDriver?.truckNum }}
                </h3>
              </div>
            </div>
          </InfoWindow>
        </CustomMarker>

        <CustomControl :key="Number(route.query?.driverId)" position="TOP_CENTER">
          <div
            v-if="route.query.driverId"
            class="flex items-center bg-white border border-[#EAECF0] rounded-lg shadow-md mt-6 mx-auto"
          >
            <div class="flex items-center gap-3 py-4 px-3">
              <span class="rounded w-10 h-10 bg-[#FEB94A] flex items-center justify-center">
                <IconNavigator />
              </span>

              <div>
                <h3 class="text-[#101828] text-sm font-medium">Current location</h3>

                <h3 class="text-[#475467] text-sm font-normal">
                  {{ filteredDrivers[0].currrentLocation }}
                </h3>
              </div>
            </div>

            <div
              class="flex items-center gap-3 py-4 px-3 border-l border-r border-l-[#EAECF0] border-r-[#EAECF0]"
            >
              <span class="rounded w-10 h-10 bg-[#FEB94A] flex items-center justify-center">
                <IconFlag />
              </span>

              <div>
                <h3 class="text-[#101828] text-sm font-medium">Current location</h3>

                <h3 class="text-[#475467] text-sm font-normal">
                  {{ filteredDrivers[0].loadStops }}
                </h3>
              </div>
            </div>

            <div class="flex items-center gap-3 py-4 px-3">
              <span class="rounded w-10 h-10 bg-[#FEB94A] flex items-center justify-center">
                <IconFlag />
              </span>

              <div>
                <h3 class="text-[#101828] text-sm font-medium">Current location</h3>

                <h3 class="text-[#475467] text-sm font-normal">
                  {{ filteredDrivers[0].breakStops }}
                </h3>
              </div>
            </div>
          </div>
        </CustomControl>

        <CustomControl position="TOP_LEFT">
          <span
            v-if="route.query.driverId"
            @click="goBack"
            class="cursor-pointer mt-6 ml-6 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center"
          >
            <IconChevron />
          </span>
        </CustomControl>
      </GoogleMap>
    </div>

    <div class="flex-1 flex flex-col gap-6">
      <FormInput name="search" placeholder="Search driver by name" :icon="IconSearch" />

      <div class="flex flex-col gap-2 overflow-y-auto h-full">
        <DriverCard :drivers="drivers" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PageHeader from '@/shared/ui/PageHeader.vue'
import IconSearch from '../icons/IconSearch.vue'
import FormInput from '@/shared/ui/FormInput.vue'
import moment from 'moment-timezone'
import { CustomControl, CustomMarker, GoogleMap, InfoWindow } from 'vue3-google-map'
import IconMapMarker from '../icons/IconMapMarker.vue'
import DriverCard from './DriverCard.vue'
import { useRoute, useRouter } from 'vue-router'
import IconChevron from '../icons/IconChevron.vue'
import IconNavigator from '../icons/IconNavigator.vue'
import IconFlag from '../icons/IconFlag.vue'

export interface DriverDto {
  id: number
  name: string
  lat: number
  lng: number
  status: string
  truckNum: string
  currrentLocation: string
  loadStops: string
  breakStops: string
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
    truckNum: '007',
    currrentLocation: '2.83 mi NW of Nashville, DE',
    loadStops: '--',
    breakStops: '--',
    startTime: new Date(),
    vehicle: 'Volvo'
  },
  {
    id: 2,
    name: 'Driver 2',
    lat: 34.052235,
    lng: -118.243683,
    status: 'OFF',
    truckNum: '007',
    currrentLocation: '2.83 mi SW of Chalco, NE',
    loadStops: '--',
    breakStops: '--',
    startTime: new Date(),
    vehicle: 'Volvo'
  },
  {
    id: 3,
    name: 'Driver 3',
    lat: 37.774929,
    lng: -122.419418,
    status: 'OFF',
    truckNum: '007',
    currrentLocation: '2.83 mi EN of Chicago, DA',
    loadStops: '--',
    breakStops: '--',
    startTime: new Date(),
    vehicle: 'Volvo'
  }
]

const router = useRouter()
const route = useRoute()

const selectedDriver = ref<DriverDto | null>(null)
const filteredDrivers = ref<DriverDto[]>(drivers)

watch(
  () => route.query.driverId,
  (newDriverId) => {
    if (newDriverId) {
      filteredDrivers.value = drivers.filter((v) => v.id === Number(newDriverId))
    } else {
      filteredDrivers.value = drivers
    }
  },
  { immediate: true }
)

const onMapLoaded = (map: google.maps.Map) => {
  // TODO smth
}

const goBack = (): void => {
  selectedDriver.value = null
  router.push({ path: route.path })
}

const onMarkerClick = (driver: DriverDto) => {
  selectedDriver.value = driver
  router.push({ path: route.path, query: { driverId: driver.id } })
}

const formatBreakTime = (startTime: Date) => {
  return moment(startTime).format('MM-DD-YYYY, hh:mm A')
}
</script>
