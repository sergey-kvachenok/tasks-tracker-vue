<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div id="app" class="h-screen flex flex-col">
    <Navbar class="flex-shrink-0" />
    <main class="flex-1 overflow-auto bg-gray-50">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Global styles for static navbar layout */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Ensure main content area is scrollable */
main {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

/* Custom scrollbar styling */
main::-webkit-scrollbar {
  width: 8px;
}

main::-webkit-scrollbar-track {
  background: #f1f5f9;
}

main::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

main::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth scrolling for better UX */
main {
  scroll-behavior: smooth;
}
</style>
