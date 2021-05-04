<template>
  <component :is="layoutName + '-layout'" />
</template>


<script>
import AuthLayout from './layout/AuthLayout'
import MainLayout from './layout/MainLayout'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  setup() {
    const route = useRoute()

    return {
      layoutName: computed(() => route.meta.layout)
    }
  },

  components: {
    AuthLayout,
    MainLayout
  }
}
</script>