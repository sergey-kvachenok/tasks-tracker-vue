<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'

interface Feature {
  icon: string
  name: string
  description: string
  status: string
}

const columns = [
  { key: 'icon', label: 'Feature', width: 'w-1/4' },
  { key: 'description', label: 'Description', width: 'w-1/2' },
  { key: 'status', label: 'Status', width: 'w-1/4', align: 'center' as const }
]

const features: Feature[] = [
  {
    icon: 'Task Management',
    name: 'Task Management',
    description: 'Add, edit, and delete tasks with ease',
    status: 'Active'
  },
  {
    icon: 'Real-time Updates',
    name: 'Real-time Updates',
    description: 'Instant synchronization across all devices',
    status: 'Active'
  },
  {
    icon: 'Responsive Design',
    name: 'Responsive Design',
    description: 'Works perfectly on all screen sizes',
    status: 'Active'
  },
  {
    icon: 'Modern UI/UX',
    name: 'Modern UI/UX',
    description: 'Beautiful and intuitive user interface',
    status: 'Active'
  }
]
</script>

<template>
  <DataTable 
    title="Features" 
    :columns="columns" 
    :data="features"
    icon-color="text-green-500"
  >
    <!-- Custom cell rendering for status -->
    <template #cell-status="{ value }">
      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
        {{ value }}
      </span>
    </template>
  </DataTable>
</template>
