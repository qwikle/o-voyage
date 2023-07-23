<script setup lang="ts">
import { ref, computed, type PropType } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String as PropType<Color>,
    default: 'gray'
  }
})

type Color = 'rose' | 'sky' | 'emerald' | 'violet' | 'gray' | 'orange'

const switchedColor = computed(() => {
  return {
    rose: {
      icon: 'text-rose-400',
      bg: 'bg-rose-100',
      text: 'text-rose-600 bg-rose-100'
    },
    sky: {
      icon: 'text-sky-400',
      bg: 'bg-sky-100',
      text: 'text-sky-600 bg-sky-100'
    },
    emerald: {
      icon: 'text-emerald-400',
      bg: 'bg-emerald-100',
      text: 'text-emerald-600 bg-emerald-100'
    },
    violet: {
      icon: 'text-violet-400',
      bg: 'bg-violet-100',
      text: 'text-violet-600 bg-violet-100'
    },
    gray: {
      icon: 'text-gray-400',
      bg: 'bg-gray-100',
      text: 'text-gray-600 bg-gray-100'
    },
    orange: {
      icon: 'text-orange-400',
      bg: 'bg-orange-100',
      text: 'text-orange-600 bg-orange-100'
    }
  }[props.color]
})

const loadedIcon = ref()

import(/* @vite-ignore */ `@heroicons/vue/24/outline`).then((module) => {
  loadedIcon.value = module[props.icon]
})
</script>
<template>
  <div class="h-32 w-full lg:w-1/5 shadow bg-gray-50 rounded-lg px-2 flex flex-col gap-y-4">
    <div class="flex justify-between items-center">
      <div
        class="w-10 h-10 flex justify-center items-center rounded-lg mt-3"
        :class="switchedColor!.bg"
      >
        <component :is="loadedIcon" class="w-8 h-8" :class="switchedColor!.icon" />
      </div>
      <h3 class="text-sm font-light rounded-2xl px-2" :class="switchedColor!.text">{{ title }}</h3>
    </div>
    <slot></slot>
  </div>
</template>
<style scoped></style>
