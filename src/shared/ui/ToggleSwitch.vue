<template>
  <div class="toggle-container" @click="toggle">
    <div class="toggle-switch" :class="{ on: isChecked, off: !isChecked }">
      <div class="switch-thumb"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const isChecked = ref(props.modelValue)

const toggle = () => {
  isChecked.value = !isChecked.value
  emit('update:modelValue', isChecked.value)
}

watch(
  () => props.modelValue,
  (newValue) => {
    isChecked.value = newValue
  }
)
</script>

<style scoped>
.toggle-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.toggle-switch {
  width: 32px;
  height: 20px;
  background-color: #feb94a;
  border-radius: 15px;
  position: relative;
  transition: background-color 0.3s;
}

.toggle-switch.off {
  background-color: #98a2b3;
}

.switch-thumb {
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
}

.toggle-switch.on .switch-thumb {
  transform: translateX(12px);
}
</style>
