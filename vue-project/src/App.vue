<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <main class="min-h-screen bg-gray-50">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
