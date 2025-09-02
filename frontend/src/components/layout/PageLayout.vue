<template>
  <div class="container mx-auto px-4 py-8 min-h-full">
    <!-- Page Header -->
    <div class="mb-8">
      <!-- Header Row with Title and Actions -->
      <div class="flex justify-between items-start mb-4">
        <div class="flex-1">
          <h1 class="text-4xl font-bold text-gray-900">{{ title }}</h1>
          <p v-if="subtitle" class="text-xl text-gray-600 mt-2">{{ subtitle }}</p>
        </div>
        
        <!-- Header Actions Slot -->
        <div class="flex-shrink-0 ml-6">
          <slot name="header-actions" />
        </div>
      </div>
    </div>

    <!-- Page Content -->
    <div class="space-y-6">
      <slot />
    </div>
    
    <!-- Page Actions Slot (for bottom actions) -->
    <div v-if="$slots['page-actions']" class="mt-8 pt-6 border-t border-gray-200">
      <slot name="page-actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>
