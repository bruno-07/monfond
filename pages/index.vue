<template>
  <div>
    <AppMainHeader />
     <main>
      <slot />
    </main>
    <AppFooter />
    </div>
</template>

<script setup>
import AppMainHeader from '~/components/layout/AppMainHeader.vue';
import AppFooter from '~/components/Footer/AppFooter.vue';
// ...
</script>

<style>
/* ... Styles globaux ... */
</style>