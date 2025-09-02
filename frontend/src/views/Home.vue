<template>
  <PageLayout 
    title="Welcome to TaskMaster"
    subtitle="Your personal task management application"
  >
    <template #header-actions>
      <Button variant="primary" @click="$router.push('/tasks')">
        Get Started
      </Button>
    </template>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Organize Tasks</h3>
        <p class="text-gray-600">Keep track of all your tasks in one place</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Stay Productive</h3>
        <p class="text-gray-600">Boost your productivity with smart task management</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Track Progress</h3>
        <p class="text-gray-600">Monitor your progress and celebrate achievements</p>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { PageLayout, Button } from '@/components/ui'
</script>
