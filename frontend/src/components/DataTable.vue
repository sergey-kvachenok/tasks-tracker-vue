<script setup lang="ts">
interface TableColumn {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface TableData {
  [key: string]: any
}

interface Props {
  title: string
  columns: TableColumn[]
  data: TableData[]
  iconColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: 'text-blue-500'
})

const getCellAlignment = (align?: string): string => {
  switch (align) {
    case 'center': return 'text-center'
    case 'right': return 'text-right'
    default: return 'text-left'
  }
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800">{{ title }}</h2>
    
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Add horizontal scroll container -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th 
                v-for="column in columns" 
                :key="column.key"
                :class="[
                  'px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider',
                  getCellAlignment(column.align),
                  column.width || ''
                ]"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(row, index) in data" :key="index">
              <td 
                v-for="column in columns" 
                :key="column.key"
                :class="[
                  'px-6 py-4 whitespace-nowrap',
                  getCellAlignment(column.align)
                ]"
              > 
              <slot 
                  :name="`cell-${column.key}`" 
                  :value="row[column.key]" 
                  :row="row"
                  :column="column"
                >
                  <!-- Default cell rendering -->
                  <div v-if="column.key === 'icon'" class="flex items-center">
                    <svg class="w-5 h-5 mr-3" :class="iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                    </svg>
                    <span class="text-sm font-medium text-gray-900">{{ row[column.key] }}</span>
                  </div>
                  <span v-else class="text-sm text-gray-700">{{ row[column.key] }}</span>
                </slot>
               
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
