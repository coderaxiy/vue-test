<script setup lang="ts">
import FormInput from '@/shared/ui/FormInput.vue'
import IconDot from '../icons/IconDot.vue'
import IconNightMoon from '../icons/IconNightMoon.vue'
import IconOfftime from '../icons/IconOfftime.vue'
import IconPerson from '../icons/IconPerson.vue'
import IconSpeedometer from '../icons/IconSpeedometer.vue'
import IconTime from '../icons/IconTime.vue'
import IconTruckSmall from '../icons/IconTruckSmall.vue'
import IconSearch from '../icons/IconSearch.vue'
import IconBell from '../icons/IconBell.vue'
import UserProfile from '../UserProfile.vue'
</script>

<template>
  <header class="flex items-center justify-between border border-[#EAECF0] bg-white px-6 py-3">
    <div class="flex items-center gap-3">
      <div class="flex w-fit items-center border-[#D0D5DD] border rounded-lg">
        <div class="flex items-center justify-center gap-2 border-r py-2.5 px-4">
          <IconPerson />

          <IconDot color="#FEB94A" />

          <h3>3</h3>
        </div>

        <div class="flex items-center justify-center gap-2 py-2.5 px-4">
          <IconTruckSmall />

          <IconDot color="#FEB94A" />

          <h3>1</h3>
        </div>
      </div>

      <div class="flex w-fit items-center border-[#D0D5DD] border rounded-lg">
        <div class="flex items-center justify-center gap-2 border-r py-2.5 px-4">
          <span class="flex items-center gap-[6px]">
            <IconSpeedometer />

            <h3 class="text-xs font-medium text-[#17B26A]">DR</h3>
          </span>

          <IconDot color="#FEB94A" />

          <h3>0</h3>
        </div>

        <div class="flex items-center justify-center gap-2 py-2.5 px-4">
          <span class="flex items-center gap-[6px]">
            <IconTime />

            <h3 class="text-xs font-medium text-[#175CD3]">DR</h3>
          </span>

          <IconDot color="#FEB94A" />

          <h3>0</h3>
        </div>

        <div class="flex items-center justify-center gap-2 border-r py-2.5 px-4">
          <span class="flex items-center gap-[6px]">
            <IconNightMoon />

            <h3 class="text-xs font-medium text-[#344054]">SB</h3>
          </span>

          <IconDot color="#FEB94A" />

          <h3>1</h3>
        </div>

        <div class="flex items-center justify-center gap-2 py-2.5 px-4">
          <span class="flex items-center gap-[6px]">
            <IconOfftime />

            <h3 class="text-xs font-medium text-[#98A2B3]">OFF</h3>
          </span>

          <IconDot color="#FEB94A" />

          <h3>2</h3>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <FormInput name="search" placeholder="Search driver or vehicle" :icon="IconSearch" />

      <IconBell />

      <UserProfile />
    </div>
  </header>
</template>
