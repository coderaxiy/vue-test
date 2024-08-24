<script setup lang="ts">
import { ref, type Component } from 'vue'
import { useRouter } from 'vue-router'
import DashboardIcon from '../icons/IconDashboard.vue'
import IconLogs from '../icons/IconLogs.vue'
import IconReports from '../icons/IconReports.vue'
import IconGps from '../icons/IconGps.vue'
import IconUsers from '../icons/IconUsers.vue'
import IconTruck from '../icons/IconTruck.vue'
import IconSettings from '../icons/IconSettings.vue'
import IconLogo from '../icons/IconLogo.vue'
import IconDot from '../icons/IconDot.vue'

interface SiderItemContents {
  id: number
  title: string
  path: string
}

interface SiderItem {
  id: number
  title: string
  Icon: Component
  path?: string
  contents?: SiderItemContents[]
}

const sidebarItems: SiderItem[] = [
  { id: 1, title: 'Dashboard', Icon: DashboardIcon, path: '/dashboard' },
  {
    id: 2,
    title: 'Logs',
    Icon: IconLogs,
    contents: [
      { id: 1, title: 'Logs', path: '/logs' },
      { id: 2, title: 'Logs by driver', path: '/logs-by-driver' },
      { id: 3, title: 'Violations', path: '/violations' },
      { id: 4, title: 'Unidentified Logs', path: '/unidentified-logs' }
    ]
  },
  { id: 3, title: '', Icon: IconGps },
  { id: 4, title: '', Icon: IconUsers },
  { id: 5, title: '', Icon: IconTruck },
  {
    id: 6,
    title: 'Reports',
    Icon: IconReports,
    contents: [
      { id: 1, title: 'IFTA Reports', path: '/ifta-reports' },
      { id: 2, title: 'FMCSA Reports', path: '/fmcsa-reports' },
      { id: 3, title: 'DVIR Reports', path: '/dvir-reports' },
      { id: 4, title: 'Activity Reports', path: '/activity-reports' },
      { id: 5, title: 'Driver Reports', path: '/driver-reports' }
    ]
  },
  { id: 7, title: '', Icon: IconSettings }
]

const drawerState = ref<null | number>(null)
const router = useRouter()

const handleItemClick = (item: SiderItem) => {
  if (item.path) {
    router.push(item.path)
    drawerState.value = null
  } else if (item.contents) {
    drawerState.value = drawerState.value === item.id ? null : item.id
  } else {
    drawerState.value = null
  }
}

const closeDrawer = () => {
  drawerState.value = null
}
</script>

<template>
  <aside class="h-screen flex flex-col px-4 py-8 bg-[#0C111D]">
    <span class="flex items-center justify-center mb-6">
      <IconLogo />
    </span>
    <button
      v-for="item in sidebarItems"
      :key="item.id"
      class="px-4 py-3.5 rounded hover:bg-[#1D2939] focus:bg-[#1D2939]"
      @click="handleItemClick(item)"
    >
      <component :is="item.Icon" />
    </button>
  </aside>

  <navbar
    :class="[
      'bg-[#1D2939] overflow-auto text-nowrap flex flex-col gap-4 transition-all duration-300',
      drawerState !== null ? 'w-[300px] px-4 py-9' : 'w-0 p-0'
    ]"
  >
    <div class="drawer-header">
      <h3 class="text-[16px] text-[#D0D5DD] font-medium">
        {{ sidebarItems.find((i) => i.id === drawerState)?.title }}
      </h3>
    </div>

    <ul>
      <li
        class="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#344054]"
        v-for="content in sidebarItems.find((i) => i.id === drawerState)?.contents"
        :key="content.id"
      >
        <IconDot />

        <router-link class="text-white text-base font-medium" :to="content.path">{{
          content.title
        }}</router-link>
      </li>
    </ul>
  </navbar>
</template>
