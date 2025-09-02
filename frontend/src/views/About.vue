<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { PageLayout } from '@/components/ui'

const route = useRoute()

const isActiveTab = (tabPath: string): boolean => {
  return route.path === tabPath
}

const tabs = [
  { path: '/about/features', label: 'Features', name: 'AboutFeatures' },
  { path: '/about/tech-stack', label: 'Technology Stack', name: 'AboutTechStack' }
]
</script>

<template>
  <PageLayout title="About TaskMaster">
    <div class="prose max-w-none">
      <p class="text-lg text-gray-700 mb-6">
        TaskMaster is a modern, intuitive task management application built with Vue.js and Tailwind CSS.
      </p>
      
      <!-- Tab Navigation -->
      <div class="border-b border-gray-200 mb-8">
        <nav class="-mb-px flex space-x-8">
          <RouterLink
            v-for="tab in tabs"
            :key="tab.path"
            :to="tab.path"
            class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
            :class="[
              isActiveTab(tab.path)
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.label }}
          </RouterLink>
        </nav>
      </div>
      
      <!-- Tab Content -->
      <RouterView />
      
      <!-- Getting Started Section -->
      <div class="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 class="text-lg font-semibold text-blue-800 mb-2">Getting Started</h3>
        <p class="text-blue-700">
          Navigate to the Tasks page to start managing your tasks. You can add new tasks, delete completed ones, 
          and keep track of your productivity goals.
        </p>
      </div>
    </div>
  </PageLayout>
</template>
