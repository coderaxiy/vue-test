<script setup lang="ts">
import IconRefresh from '@/components/icons/IconRefresh.vue'
import { defineProps, computed, type VNode, type Component } from 'vue'
import { useRoute } from 'vue-router'

interface PropTypes {
  leftContents?: Array<VNode | Component>
  rightContent?: VNode
  rightContentClassName?: string
  leftContentClassName?: string
  showRefreshBtn?: boolean
}

const props = withDefaults(defineProps<PropTypes>(), {
  showRefreshBtn: true
})
const router = useRoute()

const isLeftContents = computed(() => props.leftContents && props.leftContents.length > 0)
</script>

<template>
  <div class="flex justify-between border-b border-b-[#EAECF0] pb-5">
    <div :class="['flex-1', leftContentClassName]">
      <template v-if="isLeftContents">
        <component v-for="(content, index) in leftContents" :key="index" :is="content" />
      </template>
      <template v-else>
        <h1 class="text-[#101828] text-2xl font-semibold">{{ router.name }}</h1>
      </template>
    </div>

    <div :class="['flex-1 flex items-center justify-end', rightContentClassName]">
      {{ rightContent }}

      <button
        v-if="showRefreshBtn"
        class="w-28 flex items-center justify-center gap-2 text-[#344054] text-sm font-semibold border border-[#D0D5DD] rounded-lg py-2.5"
      >
        <IconRefresh />

        Refresh
      </button>
    </div>
  </div>
</template>
