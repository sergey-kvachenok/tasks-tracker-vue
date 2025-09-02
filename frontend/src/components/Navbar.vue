<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { ref } from 'vue'

interface NavigationLink {
  path: string
  label: string
}

const route = useRoute()
const isMobileMenuOpen = ref<boolean>(false)

const isActiveLink = (routePath: string): boolean => {
  return route.path === routePath
}

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navigationLinks: NavigationLink[] = [
  { path: '/', label: 'Home' },
  { path: '/tasks', label: 'Tasks' },
  { path: '/about', label: 'About' }
]
</script>

<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-800">TaskMaster</span>
          </RouterLink>
        </div>

        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex space-x-8">
          <RouterLink
            v-for="link in navigationLinks" 
            :key="link.path"
            :to="link.path" 
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="[
              isActiveLink(link.path) 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            ]"
          >
            {{ link.label }}
          </RouterLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu"
            class="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
          >
            <svg v-if="!isMobileMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
          <RouterLink 
            v-for="link in navigationLinks" 
            :key="link.path"
            :to="link.path" 
            @click="isMobileMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-medium transition-colors"
            :class="[
              isActiveLink(link.path) 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            ]"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>