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
  overflow: hidden; /* Prevent body scrolling */
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

/* Ensure content doesn't get cut off */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Smooth scrolling for better UX */
main {
  scroll-behavior: smooth;
}

/* Ensure proper spacing for all views */
.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .container {
    padding: 0 0.75rem;
  }
  
  .py-8 {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
}
</style>
