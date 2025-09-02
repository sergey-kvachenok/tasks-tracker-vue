<template>
  <div class="text-center py-12">
    <div :class="[
      'border rounded-lg p-6',
      variantClasses[variant]
    ]">
      <svg class="mx-auto h-12 w-12" :class="iconClasses[variant]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path v-if="variant === 'error'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        <path v-else-if="variant === 'warning'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium" :class="titleClasses[variant]">{{ title }}</h3>
      <p class="mt-1 text-sm" :class="messageClasses[variant]">{{ message }}</p>
      
      <!-- Action Slot -->
      <div v-if="$slots.action" class="mt-6">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  message: string
  variant?: 'error' | 'warning' | 'info'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'error'
})

const variantClasses = {
  error: 'bg-red-50 border-red-200',
  warning: 'bg-yellow-50 border-yellow-200',
  info: 'bg-blue-50 border-blue-200'
}

const iconClasses = {
  error: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400'
}

const titleClasses = {
  error: 'text-red-800',
  warning: 'text-yellow-800',
  info: 'text-blue-800'
}

const messageClasses = {
  error: 'text-red-700',
  warning: 'text-yellow-700',
  info: 'text-blue-700'
}
</script>
