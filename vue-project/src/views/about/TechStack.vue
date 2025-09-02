<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'

interface Technology {
  icon: string
  name: string
  version: string
  purpose: string
  status: string
}

const columns = [
  { key: 'icon', label: 'Technology', width: 'w-32' },
  { key: 'version', label: 'Version', width: 'w-20' },
  { key: 'purpose', label: 'Purpose', width: 'w-48' },
  { key: 'status', label: 'Status', width: 'w-24', align: 'center' as const }
]

const technologies: Technology[] = [
  {
    icon: 'Vue.js',
    name: 'Vue.js',
    version: '3.x',
    purpose: 'Frontend Framework',
    status: 'Active'
  },
  {
    icon: 'Vue Router',
    name: 'Vue Router',
    version: '4.x',
    purpose: 'Client-side Routing',
    status: 'Active'
  },
  {
    icon: 'Tailwind CSS',
    name: 'Tailwind CSS',
    version: '4.x',
    purpose: 'Utility-first CSS',
    status: 'Active'
  },
  {
    icon: 'Vite',
    name: 'Vite',
    version: '7.x',
    purpose: 'Build Tool & Dev Server',
    status: 'Active'
  },
  {
    icon: 'TypeScript',
    name: 'TypeScript',
    version: '5.x',
    purpose: 'Type Safety',
    status: 'Active'
  }
]
</script>

<template>
  <DataTable 
    title="Technology Stack" 
    :columns="columns" 
    :data="technologies"
    icon-color="text-blue-500"
  >

    <!-- Custom cell rendering for status -->
    <template #cell-status="{ value }">
      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
        {{ value }}
      </span>
    </template>
  </DataTable>
</template>
